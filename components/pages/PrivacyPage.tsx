import { LegalPage } from '@/components/LegalPage';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export function privacyPageMetadata(locale: Locale) {
  return pageMetadata(locale, '/privacy', getContent(locale).privacy.meta);
}

/** GDPR privacy policy. Never prints the email address: it links to /legal. */
export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const p = t.privacy;
  return (
    <LegalPage
      locale={locale}
      title={p.title}
      updated={p.updated}
      externalHint={t.a11y.externalLink}
      sections={p.sections}
    />
  );
}
