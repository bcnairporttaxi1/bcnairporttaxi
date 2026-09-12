import { describe, expect, it } from 'vitest';
import { adminBookingEmail, bookingConfirmationEmail } from './email';

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

describe('admin booking notice', () => {
  const ride = {
    reference: 'BCN-7K2QX',
    contactName: 'Marta Vidal',
    contactEmail: 'marta@example.com',
    contactPhone: '+34600111222',
    pickupLabel: 'Aeroport T1, El Prat',
    dropoffLabel: 'Hotel Arts, Carrer de la Marina 19',
    pickupAt: new Date('2026-09-20T08:30:00Z'), // 10:30 in Barcelona
    roadKm: 16.2,
    durationMin: 24,
    passengers: 3,
    luggage: 4,
    vehicleName: 'Mercedes Vito',
    notes: 'Flight VY8301 — child seat please',
    amountOnline: 44.04,
    locale: 'es',
    rideUrl: 'https://bcnairporttaxi.es/en/admin/rides/BCN-7K2QX',
  };

  it('leads the subject with the state, then the pickup time and route', () => {
    const paid = adminBookingEmail({ ...ride, paid: true });
    expect(paid.subject).toMatch(/^PAID BCN-7K2QX · Sun 20 Sept, 10:30 ·/);
    const pending = adminBookingEmail({ ...ride, paid: false });
    expect(pending.subject).toMatch(/^New booking BCN-7K2QX · .* · awaiting payment$/);
  });

  it('tells the desk what to do first', () => {
    expect(adminBookingEmail({ ...ride, paid: true }).text).toMatch(/^PAID — assign a driver/);
    expect(adminBookingEmail({ ...ride, paid: false }).text).toMatch(/^New booking — payment not yet confirmed/);
  });

  it('carries everything needed to run the ride without opening the panel', () => {
    const { text, html } = adminBookingEmail({ ...ride, paid: true });
    for (const s of ['Marta Vidal', '+34600111222', 'marta@example.com', 'Aeroport T1', 'Hotel Arts', '16.2 km', '3 pax, 4 bags', 'Mercedes Vito', 'VY8301', '€44.04']) {
      expect(text).toContain(s);
    }
    expect(html).toContain('href="https://bcnairporttaxi.es/en/admin/rides/BCN-7K2QX"');
    expect(html).toContain('href="tel:+34600111222"');
  });

  it('is written in English whatever language the passenger booked in', () => {
    // locale: 'es' above. The desk reads English; the receipt to the
    // passenger is the one that follows their locale.
    const { text } = adminBookingEmail({ ...ride, paid: true });
    expect(text).toContain('Passenger:');
    expect(text).not.toContain('Pasajero');
  });

  it('omits the notes block when there are none', () => {
    const { text, html } = adminBookingEmail({ ...ride, paid: true, notes: null });
    expect(text).not.toContain('Notes');
    expect(html).not.toContain('Notes for the driver');
  });
});
