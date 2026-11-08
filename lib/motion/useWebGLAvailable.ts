'use client';

import { useSyncExternalStore } from 'react';

let available: boolean | undefined;

/** Tries once to create a WebGL context, then releases it. Result is cached. */
function detect(): boolean {
  if (available === undefined) {
    try {
      const canvas = document.createElement('canvas');
      // three.js requires WebGL2.
      const gl = canvas.getContext('webgl2');
      available = gl !== null;
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      available = false;
    }
  }
  return available;
}

const subscribe = () => () => {};

/** Whether a WebGL2 context can be created. Checked once per page load; false during SSR. */
export function useWebGLAvailable(): boolean {
  return useSyncExternalStore(subscribe, detect, () => false);
}
