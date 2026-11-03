import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Facts the owner confirmed on 2026-11-03, pinned in every language.
 *
 *  - No child seats are provided, so nothing may invite a customer to request one.
 *  - The licensing claim is "licensed AMB taxis", fully insured, subject to the required
 *    AMB inspections. It must not say a car has a "working meter" (not confirmed, and the
 *    product is a fixed price) or that inspections follow a published "schedule".
 *  - Tolls apply; the pricing page lists them among the additions.
 */
const LOCALES = ['en', 'es', 'ca', 'fr', 'de', 'it', 'nl', 'pt', 'ru', 'zh'];
const SEAT = /child ?seat|silla|cadiret|siège|kindersitz|seggiolin|kinderzit|cadeirinh|кресл|кресел|座椅/i;
const METER_CLAIM = /working meter|taxímetro|taxímetre|compteur|geeichtem|tassametro|taxameter|счётчик|计价器/i;

const cat = (l: string) => JSON.parse(readFileSync(join(__dirname, `${l}.json`), 'utf8'));

describe.each(LOCALES)('owner-confirmed facts [%s]', (l) => {
  const d = cat(l);

  it('does not invite a child-seat request in the booking notes hint', () => {
    expect(d.checkout.notesHelp).not.toMatch(SEAT);
  });

  it('opens the fleet note by saying child seats are not provided', () => {
    expect(d.fleet.commonBody2.split(/[.。]/)[0]).toMatch(SEAT);
  });

  it('states licensed AMB taxis without a meter or schedule claim', () => {
    expect(d.home.why.licensed.body).toMatch(/AMB/);
    expect(d.home.why.licensed.body).not.toMatch(METER_CLAIM);
  });

  it('lists tolls among the additions on the pricing page', () => {
    expect(d.pricing.adjTolls).toBeTruthy();
    expect(d.pricing.adjTollsValue).toBeTruthy();
  });
});
