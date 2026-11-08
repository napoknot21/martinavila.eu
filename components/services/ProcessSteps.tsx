'use client';

import { useGsap } from '@/lib/motion';

interface ProcessStepsProps {
  steps: { title: string; detail: string }[];
}

/**
 * Four numbered steps on a line (horizontal on desktop, vertical on mobile).
 * A sky-blue progress line draws across them with the scroll (scrub) and each
 * step lights up when the line reaches it. Without JS or with reduced motion
 * the line is fully drawn and every step is lit.
 */
export function ProcessSteps({ steps }: ProcessStepsProps) {
  const ref = useGsap<HTMLOListElement>(({ gsap, scope, reduced }) => {
    if (reduced) return;
    const items = Array.from(scope.querySelectorAll<HTMLElement>('[data-step]'));
    const n = items.length;
    const light = (p: number) => {
      items.forEach((el, i) => {
        // Step i starts at i/n along the line; light it as the line arrives.
        el.toggleAttribute('data-on', p >= i / n - 0.01);
      });
    };
    scope.dataset.live = '';
    gsap.fromTo(
      scope,
      { '--p': 0 },
      {
        '--p': 1,
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: true,
          onUpdate: (self) => light(self.progress),
          onRefresh: (self) => light(self.progress),
        },
      },
    );
    return () => {
      delete scope.dataset.live;
      items.forEach((el) => el.removeAttribute('data-on'));
    };
  });

  return (
    <ol ref={ref} className="process relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
      {/* The track and its progress line: vertical on mobile, horizontal on desktop. */}
      <span aria-hidden="true" className="process-track" />
      <span aria-hidden="true" className="process-line" />
      {steps.map((step, i) => (
        <li key={step.title} data-step className="process-step relative pl-10 md:pt-10 md:pl-0">
          <span aria-hidden="true" className="process-dot" />
          <span className="label text-sky">0{i + 1}</span>
          <h3 className="mt-3 text-h2 text-white">{step.title}</h3>
          <p className="mt-3 max-w-[30ch] text-sky">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export default ProcessSteps;
