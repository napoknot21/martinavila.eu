import * as icons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import { en } from '@/content/en';

/** Resolve a simple-icons slug (e.g. "nodedotjs") at build time. Server-side only. */
export function iconFor(slug: string | null): SimpleIcon | null {
  if (!slug) return null;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  return (icons as unknown as Record<string, SimpleIcon | undefined>)[key] ?? null;
}

export const TECH_SPRITE_URL = '/tech-icons.svg';

/** Symbol id inside the sprite for a slug. */
export const techSymbolId = (slug: string) => `si-${slug}`;

/** One SVG sprite holding every technology logo listed in the content. */
export function techSpriteDocument(): string {
  const slugs = en.home.technologies.groups.flatMap((g) => g.items.map((i) => i.slug));
  const symbols = slugs
    .map((slug) => {
      const icon = iconFor(slug);
      return icon && slug
        ? `<symbol id="${techSymbolId(slug)}" viewBox="0 0 24 24"><path d="${icon.path}"/></symbol>`
        : '';
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`;
}
