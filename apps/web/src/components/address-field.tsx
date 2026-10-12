'use client';

import { Fragment, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CURATED_PLACES,
  searchPlaces,
  type CuratedPlace,
  type PlaceGroup,
} from '@bcn/core/places';

/** How many places the shortlist holds, so focusing the field shows all of them. */
const POPULAR_COUNT = CURATED_PLACES.filter((p) => p.popular).length;

export interface Place {
  label: string;
  lat: number;
  lng: number;
}

interface Props {
  label: string;
  placeholder: string;
  value: Place | null;
  onChange: (place: Place | null) => void;
  initialQuery?: string;
  /**
   * `bare` drops the field's own border and background so it can sit inside a
   * shared well — used by the booking panel, where pickup and drop-off are one
   * object with a route spine between them rather than two separate controls.
   */
  bare?: boolean;
}

/** One row of the dropdown: a curated place, or a geocoder result. */
type Row = ({ kind: 'curated'; place: CuratedPlace } | { kind: 'geocoded'; place: Place }) & {
  /** Section label rendered above this row, when it opens a section. */
  heading?: string;
};

/** A small mark per group, so the eye can skip to the terminals. */
const GROUP_ICON: Record<PlaceGroup, string> = {
  airport: 'M10.2 1.6a1 1 0 0 1 1.6 0l1.5 4.8 5.4 2.1a.8.8 0 0 1 0 1.5l-5.4 2.1-1.5 4.8a1 1 0 0 1-1.6 0L8.7 12 3.3 9.9a.8.8 0 0 1 0-1.5L8.7 6.4z',
  port: 'M11 2.5a1.6 1.6 0 1 1-1.6 1.6c0-.9.7-1.6 1.6-1.6m0 4v10m-5-6h10M4 13.5c0 3 3.1 5 7 5s7-2 7-5',
  station: 'M5.5 3h9a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 14.5 13h-9A1.5 1.5 0 0 1 4 11.5v-7A1.5 1.5 0 0 1 5.5 3m1 13 -1.5 2m9-2 1.5 2',
  city: 'M3 17V8l5-3 5 3v9m4 0V11l-4-2m-6 8v-4h3v4',
  destination: 'M10 2a5.5 5.5 0 0 1 5.5 5.5c0 4-5.5 10.5-5.5 10.5S4.5 11.5 4.5 7.5A5.5 5.5 0 0 1 10 2m0 4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2',
};

/**
 * Address autocomplete backed by a curated shortlist plus /api/geocode.
 *
 * The shortlist comes first and comes free. Nearly every journey starts or
 * ends at one of about thirty points — the two terminals, the cruise quays,
 * Sants, the resorts — so those are matched locally and offered the moment the
 * field is focused, with no request and no three-character minimum. It makes
 * the common booking two taps instead of a typed address, and it pins the
 * terminals and quays on coordinates that are known to price correctly rather
 * than on whatever the geocoder returns for "terminal 1".
 *
 * Free-text search still runs underneath for everything else, so an address
 * the shortlist has never heard of behaves exactly as it did before.
 *
 * Implemented as a WAI-ARIA combobox: the input keeps focus while arrow keys
 * move an `aria-activedescendant` through the list, so it works with a
 * keyboard and a screen reader as well as a pointer.
 */
export function AddressField({
  label,
  placeholder,
  value,
  onChange,
  initialQuery = '',
  bare = false,
}: Props) {
  const t = useTranslations('quote');
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Place[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(-1);

  const listId = useId();
  const inputId = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  /**
   * True while the input holds a label the user chose rather than typed —
   * after a pick, or on mount from `initialQuery`. It does two jobs: the
   * dropdown offers nothing (matching a full chosen label against the
   * shortlist would just offer the same place back), and the geocoder stays
   * quiet, so setting the text programmatically never triggers a search.
   */
  const [settled, setSettled] = useState(Boolean(initialQuery));

  // Local and instant: no debounce, no request, no minimum length.
  const curated = useMemo(() => {
    if (settled) return [];
    return searchPlaces(query, query.trim().length === 0 ? POPULAR_COUNT : 5);
  }, [query, settled]);

  const rows: Row[] = useMemo(() => {
    const curatedRows: Row[] = curated.map((place, i) => ({
      kind: 'curated',
      place,
      heading:
        i === 0
          ? query.trim().length === 0
            ? t('popularPlaces')
            : t('suggestedPlaces')
          : undefined,
    }));

    // A curated hit and a geocoder hit can be the same place. The curated one
    // wins, because its coordinate is the one the tariff was checked against.
    const seen = new Set(curated.map((p) => p.label.toLowerCase()));
    const geocodedRows: Row[] = results
      .filter((r) => !seen.has(r.label.toLowerCase()))
      .map((place, i) => ({
        kind: 'geocoded' as const,
        place,
        // Only worth a divider when there is a curated block above it.
        heading: i === 0 && curatedRows.length > 0 ? t('searchResults') : undefined,
      }));

    return [...curatedRows, ...geocodedRows];
  }, [curated, results, query, t]);

  useEffect(() => {
    if (settled) return;
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    // Debounced so a typed address makes one request, not one per keystroke.
    const timer = setTimeout(async () => {
      setBusy(true);
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = (await res.json()) as { results: Place[] };
        setResults(data.results ?? []);
        setActive(-1);
      } catch {
        /* aborted or offline — leave the previous list in place */
      } finally {
        setBusy(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, settled]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function pick(row: Row) {
    const { label: pickedLabel, lat, lng } = row.place;
    onChange({ label: pickedLabel, lat, lng });
    setSettled(true);
    setQuery(pickedLabel);
    setResults([]);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    // Arrowing into a closed field opens the shortlist, which is how a
    // keyboard user reaches the terminals without typing anything. It lands on
    // an end of the list rather than on nothing, so one press is enough.
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      setOpen(true);
      if (rows.length > 0) setActive(e.key === 'ArrowDown' ? 0 : rows.length - 1);
      return;
    }
    if (!open || rows.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % rows.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + rows.length) % rows.length);
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      pick(rows[active]);
    }
  }

  return (
    <div ref={boxRef} className="relative">
      <label
        htmlFor={inputId}
        className={
          bare
            ? 'block font-mono text-[10px] uppercase tracking-[0.16em] text-ghost'
            : 'mb-1.5 block text-sm font-medium text-dim'
        }
      >
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        autoComplete="off"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setSettled(false);
          setQuery(e.target.value);
          setOpen(true);
          if (value) onChange(null); // the chosen place no longer matches the text
        }}
        onKeyDown={onKeyDown}
        onFocus={() => setOpen(true)}
        className={
          bare
            ? 'bare-input mt-1 font-medium'
            : 'w-full rounded-lg border border-white/15 bg-void px-3 py-2.5 text-ice placeholder:text-ghost'
        }
      />

      {busy && (
        <span
          className={`absolute text-xs text-ghost ${bare ? 'right-0 top-0' : 'right-3 top-9'}`}
        >
          {t('searching')}
        </span>
      )}

      {open && (
        <ul
          id={listId}
          role="listbox"
          className={`absolute z-30 max-h-72 overflow-auto rounded-xl border border-white/15 bg-raise-2 py-1 shadow-2xl ${
            bare ? 'inset-x-0 top-full mt-3' : 'mt-1 w-full'
          }`}
        >
          {rows.length === 0 ? (
            <li className="px-3 py-2.5 text-sm text-ghost">
              {busy ? t('searching') : query.trim().length < 3 ? t('typeToSearch') : t('noResults')}
            </li>
          ) : (
            rows.map((row, i) => (
              <Fragment key={`${row.kind}-${row.place.lat},${row.place.lng},${i}`}>
                {row.heading ? (
                  <li
                    role="presentation"
                    className={`px-3 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ghost ${
                      i === 0 ? 'pt-1.5' : 'mt-1 border-t border-white/10 pt-2'
                    }`}
                  >
                    {row.heading}
                  </li>
                ) : null}
                <li
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(row);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex cursor-pointer items-center gap-2.5 px-3 py-2.5 text-sm ${
                    i === active ? 'bg-accent/20 text-ice' : 'text-dim'
                  }`}
                >
                  <RowIcon row={row} />
                  <span className="min-w-0 flex-1 truncate">{row.place.label}</span>
                </li>
              </Fragment>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

/**
 * A gold landmark glyph for a curated point, a grey magnifier for a geocoded
 * one. The distinction is the useful part: gold means the coordinate is one of
 * ours, checked against the tariff zones, rather than whatever a search
 * returned.
 */
function RowIcon({ row }: { row: Row }) {
  if (row.kind === 'curated') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-4 w-4 shrink-0 text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={GROUP_ICON[row.place.group]} />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-ghost"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13.5 13.5 17 17" />
    </svg>
  );
}
