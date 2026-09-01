'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap, Marker, Polyline } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface RouteMapProps {
  pickup: { lat: number; lng: number } | null;
  dropoff: { lat: number; lng: number } | null;
  geometry: [number, number][] | null;
  label: string;
}

const BARCELONA: [number, number] = [41.3874, 2.1686];

/**
 * Leaflet map with the OSRM route drawn on it.
 *
 * Leaflet touches `window` on import, so the library is loaded lazily inside an
 * effect rather than imported at module scope. This component is also only ever
 * rendered through a `dynamic(..., { ssr: false })` boundary.
 */
export default function RouteMap({ pickup, dropoff, geometry, label }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layersRef = useRef<{ line?: Polyline; a?: Marker; b?: Marker }>({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = await import('leaflet');
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: BARCELONA,
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      // Dark cartography so the map belongs to the page. Same OpenStreetMap
      // data, rendered by CARTO; both are credited in the attribution.
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      }).addTo(map);

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layersRef.current = {};
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = await import('leaflet');
      const map = mapRef.current;
      if (cancelled || !map) return;

      const { line, a, b } = layersRef.current;
      line?.remove();
      a?.remove();
      b?.remove();
      layersRef.current = {};

      const pin = (color: string) =>
        L.divIcon({
          className: '',
          html: `<span style="display:block;width:16px;height:16px;border-radius:50%;background:${color};border:3px solid #0E0E10;box-shadow:0 0 0 2px ${color}55"></span>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

      if (pickup) {
        layersRef.current.a = L.marker([pickup.lat, pickup.lng], {
          icon: pin('#F5B301'),
          keyboard: false,
        }).addTo(map);
      }
      if (dropoff) {
        layersRef.current.b = L.marker([dropoff.lat, dropoff.lng], {
          icon: pin('#FAF8F3'),
          keyboard: false,
        }).addTo(map);
      }

      if (geometry && geometry.length > 1) {
        const poly = L.polyline(geometry, {
          color: '#F5B301',
          weight: 5,
          opacity: 0.95,
        }).addTo(map);
        layersRef.current.line = poly;
        map.fitBounds(poly.getBounds(), { padding: [36, 36] });
      } else if (pickup && dropoff) {
        map.fitBounds(
          L.latLngBounds([pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]),
          { padding: [36, 36] },
        );
      } else if (pickup) {
        map.setView([pickup.lat, pickup.lng], 14);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pickup, dropoff, geometry]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={label}
      className="h-full min-h-[280px] w-full rounded-xl bg-pane"
    />
  );
}
