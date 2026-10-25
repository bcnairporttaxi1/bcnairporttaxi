import { describe, expect, it } from 'vitest';
import {
  allocateParty,
  expandCars,
  partyCapacity,
  type VehicleChoice,
} from './party';

const sedan = (count = 1): VehicleChoice => ({ slug: 'sedan', seats: 4, bags: 3, count });
const van6 = (count = 1): VehicleChoice => ({ slug: 'vito', seats: 6, bags: 6, count });
const van7 = (count = 1): VehicleChoice => ({ slug: 'v-class', seats: 7, bags: 7, count });

describe('partyCapacity', () => {
  it('adds up seats and bags across every car chosen', () => {
    expect(partyCapacity([van6(2)])).toEqual({ seats: 12, bags: 12 });
    expect(partyCapacity([van6(1), sedan(1)])).toEqual({ seats: 10, bags: 9 });
    expect(partyCapacity([])).toEqual({ seats: 0, bags: 0 });
  });
});

describe('expandCars', () => {
  it('gives one entry per physical car', () => {
    expect(expandCars([van6(2), sedan(1)]).map((c) => c.slug)).toEqual([
      'vito',
      'vito',
      'sedan',
    ]);
  });

  it('drops a vehicle nobody asked for', () => {
    expect(expandCars([van6(0), sedan(2)]).map((c) => c.slug)).toEqual(['sedan', 'sedan']);
  });
});

describe('allocateParty', () => {
  it('splits evenly between identical cars', () => {
    // Four people in two vans travel two and two. Filling greedily would put
    // six in one and none in the other, and the second driver would
    // reasonably assume the job was a mistake.
    const out = allocateParty([van6(2)], 4, 4)!;
    expect(out.map((c) => c.passengers)).toEqual([2, 2]);
    expect(out.map((c) => c.luggage)).toEqual([2, 2]);
  });

  it('puts the odd passenger somewhere, never nowhere', () => {
    const out = allocateParty([van6(2)], 7, 5)!;
    expect(out.reduce((n, c) => n + c.passengers, 0)).toBe(7);
    expect(out.reduce((n, c) => n + c.luggage, 0)).toBe(5);
    expect(out.map((c) => c.passengers).sort()).toEqual([3, 4]);
  });

  it('never exceeds a single car’s capacity', () => {
    // Nine in a six-seat van and a four-seat saloon: both are within their
    // own limits, which a naive half-and-half split would not guarantee.
    const out = allocateParty([van6(1), sedan(1)], 9, 8)!;
    for (const car of out) {
      expect(car.passengers).toBeLessThanOrEqual(car.seats);
      expect(car.luggage).toBeLessThanOrEqual(car.bags);
    }
    expect(out.reduce((n, c) => n + c.passengers, 0)).toBe(9);
  });

  it('fills the roomiest car hardest when the party is uneven', () => {
    const out = allocateParty([van6(1), sedan(1)], 7, 0)!;
    const vito = out.find((c) => c.slug === 'vito')!;
    const car = out.find((c) => c.slug === 'sedan')!;
    expect(vito.passengers).toBeGreaterThanOrEqual(car.passengers);
    expect(vito.passengers + car.passengers).toBe(7);
  });

  it('keeps the order the vehicles were chosen in', () => {
    // The allocation is zipped back onto the booking rows in order, so a
    // reordered result would put the saloon's passengers in the van.
    const out = allocateParty([sedan(1), van7(1)], 5, 4)!;
    expect(out.map((c) => c.slug)).toEqual(['sedan', 'v-class']);
  });

  it('refuses a party that does not fit', () => {
    expect(allocateParty([sedan(1)], 5, 0)).toBeNull();
    expect(allocateParty([sedan(1)], 4, 9)).toBeNull();
    expect(allocateParty([van6(2)], 13, 0)).toBeNull();
  });

  it('refuses when no vehicle was chosen', () => {
    expect(allocateParty([], 2, 2)).toBeNull();
    expect(allocateParty([van6(0)], 2, 2)).toBeNull();
  });

  it('handles a single car exactly as before', () => {
    // The one-car booking is the overwhelming majority and must be untouched.
    const out = allocateParty([van6(1)], 5, 4)!;
    expect(out).toEqual([
      { slug: 'vito', seats: 6, bags: 6, passengers: 5, luggage: 4 },
    ]);
  });

  it('allows nobody in a car the party does not need', () => {
    // Two vans booked for the boot space, two passengers. The second van
    // still goes, and its driver is told it is carrying one person.
    const out = allocateParty([van6(2)], 2, 10)!;
    expect(out.map((c) => c.passengers)).toEqual([1, 1]);
    expect(out.reduce((n, c) => n + c.luggage, 0)).toBe(10);
  });
});
