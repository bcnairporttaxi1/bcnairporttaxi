'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

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
}

/**
 * Address autocomplete backed by /api/geocode.
 *
 * Implemented as a WAI-ARIA combobox: the input keeps focus while arrow keys
 * move an `aria-activedescendant` through the list, so it works with a
 * keyboard and a screen reader as well as a pointer.
 */
export function AddressField({ label, placeholder, value, onChange, initialQuery = '' }: Props) {
  const t = useTranslations('quote');
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Place[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(-1);

  const listId = useId();
  const inputId = useId();
  const boxRef = useRef<HTMLDivElement>(null);
  /** Suppresses the search that would otherwise fire from a programmatic set. */
  const skipNextSearch = useRef(Boolean(initialQuery));

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }
    if (query.trim().length < 3) {
      setResults([]);
      setOpen(false);
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
        setOpen(true);
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
  }, [query]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function pick(place: Place) {
    onChange(place);
    skipNextSearch.current = true;
    setQuery(place.label);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      pick(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div ref={boxRef} className="relative">
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-porcelain/80">
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
          setQuery(e.target.value);
          if (value) onChange(null); // the chosen place no longer matches the text
        }}
        onKeyDown={onKeyDown}
        onFocus={() => results.length > 0 && setOpen(true)}
        className="w-full rounded-lg border border-white/15 bg-void px-3 py-2.5 text-ice placeholder:text-porcelain/35"
      />

      {busy && (
        <span className="absolute right-3 top-9 text-xs text-porcelain/40">
          {t('searching')}
        </span>
      )}

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-white/15 bg-raise-2 py-1 shadow-2xl"
        >
          {results.length === 0 && !busy ? (
            <li className="px-3 py-2.5 text-sm text-porcelain/50">{t('noResults')}</li>
          ) : (
            results.map((r, i) => (
              <li
                key={`${r.lat},${r.lng},${i}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(r);
                }}
                onMouseEnter={() => setActive(i)}
                className={`cursor-pointer px-3 py-2.5 text-sm ${
                  i === active ? 'bg-accent/20 text-ice' : 'text-porcelain/75'
                }`}
              >
                {r.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
