import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { StaticSurface } from '@/components/three/StaticSurface';
import { site } from '@/config/site';
import { getContent } from '@/content';
import { localePath } from '@/lib/i18n';
import { fontVariables } from './fonts';
import './globals.css';

const en = getContent('en').notFound;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${en.title} — Martin Avila Technologies`,
  description: en.meta.description,
  robots: { index: false },
};

/** The other languages, offered as one quiet line each. */
const others = (['fr', 'es'] as const).map((locale) => ({
  locale,
  ...getContent(locale).notFound,
}));

/**
 * 404 for unmatched URLs in every language. The site has one root layout per
 * language, so this page is its own document. Navy, the signature surface as a
 * still frame at 30 % opacity, no animation. English first, then FR and ES,
 * since the visitor's language is not known here.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="on-ink">
        <main className="serif-page relative isolate flex min-h-[100svh] flex-col overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-30">
            <StaticSurface className="h-full w-full" />
          </div>

          <div className="wrap pt-8">
            <Link href="/" className="inline-block text-[20px]">
              <Logo variant="lockup" tone="dark" />
            </Link>
          </div>

          <div className="wrap flex flex-1 flex-col justify-center py-20">
            <p className="label text-sky">{en.label}</p>
            <h1 className="text-404 mt-6 text-white">{en.title}</h1>
            <p className="mt-6 max-w-[40ch] text-white/85">{en.text}</p>
            <Link
              href="/"
              className="btn btn-solid mt-10 self-start font-mono text-[0.8125rem] tracking-[0.08em] uppercase"
            >
              {en.home.label}
            </Link>

            <ul className="mt-16 space-y-2 border-t border-[var(--line)] pt-6">
              {others.map((o) => (
                <li key={o.locale} lang={o.locale} className="label text-sky">
                  <span className="text-white/70">{o.title}</span>
                  <span aria-hidden="true"> · </span>
                  <Link href={localePath(o.locale, o.home.href)} className="link">
                    {o.home.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </body>
    </html>
  );
}
