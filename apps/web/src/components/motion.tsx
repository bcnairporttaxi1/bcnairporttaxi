'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';

/**
 * Entrance motion for the public site, in CSS.
 *
 * These five primitives used to wrap `motion/react`. That cost every page the
 * library (46 KB compressed) and, worse, rendered each section at opacity:0
 * on the server: a full-page screenshot of the homepage was eight thousand
 * pixels of black, and Lighthouse charged 2.5 s of LCP render delay to text
 * whose bytes had arrived with the HTML.
 *
 * The rule now: content is visible at rest. The server renders everything
 * shown. After hydration, an element that sits below the viewport is armed —
 * hidden and translated — and an IntersectionObserver reveals it when it
 * scrolls in. Anything already on screen at hydration is left alone, so the
 * first paint, the thumbnail and the reader with JavaScript off all get the
 * page. The transitions live in globals.css under `.rise`, `.stagger` and
 * `.drawline`; reduced motion switches them off there.
 */

/** True once the element has scrolled into view (or was in view to begin with). */
function useReveal<T extends HTMLElement>(margin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  // `armed` is only ever set on the client, after mount, and only for
  // elements below the fold — which is what keeps the server render visible.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // already on screen: never hide it

    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, armed, shown };
}

/** A single element that rises into place when it is first seen. */
export function Rise({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'header';
}) {
  const { ref, armed, shown } = useReveal<HTMLElement>();
  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref}
      className={`rise ${className}`}
      data-armed={armed || undefined}
      data-in={shown || undefined}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Wraps a group whose children should arrive one after another. The parent
 * itself does not move; each StaggerItem reads the group's state and the
 * stylesheet spaces them by `:nth-child`.
 */
export function Stagger({
  children,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'section';
}) {
  const { ref, armed, shown } = useReveal<HTMLElement>('0px 0px -10% 0px');
  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={`stagger ${className}`} data-armed={armed || undefined} data-in={shown || undefined}>
      {children}
    </Tag>
  );
}

/** One member of a Stagger. Timing comes from the parent, not from here. */
export function StaggerItem({
  children,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const Tag = as as ElementType;
  return <Tag className={`rise stagger-item ${className}`}>{children}</Tag>;
}

/**
 * A card that lifts on hover. The lift is CSS; a StaggerItem entrance comes
 * from the parent group when there is one.
 */
export function LiftCard({
  children,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const Tag = as as ElementType;
  return <Tag className={`rise stagger-item lift ${className}`}>{children}</Tag>;
}

/**
 * Draws a line as it comes into view — used for the spine that threads the
 * three booking steps together. Rendered at full length on the server.
 */
export function DrawLine({ className = '' }: { className?: string }) {
  const { ref, armed, shown } = useReveal<HTMLDivElement>('0px 0px -20% 0px');
  return (
    <div ref={ref} className={`drawline ${className}`} aria-hidden="true" data-armed={armed || undefined} data-in={shown || undefined}>
      <span className="block h-full w-full origin-left bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0" />
    </div>
  );
}

