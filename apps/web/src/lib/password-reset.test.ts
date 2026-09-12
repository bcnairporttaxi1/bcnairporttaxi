import { describe, expect, it, vi } from 'vitest';

// The module guards itself against being bundled for the browser, which is
// exactly right in the app and meaningless in a test runner.
vi.mock('server-only', () => ({}));

const { generateResetToken, hashResetToken, resetExpiry, RESET_TTL_MINUTES } =
  await import('./password-reset');

describe('password reset tokens', () => {
  it('never stores what it emails', () => {
    const { token, hash } = generateResetToken();
    // The hash is what goes in the database; the token is what goes in the
    // link. A dump of one must not yield the other.
    expect(hash).not.toBe(token);
    expect(hash).not.toContain(token);
    expect(hash).toMatch(/^[0-9a-f]{64}$/); // sha-256 hex
  });

  it('hashes deterministically, so a submitted token can be looked up', () => {
    const { token, hash } = generateResetToken();
    expect(hashResetToken(token)).toBe(hash);
  });

  it('produces a token that survives a URL query string untouched', () => {
    // base64url: no '+', '/' or '=' — nothing for a mail client to mangle or
    // a browser to percent-encode.
    for (let i = 0; i < 50; i++) {
      const { token } = generateResetToken();
      expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
      expect(encodeURIComponent(token)).toBe(token);
    }
  });

  it('carries enough entropy that guessing is not a strategy', () => {
    const { token } = generateResetToken();
    // 32 bytes -> 43 base64url characters.
    expect(token.length).toBe(43);
    const seen = new Set(Array.from({ length: 200 }, () => generateResetToken().token));
    expect(seen.size).toBe(200);
  });

  it('expires one hour out, from the clock it is given', () => {
    const now = new Date('2026-09-12T10:00:00Z');
    expect(resetExpiry(now).toISOString()).toBe('2026-09-12T11:00:00.000Z');
    expect(RESET_TTL_MINUTES).toBe(60);
  });
});
