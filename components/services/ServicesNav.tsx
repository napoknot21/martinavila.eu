'use client';

import { useEffect, useState } from 'react';
import { AnchorLink } from '@/components/motion/AnchorLink';

interface ServicesNavProps {
  label: string;
  items: { id: string; short: string }[];
}

/**
 * Mono anchor links to the five service sections. Clicking scrolls smoothly
 * (Lenis or native); the link of the section in view is underlined.
 */
export function ServicesNav({ label, items }: ServicesNavProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    // A section is "in view" while it crosses a band around the middle of the screen.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[visible.length - 1]!.target.id);
        else if (entries.every((e) => !e.isIntersecting) && window.scrollY < 200) setActive(null);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label}>
      <ul className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true">·</span>}
            <AnchorLink
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className="relative py-1 text-ink transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-accent hover:after:scale-x-100 aria-[current=location]:text-accent aria-[current=location]:after:scale-x-100"
            >
              {item.short}
            </AnchorLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ServicesNav;
