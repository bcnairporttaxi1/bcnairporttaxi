import 'server-only';
import { prisma } from '@/lib/db';

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Driver earnings.
 *
 * Lives here rather than beside the driver server actions on purpose. Every
 * exported async function in a 'use server' file becomes a callable endpoint,
 * and this one takes a driverId — as an action it was an unauthenticated read
 * of any driver's earnings. As a plain server module it can only be reached
 * by code that already established who is asking.
 */
/**
 * Computes what a driver may withdraw right now.
 *
 * Earned is the sum of payouts on completed rides; anything already requested
 * counts against it until an admin rejects it, so a driver cannot ask for the
 * same money twice by submitting the form again.
 */
export async function driverBalance(driverId: string) {
  const [earnedAgg, heldAgg, paidAgg] = await Promise.all([
    prisma.booking.aggregate({
      where: { driverId, status: 'COMPLETED' },
      // Tips are the driver's in full, so they are earnings like the payout —
      // summed beside it rather than into it, so the earnings page can show
      // a driver what they were tipped as its own figure.
      _sum: { driverPayout: true, tipAmount: true },
    }),
    prisma.withdrawal.aggregate({
      where: { driverId, status: { in: ['REQUESTED', 'APPROVED'] } },
      _sum: { amount: true },
    }),
    prisma.withdrawal.aggregate({
      where: { driverId, status: 'PAID' },
      _sum: { amount: true },
    }),
  ]);

  const fares = Number(earnedAgg._sum.driverPayout ?? 0);
  const tips = Number(earnedAgg._sum.tipAmount ?? 0);
  const earned = round2(fares + tips);
  const pending = Number(heldAgg._sum.amount ?? 0);
  const paid = Number(paidAgg._sum.amount ?? 0);

  return {
    earned,
    tips,
    pending,
    paid,
    available: Math.max(0, Math.round((earned - pending - paid) * 100) / 100),
  };
}
