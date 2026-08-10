import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BCNAirportTaxi — Barcelona Airport Taxi Booking',
    short_name: 'BCNAirportTaxi',
    description:
      'Book a licensed Barcelona airport taxi to or from El Prat, with an official AMB fare estimate before you book.',
    start_url: '/en',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0E0E10',
    theme_color: '#0E0E10',
    lang: 'en',
    categories: ['travel', 'navigation'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
