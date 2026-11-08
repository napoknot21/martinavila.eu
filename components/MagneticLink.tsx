'use client';

import Link from 'next/link';
import { useRef, type PointerEvent, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/motion/media';

const MAX_PULL = 8;

/** A link with a subtle magnetic hover (max 8 px), desktop pointers only. */
export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `translate(${(dx * MAX_PULL).toFixed(2)}px, ${(dy * MAX_PULL).toFixed(2)}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ transition: 'transform 350ms var(--ease-out), background-color 200ms, color 200ms' }}
    >
      {children}
    </Link>
  );
}

export default MagneticLink;
