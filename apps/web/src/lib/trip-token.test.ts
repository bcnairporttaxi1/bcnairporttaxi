import { beforeAll, describe, expect, it } from 'vitest';
import { tripLink, tripToken, verifyTripToken } from './trip-token';

describe('trip token', () => {
  beforeAll(() => {
    process.env.AUTH_SECRET = 'test-secret-that-is-long-enough-for-hmac';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://bcnairporttaxi.es';
  });

  it('is stable for a reference and different for another', () => {
    expect(tripToken('BCN-7Q4K2M')).toBe(tripToken('BCN-7Q4K2M'));
    expect(tripToken('BCN-7Q4K2M')).not.toBe(tripToken('BCN-7Q4K2N'));
    expect(tripToken('BCN-7Q4K2M')).toHaveLength(32);
  });

  it('verifies its own token and nothing near it', () => {
    const k = tripToken('BCN-7Q4K2M');
    expect(verifyTripToken('BCN-7Q4K2M', k)).toBe(true);
    expect(verifyTripToken('BCN-7Q4K2N', k)).toBe(false);
    expect(verifyTripToken('BCN-7Q4K2M', k.slice(0, 31) + 'x')).toBe(false);
    expect(verifyTripToken('BCN-7Q4K2M', '')).toBe(false);
    expect(verifyTripToken('BCN-7Q4K2M', undefined)).toBe(false);
  });

  it('puts the key on the localised trip URL', () => {
    expect(tripLink('es', 'BCN-7Q4K2M')).toBe(
      `https://bcnairporttaxi.es/es/trip/BCN-7Q4K2M?k=${tripToken('BCN-7Q4K2M')}`,
    );
  });
});
