import { FactList, LegalPage } from '@/components/LegalPage';
import { RichText } from '@/components/RichText';
import { site } from '@/config/site';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export function legalNoticePageMetadata(locale: Locale) {
  return pageMetadata(locale, '/legal', getContent(locale).legal.meta);
}

const VIES_URL = 'https://ec.europa.eu/taxation_customs/vies/';

/**
 * Legal notice (EU e-Commerce Directive, Art. 5, as applied in Ireland).
 * Every value comes from config/site.ts. No email address is published
 * anywhere on the site: contact goes through the form.
 */
export function LegalNoticePage({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const l = t.legal;
  const hint = t.a11y.externalLink;

  const provider = [
    {
      label: l.addressLabel,
      value: <span className="whitespace-pre-line">{site.businessAddress}</span>,
    },
    {
      label: l.contactLabel,
      value: <RichText text={l.contactValue} locale={locale} externalHint={hint} />,
    },
    {
      label: l.vatLabel,
      value: (
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="tabular">{site.vatNumber}</span>
          <a href={VIES_URL} target="_blank" rel="noopener noreferrer" className="link">
            {l.vatCheck}
            <span className="sr-only"> {hint}</span>
          </a>
        </span>
      ),
    },
  ];

  return (
    <LegalPage
      locale={locale}
      title={l.title}
      updated={l.updated}
      externalHint={hint}
      sections={l.sections}
    >
      <section>
        <h2 className="text-h2 text-ink">{l.publisherHeading}</h2>
        <p className="mt-4 text-ink">{l.publisher}</p>
        <FactList items={provider} />
      </section>
      <section>
        <h2 className="text-h2 text-ink">{l.hostingHeading}</h2>
        <FactList
          items={[
            {
              label: l.hostingLabel,
              value: (
                <>
                  {site.hosting.name}
                  <br />
                  <span className="whitespace-pre-line text-muted">{site.hosting.address}</span>
                </>
              ),
            },
          ]}
        />
      </section>
    </LegalPage>
  );
}
