import { existsSync } from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { EuropeMap } from '@/components/about/EuropeMap';
import { EuropeRoute } from '@/components/about/EuropeRoute';
import { Journey } from '@/components/about/Journey';
import { DuotoneImage } from '@/components/DuotoneImage';
import { LogoMark } from '@/components/Logo';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/config/site';
import { getContent } from '@/content';
import { localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export function aboutPageMetadata(locale: Locale) {
  return pageMetadata(locale, '/about', getContent(locale).about.meta, true);
}

/** True when a file exists in /public (checked at build time; the site is static). */
const inPublic = (file: string) => existsSync(path.join(process.cwd(), 'public', file));

/**
 * /about: a scroll-driven story through four cities. No photo of the founder:
 * only generic city photos through the navy duotone (navy placeholders until
 * the files are added).
 */
export function AboutPage({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const lp = (href: string) => localePath(locale, href);
  const a = t.about;

  return (
    <>
      {/* Scene 1: opening */}
      <section
        data-header="dark"
        className="on-ink relative h-[100svh] min-h-[620px] overflow-hidden"
        aria-labelledby="about-title"
      >
        <div className="opening-media absolute inset-0">
          <DuotoneImage
            src={a.openingImage}
            alt={a.openingAlt}
            width={2400}
            height={1350}
            fill
            priority
          />
        </div>
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(90deg, rgb(11 37 69 / 0.94) 0%, rgb(11 37 69 / 0.72) 38%, rgb(11 37 69 / 0) 70%), linear-gradient(0deg, rgb(11 37 69 / 0.85) 0%, rgb(11 37 69 / 0) 45%)',
          }}
        />

        <div className="wrap relative flex h-full flex-col justify-end pb-24 md:pb-28">
          <div className="opening-lines">
            <LogoMark tone="dark" className="h-12 w-12" />
            <h1 id="about-title" className="mt-8 text-display text-white">
              {a.name}
            </h1>
            <p className="label mt-4 text-sky">{a.role}</p>
            <p className="mt-6 max-w-[28ch] font-display text-h2 text-white italic">{a.motto}</p>
            <p className="label mt-6 text-sky">{a.route}</p>
            <p className="mt-6">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-white underline decoration-sky/60 underline-offset-4 hover:decoration-white"
              >
                {a.linkedin}
                <span aria-hidden="true" className="text-sky">
                  ↗
                </span>
                <span className="sr-only">{t.a11y.externalLink}</span>
              </a>
            </p>
          </div>
        </div>

        <div
          className="scroll-hint label absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-sky"
          aria-hidden="true"
        >
          {a.scrollHint}
          <span className="scroll-line block h-10 w-px bg-sky" />
        </div>
      </section>

      {/* Scene 2: the journey */}
      <Journey
        label={a.journeyLabel}
        chapters={a.chapters}
        media={a.chapters.map((c) => (
          <DuotoneImage
            key={c.id}
            src={c.image}
            alt={c.alt}
            width={2400}
            height={1350}
            fill
            sizes="100vw"
          />
        ))}
        videos={a.chapters.map((c) => (c.video && inPublic(c.video) ? c.video : null))}
        timeline={a.timeline}
      />

      {/* Scene 3: Europe */}
      <section className="py-24 md:py-32" aria-labelledby="about-ending-title">
        <div className="wrap grid-12 items-center gap-y-14">
          <EuropeRoute className="col-span-12 lg:col-span-7">
            <EuropeMap
              chapters={a.chapters}
              title={a.ending.mapTitle}
              description={a.ending.mapDescription}
            />
          </EuropeRoute>
          <Reveal stagger className="col-span-12 lg:col-span-4 lg:col-start-9">
            <h2 id="about-ending-title" className="text-h1">
              {a.ending.title}
            </h2>
            <div className="mt-10">
              <Link href={lp(a.ending.button.href)} className="btn btn-solid min-h-12 px-7">
                {a.ending.button.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
