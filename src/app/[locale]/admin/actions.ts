'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getSession, hashPassword } from '@/lib/auth';
import { sendEmail } from '@/lib/email';
import type { BookingStatus } from '@/generated/prisma/enums';

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

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      driverId: driverId || null,
      // Attaching a driver advances the booking, but never drags a completed
      // or cancelled trip backwards.
      status:
        driverId && ['PENDING', 'CONFIRMED'].includes(
          (await prisma.booking.findUnique({
            where: { id: bookingId },
            select: { status: true },
          }))?.status ?? '',
        )
          ? 'ASSIGNED'
          : undefined,
    },
    include: { driver: true },
  });

  if (driverId && booking.driver) {
    await sendEmail({
      to: booking.contactEmail,
      subject: `Your driver for booking ${booking.reference}`,
      html: `<p>Your driver for ${booking.reference} is <strong>${booking.driver.name}</strong>, reachable on ${booking.driver.phone}.</p>`,
      text: `Your driver for ${booking.reference} is ${booking.driver.name}, reachable on ${booking.driver.phone}.`,
    });
  }

  revalidatePath(`/${locale}/admin`);
}

const STATUSES = [
  'PENDING',
  'CONFIRMED',
  'ASSIGNED',
  'EN_ROUTE',
  'COMPLETED',
  'CANCELLED',
] as const;

export async function setBookingStatus(formData: FormData): Promise<void> {
  await assertAdmin();

  const bookingId = String(formData.get('bookingId'));
  const locale = String(formData.get('locale') ?? 'en');
  const parsed = z.enum(STATUSES).safeParse(formData.get('status'));
  if (!parsed.success) return;

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: parsed.data as BookingStatus },
  });

  revalidatePath(`/${locale}/admin`);
}

const driverSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  licenseNumber: z.string().trim().min(1).max(60),
  email: z.email().max(200).optional().or(z.literal('')),
  password: z.string().min(8).max(200).optional().or(z.literal('')),
  vehicleId: z.string().trim().optional().or(z.literal('')),
});

export async function addDriver(formData: FormData): Promise<void> {
  await assertAdmin();
  const locale = String(formData.get('locale') ?? 'en');

  const parsed = driverSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    licenseNumber: formData.get('licenseNumber'),
    email: formData.get('email') ?? '',
    password: formData.get('password') ?? '',
    vehicleId: formData.get('vehicleId') ?? '',
  });
  if (!parsed.success) return;

  const { name, phone, licenseNumber, email, password, vehicleId } = parsed.data;

  // A login is optional: a driver can exist as a dispatch record only, and be
  // given panel access later.
  let userId: string | undefined;
  if (email && password) {
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      await prisma.user.update({ where: { id: existing.id }, data: { role: 'DRIVER' } });
      userId = existing.id;
    } else {
      const created = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          phone,
          passwordHash: await hashPassword(password),
          role: 'DRIVER',
          locale,
        },
      });
      userId = created.id;
    }
  }

  await prisma.driver.create({
    data: {
      name,
      phone,
      licenseNumber,
      vehicleId: vehicleId || null,
      userId,
    },
  });

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
    await prisma.review.update({ where: { id }, data: { approved: true } });
  } else {
    await prisma.review.delete({ where: { id } });
  }

  revalidatePath(`/${locale}/admin/reviews`);
}
