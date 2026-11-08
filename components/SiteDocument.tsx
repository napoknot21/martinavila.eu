import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { fontVariables } from '@/app/fonts';
import { DuotoneFilter } from '@/components/DuotoneImage';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LOADER_SCRIPT } from '@/components/Loader';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { site } from '@/config/site';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/** Site-wide metadata for one language (each root layout exports it). */
export function siteMetadata(locale: Locale): Metadata {
  const t = getContent(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.home.meta.title, template: `%s — ${t.meta.siteName}` },
    description: t.meta.description,
    applicationName: t.meta.siteName,
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const siteViewport: Viewport = {
  themeColor: '#0B2545',
  colorScheme: 'light',
};

/**
 * The <html> document shared by every language: fonts, skip link, header,
 * footer and smooth scrolling. Each language has its own root layout so the
 * static HTML carries the right lang attribute.
 */
export function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getContent(locale);
  return (
    // suppressHydrationWarning: the inline script sets data-loader before hydration.
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SCRIPT }} />
        <a href="#main" className="skip-link">
          {t.a11y.skipToContent}
        </a>
        <DuotoneFilter />
        <SmoothScroll>
          <Header copy={{ nav: t.nav, a11y: t.a11y, location: t.footer.location }} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} />
        </SmoothScroll>
      </body>
    </html>
  );
}
