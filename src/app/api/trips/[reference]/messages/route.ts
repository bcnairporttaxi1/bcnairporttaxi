import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { resolveTripAccess } from '@/lib/trip-access';
import { sendEmail } from '@/lib/email';
import { SITE_URL } from '@/lib/site';

/**
 * Trip chat between passenger and driver.
 *
 * If the recipient has not been seen recently the message is also emailed, so
 * a driver who is not looking at their phone still gets it. The message is
 * stored either way and appears in the thread when they return, and
 * `deliveredEmail` records that the mirror was sent so it cannot go twice.
 */

const OFFLINE_AFTER_MS = 3 * 60 * 1000;

const bodySchema = z.object({
  body: z.string().trim().min(1).max(2000),
});

export async function GET(
  request: Request,
  ctx: { params: Promise<{ reference: string }> },
) {
  const { reference } = await ctx.params;
  const access = await resolveTripAccess(reference);
  if (!access) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const url = new URL(request.url);
  const since = url.searchParams.get('since');

  const messages = await prisma.message.findMany({
    where: {
      bookingId: access.bookingId,
      ...(since ? { createdAt: { gt: new Date(since) } } : {}),
    },
    orderBy: { createdAt: 'asc' },
    take: 200,
    select: {
      id: true,
      senderRole: true,
      body: true,
      createdAt: true,
      deliveredEmail: true,
    },
  });

  return NextResponse.json({
    you: access.as,
    messages: messages.map((m) => ({
      id: m.id,
      senderRole: m.senderRole,
      body: m.body,
      createdAt: m.createdAt.toISOString(),
      deliveredEmail: m.deliveredEmail,
    })),
  });
}

export async function POST(
  request: Request,
  ctx: { params: Promise<{ reference: string }> },
) {
  const { reference } = await ctx.params;
  const access = await resolveTripAccess(reference);
  if (!access) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id: access.bookingId },
    select: {
      reference: true,
      contactEmail: true,
      contactName: true,
      locale: true,
      userId: true,
      driver: { select: { name: true, user: { select: { email: true, lastSeenAt: true } } } },
      user: { select: { lastSeenAt: true } },
    },
  });
  if (!booking) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const message = await prisma.message.create({
    data: {
      bookingId: access.bookingId,
      senderRole: access.as,
      senderId: access.as === 'ADMIN' ? null : undefined,
      body: parsed.data.body,
    },
  });

  // Work out who should receive it, and whether they are around to see it.
  const now = Date.now();
  const isRecent = (d: Date | null | undefined) =>
    Boolean(d && now - d.getTime() < OFFLINE_AFTER_MS);

  const recipient =
    access.as === 'DRIVER'
      ? { email: booking.contactEmail, online: isRecent(booking.user?.lastSeenAt) }
      : {
          email: booking.driver?.user?.email ?? null,
          online: isRecent(booking.driver?.user?.lastSeenAt),
        };

  let mirrored = false;
  if (recipient.email && !recipient.online) {
    const url = `${SITE_URL}/${booking.locale}/trip/${booking.reference}`;
    const result = await sendEmail({
      to: recipient.email,
      subject: `New message about booking ${booking.reference}`,
      html: `<p>${parsed.data.body.replace(/</g, '&lt;')}</p><p><a href="${url}">Open the trip chat</a></p>`,
      text: `${parsed.data.body}\n\nOpen the trip chat: ${url}`,
    });
    mirrored = result.sent;

    if (mirrored) {
      await prisma.message.update({
        where: { id: message.id },
        data: { deliveredEmail: true },
      });
    }
  }

  return NextResponse.json(
    {
      id: message.id,
      createdAt: message.createdAt.toISOString(),
      senderRole: message.senderRole,
      emailMirrored: mirrored,
    },
    { status: 201 },
  );
}
