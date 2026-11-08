'use client';

import { DESKTOP_QUERY } from './media';
import { useMediaQuery } from './useMediaQuery';

/** Live `(min-width: 1024px) and (pointer: fine)`. False during SSR. */
export function useIsDesktop(): boolean {
  return useMediaQuery(DESKTOP_QUERY);
}
