'use client';

import type { ReactNode } from 'react';
import { useGsap } from '@/lib/motion';

/**
 * Draws the `.draw` strokes (pathLength = 1) of its SVG child with the scroll,
 * as the block crosses the viewport, and fades in `.draw-fade` labels.
 * Fully drawn without JS and with reduced motion.
 */
export function ScrubDraw({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useGsap<HTMLDivElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: scope, start: 'top 85%', end: 'center 45%', scrub: 1 },
    });
    tl.fromTo(
      '.draw',
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, ease: 'none', stagger: 0.04 },
      0,
    );
    tl.fromTo('.draw-fade', { opacity: 0 }, { opacity: 1, ease: 'none', stagger: 0.04 }, 0.3);
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default ScrubDraw;
