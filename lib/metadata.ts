import type { Metadata } from 'next';
import { getContent } from '@/content';
import type { PageMeta } from '@/content/types';
import { defaultLocale, localeLabels, localePath, locales, type Locale } from '@/lib/i18n';

/** hreflang map for one path: every language, plus x-default (English). */
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = localePath(l, path);
  map['x-default'] = localePath(defaultLocale, path);
  return map;
}

/**
 * Per-page metadata: localized canonical URL, hreflang alternates, and
 * Open Graph / Twitter text. `path` is the route without locale ("/services").
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  meta: PageMeta,
  absoluteTitle = false,
): Metadata {
  const t = getContent(locale);
  const url = localePath(locale, path);
  return {
    title: absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: 'website',
      siteName: t.meta.siteName,
      locale: localeLabels[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].og),
      url,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}
