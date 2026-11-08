/**
 * Locale helpers with no dictionary imports, so client components can use
 * them without bundling every language. English lives at the root (/services),
 * French and Spanish under a prefix (/fr/services, /es/services).
 */
export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Locales that live under a URL prefix (everything but the default). */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale) as Exclude<
  Locale,
  'en'
>[];

export const localeLabels: Record<Locale, { short: string; name: string; og: string }> = {
  en: { short: 'EN', name: 'English', og: 'en_IE' },
  fr: { short: 'FR', name: 'Français', og: 'fr_FR' },
  es: { short: 'ES', name: 'Español', og: 'es_ES' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** "/services" → "/fr/services" for French; unchanged for English. Keeps #hash. */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale || /^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** "/fr/services" → { locale: 'fr', path: '/services' }. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split('/');
  if (first && isLocale(first) && first !== defaultLocale) {
    return { locale: first, path: `/${rest.join('/')}`.replace(/\/$/, '') || '/' };
  }
  return { locale: defaultLocale, path: pathname || '/' };
}
