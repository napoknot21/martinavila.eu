'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps, MouseEvent } from 'react';
import { useScrollTo } from './SmoothScroll';

type AnchorLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

/**
 * A Next.js Link that scrolls smoothly when its target is on the current page:
 * `#section` scrolls to that element, `#top` or the current path scrolls to the
 * top. Uses Lenis when available, native smooth scroll otherwise. Links to
 * other pages navigate normally. Without JS it is a plain anchor.
 */
export function AnchorLink({ href, onClick, ...rest }: AnchorLinkProps) {
  const pathname = usePathname();
  const scrollTo = useScrollTo();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== pathname) return;

    const id = decodeURIComponent(url.hash.slice(1));
    const target = id && id !== 'top' ? document.getElementById(id) : null;
    if (id && id !== 'top' && !target) return; // unknown anchor: let the browser handle it

    e.preventDefault();
    // Next frame, so state changes from onClick (e.g. closing the menu) apply first.
    requestAnimationFrame(() => {
      if (target) {
        scrollTo(target);
        window.history.pushState(null, '', `#${id}`);
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      } else {
        scrollTo(0);
        if (window.location.hash) window.history.replaceState(null, '', url.pathname);
      }
    });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}

export default AnchorLink;
