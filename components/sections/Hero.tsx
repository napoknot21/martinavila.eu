import Link from 'next/link';
import { StaticSurface } from '@/components/three/StaticSurface';
import { SurfaceStage } from '@/components/three/SurfaceStage';
import { getContent } from '@/content';
import { localePath, type Locale } from '@/lib/i18n';
import { HeroScroll } from './HeroScroll';

/** Scene 1: navy hero, copy on the left, the signature surface on the right. */
export function Hero({ locale }: { locale: Locale }) {
  const h = getContent(locale).home.hero;
  return (
    <HeroScroll className="on-ink relative flex flex-col overflow-hidden lg:block lg:h-[100svh] lg:min-h-[640px]">
      {/* Signature surface: right 7 columns on desktop, below the copy on mobile. */}
      <div
        data-hero-stage
        className="pointer-events-none relative order-last aspect-[4/3] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[62%]"
      >
        <SurfaceStage>
          <StaticSurface className="h-full w-full" />
        </SurfaceStage>
      </div>
      <p className="sr-only">{h.surfaceAlt}</p>

      <div className="wrap relative z-10 pt-[calc(var(--header-h)+3rem)] pb-6 lg:flex lg:h-full lg:items-center lg:pt-[var(--header-h)] lg:pb-0">
        <div data-hero-copy className="w-full">
          <p className="label text-sky">{h.label}</p>
          <h1 className="mt-6 text-display text-white">
            {h.titleLines.map((line, i) => (
              <span
                key={line}
                className="hero-line block xl:whitespace-nowrap"
                style={{ ['--i' as string]: i }}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-[46ch] text-[1.125rem] leading-[1.6] text-sky">{h.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={localePath(locale, h.primary.href)} className="btn btn-solid">
              {h.primary.label}
            </Link>
            <Link
              href={localePath(locale, h.secondary.href)}
              className="btn border-white text-white hover:bg-white/10"
            >
              {h.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </HeroScroll>
  );
}

export default Hero;
