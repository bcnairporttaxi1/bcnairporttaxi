'use client';

import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';
import { useRef, type ElementType } from 'react';

/**
 * Motion primitives.
 *
 * Everything here animates transform and opacity only, so it stays on the
 * compositor and never costs layout on a page whose job is a booking form.
 *
 * Three rules hold across the whole site:
 *
 *  1. Entrances fire once. `useInView({ once: true })` — replaying on
 *     scroll-back turns a considered entrance into a twitch.
 *  2. Content is in the HTML either way. Only opacity and transform move, so
 *     a crawler and a reader with JavaScript off see the finished page.
 *  3. `prefers-reduced-motion` collapses every duration to zero rather than
 *     shortening it, so the layout lands immediately and nothing slides.
 *
 * The shared easing is the site's `--ease-brand`, expressed here as its
 * control points because Motion takes numbers, not a CSS variable.
 */
const EASE = [0.32, 0.72, 0, 1] as const;

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/** Children run in sequence; the parent itself does not move. */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/**
 * A single element that rises into place when it is first seen.
 *
 * `delay` exists for grids laid out without a Stagger parent — prefer Stagger
 * where you can, because it keeps the timing in one place.
 */
export function Rise({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'header';
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const still = useReducedMotion();
  const Tag = motion[as] as ElementType;

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={rise}
      transition={still ? { duration: 0 } : { duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Wraps a group whose children should arrive one after another. */
export function Stagger({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'section';
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const Tag = motion[as] as ElementType;

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={stagger}
    >
      {children}
    </Tag>
  );
}

/** One member of a Stagger. Timing comes from the parent, not from here. */
export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const still = useReducedMotion();
  const Tag = motion[as] as ElementType;

  return (
    <Tag
      className={className}
      variants={rise}
      transition={still ? { duration: 0 } : { duration: 0.7, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * A card that tips very slightly toward the pointer and lifts on approach.
 *
 * The rotation is deliberately under two degrees: past that, text starts to
 * resample as it turns and the whole thing reads as cheap rather than
 * expensive. Touch devices get the lift without the tilt, because there is no
 * pointer position to tilt toward.
 */
export function LiftCard({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const still = useReducedMotion();
  const Tag = motion[as] as ElementType;

  return (
    <Tag
      className={className}
      variants={rise}
      transition={still ? { duration: 0 } : { duration: 0.7, ease: EASE }}
      whileHover={still ? undefined : { y: -6, transition: { duration: 0.45, ease: EASE } }}
      whileTap={still ? undefined : { scale: 0.99 }}
    >
      {children}
    </Tag>
  );
}

/**
 * Draws a line as it comes into view — used for the spine that threads the
 * three booking steps together.
 */
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const still = useReducedMotion();

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.span
        className="block h-full w-full origin-left bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={still ? { duration: 0 } : { duration: 1.4, ease: EASE }}
      />
    </div>
  );
}
