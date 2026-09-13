'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DEMO_ROUTE } from '@/components/live-route-data';

/**
 * The homepage's "how it works", played on a real map.
 *
 * Esri's dark canvas of Barcelona, the road OSRM actually drives from
 * Terminal 1 to Plaça de Catalunya, and a taxi that drives it. Three
 * moments, in the order a booking happens: the route is measured and the
 * price appears (phase 1), the car is confirmed and sets off (phase 2), it
 * arrives where the driver waits (phase 3). The section's step list reads
 * the phase from `data-phase` on the nearest `.journey` and lights up in
 * step.
 *
 * Leaflet is imported only once the panel is within a screen of the
 * viewport, so nothing here touches the first paint. Until then, and for
 * anyone with reduced motion or no JavaScript, the panel is the server's
 * static frame: labels, distance, price.
 */
export function LiveRoute({
  price,
  labels,
}: {
  price: string;
  labels: { reserved: string; arrived: string; live: string };
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(0);
  const mapRef = useRef<LeafletMap | null>(null);
  const [near, setNear] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  // Mount the map when the panel is about to be seen — not before.
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '60% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tell the list which moment is playing.
  useEffect(() => {
    const journey = boxRef.current?.closest('.journey');
    if (journey) journey.setAttribute('data-phase', String(phase));
  }, [phase]);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    let raf = 0;

    (async () => {
      const L = await import('leaflet');
      const el = boxRef.current;
      if (cancelled || !el || mapRef.current) return;

      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coords = DEMO_ROUTE.coords;

      const map = L.map(el, {
        zoomControl: false,
        attributionControl: true,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false,
      });
      mapRef.current = map;

      // Same basemap and attribution as the trip page; see route-map.tsx for
      // why Esri rather than CARTO.
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 16, attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors' },
      ).addTo(map);

      map.fitBounds(L.latLngBounds(coords), { padding: [56, 56] });

      // The road, as a faint full line and a gold line that draws over it.
      L.polyline(coords, { color: 'rgb(255 255 255 / 0.18)', weight: 3, lineCap: 'round' }).addTo(map);
      const drawn = L.polyline(coords, { color: '#f0b429', weight: 3.5, lineCap: 'round', className: 'lr-line' }).addTo(map);

      const pin = (html: string, size: number, cls = '') =>
        L.divIcon({ className: cls, html, iconSize: [size, size], iconAnchor: [size / 2, size / 2] });

      L.marker(coords[0], {
        icon: pin('<span class="lr-dot lr-dot-from"></span>', 18),
        keyboard: false,
        interactive: false,
      }).addTo(map);
      const dest = L.marker(coords[coords.length - 1], {
        icon: pin('<span class="lr-dot lr-dot-to"></span>', 18),
        keyboard: false,
        interactive: false,
      }).addTo(map);

      const taxi = L.marker(coords[0], {
        icon: L.divIcon({
          className: 'lr-taxi-wrap',
          html: `<span class="lr-taxi" style="--r:0deg">${TAXI_SVG}</span>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        }),
        keyboard: false,
        interactive: false,
        zIndexOffset: 1000,
      }).addTo(map);

      // Cumulative distance along the line, so the drive is even in space.
      const seg: number[] = [0];
      for (let i = 1; i < coords.length; i++) seg[i] = seg[i - 1] + map.distance(coords[i - 1], coords[i]);
      const total = seg[seg.length - 1];

      const at = (d: number): { p: [number, number]; bearing: number } => {
        let i = 1;
        while (i < seg.length - 1 && seg[i] < d) i++;
        const a = coords[i - 1];
        const b = coords[i];
        const t = seg[i] === seg[i - 1] ? 0 : (d - seg[i - 1]) / (seg[i] - seg[i - 1]);
        const p: [number, number] = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
        const pa = map.latLngToLayerPoint(a);
        const pb = map.latLngToLayerPoint(b);
        const bearing = (Math.atan2(pb.y - pa.y, pb.x - pa.x) * 180) / Math.PI;
        return { p, bearing };
      };

      const place = (d: number) => {
        const { p, bearing } = at(Math.max(0, Math.min(total, d)));
        taxi.setLatLng(p);
        const span = taxi.getElement()?.querySelector<HTMLElement>('.lr-taxi');
        if (span) span.style.setProperty('--r', `${bearing}deg`);
      };

      const finish = () => {
        place(total);
        dest.getElement()?.classList.add('lr-arrived');
        setPhase(3);
      };

      const lineEl = drawn.getElement() as SVGPathElement | null;

      if (still) {
        // Reduced motion: the finished scene, immediately.
        setPhase(3);
        finish();
        return;
      }

      // Phase 1 — measure: the line draws itself.
      if (lineEl) {
        const len = lineEl.getTotalLength();
        lineEl.style.strokeDasharray = `${len}`;
        lineEl.style.strokeDashoffset = `${len}`;
        lineEl.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.32, 0.72, 0, 1)';
        requestAnimationFrame(() => {
          lineEl.style.strokeDashoffset = '0';
        });
      }
      setPhase(1);

      // Phase 2 — reserve and drive: 2.2 s after the line, the taxi sets off.
      const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
      const DRIVE_MS = 5200;
      const startAt = performance.now() + 2200;
      const tick = (now: number) => {
        if (cancelled) return;
        if (now < startAt) {
          raf = requestAnimationFrame(tick);
          return;
        }
        if (phaseRef.current < 2) {
          phaseRef.current = 2;
          setPhase(2);
          taxi.getElement()?.classList.add('lr-go');
        }
        const t = Math.min(1, (now - startAt) / DRIVE_MS);
        place(total * ease(t));
        if (t < 1) raf = requestAnimationFrame(tick);
        else finish();
      };
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [near]);

  return (
    <div className="lr-panel relative aspect-[16/11] w-full overflow-hidden rounded-[1.6rem] border border-line bg-[#0c0c0f] sm:aspect-[16/10]">
      {/* The map fills the panel; the chrome sits over it. */}
      <div ref={boxRef} className="lr-map absolute inset-0" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
        <div className="rounded-xl border border-line bg-[#0c0c0f]/85 px-3 py-2 backdrop-blur-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ghost">{DEMO_ROUTE.from.label}</p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ice/80">→ {DEMO_ROUTE.to.label}</p>
        </div>
        <div className={`lr-price rounded-xl border border-gold/40 bg-[#0c0c0f]/90 px-3.5 py-2 text-right backdrop-blur-sm ${phase >= 1 ? 'lr-price-in' : ''}`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ghost">
            {DEMO_ROUTE.roadKm} km · {DEMO_ROUTE.durationMin} min
          </p>
          <p className="font-mono text-2xl font-bold tabular-nums text-gold">{price}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <p className={`lr-chip ${phase >= 2 ? 'lr-chip-in' : ''}`}>
          <span className="lr-chip-dot bg-gold" />
          {phase >= 3 ? labels.arrived : labels.reserved}
        </p>
        <p className={`lr-chip ${phase >= 3 ? 'lr-chip-in' : ''}`}>
          <span className="lr-chip-dot bg-jade lr-live" />
          {labels.live}
        </p>
      </div>
    </div>
  );
}

/** A taxi from above: black-and-yellow body, roof sign, nose to the right. */
const TAXI_SVG = `<svg viewBox="0 0 34 34" width="34" height="34" aria-hidden="true">
  <ellipse cx="17" cy="19" rx="12" ry="7" fill="rgb(0 0 0 / 0.45)"/>
  <rect x="5" y="11" width="24" height="12" rx="4" fill="#f0b429"/>
  <rect x="11" y="11" width="10" height="12" rx="2" fill="#0e0e10"/>
  <rect x="14" y="9" width="6" height="2.5" rx="1" fill="#0e0e10"/>
  <rect x="26" y="13" width="3" height="3" rx="1" fill="#fff5cc"/>
  <rect x="26" y="18" width="3" height="3" rx="1" fill="#fff5cc"/>
  <rect x="5" y="13" width="2.5" height="3" rx="1" fill="#ff5a4a"/>
  <rect x="5" y="18" width="2.5" height="3" rx="1" fill="#ff5a4a"/>
</svg>`;
