import type { gsap as GsapNamespace } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';

export type Gsap = typeof GsapNamespace;
export type ScrollTriggerStatic = typeof ScrollTriggerClass;

export interface GsapModules {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerStatic;
}

let loading: Promise<GsapModules> | null = null;

/**
 * The single place where GSAP is loaded and ScrollTrigger is registered.
 *
 * Client-only and loaded on demand (dynamic import), so GSAP stays out of the
 * critical rendering path. Every caller shares the same promise, so the
 * plugin is registered exactly once.
 */
export function loadGsap(): Promise<GsapModules> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('loadGsap() is client-only: call it from an effect.'));
  }
  loading ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      // Web fonts change line heights: re-measure every trigger once they are in.
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return { gsap, ScrollTrigger };
    },
  );
  return loading;
}
