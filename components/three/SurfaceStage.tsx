'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useIsDesktop, useReducedMotion, useWebGLAvailable } from '@/lib/motion';

const SignatureSurface = dynamic(() => import('./SignatureSurface'), { ssr: false });

/** Wait for the load event, then for an idle moment: the 3D never competes with first paint. */
function afterLoadAndIdle(callback: () => void): () => void {
  let idleId = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    if ('requestIdleCallback' in window)
      idleId = window.requestIdleCallback(callback, { timeout: 3000 });
    else timeoutId = setTimeout(callback, 1200);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
  return () => {
    window.removeEventListener('load', schedule);
    if (idleId) window.cancelIdleCallback(idleId);
    if (timeoutId) clearTimeout(timeoutId);
  };
}

/**
 * Hosts the hero surface.
 * - First paint, no WebGL, phones and touch devices: the static SVG frame
 *   passed as children (one still frame of the same function).
 * - Desktop pointer, motion allowed: the live WebGL surface (tilt, scroll timeline).
 * - Desktop with reduced motion: WebGL renders one still frame (frameloop "demand").
 * The WebGL chunk loads after the page has loaded and gone idle, then cross-fades in.
 */
export function SurfaceStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const webgl = useWebGLAvailable();
  const animated = desktop && !reduced;

  const [idle, setIdle] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // Phones and touch devices keep the static frame: it is the same function
  // rendered once at build time, and spares them the 3D download and boot.
  const eligible = webgl && desktop;

  useEffect(() => {
    if (!eligible) return;
    return afterLoadAndIdle(() => setIdle(true));
  }, [eligible]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mounted = eligible && idle;
  const showCanvas = mounted && ready;

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
        style={{ opacity: showCanvas ? 0 : 1 }}
      >
        {children}
      </div>
      {mounted && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <SignatureSurface
            key={animated ? 'live' : 'still'}
            animated={animated}
            visible={visible}
            onReady={() => setReady(true)}
            className="absolute inset-0"
          />
        </div>
      )}
    </div>
  );
}

export default SurfaceStage;
