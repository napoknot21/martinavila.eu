'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/motion/media';

interface RevealProps {
  as?: ElementType;
  className?: string;
  id?: string;
  children: ReactNode;
  /** Reveal each direct child in turn (60 ms apart) instead of the wrapper as one block. */
  stagger?: boolean;
  /** Delay between staggered children, in ms (default 60). */
  step?: number;
  /** Extra delay before the reveal starts, in ms. */
  delay?: number;
}

/**
 * Rises content 24 px and fades it in once, when it enters the viewport
 * (600 ms, power3.out: see `[data-reveal]` in globals.css). SVG shapes with
 * class `draw` inside it stroke themselves in.
 *
 * Content is visible at rest: the hidden start state is applied only by this
 * script, only to blocks still below the fold when it runs, and never with
 * reduced motion. With JavaScript off, everything is simply shown.
 */
export function Reveal({
  as: Tag = 'div',
  className,
  id,
  children,
  stagger = false,
  step = 60,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    // Already on screen when hydrated: leave it alone (no flash).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    if (stagger) {
      Array.from(el.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty('--i', String(i));
      });
    }
    el.querySelectorAll<SVGElement>('.draw').forEach((shape, i) => {
      shape.style.setProperty('--d', String(i));
    });
    el.style.setProperty('--reveal-delay', `${delay}ms`);
    el.style.setProperty('--reveal-step', `${step}ms`);
    el.dataset.reveal = stagger ? 'children' : 'self';
    el.dataset.revealState = 'pending';

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.revealState = 'in';
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stagger, step, delay]);

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

export default Reveal;
