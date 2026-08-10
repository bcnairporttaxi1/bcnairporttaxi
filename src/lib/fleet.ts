/**
 * Fleet definition — the source for both the seed script and the fleet page.
 *
 * Seat and bag counts are the values given in the project brief and are still
 * pending final confirmation before launch.
 */
export interface FleetVehicle {
  slug: string;
  name: string;
  /** Key into `fleet.categories` in the message catalogue. */
  categoryKey: 'eco' | 'standard' | 'minivan' | 'premium';
  seats: number;
  bags: number;
  image: string;
  imageAlt: string;
  sortOrder: number;
}

export const FLEET: FleetVehicle[] = [
  {
    slug: 'toyota-prius',
    name: 'Toyota Prius+',
    categoryKey: 'eco',
    seats: 4,
    bags: 4,
    image: '/img/fleet-toyota-prius.png',
    imageAlt:
      'Toyota Prius+ eco hybrid Barcelona airport taxi in black and yellow livery, three-quarter front view',
    sortOrder: 1,
  },
  {
    slug: 'toyota-corolla',
    name: 'Toyota Corolla',
    categoryKey: 'standard',
    seats: 4,
    bags: 3,
    image: '/img/fleet-toyota-corolla.png',
    imageAlt:
      'Toyota Corolla standard Barcelona airport taxi in black and yellow livery, three-quarter front view',
    sortOrder: 2,
  },
  {
    slug: 'mercedes-vito',
    name: 'Mercedes Vito',
    categoryKey: 'minivan',
    seats: 6,
    bags: 6,
    image: '/img/fleet-mercedes-vito.png',
    imageAlt:
      'Mercedes-Benz Vito minivan Barcelona airport taxi for six passengers, three-quarter front view',
    sortOrder: 3,
  },
  {
    slug: 'mercedes-vclass',
    name: 'Mercedes V-Class',
    categoryKey: 'premium',
    seats: 7,
    bags: 7,
    image: '/img/fleet-mercedes-vclass.png',
    imageAlt:
      'Mercedes-Benz V-Class premium van Barcelona airport taxi for seven passengers, three-quarter front view',
    sortOrder: 4,
  },
];
