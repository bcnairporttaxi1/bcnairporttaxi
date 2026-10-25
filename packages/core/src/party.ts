/**
 * Splitting one booking across several cars.
 *
 * A party of ten cannot travel in one taxi, so the passenger picks more than
 * one — two vans, or a van and a saloon. Each car is dispatched separately and
 * needs its own driver, so each becomes its own booking, and the party has to
 * be divided between them before anyone sets off: a driver told "10
 * passengers" when six are getting into the car behind has no idea what to
 * expect, and a driver told nothing cannot load a boot.
 */

export interface VehicleChoice {
  slug: string;
  seats: number;
  bags: number;
  /** How many of this vehicle the passenger wants. */
  count: number;
}

export interface CarAllocation {
  slug: string;
  seats: number;
  bags: number;
  /** Passengers riding in this particular car. */
  passengers: number;
  /** Suitcases loaded into this particular car. */
  luggage: number;
}

/** The most cars one booking may ask for, so a typo cannot order a fleet. */
export const MAX_CARS_PER_BOOKING = 6;

/** Flattens the chosen counts into one entry per physical car. */
export function expandCars(choices: VehicleChoice[]): Omit<CarAllocation, 'passengers' | 'luggage'>[] {
  const cars: Omit<CarAllocation, 'passengers' | 'luggage'>[] = [];
  for (const c of choices) {
    for (let i = 0; i < c.count; i += 1) {
      cars.push({ slug: c.slug, seats: c.seats, bags: c.bags });
    }
  }
  return cars;
}

/** Total seats and boot space across everything chosen. */
export function partyCapacity(choices: VehicleChoice[]): { seats: number; bags: number } {
  return choices.reduce(
    (acc, c) => ({
      seats: acc.seats + c.seats * c.count,
      bags: acc.bags + c.bags * c.count,
    }),
    { seats: 0, bags: 0 },
  );
}

/**
 * Spreads passengers and luggage over the chosen cars.
 *
 * Evenly rather than filling each car to the brim: four people in two vans
 * travel two and two, which is what they expect and what the drivers should
 * be told. Filling greedily would send one driver six passengers and the
 * other none, and the second driver would reasonably assume a mistake.
 *
 * A car's own capacity still caps it, so an uneven party in mixed vehicles —
 * seven people in a six-seat van and a four-seat saloon — puts four in the
 * van and three in the saloon rather than four and three the wrong way round.
 *
 * Returns null when the party does not fit at all, which the caller should
 * have prevented; it is not this function's job to silently leave someone
 * behind.
 */
export function allocateParty(
  choices: VehicleChoice[],
  passengers: number,
  luggage: number,
): CarAllocation[] | null {
  const cars = expandCars(choices);
  if (cars.length === 0) return null;

  const capacity = partyCapacity(choices);
  if (passengers > capacity.seats || luggage > capacity.bags) return null;

  const spread = (total: number, limits: number[]): number[] => {
    const out = limits.map(() => 0);
    let left = total;
    // Round-robin one at a time: the result is as even as the capacities
    // allow, and a car that fills up simply stops being offered more.
    while (left > 0) {
      const before = left;
      for (let i = 0; i < out.length && left > 0; i += 1) {
        if (out[i] < limits[i]) {
          out[i] += 1;
          left -= 1;
        }
      }
      // Every car is full and there is still something left. The capacity
      // check above rules this out, so reaching it would be a bug rather
      // than a booking we should accept.
      if (left === before) return out;
    }
    return out;
  };

  // Largest car first, so the fullest car is the roomiest one.
  const order = cars
    .map((car, i) => ({ car, i }))
    .sort((a, b) => b.car.seats - a.car.seats || a.i - b.i);

  const pax = spread(passengers, order.map((o) => o.car.seats));
  const bags = spread(luggage, order.map((o) => o.car.bags));

  const out: CarAllocation[] = [];
  order.forEach((o, rank) => {
    out[o.i] = {
      ...o.car,
      passengers: pax[rank],
      luggage: bags[rank],
    };
  });
  return out;
}
