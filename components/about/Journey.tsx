'use client';

import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import type { Chapter, TimelineEntry } from '@/content/types';
import { useGsap, useIsDesktop, useReducedMotion } from '@/lib/motion';
import { fractionOf } from '@/lib/time';
import { TimelineAxis, TimelineList } from './Timeline';

interface JourneyProps {
  label: string;
  chapters: Chapter[];
  /** Server-rendered duotone image (or navy placeholder) per chapter. */
  media: ReactNode[];
  /** Video URL per chapter, or null when the file does not exist. */
  videos: (string | null)[];
  timeline: { label: string; from: string; to: string; entries: TimelineEntry[] };
}

/**
 * Scene 2: the four cities.
 *
 * Desktop with motion: "cinema" mode. The stage pins for 4 × 100vh and one
 * master timeline (scrub 1) gives each chapter a quarter: the image comes
 * forward from depth, the city name writes itself letter by letter, then the
 * coordinates and the text; the image recedes as the next
 * one advances (30 % overlap). A dot travels the 2020 → 2027 axis.
 *
 * Mobile, reduced motion and no JS: "stack" mode. Each chapter is a normal
 * section (16:9 image, name, coordinates, text) with a single
 * fade-in, and the timeline is a list. The HTML is rendered in stack mode;
 * cinema mode is switched on after hydration, below the fold.
 */
export function Journey({ label, chapters, media, videos, timeline }: JourneyProps) {
  const desktop = useIsDesktop();
  const reducedMotion = useReducedMotion();
  const cinema = desktop && !reducedMotion;

  const ref = useGsap<HTMLElement>(
    ({ gsap, scope, reduced }) => {
      if (reduced || !cinema) return;
      const stage = scope.querySelector<HTMLElement>('[data-stage]');
      const axis = scope.querySelector<HTMLElement>('.timeline-h');
      if (!stage) return;

      const items = gsap.utils.toArray<HTMLElement>('[data-chapter]', scope);
      const n = items.length;
      const vids = items.map((el) => el.querySelector<HTMLVideoElement>('video'));

      const update = (progress: number) => {
        const p = Math.min(progress * n, n - 0.0001);
        const current = Math.min(n - 1, Math.floor(p + 0.15));
        stage.dataset.current = String(current);

        // Timeline dot: within chapter c, move from its start month to its end month.
        const c = Math.floor(p);
        const ch = chapters[c];
        if (axis && ch) {
          const a = fractionOf(ch.start, timeline.from, timeline.to);
          const b = fractionOf(ch.end, timeline.from, timeline.to);
          axis.style.setProperty('--tl', `${((a + (b - a) * (p - c)) * 100).toFixed(2)}%`);
        }

        // Videos: load when less than one chapter away, play only while current.
        vids.forEach((video, i) => {
          if (!video) return;
          const near = Math.abs(p - (i + 0.5)) < 1;
          if (near && !video.src && video.dataset.src) video.src = video.dataset.src;
          if (i === current && near) void video.play().catch(() => {});
          else video.pause();
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: `+=${n * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => update(self.progress),
          onRefresh: (self) => update(self.progress),
        },
      });

      items.forEach((el, i) => {
        const q = <T extends Element>(sel: string) => el.querySelectorAll<T>(sel);
        const mediaEl = el.querySelector('[data-media]');
        const start = i === 0 ? 0 : i - 0.3;

        tl.fromTo(
          mediaEl,
          { scale: 1.15, filter: 'blur(6px)', autoAlpha: 0 },
          { scale: 1, filter: 'blur(0px)', autoAlpha: 1, duration: 0.35 },
          start,
        )
          .fromTo(
            q('[data-letter]'),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.22, stagger: 0.022 },
            start + 0.12,
          )
          .fromTo(
            q('[data-meta]'),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.14 },
            start + 0.3,
          )
          .fromTo(
            q('[data-text]'),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.18 },
            start + 0.36,
          );

        if (i < n - 1) {
          // Camera move, not a cut: recede and fade while the next chapter advances.
          tl.to(mediaEl, { scale: 0.92, autoAlpha: 0, duration: 0.35 }, i + 0.72).to(
            q('[data-copy]'),
            { autoAlpha: 0, y: -24, duration: 0.18 },
            i + 0.64,
          );
        }
      });
      tl.set({}, {}, n); // total duration = n chapters

      return () => {
        delete stage.dataset.current;
        axis?.style.removeProperty('--tl');
        vids.forEach((v) => v?.pause());
      };
    },
    [cinema],
    { eager: true, enabled: cinema },
  );

  return (
    <section
      ref={ref}
      aria-label={label}
      data-header="dark"
      data-mode={cinema ? 'cinema' : 'stack'}
      className="journey on-ink"
    >
      <div data-stage className="journey-stage">
        <div className="journey-shade" aria-hidden="true" />

        {chapters.map((c, i) => (
          <article key={c.id} data-chapter className="chapter" aria-labelledby={`chapter-${c.id}`}>
            <div data-media className="chapter-media">
              {media[i]}
              {cinema && videos[i] && (
                <video
                  data-src={videos[i] ?? undefined}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: 'url(#duotone-ink)' }}
                />
              )}
            </div>

            <Reveal className="chapter-body">
              <div className="wrap chapter-inner">
                <div data-copy className="chapter-copy">
                  <h2 id={`chapter-${c.id}`} className="chapter-name font-display text-white">
                    <span className="sr-only">{c.city}</span>
                    <span aria-hidden="true" className="chapter-letters">
                      {Array.from(c.city).map((ch, k) => (
                        <span key={k} data-letter className="inline-block">
                          {ch}
                        </span>
                      ))}
                    </span>
                  </h2>
                  <p data-meta className="label mt-4 text-sky">
                    {c.coords} · {c.years}
                  </p>
                  <p
                    data-text
                    className="mt-6 max-w-[46ch] text-[1.125rem] leading-[1.6] text-white"
                  >
                    {c.text}
                  </p>
                </div>
              </div>
            </Reveal>
          </article>
        ))}

        <div className="journey-axis wrap">
          <TimelineAxis {...timeline} />
        </div>
      </div>

      <div className="wrap pb-20">
        <TimelineList {...timeline} />
      </div>
    </section>
  );
}

export default Journey;
