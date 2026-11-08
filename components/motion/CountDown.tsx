'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion/media';

interface CountDownProps {
  /** Final text, shown at rest, without JS and with reduced motion. */
  final: string;
  from?: number;
  to?: number;
  /** Duration in ms. */
  duration?: number;
  unit?: string;
}

/**
 * Counts a figure down once when it enters the viewport (10.0 → 0.9 s in
 * 1.2 s), then settles on the final text. The final text reserves the space
 * (stacked in the same grid cell), so nothing shifts.
 */
export function CountDown({
  final,
  from = 10,
  to = 0.9,
  duration = 1200,
  unit = ' s',
}: CountDownProps) {
  const finalRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finalEl = finalRef.current;
    const live = liveRef.current;
    if (!finalEl || !live || prefersReducedMotion()) return;
    if (finalEl.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    const format = (v: number) => `${v.toFixed(1)}${unit}`;
    finalEl.style.visibility = 'hidden';
    live.textContent = format(from);
    let frame = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3); // power3.out
          live.textContent = format(from + (to - from) * eased);
          if (p < 1) frame = requestAnimationFrame(tick);
          else {
            live.textContent = '';
            finalEl.style.visibility = '';
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(finalEl);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      live.textContent = '';
      finalEl.style.visibility = '';
    };
  }, [from, to, duration, unit]);

  return (
    <span className="inline-grid tabular-nums">
      <span ref={finalRef} className="col-start-1 row-start-1">
        {final}
      </span>
      <span ref={liveRef} aria-hidden="true" className="col-start-1 row-start-1" />
    </span>
  );
}

export default CountDown;
