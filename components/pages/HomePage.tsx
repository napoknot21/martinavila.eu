import { Loader } from '@/components/Loader';
import { Approach } from '@/components/sections/Approach';
import { CallToAction } from '@/components/sections/CallToAction';
import { Domains } from '@/components/sections/Domains';
import { Firm } from '@/components/sections/Firm';
import { Hero } from '@/components/sections/Hero';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { ServicesIndex } from '@/components/sections/ServicesIndex';
import { Technologies } from '@/components/sections/Technologies';
import { ContourPattern } from '@/components/three/ContourPattern';
import { site } from '@/config/site';
import { getContent } from '@/content';
import { localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export function homePageMetadata(locale: Locale) {
  return pageMetadata(locale, '/', getContent(locale).home.meta, true);
}

export function HomePage({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  /** JSON-LD ProfessionalService. Deliberately no VAT number. */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.tradingName,
    url: `${site.url}${localePath(locale, '/') === '/' ? '' : localePath(locale, '/')}`,
    logo: `${site.url}/icon.svg`,
    description: t.home.meta.description,
    inLanguage: locale,
    founder: { '@type': 'Person', name: site.legalName },
    areaServed: { '@type': 'Place', name: 'Europe' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressCountry: site.countryCode,
    },
    knowsLanguage: ['en', 'fr', 'es'],
    sameAs: [site.linkedin, site.github],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Loader locale={locale} />
      <Hero locale={locale} />
      <Firm
        copy={t.home.firm}
        background={<ContourPattern className="h-full w-full opacity-90" />}
      />
      <ServicesIndex locale={locale} />
      <Approach locale={locale} />
      <Domains locale={locale} />
      <SelectedWork locale={locale} />
      <Technologies locale={locale} />
      <CallToAction locale={locale} />
    </>
  );
}
