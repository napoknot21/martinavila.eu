import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { localePath, locales } from '@/lib/i18n';
import { languageAlternates } from '@/lib/metadata';

export const dynamic = 'force-static';

const routes = ['/', '/services', '/about', '/contact', '/legal', '/privacy'];

const absolute = (path: string) => `${site.url}${path === '/' ? '' : path}`;

/** Every page in every language, each with its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((path) =>
    locales.map((locale) => ({
      url: absolute(localePath(locale, path)),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : path === '/legal' || path === '/privacy' ? 0.3 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([l, p]) => [l, absolute(p)]),
        ),
      },
    })),
  );
}
