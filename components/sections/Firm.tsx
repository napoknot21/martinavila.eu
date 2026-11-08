'use client';

import type { ReactNode } from 'react';
import { SectionLabel } from '@/components/SectionLabel';
import type { Content } from '@/content/types';
import { useGsap } from '@/lib/motion';

/**
 * Scene 3, § 01: the statement brightens word by word with the scroll
 * (opacity 0.15 → 1, scrubbed from 75 % to 40 % of the viewport). Words
 * render at full opacity; the dimmed start state is only set by GSAP.
 * `background` receives the static contour pattern (a server component).
 */
export function Firm({
  copy: f,
  background,
}: {
  copy: Content['home']['firm'];
  background?: ReactNode;
}) {
  const words = f.statement.split(' ');

  const ref = useGsap<HTMLElement>(({ gsap, reduced }) => {
    if (reduced) return;
    gsap.fromTo(
      '[data-word]',
      { opacity: 0.15 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '[data-statement]',
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: true,
        },
      },
    );
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 md:py-40"
      aria-labelledby="firm-title"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {background}
      </div>
      <div className="wrap relative">
        <SectionLabel number={f.number} label={f.label} />
        <h2 id="firm-title" className="sr-only">
          {f.label}
        </h2>
        <p data-statement className="mt-10 max-w-[30ch] font-display text-h2 text-ink md:mt-14">
          <span className="sr-only">{f.statement}</span>
          {words.map((word, i) => (
            <span key={i} data-word aria-hidden="true">
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
        <p className="label mt-12 text-muted">{f.facts}</p>
      </div>
    </section>
  );
}

export default Firm;
