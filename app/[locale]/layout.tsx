import { notFound } from 'next/navigation';
import { SiteDocument, siteMetadata, siteViewport } from '@/components/SiteDocument';
import { isLocale, prefixedLocales } from '@/lib/i18n';
import '../globals.css';

/** Root layout for the prefixed languages: /fr and /es. */
export const dynamicParams = false;
export const viewport = siteViewport;

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? siteMetadata(locale) : {};
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
