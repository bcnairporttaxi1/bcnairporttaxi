import { describe, expect, it } from 'vitest';
import { bookingConfirmationEmail } from './email';

const base = {
  reference: 'BCN-TEST01',
  contactName: 'Ana',
  pickupLabel: 'Barcelona Airport T1',
  dropoffLabel: 'Passeig de Gracia 1',
  pickupAt: new Date('2026-08-25T10:00:00Z'),
  roadKm: 13.45,
  durationMin: 24,
  tariff: 'T1',
  paymentMode: 'FEE_ONLY' as const,
  meterEstimate: 25.56,
  fixedFare: 26.9,
  bookingFee: 5.38,
  amountOnline: 5.38,
  amountInTaxi: 25.56,
  locale: 'en',
};

describe('booking confirmation email', () => {
  const unpaid = bookingConfirmationEmail({ ...base, feePaid: false });
  const paid = bookingConfirmationEmail({ ...base, feePaid: true });

  // A booking sends two of these. They previously shared a subject, so the
  // second looked like a duplicate of the first while saying the opposite.
  it('gives the two sends different subjects', () => {
    expect(unpaid.subject).not.toBe(paid.subject);
  });

  it('does not claim a booking is confirmed before it is paid', () => {
    expect(unpaid.subject).toMatch(/outstanding/i);
    expect(unpaid.text).toMatch(/confirmed as soon as payment completes/i);
    expect(unpaid.text).not.toMatch(/your Barcelona taxi is confirmed/i);
  });

  it('says payment is confirmed once it is', () => {
    expect(paid.subject).toMatch(/payment confirmed/i);
    expect(paid.text).toMatch(/your Barcelona taxi is confirmed/i);
  });

  it('carries the reference in both subjects, for threading and search', () => {
    expect(unpaid.subject).toContain(base.reference);
    expect(paid.subject).toContain(base.reference);
  });

  it('never itemises the service charge to the passenger', () => {
    // The charge is inside the price now. A 25% weekend booking must read as
    // one number: quoting the percentage, or the fare it was derived from,
    // invites the passenger to add the two together and find a third total.
    const weekend = bookingConfirmationEmail({
      ...base,
      paymentMode: 'FULL_PREPAID',
      fixedFare: 43.6,
      bookingFee: 10.9,
      amountOnline: 54.5,
      amountInTaxi: 0,
      feePaid: true,
    });
    expect(weekend.text).toContain('54.50');
    expect(weekend.text).not.toContain('25%');
    expect(weekend.text).not.toContain('20%');
    expect(weekend.text).not.toContain('43.60');
    expect(weekend.text).not.toContain('10.90');
    expect(weekend.html).not.toContain('43.60');
    expect(weekend.html).not.toContain('10.90');
  });

  it('tells a prepaid passenger nothing is owed in the taxi', () => {
    const prepaid = bookingConfirmationEmail({
      ...base,
      paymentMode: 'FULL_PREPAID',
      amountInTaxi: 0,
      feePaid: true,
    });
    expect(prepaid.text).toMatch(/Nothing/);
  });
});
