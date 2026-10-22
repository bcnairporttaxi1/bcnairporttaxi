import { describe, expect, it } from 'vitest';
import { phoneKey, samePhone } from './phone';

describe('phoneKey', () => {
  it('strips formatting', () => {
    expect(phoneKey('600 111 222')).toBe('600111222');
    expect(phoneKey('600-111-222')).toBe('600111222');
    expect(phoneKey('(600) 111 222')).toBe('600111222');
  });

  it('strips the Spanish country code however it was written', () => {
    for (const written of [
      '+34 600 111 222',
      '+34600111222',
      '0034 600 111 222',
      '34600111222',
      '600111222',
    ]) {
      expect(phoneKey(written), written).toBe('600111222');
    }
  });

  it('leaves a foreign number as its digits', () => {
    // Not ours to reinterpret: a French number must not have a leading 33
    // mistaken for part of a Spanish nine-digit line.
    expect(phoneKey('+33 6 12 34 56 78')).toBe('33612345678');
    expect(phoneKey('+44 7700 900123')).toBe('447700900123');
  });

  it('does not strip a 34 that is part of a nine-digit number', () => {
    // 349 876 543 is a real nine-digit shape. Taking the 34 off would leave
    // 9876543 and match a different line.
    expect(phoneKey('349876543')).toBe('349876543');
  });

  it('returns an empty key for a number with no digits', () => {
    expect(phoneKey('')).toBe('');
    expect(phoneKey('n/a')).toBe('');
  });
});

describe('samePhone', () => {
  it('matches the same line typed differently', () => {
    expect(samePhone('+34 600 111 222', '600111222')).toBe(true);
    expect(samePhone('0034600111222', '+34-600-111-222')).toBe(true);
  });

  it('does not match two different drivers', () => {
    expect(samePhone('600111222', '600111223')).toBe(false);
    expect(samePhone('+34600111222', '+33612345678')).toBe(false);
  });

  it('never matches on nothing', () => {
    // Two drivers both saved with an unusable number are not one driver, and
    // merging them would put one person's rides in another's panel.
    expect(samePhone('', '')).toBe(false);
    expect(samePhone('n/a', '-')).toBe(false);
  });
});
