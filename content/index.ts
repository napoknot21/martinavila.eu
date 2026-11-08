import type { Locale } from '@/lib/i18n';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import type { Content } from './types';

const dictionaries: Record<Locale, Content> = { en, fr, es };

/** All copy for one language. Server-side: never pass the whole object to a client component. */
export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}

export type { Content } from './types';
