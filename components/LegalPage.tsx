import type { ReactNode } from 'react';
import { RichText } from '@/components/RichText';
import type { LegalSection } from '@/content/types';
import type { Locale } from '@/lib/i18n';

/**
 * Plain, readable layout shared by the legal notice and the privacy policy:
 * serif only (Caslon Display titles, Caslon Text 18 px), 65 characters a line,
 * no animation.
 */
export function LegalPage({
  locale,
  title,
  updated,
  externalHint,
  children,
  sections,
}: {
  locale: Locale;
  title: string;
  updated: string;
  externalHint: string;
  children?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <article className="serif-page pt-[calc(var(--header-h)+4rem)] pb-24 md:pt-[calc(var(--header-h)+6rem)] md:pb-32">
      <div className="wrap">
        <div className="prose-text">
          <h1 className="text-h1 text-ink">{title}</h1>
          <p className="label mt-4 text-muted">{updated}</p>
          <div className="mt-14 space-y-14">
            {children}
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-h2 text-ink">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 text-ink">
                    <RichText text={p} locale={locale} externalHint={externalHint} />
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 list-disc space-y-1.5 pl-6 text-ink marker:text-steel">
                    {s.list.map((item) => (
                      <li key={item}>
                        <RichText text={item} locale={locale} externalHint={externalHint} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function FactList({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="hairlines mt-6 border-y border-rule">
      {items.map((item) => (
        <div key={item.label} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
          <dt className="label pt-1.5 text-muted">{item.label}</dt>
          <dd className="min-w-0 text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
