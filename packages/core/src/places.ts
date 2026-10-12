/**
 * The places people actually book.
 *
 * Almost every journey this company runs touches one of about thirty points:
 * the two airport terminals, the cruise quays, Sants, and the handful of
 * resorts and landmarks that fill the destination pages. Typing those into a
 * geocoder is slow, and it is also risky — "Terminal 1" against Nominatim can
 * return a terminal in another country, and a drop-off pinned two kilometres
 * from the quay prices as a city address instead of the fixed port fare.
 *
 * So they are curated here with coordinates checked against the pricing
 * engine's own landmark radii (see `places.test.ts`, which fails if a terminal
 * drifts outside the airport zone). The picker offers these before it asks the
 * geocoder anything, which is why a booking can be made in two taps.
 *
 * Coordinates are verified against Nominatim by
 * `apps/web/scripts/verify-places.ts` — a manual check, not part of CI, since
 * it depends on a third party being up.
 */

export type PlaceGroup = 'airport' | 'port' | 'station' | 'city' | 'destination';

export interface CuratedPlace {
  /** Stable key. Appears in no URL, so it is free to be readable. */
  id: string;
  /**
   * What the passenger sees and what is stored on the booking. Proper nouns,
   * so it is deliberately not translated — "Terminal 1" and "Montserrat" read
   * the same in every language the site serves, and a driver handed a label
   * in a language they do not speak is worse than one they can match to a sign.
   */
  label: string;
  lat: number;
  lng: number;
  group: PlaceGroup;
  /**
   * Extra search terms, lower case. The label is always searched; these cover
   * what someone types instead of it — the local-language name ("aeropuerto",
   * "aeroport"), the code ("BCN", "T1"), and the common misspelling.
   */
  keywords: string[];
  /** Shown in the picker before anything is typed. The shortlist, not the list. */
  popular?: boolean;
}

/**
 * Both terminals sit inside `LANDMARKS.elPratAirport`, which is what makes a
 * booking to either price as an airport job. T2's coordinate is the kerbside
 * taxi rank shared by T2A/B/C rather than any one of the three buildings.
 */
const AIRPORT: CuratedPlace[] = [
  {
    id: 'bcn-t1',
    label: 'Barcelona Airport (BCN) — Terminal 1',
    lat: 41.289,
    lng: 2.0747,
    group: 'airport',
    keywords: ['t1', 'terminal 1', 'bcn', 'el prat', 'aeropuerto', 'aeroport', 'airport', 'flughafen', 'aeroporto', 'aéroport', 'vliegveld', 'аэропорт', '机场', 'josep tarradellas'],
    popular: true,
  },
  {
    id: 'bcn-t2',
    label: 'Barcelona Airport (BCN) — Terminal 2',
    lat: 41.3031,
    lng: 2.0955,
    group: 'airport',
    keywords: ['t2', 'terminal 2', 't2a', 't2b', 't2c', 'bcn', 'el prat', 'aeropuerto', 'aeroport', 'airport', 'flughafen', 'aeroporto', 'aéroport', 'vliegveld', 'аэропорт', '机场'],
    popular: true,
  },
  {
    id: 'girona-airport',
    label: 'Girona–Costa Brava Airport (GRO)',
    lat: 41.9045,
    lng: 2.7624,
    group: 'airport',
    keywords: ['gro', 'girona airport', 'gerona', 'costa brava airport'],
  },
  {
    id: 'reus-airport',
    label: 'Reus Airport (REU)',
    lat: 41.1469,
    lng: 1.1577,
    group: 'airport',
    keywords: ['reu', 'reus airport', 'tarragona airport'],
  },
];

/**
 * The cruise quays. Terminals A to E are on Moll Adossat and price on the
 * fixed airport–port fare; the World Trade Center berths are a kilometre and a
 * half up the harbour on Moll de Barcelona and are not Moll Adossat, so they
 * price as a city address. The labels name the quay for exactly that reason.
 */
const PORT: CuratedPlace[] = [
  {
    id: 'port-terminal-a',
    label: 'Barcelona Cruise Port — Terminal A (Moll Adossat)',
    lat: 41.3623,
    lng: 2.1815,
    group: 'port',
    keywords: ['terminal a', 'puerto', 'port', 'cruise', 'crucero', 'creuer', 'moll adossat', 'adosado', 'kreuzfahrt', 'croisière', 'порт', '港口', '邮轮'],
    popular: true,
  },
  {
    id: 'port-terminal-b',
    label: 'Barcelona Cruise Port — Terminal B (Moll Adossat)',
    lat: 41.36,
    lng: 2.18,
    group: 'port',
    keywords: ['terminal b', 'puerto', 'port', 'cruise', 'crucero', 'creuer', 'moll adossat'],
  },
  {
    id: 'port-terminal-c',
    label: 'Barcelona Cruise Port — Terminal C (Moll Adossat)',
    lat: 41.3568,
    lng: 2.1779,
    group: 'port',
    keywords: ['terminal c', 'puerto', 'port', 'cruise', 'crucero', 'creuer', 'moll adossat'],
  },
  {
    id: 'port-terminal-d',
    label: 'Barcelona Cruise Port — Terminal D (Moll Adossat)',
    lat: 41.3542,
    lng: 2.1762,
    group: 'port',
    keywords: ['terminal d', 'palacruceros', 'puerto', 'port', 'cruise', 'crucero', 'creuer', 'moll adossat'],
    popular: true,
  },
  {
    id: 'port-terminal-e',
    label: 'Barcelona Cruise Port — Terminal E (Moll Adossat)',
    lat: 41.3508,
    lng: 2.1741,
    group: 'port',
    keywords: ['terminal e', 'helix', 'puerto', 'port', 'cruise', 'crucero', 'creuer', 'moll adossat'],
  },
  {
    id: 'port-wtc',
    label: 'Barcelona Port — World Trade Center (Moll de Barcelona)',
    lat: 41.3713,
    lng: 2.1822,
    group: 'port',
    keywords: ['wtc', 'world trade center', 'moll de barcelona', 'ferry', 'balearia', 'grimaldi', 'trasmediterranea', 'drassanes'],
  },
];

const STATIONS: CuratedPlace[] = [
  {
    id: 'sants-station',
    label: 'Barcelona Sants railway station',
    lat: 41.3792,
    lng: 2.14,
    group: 'station',
    keywords: ['sants', 'sants estacio', 'estacion de sants', 'train', 'tren', 'renfe', 'ave', 'railway', 'bahnhof', 'gare', 'вокзал', '火车站'],
    popular: true,
  },
  {
    id: 'estacio-nord',
    label: 'Barcelona Estació del Nord bus station',
    lat: 41.3945,
    lng: 2.1828,
    group: 'station',
    keywords: ['nord', 'estacio del nord', 'estacion del norte', 'bus station', 'autobus', 'coach'],
  },
  {
    id: 'franca-station',
    label: 'Barcelona Estació de França',
    lat: 41.385,
    lng: 2.185,
    group: 'station',
    keywords: ['franca', 'francia', 'estacio de franca', 'estacion de francia'],
  },
];

const CITY: CuratedPlace[] = [
  {
    id: 'placa-catalunya',
    label: 'Plaça de Catalunya, Barcelona',
    lat: 41.387,
    lng: 2.17,
    group: 'city',
    keywords: ['plaza cataluna', 'placa catalunya', 'catalunya square', 'centre', 'centro', 'city centre', 'downtown', 'zentrum', '市中心'],
    popular: true,
  },
  {
    id: 'sagrada-familia',
    label: 'Sagrada Família, Barcelona',
    lat: 41.4036,
    lng: 2.1744,
    group: 'city',
    keywords: ['sagrada familia', 'gaudi', 'basilica', 'саграда', '圣家堂'],
    popular: true,
  },
  {
    id: 'las-ramblas',
    label: 'La Rambla, Barcelona',
    lat: 41.3797,
    lng: 2.1746,
    group: 'city',
    keywords: ['ramblas', 'las ramblas', 'la rambla', 'gothic quarter', 'gotico', 'gotic'],
    popular: true,
  },
  {
    id: 'fira-gran-via',
    label: 'Fira Barcelona Gran Via, L’Hospitalet',
    lat: 41.3542,
    lng: 2.1287,
    group: 'city',
    keywords: ['fira gran via', 'gran via venue', 'mwc', 'mobile world congress', 'congress', 'congreso', 'exhibition', 'messe', 'hospitalet'],
    popular: true,
  },
  {
    id: 'fira-montjuic',
    label: 'Fira Barcelona Montjuïc',
    lat: 41.3723,
    lng: 2.1497,
    group: 'city',
    keywords: ['fira montjuic', 'placa espanya venue', 'exhibition', 'congress'],
  },
  {
    id: 'camp-nou',
    label: 'Spotify Camp Nou, Barcelona',
    lat: 41.3809,
    lng: 2.1228,
    group: 'city',
    keywords: ['camp nou', 'barca', 'fc barcelona', 'stadium', 'estadio', 'estadi', '诺坎普'],
  },
  {
    id: 'park-guell',
    label: 'Park Güell, Barcelona',
    lat: 41.4145,
    lng: 2.1527,
    group: 'city',
    keywords: ['park guell', 'parc guell', 'gaudi'],
  },
  {
    id: 'port-olimpic',
    label: 'Port Olímpic, Barcelona',
    lat: 41.387,
    lng: 2.196,
    group: 'city',
    keywords: ['port olimpic', 'puerto olimpico', 'olympic port', 'vila olimpica'],
  },
  {
    id: 'barceloneta',
    label: 'La Barceloneta beach, Barcelona',
    lat: 41.3797,
    lng: 2.19,
    group: 'city',
    keywords: ['barceloneta', 'beach', 'playa', 'platja', 'strand'],
  },
];

/**
 * The destinations with their own pages. Everything here is outside the AMB,
 * so it prices on the Generalitat's interurban tariff by distance — which is
 * exactly what the passenger is told: fixed prices for the airport and the
 * port, metered kilometres for a run out of town.
 */
const DESTINATIONS: CuratedPlace[] = [
  { id: 'sitges', label: 'Sitges', lat: 41.2371, lng: 1.8055, group: 'destination', keywords: ['sitges'], popular: true },
  { id: 'montserrat', label: 'Montserrat Monastery', lat: 41.5934, lng: 1.8376, group: 'destination', keywords: ['montserrat', 'monastery', 'monasterio', 'monestir'], popular: true },
  { id: 'portaventura', label: 'PortAventura World, Salou', lat: 41.0875, lng: 1.1566, group: 'destination', keywords: ['portaventura', 'port aventura', 'ferrari land', 'theme park', 'parque'], popular: true },
  { id: 'salou', label: 'Salou', lat: 41.0763, lng: 1.1419, group: 'destination', keywords: ['salou'] },
  { id: 'cambrils', label: 'Cambrils', lat: 41.0679, lng: 1.0658, group: 'destination', keywords: ['cambrils'] },
  { id: 'tarragona', label: 'Tarragona', lat: 41.1172, lng: 1.2546, group: 'destination', keywords: ['tarragona'] },
  { id: 'reus', label: 'Reus', lat: 41.1549, lng: 1.1065, group: 'destination', keywords: ['reus'] },
  { id: 'girona', label: 'Girona', lat: 41.9794, lng: 2.8214, group: 'destination', keywords: ['girona', 'gerona'] },
  { id: 'lloret-de-mar', label: 'Lloret de Mar', lat: 41.7005, lng: 2.845, group: 'destination', keywords: ['lloret', 'lloret de mar'], popular: true },
  { id: 'tossa-de-mar', label: 'Tossa de Mar', lat: 41.7206, lng: 2.9318, group: 'destination', keywords: ['tossa', 'tossa de mar'] },
  { id: 'blanes', label: 'Blanes', lat: 41.6748, lng: 2.7906, group: 'destination', keywords: ['blanes'] },
  { id: 'calella-de-palafrugell', label: 'Calella de Palafrugell', lat: 41.8897, lng: 3.1806, group: 'destination', keywords: ['calella de palafrugell', 'palafrugell'] },
  { id: 'begur', label: 'Begur', lat: 41.9541, lng: 3.2074, group: 'destination', keywords: ['begur'] },
  { id: 'empuriabrava', label: 'Empuriabrava', lat: 42.246, lng: 3.1189, group: 'destination', keywords: ['empuriabrava'] },
  { id: 'roses', label: 'Roses', lat: 42.2619, lng: 3.1764, group: 'destination', keywords: ['roses', 'rosas'] },
  { id: 'cadaques', label: 'Cadaqués', lat: 42.2888, lng: 3.2779, group: 'destination', keywords: ['cadaques'] },
  { id: 'la-roca-village', label: 'La Roca Village', lat: 41.6108, lng: 2.3439, group: 'destination', keywords: ['la roca village', 'outlet', 'shopping'] },
  { id: 'andorra', label: 'Andorra la Vella', lat: 42.5063, lng: 1.5218, group: 'destination', keywords: ['andorra', 'andorra la vella'] },
  { id: 'la-molina', label: 'La Molina ski resort', lat: 42.3445, lng: 1.9558, group: 'destination', keywords: ['la molina', 'ski', 'esqui'] },
  { id: 'vall-de-nuria', label: 'Vall de Núria', lat: 42.3977, lng: 2.1545, group: 'destination', keywords: ['nuria', 'vall de nuria'] },
  { id: 'baqueira-beret', label: 'Baqueira Beret ski resort', lat: 42.6993, lng: 0.9316, group: 'destination', keywords: ['baqueira', 'beret', 'ski', 'esqui'] },
  { id: 'peniscola', label: 'Peníscola', lat: 40.3581, lng: 0.4057, group: 'destination', keywords: ['peniscola'] },
  { id: 'valencia', label: 'Valencia', lat: 39.4699, lng: -0.3763, group: 'destination', keywords: ['valencia'] },
  { id: 'zaragoza', label: 'Zaragoza', lat: 41.6521, lng: -0.8809, group: 'destination', keywords: ['zaragoza', 'saragossa'] },
  { id: 'madrid', label: 'Madrid', lat: 40.4168, lng: -3.7038, group: 'destination', keywords: ['madrid'] },
  { id: 'alicante', label: 'Alicante', lat: 38.3452, lng: -0.481, group: 'destination', keywords: ['alicante', 'alacant'] },
  { id: 'marbella', label: 'Marbella', lat: 36.5101, lng: -4.8824, group: 'destination', keywords: ['marbella'] },
  { id: 'malaga', label: 'Málaga', lat: 36.7213, lng: -4.4214, group: 'destination', keywords: ['malaga'] },
];

export const CURATED_PLACES: CuratedPlace[] = [
  ...AIRPORT,
  ...PORT,
  ...STATIONS,
  ...CITY,
  ...DESTINATIONS,
];

/** Group order and headings for the picker. Airport first: it is most bookings. */
export const PLACE_GROUP_ORDER: PlaceGroup[] = [
  'airport',
  'port',
  'station',
  'city',
  'destination',
];

/**
 * Strips accents and case so "Peníscola" is found by "peniscola" and
 * "Güell" by "guell". Passengers type on phone keyboards in a hurry.
 */
export function foldForSearch(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .toLowerCase()
    .trim();
}

/**
 * The curated places matching what has been typed, best first.
 *
 * Ranking is deliberately crude because the list is small and the user is
 * watching: a label that starts with the query beats one that merely contains
 * it, a popular place beats an obscure one, and group order breaks the rest.
 * An empty query returns the shortlist, which is what the picker shows the
 * moment the field is focused.
 */
export function searchPlaces(query: string, limit = 6): CuratedPlace[] {
  const q = foldForSearch(query);

  if (q.length === 0) {
    return CURATED_PLACES.filter((p) => p.popular).slice(0, limit);
  }

  const scored: { place: CuratedPlace; score: number }[] = [];

  for (const place of CURATED_PLACES) {
    const label = foldForSearch(place.label);
    let score = -1;

    if (label.startsWith(q)) score = 100;
    else if (place.keywords.some((k) => foldForSearch(k).startsWith(q))) score = 80;
    else if (label.includes(q)) score = 60;
    else if (place.keywords.some((k) => foldForSearch(k).includes(q))) score = 40;

    if (score < 0) continue;

    if (place.popular) score += 6;
    score -= PLACE_GROUP_ORDER.indexOf(place.group);
    scored.push({ place, score });
  }

  scored.sort((a, b) => b.score - a.score || a.place.label.localeCompare(b.place.label));
  return scored.slice(0, limit).map((s) => s.place);
}
