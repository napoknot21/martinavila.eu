/**
 * Imperative media checks for event handlers and effects.
 * In render, prefer the live hooks (useReducedMotion, useIsDesktop).
 */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
export const DESKTOP_QUERY = '(min-width: 1024px) and (pointer: fine)';

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function isDesktop(): boolean {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

/** Height of the fixed header, used as the offset for anchor scrolling. */
export function headerOffset(): number {
  return document.querySelector<HTMLElement>('body > header')?.offsetHeight ?? 72;
}
