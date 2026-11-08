'use client';

import type { ReactNode } from 'react';
import { resetSurfaceState, surfaceState } from '@/components/three/surfaceState';
import { useGsap, useIsDesktop, useReducedMotion } from '@/lib/motion';

/**
 * Scene 2: the hero's single scrubbed timeline (desktop only).
 * The hero pins for 120 % of the viewport height (scrub 1):
 *   0 → 40 %   copy drifts up 60 px and fades out
 *   0 → 70 %   camera goes top-down, relief flattens (amp 1 → 0.15)
 *   40 → 90 %  the grid turns into a contour map
 *   60 → 100 % background navy → paper, lines → #D5DCE8, opacity → 0.35
 * The hero is exactly one viewport tall on desktop, so the pin spacer never
 * moves anything visible (no layout shift). Mobile / reduced motion: no pin.
 */
export function HeroScroll({ children, className }: { children: ReactNode; className?: string }) {
  const desktop = useIsDesktop();
  const reducedMotion = useReducedMotion();

  const ref = useGsap<HTMLElement>(
    ({ gsap, scope: el, reduced }) => {
      if (reduced || !desktop) return;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Header tone follows the background once it has turned to paper.
            el.dataset.header = self.progress > 0.75 ? 'light' : 'dark';
          },
        },
      });

      tl.to('[data-hero-copy]', { y: -60, opacity: 0, duration: 0.4 }, 0)
        .to(surfaceState, { cameraProgress: 1, amp: 0.15, duration: 0.7 }, 0)
        .to(surfaceState, { contour: 1, duration: 0.5 }, 0.4)
        .fromTo(
          el,
          { backgroundColor: '#0B2545' },
          { backgroundColor: '#F3F5F9', duration: 0.4 },
          0.6,
        )
        .to(surfaceState, { tint: 1, opacity: 0.35, duration: 0.4 }, 0.6)
        .set({}, {}, 1); // keep the total duration at exactly 1

      return () => {
        resetSurfaceState();
        el.dataset.header = 'dark';
      };
    },
    [desktop],
    // The pin must exist before the first scroll; GSAP is never loaded on mobile.
    { eager: true, enabled: desktop && !reducedMotion },
  );

  return (
    // The wrapper is owned by React and never re-parented: GSAP inserts its
    // pin-spacer between it and the section, so unmounting stays safe.
    <div>
      <section ref={ref} data-header="dark" className={className}>
        {children}
      </section>
    </div>
  );
}

export default HeroScroll;
