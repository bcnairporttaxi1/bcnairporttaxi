/**
 * Which municipality a point sits in, and whether that municipality is in the
 * Àrea Metropolitana de Barcelona.
 *
 * This decides the single most expensive question in the pricing engine. An
 * AMB point bills on the urban meter (T-1/T-2); anything outside bills on the
 * Generalitat's interurban tariff (T-6/T-7), which is roughly twice the rate
 * because the meter counts the driver's return leg.
 *
 * WHY NOT A BOUNDING BOX
 * The previous test was a lat/lng rectangle. The AMB is 36 municipalities in
 * an irregular shape, not a rectangle, so the box over-included at the edges
 * and quoted the cheap urban meter for journeys that are legally interurban.
 * Sabadell — a city of ~215,000 — and Vallirana were both mispriced that way.
 *
 * HOW THIS WORKS
 * Nearest-centroid classification: the point is assigned to whichever listed
 * municipality centre is closest, and that municipality's `amb` flag decides
 * the tariff. It is a Voronoi approximation of the real boundaries, so it is
 * exact in the body of a municipality and approximate along the shared edge
 * between two — which is the right place to be approximate, because a taxi
 * fare a hundred metres either side of a boundary should not swing.
 *
 * The table therefore has to include the NON-AMB neighbours as well as the 36
 * members. A missing neighbour does not fail loudly; it silently hands its
 * territory to the nearest listed municipality, which is how Sabadell came to
 * be priced as Barcelona. Anything beyond `MAX_MATCH_KM` of every entry is
 * treated as outside the AMB, which is correct for the whole of Catalonia
 * beyond this ring.
 *
 * Centroids are municipal town centres to about 3 decimal places. That is far
 * finer than the ~2-4 km spacing between neighbouring centres, so added
 * precision would not change any classification.
 */

export interface Municipality {
  name: string;
  lat: number;
  lng: number;
  /** True for the 36 members of the Àrea Metropolitana de Barcelona. */
  amb: boolean;
}

/**
 * Beyond this distance from every listed centre, a point is not in the ring at
 * all and is treated as interurban. Generous enough to cover the large, thinly
 * settled municipalities on the Garraf and Collserola edges without reaching
 * into Tarragona or Girona.
 */
export const MAX_MATCH_KM = 18;

/**
 * The 36 AMB municipalities, then the non-AMB ring around them.
 *
 * Source for membership: the AMB's own list of member municipalities. When it
 * changes — it last did in 2011 — this table is the only place to edit.
 */
export const MUNICIPALITIES: readonly Municipality[] = [
  // ── The AMB: 36 members ────────────────────────────────────────────────
  { name: 'Badalona', lat: 41.45, lng: 2.2474, amb: true },
  { name: 'Badia del Vallès', lat: 41.5088, lng: 2.1136, amb: true },
  { name: 'Barberà del Vallès', lat: 41.5158, lng: 2.125, amb: true },
  { name: 'Barcelona', lat: 41.3874, lng: 2.1686, amb: true },
  { name: 'Begues', lat: 41.3327, lng: 1.9285, amb: true },
  { name: 'Castellbisbal', lat: 41.477, lng: 1.9846, amb: true },
  { name: 'Castelldefels', lat: 41.28, lng: 1.976, amb: true },
  { name: 'Cerdanyola del Vallès', lat: 41.4914, lng: 2.1408, amb: true },
  { name: 'Cervelló', lat: 41.3937, lng: 1.9583, amb: true },
  { name: 'Corbera de Llobregat', lat: 41.418, lng: 1.92, amb: true },
  { name: 'Cornellà de Llobregat', lat: 41.356, lng: 2.07, amb: true },
  { name: 'Esplugues de Llobregat', lat: 41.3773, lng: 2.0876, amb: true },
  { name: 'Gavà', lat: 41.306, lng: 2.001, amb: true },
  { name: "L'Hospitalet de Llobregat", lat: 41.3596, lng: 2.0999, amb: true },
  { name: 'Molins de Rei', lat: 41.4145, lng: 2.0165, amb: true },
  { name: 'Montcada i Reixac', lat: 41.4842, lng: 2.188, amb: true },
  { name: 'Montgat', lat: 41.468, lng: 2.28, amb: true },
  { name: 'Pallejà', lat: 41.423, lng: 1.999, amb: true },
  { name: 'La Palma de Cervelló', lat: 41.418, lng: 1.976, amb: true },
  { name: 'El Papiol', lat: 41.436, lng: 2.013, amb: true },
  { name: 'El Prat de Llobregat', lat: 41.325, lng: 2.095, amb: true },
  { name: 'Ripollet', lat: 41.497, lng: 2.157, amb: true },
  { name: 'Sant Adrià de Besòs', lat: 41.43, lng: 2.218, amb: true },
  { name: 'Sant Andreu de la Barca', lat: 41.447, lng: 1.976, amb: true },
  { name: 'Sant Boi de Llobregat', lat: 41.343, lng: 2.038, amb: true },
  { name: 'Sant Climent de Llobregat', lat: 41.341, lng: 1.998, amb: true },
  { name: 'Sant Cugat del Vallès', lat: 41.472, lng: 2.086, amb: true },
  { name: 'Sant Feliu de Llobregat', lat: 41.383, lng: 2.045, amb: true },
  { name: 'Sant Joan Despí', lat: 41.367, lng: 2.057, amb: true },
  { name: 'Sant Just Desvern', lat: 41.384, lng: 2.07, amb: true },
  { name: 'Sant Vicenç dels Horts', lat: 41.393, lng: 2.008, amb: true },
  { name: 'Santa Coloma de Cervelló', lat: 41.372, lng: 2.014, amb: true },
  { name: 'Santa Coloma de Gramenet', lat: 41.452, lng: 2.208, amb: true },
  { name: 'Tiana', lat: 41.482, lng: 2.268, amb: true },
  { name: 'Torrelles de Llobregat', lat: 41.358, lng: 1.98, amb: true },
  { name: 'Viladecans', lat: 41.315, lng: 2.019, amb: true },

  // ── The ring: NOT in the AMB. Present so their territory is not handed to
  //    the nearest AMB member and billed on the urban meter.

  // Vallès Occidental, north
  { name: 'Sabadell', lat: 41.5463, lng: 2.1086, amb: false },
  { name: 'Sant Quirze del Vallès', lat: 41.5316, lng: 2.0817, amb: false },
  { name: 'Rubí', lat: 41.493, lng: 2.033, amb: false },
  { name: 'Terrassa', lat: 41.564, lng: 2.011, amb: false },
  { name: 'Castellar del Vallès', lat: 41.618, lng: 2.089, amb: false },
  { name: 'Sentmenat', lat: 41.61, lng: 2.137, amb: false },
  { name: 'Polinyà', lat: 41.556, lng: 2.156, amb: false },
  { name: 'Santa Perpètua de Mogoda', lat: 41.538, lng: 2.182, amb: false },
  { name: 'Palau-solità i Plegamans', lat: 41.587, lng: 2.181, amb: false },
  { name: 'Caldes de Montbui', lat: 41.632, lng: 2.167, amb: false },
  { name: 'Matadepera', lat: 41.601, lng: 2.026, amb: false },
  { name: 'Ullastrell', lat: 41.514, lng: 1.958, amb: false },
  { name: 'Viladecavalls', lat: 41.559, lng: 1.955, amb: false },

  // Vallès Oriental, north-east
  { name: 'Mollet del Vallès', lat: 41.54, lng: 2.213, amb: false },
  { name: 'La Llagosta', lat: 41.513, lng: 2.193, amb: false },
  { name: 'Martorelles', lat: 41.523, lng: 2.235, amb: false },
  { name: 'Sant Fost de Campsentelles', lat: 41.503, lng: 2.242, amb: false },
  { name: 'Montmeló', lat: 41.552, lng: 2.247, amb: false },
  { name: 'Montornès del Vallès', lat: 41.544, lng: 2.267, amb: false },
  { name: 'Vilanova del Vallès', lat: 41.547, lng: 2.289, amb: false },
  { name: 'Parets del Vallès', lat: 41.575, lng: 2.232, amb: false },
  { name: 'Granollers', lat: 41.608, lng: 2.287, amb: false },
  { name: 'La Roca del Vallès', lat: 41.587, lng: 2.326, amb: false },
  { name: 'Lliçà de Vall', lat: 41.592, lng: 2.234, amb: false },

  // Maresme, coastal north-east
  { name: 'El Masnou', lat: 41.478, lng: 2.316, amb: false },
  { name: 'Alella', lat: 41.494, lng: 2.295, amb: false },
  { name: 'Teià', lat: 41.501, lng: 2.321, amb: false },
  { name: 'Premià de Dalt', lat: 41.501, lng: 2.348, amb: false },
  { name: 'Premià de Mar', lat: 41.491, lng: 2.36, amb: false },
  { name: 'Vilassar de Dalt', lat: 41.516, lng: 2.358, amb: false },
  { name: 'Vilassar de Mar', lat: 41.505, lng: 2.392, amb: false },
  { name: 'Cabrera de Mar', lat: 41.527, lng: 2.396, amb: false },
  { name: 'Argentona', lat: 41.554, lng: 2.402, amb: false },
  { name: 'Mataró', lat: 41.539, lng: 2.445, amb: false },

  // Baix Llobregat and Anoia, west
  { name: 'Vallirana', lat: 41.3878, lng: 1.93, amb: false },
  { name: 'Martorell', lat: 41.474, lng: 1.93, amb: false },
  { name: 'Abrera', lat: 41.518, lng: 1.902, amb: false },
  { name: 'Olesa de Montserrat', lat: 41.545, lng: 1.895, amb: false },
  { name: 'Esparreguera', lat: 41.538, lng: 1.871, amb: false },
  { name: 'Sant Esteve Sesrovires', lat: 41.494, lng: 1.874, amb: false },
  { name: 'Castellví de Rosanes', lat: 41.46, lng: 1.88, amb: false },
  { name: 'Gelida', lat: 41.437, lng: 1.865, amb: false },
  { name: "Sant Sadurní d'Anoia", lat: 41.426, lng: 1.786, amb: false },

  // Garraf, coastal south-west
  { name: 'Sitges', lat: 41.235, lng: 1.812, amb: false },
  { name: 'Sant Pere de Ribes', lat: 41.26, lng: 1.772, amb: false },
  { name: 'Olivella', lat: 41.317, lng: 1.818, amb: false },
  { name: 'Canyelles', lat: 41.286, lng: 1.725, amb: false },
  { name: 'Vilanova i la Geltrú', lat: 41.224, lng: 1.725, amb: false },
  { name: 'Cubelles', lat: 41.207, lng: 1.673, amb: false },
] as const;

/** Great-circle distance in km. Duplicated from pricing to avoid a cycle. */
function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * The listed municipality whose centre is nearest, or null when the point is
 * further than MAX_MATCH_KM from all of them.
 */
export function nearestMunicipality(p: {
  lat: number;
  lng: number;
}): Municipality | null {
  let best: Municipality | null = null;
  let bestKm = Infinity;

  for (const m of MUNICIPALITIES) {
    const km = distanceKm(p, m);
    if (km < bestKm) {
      bestKm = km;
      best = m;
    }
  }

  return bestKm <= MAX_MATCH_KM ? best : null;
}
