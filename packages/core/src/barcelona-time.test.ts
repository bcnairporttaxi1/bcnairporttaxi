import { describe, expect, it } from 'vitest';
import { fromBarcelonaInput, toBarcelonaInput } from './barcelona-time';

describe('Barcelona wall-clock <-> instant', () => {
  it('renders an instant as Barcelona time, whatever the server zone is', () => {
    // 11:22 UTC in September is 13:22 in Barcelona (CEST, UTC+2).
    expect(toBarcelonaInput(new Date('2026-09-12T11:22:00Z'))).toBe('2026-09-12T13:22');
    // 11:22 UTC in January is 12:22 (CET, UTC+1).
    expect(toBarcelonaInput(new Date('2026-01-12T11:22:00Z'))).toBe('2026-01-12T12:22');
  });

  it('reads a form value as Barcelona time, whatever the server zone is', () => {
    expect(fromBarcelonaInput('2026-09-12T13:22')?.toISOString()).toBe('2026-09-12T11:22:00.000Z');
    expect(fromBarcelonaInput('2026-01-12T12:22')?.toISOString()).toBe('2026-01-12T11:22:00.000Z');
  });

  it('round-trips exactly, outside the one ambiguous hour a year', () => {
    // Every wall-clock format is ambiguous during the fall-back hour, when
    // 02:xx happens twice. datetime-local cannot say which; nothing can. The
    // other 8,759 hours round-trip to the millisecond.
    for (const iso of ['2026-03-29T00:30:00Z', '2026-10-25T06:30:00Z', '2026-07-01T22:00:00Z', '2026-12-31T23:59:00Z']) {
      const at = new Date(iso);
      expect(fromBarcelonaInput(toBarcelonaInput(at))?.getTime()).toBe(at.getTime());
    }
  });

  it('handles the DST transitions without drifting an hour', () => {
    // Clocks go forward 29 Mar 2026 at 02:00 CET -> 03:00 CEST.
    expect(fromBarcelonaInput('2026-03-29T03:30')?.toISOString()).toBe('2026-03-29T01:30:00.000Z');
    // Clocks go back 25 Oct 2026 at 03:00 CEST -> 02:00 CET.
    expect(fromBarcelonaInput('2026-10-25T04:00')?.toISOString()).toBe('2026-10-25T03:00:00.000Z');
  });

  it('rejects anything that is not a datetime-local value', () => {
    expect(fromBarcelonaInput('')).toBeNull();
    expect(fromBarcelonaInput('tomorrow')).toBeNull();
    expect(fromBarcelonaInput('2026-09-12')).toBeNull();
    expect(fromBarcelonaInput('2026-13-40T99:99')).toBeNull();
    expect(fromBarcelonaInput('2026-04-31T10:00')).toBeNull(); // April has 30 days
    expect(fromBarcelonaInput('2026-02-29T10:00')).toBeNull(); // not a leap year
  });

  it('accepts the seconds some browsers append', () => {
    expect(fromBarcelonaInput('2026-09-12T13:22:00')?.toISOString()).toBe('2026-09-12T11:22:00.000Z');
  });
});
