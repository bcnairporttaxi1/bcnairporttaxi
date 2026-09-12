import { describe, expect, it } from 'vitest';
import { adminBookingEmail, bookingConfirmationEmail, driverJobEmail } from './email';

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

describe('email footer', () => {
  it('never tells a prepaid passenger to pay the meter in the car', () => {
    const { html } = bookingConfirmationEmail({
      reference: 'BCN-1', contactName: 'Ana', pickupLabel: 'T1', dropoffLabel: 'Hotel',
      pickupAt: new Date('2026-09-20T08:30:00Z'), roadKm: 16, durationMin: 24, tariff: 'T1',
      paymentMode: 'FULL_PREPAID', meterEstimate: 38, fixedFare: 40, bookingFee: 4,
      amountOnline: 44, amountInTaxi: 0, feePaid: true,
    });
    expect(html).not.toContain('paid to your driver in the car');
    expect(html).toContain('wa.me/34632414610');
  });

  it('keeps the meter wording for a legacy fee-only receipt', () => {
    const { html } = bookingConfirmationEmail({
      reference: 'BCN-1', contactName: 'Ana', pickupLabel: 'T1', dropoffLabel: 'Hotel',
      pickupAt: new Date('2026-09-20T08:30:00Z'), roadKm: 16, durationMin: 24, tariff: 'T1',
      paymentMode: 'FEE_ONLY', meterEstimate: 38, fixedFare: 40, bookingFee: 4,
      amountOnline: 4, amountInTaxi: 38, feePaid: true,
    });
    expect(html).toContain('paid to your driver in the car');
  });

  it('signs desk and driver notices off plainly', () => {
    const { html } = driverJobEmail({
      driverName: 'J', reference: 'BCN-1', pickupAt: new Date(), pickupLabel: 'T1', dropoffLabel: 'H',
      roadKm: 1, durationMin: 1, passengers: 1, luggage: 0, contactName: 'A', contactPhone: '+34600000000',
      panelUrl: 'https://bcnairporttaxi.es/en/driver',
    });
    expect(html).not.toContain('booking fee is a separate');
  });
});

describe('driver job notice', () => {
  const job = {
    driverName: 'Jordi Puig',
    reference: 'BCN-7K2QX',
    pickupAt: new Date('2026-09-20T08:30:00Z'), // 10:30 in Barcelona
    pickupLabel: 'Aeroport T1, El Prat',
    dropoffLabel: 'Hotel Arts, Carrer de la Marina 19',
    roadKm: 16.2,
    durationMin: 24,
    passengers: 3,
    luggage: 4,
    contactName: 'Marta Vidal',
    contactPhone: '+34600111222',
    vehicleName: 'Mercedes Vito',
    notes: 'Flight VY8301 — child seat please',
    panelUrl: 'https://bcnairporttaxi.es/en/driver',
  };

  it('puts the pickup time and route in the subject so it reads from a lock screen', () => {
    expect(driverJobEmail(job).subject).toBe(
      'New ride Sun 20 Sept, 10:30 · Aeroport T1, El Prat → Hotel Arts, Carrer de la Marina 19 · BCN-7K2QX',
    );
  });

  it('gives the driver everything but the money', () => {
    const { text, html } = driverJobEmail(job);
    for (const s of ['Marta Vidal', '+34600111222', 'Aeroport T1', 'Hotel Arts', '16.2 km', '3 pax, 4 bags', 'Mercedes Vito', 'VY8301']) {
      expect(text).toContain(s);
    }
    expect(html).toContain('href="tel:+34600111222"');
    expect(html).toContain('href="https://bcnairporttaxi.es/en/driver"');
    // The passenger's email and what they paid are the desk's business.
    expect(text).not.toContain('@');
    expect(text).not.toMatch(/€\d/);
  });

  it('says plainly that there is nothing to collect', () => {
    expect(driverJobEmail(job).text).toContain('nothing to collect in the car');
  });

  it('shows the pay the desk set, and only that figure', () => {
    const { text } = driverJobEmail({ ...job, pay: 32 });
    expect(text).toContain('Your pay:  €32.00');
    expect(text).not.toContain('44');
  });

  it('shows no amount at all when the desk has not set one', () => {
    expect(driverJobEmail(job).text).not.toContain('Your pay');
  });

  it('omits the notes block when there are none', () => {
    const { text, html } = driverJobEmail({ ...job, notes: null });
    expect(text).not.toContain('Notes');
    expect(html).not.toContain('Notes from the passenger');
  });
});
