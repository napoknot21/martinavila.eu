'use client';

import type Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  headerOffset,
  loadGsap,
  prefersReducedMotion,
  useIsDesktop,
  useReducedMotion,
} from '@/lib/motion';

const LenisContext = createContext<Lenis | null>(null);

/** The site's Lenis instance, or null (reduced motion, not loaded yet, or SSR). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export type ScrollTarget = number | string | HTMLElement;

/**
 * Smooth scroll to a position, selector or element, offset by the fixed
 * header. Uses Lenis when it is running; otherwise native smooth scrolling
 * (or an instant jump when reduced motion is on).
 */
export function useScrollTo(): (target: ScrollTarget) => void {
  const lenis = useLenis();
  return useCallback(
    (target: ScrollTarget) => {
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      if (el === null) return;
      const offset = typeof el === 'number' ? 0 : -headerOffset();

      if (lenis) {
        // force: scroll even if Lenis was just stopped (e.g. mobile menu closing).
        lenis.scrollTo(el, { offset, force: true });
        return;
      }
      const top =
        typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    },
    [lenis],
  );
}

/**
 * Lenis smooth scrolling for the whole site. Mount once, in the root layout.
 *
 * - duration 1.1, smooth wheel; touch scrolling stays native (syncTouch off);
 * - driven by gsap.ticker, with ScrollTrigger.update on every Lenis scroll
 *   and lag smoothing off, so scrubbed timelines stay in sync;
 * - desktop pointers only: on touch devices scrolling stays fully native;
 * - not created at all when prefers-reduced-motion is reduce (and destroyed
 *   if the setting changes while the page is open).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  // Touch devices scroll natively anyway (syncTouch off): skip Lenis and GSAP there.
  const desktop = useIsDesktop();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reduced || !desktop || prefersReducedMotion()) return;
    let cancelled = false;
    let cleanup = () => {};

    void Promise.all([import('lenis'), loadGsap()])
      .then(([{ default: LenisClass }, { gsap, ScrollTrigger }]) => {
        if (cancelled) return;
        const instance = new LenisClass({
          duration: 1.1,
          smoothWheel: true,
          syncTouch: false,
          autoRaf: false,
        });
        instance.on('scroll', ScrollTrigger.update);
        const tick = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        setLenis(instance);

        cleanup = () => {
          gsap.ticker.remove(tick);
          gsap.ticker.lagSmoothing(500, 33); // GSAP defaults
          instance.destroy();
          setLenis(null);
        };
      })
      .catch(() => {
        // Lenis or GSAP failed to load: native scrolling keeps working.
      });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduced, desktop]);

  // After a route change: re-measure, then honour the hash or start at the top.
  useEffect(() => {
    if (!lenis) return;
    lenis.resize();
    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
    if (target) lenis.scrollTo(target, { offset: -headerOffset(), immediate: true, force: true });
    else lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export default SmoothScroll;
