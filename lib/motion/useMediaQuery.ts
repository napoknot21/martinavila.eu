'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Live boolean for a CSS media query. Returns `serverValue` during SSR and
 * hydration, then the real value (and updates when it changes).
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
