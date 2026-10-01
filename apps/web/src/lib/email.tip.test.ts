import { describe, expect, it } from 'vitest';
import { driverTipEmail, rideCompletedEmail } from './email';

describe('driver tip notice', () => {
  const tip = {
    driverName: 'Jordi Puig',
    reference: 'BCN-7K2QX',
    passengerName: 'Marta Vidal',
    amount: 5,
    panelUrl: 'https://bcnairporttaxi.es/en/driver/earnings',
  };

  it('puts who, how much and which ride in the subject', () => {
    expect(driverTipEmail(tip).subject).toBe('Marta Vidal tipped you €5.00 — BCN-7K2QX');
  });

  it('says plainly that the tip is not shared with us', () => {
    const { text, html } = driverTipEmail(tip);
    expect(text).toContain('yours in full');
    expect(text).toContain('we take nothing from a tip');
    expect(html).toContain('href="https://bcnairporttaxi.es/en/driver/earnings"');
  });
});

describe('ride-completed email', () => {
  const base = {
    name: 'Marta Vidal',
    reference: 'BCN-7K2QX',
    reviewUrl: 'https://bcnairporttaxi.es/en/trip/BCN-7K2QX?k=abc',
    paidInCar: null,
    locale: 'en',
  };

  it('mentions the tip only when there is one to give', () => {
    expect(rideCompletedEmail({ ...base, canTip: true }).text).toContain('add a tip');
    // No driver, or already tipped: the passenger is not asked twice.
    expect(rideCompletedEmail({ ...base, canTip: false }).text).not.toContain('add a tip');
    expect(rideCompletedEmail(base).text).not.toContain('add a tip');
  });

  it('never turns the tip into a second call to action', () => {
    const { html } = rideCompletedEmail({ ...base, canTip: true });
    // One button in the email, and it is the rating; the tip rides along on
    // the same link rather than asking for money in its own right.
    expect(html.match(/border-radius:10px">/g)?.length ?? 0).toBe(1);
  });

  it('still tells a prepaid passenger that nothing was owed in the car', () => {
    expect(rideCompletedEmail({ ...base, canTip: true }).text).toContain(
      'paid in full in advance',
    );
  });
});
