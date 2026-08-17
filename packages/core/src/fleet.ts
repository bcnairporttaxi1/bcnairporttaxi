/**
 * Fleet definition — the source for the fleet page, the checkout picker and
 * the seed script.
 *
 * Photographs are the real black-and-yellow AMB-liveried vehicles supplied by
 * the operator, imported via `scripts/import-fleet-photos.ts`.
 *
 * `imageAlt` is written for both screen readers and image search: it names the
 * model, the livery, the capacity and the service. Keep that pattern for any
 * vehicle added later.
 *
 * Seat and bag counts for the Corolla Touring Sports and SEAT Toledo are
 * sensible defaults and still need confirming with the operator.
 */
export interface FleetVehicle {
  slug: string;
  name: string;
  /** Key into `fleet.categories` in the message catalogue. */
  categoryKey: 'eco' | 'standard' | 'estate' | 'minivan' | 'premium';
  seats: number;
  bags: number;
  /** Short note on luggage, shown under the capacity line. */
  luggageNote: string;
  image: string;
  imageAlt: string;
  sortOrder: number;
}

export const FLEET: FleetVehicle[] = [
  {
    slug: 'toyota-corolla',
    name: 'Toyota Corolla',
    categoryKey: 'standard',
    seats: 4,
    bags: 3,
    luggageNote: '3 large suitcases, or 2 large plus cabin bags',
    image: '/img/fleet-toyota-corolla.png',
    imageAlt:
      'Toyota Corolla sedan Barcelona airport taxi in official black and yellow AMB livery, seats 4 passengers with 3 suitcases',
    sortOrder: 1,
  },
  {
    slug: 'seat-toledo',
    name: 'SEAT Toledo',
    categoryKey: 'standard',
    seats: 4,
    bags: 3,
    luggageNote: '3 large suitcases, or 2 large plus cabin bags',
    image: '/img/fleet-seat-toledo.png',
    imageAlt:
      'SEAT Toledo Barcelona airport taxi in official black and yellow AMB livery, seats 4 passengers with 3 suitcases',
    sortOrder: 2,
  },
  {
    slug: 'toyota-corolla-estate',
    name: 'Toyota Corolla Touring Sports',
    categoryKey: 'estate',
    seats: 4,
    bags: 4,
    luggageNote: '4 large suitcases — the deepest boot of our saloons',
    image: '/img/fleet-toyota-corolla-estate.png',
    imageAlt:
      'Toyota Corolla Touring Sports estate Barcelona airport taxi in black and yellow AMB livery, seats 4 passengers with 4 suitcases',
    sortOrder: 3,
  },
  {
    slug: 'toyota-prius',
    name: 'Toyota Prius+',
    categoryKey: 'eco',
    seats: 4,
    bags: 4,
    luggageNote: '4 large suitcases, hybrid and low emission',
    image: '/img/fleet-toyota-prius.png',
    imageAlt:
      'Toyota Prius+ eco hybrid Barcelona airport taxi in black and yellow AMB livery, seats 4 passengers with 4 suitcases',
    sortOrder: 4,
  },
  {
    slug: 'mercedes-vito',
    name: 'Mercedes Vito',
    categoryKey: 'minivan',
    seats: 6,
    bags: 6,
    luggageNote: '6 large suitcases, ideal for families and small groups',
    image: '/img/fleet-mercedes-vito.png',
    imageAlt:
      'Mercedes-Benz Vito minivan Barcelona airport taxi in black and yellow AMB livery, seats 6 passengers with 6 suitcases',
    sortOrder: 5,
  },
  {
    slug: 'mercedes-vclass',
    name: 'Mercedes V-Class',
    categoryKey: 'premium',
    seats: 7,
    bags: 7,
    luggageNote: '7 large suitcases, the most space and comfort we offer',
    image: '/img/fleet-mercedes-vclass.png',
    imageAlt:
      'Mercedes-Benz V-Class premium van Barcelona airport taxi in black and yellow AMB livery, seats 7 passengers with 7 suitcases',
    sortOrder: 6,
  },
];
