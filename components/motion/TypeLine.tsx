'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion/media';

interface TypeLineProps {
  text: string;
  /** Spoken equivalent (e.g. for formulas). Defaults to the text. */
  label?: string;
  className?: string;
  /** Delay before typing starts once visible, in ms. */
  delay?: number;
  /** Time per character, in ms. */
  speed?: number;
}

/**
 * A mono line that types itself once it enters the viewport. The full text
 * is rendered (and stays) as an in-flow ghost, so there is no layout shift
 * and the line is complete without JavaScript or with reduced motion.
 */
export function TypeLine({ text, label, className = '', delay = 0, speed = 20 }: TypeLineProps) {
  const ghostRef = useRef<HTMLSpanElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ghost = ghostRef.current;
    const typed = typedRef.current;
    if (!ghost || !typed || prefersReducedMotion()) return;
    if (ghost.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    ghost.style.visibility = 'hidden';
    const chars = Array.from(text);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        timer = setTimeout(() => {
          let n = 0;
          interval = setInterval(() => {
            n += 1;
            typed.textContent = chars.slice(0, n).join('');
            if (n >= chars.length) clearInterval(interval);
          }, speed);
        }, delay);
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(ghost);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      clearInterval(interval);
      ghost.style.visibility = '';
      typed.textContent = '';
    };
  }, [text, delay, speed]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span ref={ghostRef} aria-hidden="true">
        {text}
      </span>
      <span ref={typedRef} aria-hidden="true" className="absolute inset-0 whitespace-pre" />
      <span className="sr-only">{label ?? text}</span>
    </span>
  );
}

export default TypeLine;
