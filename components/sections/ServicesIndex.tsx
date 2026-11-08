import Link from 'next/link';
import { ServiceDiagram } from '@/components/diagrams/ServiceDiagram';
import { Reveal } from '@/components/motion/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { getContent } from '@/content';
import { localePath, type Locale } from '@/lib/i18n';

/**
 * Scene 4, § 02: the five services as an annual-report contents page.
 * Desktop: on hover the row's diagram slides in and draws itself, and the row
 * gets a faint white fill (CSS, see .toc-row). Mobile: diagrams are always
 * shown, drawn once on entry. Rows reveal with a 60 ms stagger.
 */
export function ServicesIndex({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const s = t.home.services;
  return (
    <section className="py-24 md:py-32" aria-labelledby="services-index-title">
      <div className="wrap">
        <SectionLabel number={s.number} label={s.label} />
        <h2 id="services-index-title" className="mt-8 text-h1">
          {s.title}
        </h2>

        <Reveal as="ol" stagger className="hairlines mt-12 border-y border-rule">
          {t.services.items.map((item) => (
            <li key={item.id}>
              <Link
                href={localePath(locale, `/services#${item.id}`)}
                className="toc-row grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-4 py-7 md:-mx-4 md:grid-cols-[3.5rem_minmax(0,1.3fr)_minmax(0,1fr)_9rem_1.5rem] md:items-center md:gap-x-6 md:px-4 md:py-8"
              >
                <span className="label pt-2 text-muted md:pt-0">{item.number}</span>
                <span className="font-display text-h2 text-ink">{item.name}</span>
                <span
                  aria-hidden="true"
                  className="toc-arrow col-start-3 row-start-1 pt-1 text-h3 text-accent md:col-start-5 md:pt-0"
                >
                  →
                </span>
                <span className="col-span-2 col-start-2 text-muted md:col-span-1 md:col-start-3 md:row-start-1">
                  {item.summary}
                </span>
                <span className="toc-diagram col-span-2 col-start-2 block w-36 md:col-span-1 md:col-start-4 md:row-start-1 md:w-full">
                  <ServiceDiagram id={item.id} className="h-auto w-full" />
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default ServicesIndex;
