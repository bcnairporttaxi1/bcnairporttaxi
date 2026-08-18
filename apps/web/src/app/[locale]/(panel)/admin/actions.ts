'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getSession, hashPassword } from '@/lib/auth';
import { absoluteUrl } from '@bcn/core/site';
import { generateTemporaryPassword } from '@/lib/passwords';
import {
  driverAssignedEmail,
  sendEmail,
  temporaryPasswordEmail,
  withdrawalEmail,
} from '@/lib/email';
import { applyRideStatus, applyRideStatusBulk } from '@/lib/ride-service';
import type { BookingStatus } from '@/generated/prisma/enums';

export interface AdminActionState {
  error?: string;
  ok?: string;
}

/** Every action re-checks the role server-side; the UI is not the gate. */
async function assertAdmin() {
  const session = await getSession();
  if (!session) throw new Error('Not signed in');

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  });
  if (user?.role !== 'ADMIN') throw new Error('Not permitted');
}

export async function assignDriver(formData: FormData): Promise<void> {
  await assertAdmin();

  const bookingId = String(formData.get('bookingId'));
  const driverId = String(formData.get('driverId') || '');
  const locale = String(formData.get('locale') ?? 'en');

  // Read first, then write. The status decision depends on the current value,
  // and nesting that read inside the update object made the order of
  // evaluation something you had to reason about rather than see.
  const before = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { status: true },
  });
  if (!before) return;

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      driverId: driverId || null,
      // Attaching a driver advances the booking, but never drags a completed
      // or cancelled trip backwards.
      status:
        driverId && ['PENDING', 'CONFIRMED'].includes(before.status)
          ? 'ASSIGNED'
          : undefined,
    },
    include: { driver: true, vehicle: { select: { name: true } } },
  });

  if (driverId && booking.driver) {
    // The passenger needs to recognise the car, not just know a name — so the
    // plate and vehicle go in the email rather than only the driver's phone.
    const mail = driverAssignedEmail({
      name: booking.contactName,
      reference: booking.reference,
      pickupAt: booking.pickupAt,
      locale: booking.locale,
      driverName: booking.driver.name,
      driverPhone: booking.driver.phone,
      plate: booking.driver.plate,
      vehicleName: booking.vehicle?.name,
      tripUrl: absoluteUrl(`/${booking.locale}/trip/${booking.reference}`),
    });
    await sendEmail({ to: booking.contactEmail, ...mail });
  }

  revalidatePath(`/${locale}/admin`);
  revalidatePath(`/${locale}/admin/rides`);
}

const STATUSES = [
  'PENDING',
  'CONFIRMED',
  'ASSIGNED',
  'EN_ROUTE',
  'ARRIVED',
  'ON_BOARD',
  'COMPLETED',
  'CANCELLED',
] as const;

export async function setBookingStatus(formData: FormData): Promise<void> {
  await assertAdmin();

  const bookingId = String(formData.get('bookingId'));
  const locale = String(formData.get('locale') ?? 'en');
  const parsed = z.enum(STATUSES).safeParse(formData.get('status'));
  if (!parsed.success) return;

  // Goes through the shared service so completing a ride here settles it the
  // same way completing it from the driver panel does.
  await applyRideStatus(bookingId, parsed.data as BookingStatus, 'ADMIN');

  revalidatePath(`/${locale}/admin`);
  revalidatePath(`/${locale}/admin/rides`);
}

const driverSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  whatsapp: z.string().trim().max(40).optional().or(z.literal('')),
  licenseNumber: z.string().trim().min(1).max(60),
  plate: z.string().trim().max(20).optional().or(z.literal('')),
  email: z.email().max(200).optional().or(z.literal('')),
  vehicleId: z.string().trim().optional().or(z.literal('')),
});

export async function addDriver(formData: FormData): Promise<void> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');

  const parsed = driverSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    whatsapp: formData.get('whatsapp') ?? '',
    licenseNumber: formData.get('licenseNumber'),
    plate: formData.get('plate') ?? '',
    email: formData.get('email') ?? '',
    vehicleId: formData.get('vehicleId') ?? '',
  });
  if (!parsed.success) return;

  const { name, phone, whatsapp, licenseNumber, plate, email, vehicleId } = parsed.data;

  // A login is optional: a driver can exist as a dispatch record only and be
  // given panel access later. When it is wanted, the password is generated and
  // mailed rather than typed by an admin, so nobody but the driver ever knows
  // it — same rule as every other account.
  let userId: string | undefined;
  let temporaryPassword: string | undefined;

  if (email) {
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      await prisma.user.update({ where: { id: existing.id }, data: { role: 'DRIVER' } });
      userId = existing.id;
    } else {
      temporaryPassword = generateTemporaryPassword();
      const created = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          phone,
          passwordHash: await hashPassword(temporaryPassword),
          role: 'DRIVER',
          locale,
          mustChangePassword: true,
        },
      });
      userId = created.id;
    }
  }

  await prisma.driver.create({
    data: {
      name,
      phone,
      whatsapp: whatsapp || null,
      licenseNumber,
      plate: plate ? plate.toUpperCase() : null,
      vehicleId: vehicleId || null,
      userId,
    },
  });

  if (email && temporaryPassword) {
    const mail = temporaryPasswordEmail({
      name,
      email: email.toLowerCase(),
      password: temporaryPassword,
      loginUrl: absoluteUrl(`/${locale}/login`),
    });
    await sendEmail({ to: email.toLowerCase(), ...mail });
  }

  revalidatePath(`/${locale}/admin/drivers`);
}

export async function toggleDriverActive(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = String(formData.get('driverId'));
  const locale = String(formData.get('locale') ?? 'en');

  const driver = await prisma.driver.findUnique({ where: { id }, select: { active: true } });
  if (!driver) return;

  await prisma.driver.update({ where: { id }, data: { active: !driver.active } });
  revalidatePath(`/${locale}/admin/drivers`);
}

export async function moderateReview(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = String(formData.get('reviewId'));
  const approve = formData.get('approve') === '1';
  const locale = String(formData.get('locale') ?? 'en');

  if (approve) {
    // Publishing only ever applies to passenger-to-driver ratings. Enforced
    // here rather than in the form, so a crafted request cannot promote an
    // internal rating of a passenger onto the public page.
    await prisma.review.updateMany({
      where: { id, direction: 'USER_TO_DRIVER' },
      data: { approved: true },
    });
  } else {
    await prisma.review.delete({ where: { id } });
  }

  revalidatePath(`/${locale}/admin/reviews`);
}

/** Writes an audit row. Bulk actions and deletions must always leave a trace. */
async function audit(action: string, target: string, detail?: string) {
  const session = await getSession();
  await prisma.auditLog.create({
    data: {
      actorId: session?.userId ?? null,
      actorEmail: session?.email ?? 'unknown',
      action,
      target,
      detail,
    },
  });
}

/** Ids submitted by the bulk checkboxes on the ride panel. */
function selectedIds(formData: FormData): string[] {
  return formData
    .getAll('ids')
    .map(String)
    .filter((v) => v.length > 0);
}

/**
 * Applies one change to every selected ride.
 *
 * Deliberately narrow: status, driver and pickup time are the three things the
 * office actually changes in bulk. Anything touching money stays per-booking,
 * where the consequences are visible.
 */
export async function bulkUpdateRides(formData: FormData): Promise<void> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');
  const ids = selectedIds(formData);
  if (ids.length === 0) return;

  const op = String(formData.get('op'));

  if (op === 'delete') {
    // Cancel rather than destroy anything a customer has paid for: the money
    // moved, so the record has to survive for the books.
    const paid = await prisma.booking.findMany({
      where: { id: { in: ids }, paymentStatus: 'PAID' },
      select: { id: true, reference: true },
    });
    const paidIds = new Set(paid.map((b) => b.id));
    const deletable = ids.filter((id) => !paidIds.has(id));

    if (paidIds.size > 0) {
      await prisma.booking.updateMany({
        where: { id: { in: [...paidIds] } },
        data: {
          status: 'CANCELLED',
          cancelledAt: new Date(),
          cancelledBy: 'ADMIN',
          cancelReason: 'Cancelled in bulk by the office',
        },
      });
    }
    if (deletable.length > 0) {
      await prisma.booking.deleteMany({ where: { id: { in: deletable } } });
    }

    await audit(
      'bulk_delete',
      ids.join(','),
      `${deletable.length} deleted, ${paidIds.size} cancelled instead because they were paid`,
    );
    revalidatePath(`/${locale}/admin/rides`);
    return;
  }

  if (op === 'status') {
    const parsed = z.enum(STATUSES).safeParse(formData.get('status'));
    if (!parsed.success) return;
    const status = parsed.data as BookingStatus;

    // Not an updateMany: the settlement figures differ per booking, so each
    // row needs its own values. The service does them in one transaction.
    const moved = await applyRideStatusBulk(ids, status, 'ADMIN');
    await audit('bulk_status', ids.join(','), `${status} (${moved})`);
    revalidatePath(`/${locale}/admin/rides`);
    return;
  }

  if (op === 'driver') {
    const driverId = String(formData.get('driverId') || '');
    await prisma.booking.updateMany({
      where: { id: { in: ids } },
      data: { driverId: driverId || null },
    });
    // Only nudge rides forward that were waiting for someone.
    if (driverId) {
      await prisma.booking.updateMany({
        where: { id: { in: ids }, status: { in: ['PENDING', 'CONFIRMED'] } },
        data: { status: 'ASSIGNED' },
      });
    }
    await audit('bulk_assign', ids.join(','), driverId || 'unassigned');
    revalidatePath(`/${locale}/admin/rides`);
  }
}

const rideEditSchema = z.object({
  pickupLabel: z.string().trim().min(3).max(300),
  dropoffLabel: z.string().trim().min(3).max(300),
  pickupAt: z.string().min(10),
  passengers: z.coerce.number().int().min(1).max(8),
  luggage: z.coerce.number().int().min(0).max(16),
  notes: z.string().trim().max(2000).optional(),
});

/** Full edit of a single ride from the admin ride view. */
export async function editRide(formData: FormData): Promise<void> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');
  const bookingId = String(formData.get('bookingId'));

  const parsed = rideEditSchema.safeParse({
    pickupLabel: formData.get('pickupLabel'),
    dropoffLabel: formData.get('dropoffLabel'),
    pickupAt: formData.get('pickupAt'),
    passengers: formData.get('passengers'),
    luggage: formData.get('luggage'),
    notes: formData.get('notes') || undefined,
  });
  if (!parsed.success) return;

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      pickupLabel: parsed.data.pickupLabel,
      dropoffLabel: parsed.data.dropoffLabel,
      pickupAt: new Date(parsed.data.pickupAt),
      passengers: parsed.data.passengers,
      luggage: parsed.data.luggage,
      notes: parsed.data.notes ?? null,
    },
  });

  await audit('edit_ride', bookingId);
  revalidatePath(`/${locale}/admin/rides`);
}

/** Cancels one ride, with a reason the passenger can be told. */
export async function cancelRide(formData: FormData): Promise<void> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');
  const bookingId = String(formData.get('bookingId'));
  const reason = String(formData.get('reason') || '').trim() || null;

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date(),
      cancelledBy: 'ADMIN',
      cancelReason: reason,
    },
  });

  await audit('cancel_ride', bookingId, reason ?? undefined);
  revalidatePath(`/${locale}/admin/rides`);
}

const newUserSchema = z.object({
  email: z.email().max(200),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional(),
  role: z.enum(['USER', 'DRIVER', 'ADMIN']),
});

/**
 * Opens an account on someone's behalf.
 *
 * The generated password is emailed and then forgotten: only its hash reaches
 * the database, so nobody — including the admin who created the account — can
 * read it back afterwards.
 */
export async function createUserAccount(
  _prev: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');

  const parsed = newUserSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    phone: formData.get('phone') || undefined,
    role: formData.get('role'),
  });
  if (!parsed.success) return { error: 'Check the name, email and role.' };

  const email = parsed.data.email.toLowerCase();
  if (await prisma.user.findUnique({ where: { email } })) {
    return { error: 'An account with that email already exists.' };
  }

  const password = generateTemporaryPassword();
  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      phone: parsed.data.phone,
      passwordHash: await hashPassword(password),
      role: parsed.data.role,
      locale,
      mustChangePassword: true,
    },
  });

  const mail = temporaryPasswordEmail({
    name: user.name,
    email: user.email,
    password,
    loginUrl: absoluteUrl(`/${locale}/login`),
  });
  const sent = await sendEmail({ to: user.email, ...mail });

  await audit('create_user', user.id, `${parsed.data.role} · mail ${sent.sent ? 'sent' : 'failed'}`);
  revalidatePath(`/${locale}/admin/users`);

  return sent.sent
    ? { ok: `Account created. The temporary password was emailed to ${user.email}.` }
    : {
        error:
          'Account created, but the email did not send. Use "resend password" once email is working.',
      };
}

/** Issues a fresh temporary password and mails it. */
export async function resetUserPassword(formData: FormData): Promise<void> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');
  const userId = String(formData.get('userId'));

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const password = generateTemporaryPassword();
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(password), mustChangePassword: true },
  });

  const mail = temporaryPasswordEmail({
    name: user.name,
    email: user.email,
    password,
    loginUrl: absoluteUrl(`/${locale}/login`),
  });
  await sendEmail({ to: user.email, ...mail });

  await audit('reset_password', user.id);
  revalidatePath(`/${locale}/admin/users`);
}

/** Suspends or restores an account after a report. */
export async function setUserBlocked(formData: FormData): Promise<void> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');
  const userId = String(formData.get('userId'));
  const blocked = formData.get('blocked') === '1';
  const reason = String(formData.get('reason') || '').trim() || null;

  await prisma.user.update({
    where: { id: userId },
    data: { blocked, blockedReason: blocked ? reason : null },
  });

  await audit(blocked ? 'block_user' : 'unblock_user', userId, reason ?? undefined);
  revalidatePath(`/${locale}/admin/users`);
}

/** Moves a withdrawal request along, telling the driver each time. */
export async function decideWithdrawal(formData: FormData): Promise<void> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');
  const id = String(formData.get('withdrawalId'));
  const parsed = z.enum(['APPROVED', 'PAID', 'REJECTED']).safeParse(formData.get('status'));
  if (!parsed.success) return;
  const note = String(formData.get('note') || '').trim() || null;

  const w = await prisma.withdrawal.update({
    where: { id },
    data: {
      status: parsed.data,
      adminNotes: note,
      reference: String(formData.get('reference') || '').trim() || null,
      processedAt: new Date(),
    },
    include: { driver: { include: { user: { select: { email: true } } } } },
  });

  if (w.driver.user?.email) {
    const mail = withdrawalEmail({
      driverName: w.driver.name,
      amount: Number(w.amount),
      method: w.method,
      destination: w.destination,
      status: parsed.data,
      note,
    });
    await sendEmail({ to: w.driver.user.email, ...mail });
  }

  await audit('withdrawal', id, parsed.data);
  revalidatePath(`/${locale}/admin/withdrawals`);
}

/** Records what an admin decided about a report. */
export async function resolveReport(formData: FormData): Promise<void> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');
  const id = String(formData.get('reportId'));
  const parsed = z
    .enum(['OPEN', 'REVIEWING', 'RESOLVED', 'DISMISSED'])
    .safeParse(formData.get('status'));
  if (!parsed.success) return;

  await prisma.report.update({
    where: { id },
    data: {
      status: parsed.data,
      adminNotes: String(formData.get('notes') || '').trim() || null,
      resolvedAt: ['RESOLVED', 'DISMISSED'].includes(parsed.data) ? new Date() : null,
    },
  });

  await audit('resolve_report', id, parsed.data);
  revalidatePath(`/${locale}/admin/reports`);
}
