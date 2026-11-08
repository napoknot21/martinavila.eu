'use client';

import { REDUCED_MOTION_QUERY } from './media';
import { useMediaQuery } from './useMediaQuery';

/** Live `prefers-reduced-motion: reduce`. False during SSR. */
export function useReducedMotion(): boolean {
  return useMediaQuery(REDUCED_MOTION_QUERY);
}
