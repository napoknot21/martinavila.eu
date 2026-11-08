import Link from 'next/link';
import { site } from '@/config/site';
import { getContent } from '@/content';
import { localePath, type Locale } from '@/lib/i18n';
import { Logo } from './Logo';
import { AnchorLink } from './motion/AnchorLink';

/** Navy footer: identity, site links, elsewhere, then a mono legal row. */
export function Footer({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const lp = (path: string) => localePath(locale, path);
  const pages = [t.nav.services, t.nav.about, t.nav.contact];
  const elsewhere = [
    { label: t.footer.linkedin, href: site.linkedin },
    { label: t.footer.github, href: site.github },
  ];

  return (
    <footer className="on-ink" data-header="dark">
      <div className="wrap grid-12 gap-y-12 pt-16 pb-10 md:pt-20">
        <div className="col-span-12 md:col-span-6">
          <Link href={lp('/')} className="inline-block text-[22px]">
            <Logo variant="lockup" tone="dark" />
          </Link>
          <p className="mt-6 max-w-[30ch] font-display text-h3 text-white italic">
            {t.footer.motto}
          </p>
        </div>

        <nav aria-label={t.footer.pagesLabel} className="col-span-6 md:col-span-3">
          <ul className="space-y-3">
            {pages.map((l) => (
              <li key={l.href}>
                <Link href={lp(l.href)} className="text-white transition-colors hover:text-sky">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 md:col-span-3">
          <ul className="space-y-3" aria-label={t.footer.elsewhereLabel}>
            {elsewhere.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-white transition-colors hover:text-sky"
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className="text-sky transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                  <span className="sr-only">{t.a11y.externalLink}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="label col-span-12 flex flex-col gap-4 border-t border-line pt-6 text-sky md:flex-row md:items-center md:justify-between">
          <p>
            {t.footer.copyright} · {t.footer.location}
          </p>
          <nav aria-label={t.footer.legalLabel}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link href={lp(t.footer.legal.href)} className="hover:text-white">
                  {t.footer.legal.label}
                </Link>
              </li>
              <li>
                <Link href={lp(t.footer.privacy.href)} className="hover:text-white">
                  {t.footer.privacy.label}
                </Link>
              </li>
              <li>
                <AnchorLink href="#top" className="hover:text-white">
                  {t.footer.backToTop} <span aria-hidden="true">↑</span>
                </AnchorLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
