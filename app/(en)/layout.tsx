import { SiteDocument, siteMetadata, siteViewport } from '@/components/SiteDocument';
import '../globals.css';

export const metadata = siteMetadata('en');
export const viewport = siteViewport;

/** Root layout for English, served at the site root. */
export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
