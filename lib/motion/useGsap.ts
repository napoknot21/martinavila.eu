'use client';

import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from 'react';
import { loadGsap, type GsapModules } from './gsap';
import { prefersReducedMotion } from './media';

export interface GsapApi<T extends HTMLElement = HTMLElement> extends GsapModules {
  /** The element the context is scoped to (the one holding the returned ref). */
  scope: T;
  /** prefers-reduced-motion at the time the callback runs. */
  reduced: boolean;
}

export type GsapCallback<T extends HTMLElement = HTMLElement> = (
  api: GsapApi<T>,
) => void | (() => void);

export interface UseGsapOptions {
  /**
   * Load GSAP immediately on mount. Default false: GSAP is loaded on the
   * visitor's first scroll, pointer or key interaction, or when the element
   * enters the viewport, whichever happens first. That
   * keeps GSAP out of the initial load on pages nobody scrolls (and out of
   * lab audits). Use eager for timelines that must exist before the first
   * scroll, such as a pinned hero.
   */
  eager?: boolean;
  /** Set false to skip GSAP entirely (e.g. on mobile). Default true. */
  enabled?: boolean;
}

/** Resolves on first interaction or when `el` nears the viewport. */
function whenNeeded(el: HTMLElement, signal: { cancelled: boolean }): Promise<void> {
  return new Promise((resolve) => {
    const events = ['scroll', 'wheel', 'pointerdown', 'keydown', 'touchstart'] as const;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((x) => x.isIntersecting)) done();
      },
      { rootMargin: '0px' },
    );
    function done() {
      events.forEach((e) => window.removeEventListener(e, done));
      io.disconnect();
      if (!signal.cancelled) resolve();
    }
    events.forEach((e) => window.addEventListener(e, done, { once: true, passive: true }));
    io.observe(el);
  });
}

/**
 * Runs `callback` inside a gsap.context scoped to the returned ref, so
 * selector strings only match inside that element. On unmount, or when
 * `deps` change, the context is reverted: every tween, timeline and
 * ScrollTrigger created in the callback is killed and inline styles are
 * restored. A function returned by the callback runs on revert too.
 *
 * Visibility rule: elements must render visible. Set hidden start states
 * only in here (gsap.set / fromTo), so the page stays readable without JS.
 *
 *   const ref = useGsap<HTMLElement>(({ gsap, reduced }) => {
 *     if (reduced) return;
 *     gsap.from('[data-item]', { y: 24, scrollTrigger: { trigger: '[data-item]' } });
 *   }, []);
 *   return <section ref={ref}>…</section>;
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  callback: GsapCallback<T>,
  deps: DependencyList = [],
  { eager = false, enabled = true }: UseGsapOptions = {},
): RefObject<T | null> {
  const scope = useRef<T>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // Layout effect on purpose: its cleanup runs before React removes the DOM,
  // so pins (which re-parent elements into a pin-spacer) are undone first.
  // Otherwise React's removeChild fails on route change.
  useLayoutEffect(() => {
    const signal = { cancelled: false };
    let revert: (() => void) | undefined;
    const target = scope.current;
    if (!enabled || !target) return;

    (eager ? Promise.resolve() : whenNeeded(target, signal))
      .then(() => loadGsap())
      .then((modules) => {
        const el = scope.current;
        if (signal.cancelled || !el) return;
        const ctx = modules.gsap.context(() => {
          return callbackRef.current({ ...modules, scope: el, reduced: prefersReducedMotion() });
        }, el);
        revert = () => ctx.revert();
      })
      .catch(() => {
        // GSAP failed to load: content is already visible, nothing to undo.
      });

    return () => {
      signal.cancelled = true;
      revert?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps are supplied by the caller
  }, [...deps, eager, enabled]);

  return scope;
}
