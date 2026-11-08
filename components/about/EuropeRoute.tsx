'use client';

import type { ReactNode } from 'react';
import { useGsap, useIsDesktop } from '@/lib/motion';

/**
 * Draws the royal-blue route from Paris to Dublin. Desktop: scrubbed as the
 * map crosses the viewport. Mobile: drawn once on entry. Dublin's dot pulses
 * once when the route arrives. Without JS or with reduced motion the route is
 * simply shown, fully drawn.
 */
export function EuropeRoute({ children, className }: { children: ReactNode; className?: string }) {
  const desktop = useIsDesktop();

  const ref = useGsap<HTMLDivElement>(
    ({ gsap, scope, reduced }) => {
      if (reduced) return;
      const route = scope.querySelector<SVGPathElement>('[data-route]');
      const pulse = scope.querySelector<SVGElement>('[data-pulse]');
      if (!route) return;
      let pulsed = false;
      const arrive = () => {
        if (pulsed || !pulse) return;
        pulsed = true;
        pulse.classList.add('is-pulsing');
      };

      if (desktop) {
        gsap.fromTo(
          route,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: scope,
              start: 'top 75%',
              end: 'center 45%',
              scrub: 1,
              onUpdate: (self) => self.progress > 0.98 && arrive(),
            },
          },
        );
      } else {
        gsap.fromTo(
          route,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: 'power2.inOut',
            onComplete: arrive,
            scrollTrigger: { trigger: scope, start: 'top 70%', once: true },
          },
        );
      }
      return () => pulse?.classList.remove('is-pulsing');
    },
    [desktop],
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default EuropeRoute;
