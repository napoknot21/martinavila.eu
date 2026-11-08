import Link from 'next/link';
import { ServiceDiagram } from '@/components/diagrams/ServiceDiagram';
import { Reveal } from '@/components/motion/Reveal';
import { ProcessSteps } from '@/components/services/ProcessSteps';
import { ServicesNav } from '@/components/services/ServicesNav';
import { getContent } from '@/content';
import { localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export function servicesPageMetadata(locale: Locale) {
  return pageMetadata(locale, '/services', getContent(locale).services.meta, true);
}

/** /services: read, not watched. Reveals once, diagrams draw on entry, sticky left column. */
export function ServicesPage({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const lp = (href: string) => localePath(locale, href);
  const s = t.services;

  return (
    <>
      {/* Hero */}
      <section className="pt-[calc(var(--header-h)+4rem)] pb-14 md:pt-[calc(var(--header-h)+6rem)] md:pb-20">
        <div className="wrap">
          <p className="label text-accent">{s.label}</p>
          <h1 className="mt-6 text-display">{s.title}</h1>
          <p className="mt-6 max-w-[46ch] text-h3 text-muted">{s.intro}</p>
          <div className="mt-10">
            <ServicesNav
              label={s.navLabel}
              items={s.items.map(({ id, short }) => ({ id, short }))}
            />
          </div>
        </div>
      </section>

      {/* Five services, separated by full-width hairlines */}
      {s.items.map((item) => (
        <section
          key={item.id}
          id={item.id}
          aria-labelledby={`${item.id}-title`}
          className="scroll-mt-[var(--header-h)] border-t border-rule py-16 md:py-24"
        >
          <div className="wrap grid-12 gap-y-10">
            <div className="col-span-12 self-start lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:col-span-4">
              <p className="label text-accent">{item.number}</p>
              <h2 id={`${item.id}-title`} className="mt-4 max-w-[14ch] text-h1">
                {item.name}
              </h2>
              <p className="label mt-6 text-muted">
                {s.audienceLabel} <span className="normal-case">{item.audience}</span>
              </p>
            </div>

            <Reveal stagger className="col-span-12 lg:col-span-8 lg:col-start-5">
              <p className="measure text-[1.125rem] leading-[1.6] text-ink">{item.body}</p>

              <div className="mt-10">
                <h3 className="label text-muted">{s.includedLabel}</h3>
                <ul className="hairlines mt-4 border-y border-rule">
                  {item.included.map((line) => (
                    <li key={line} className="py-3.5 text-ink">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              {item.proof && (
                <p className="label mt-8 flex flex-wrap gap-x-3 text-ink">
                  <span className="text-accent">{s.proofLabel}</span>
                  <span>{item.proof}</span>
                </p>
              )}
              {item.note && <p className="mt-8 text-[0.875rem] text-muted">{item.note}</p>}

              <div className="mt-12 max-w-[440px]">
                <ServiceDiagram id={item.id} width={440} className="h-auto w-full" />
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* How a project runs */}
      <section data-header="dark" className="on-ink py-24 md:py-32" aria-labelledby="process-title">
        <div className="wrap">
          <h2 id="process-title" className="text-h1 text-white">
            {s.process.title}
          </h2>
          <ProcessSteps steps={s.process.steps} />
          <p className="label mt-16 border-t border-line pt-6 text-sky">{s.process.trust}</p>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 md:py-32" aria-labelledby="services-cta-title">
        <Reveal stagger className="wrap">
          <h2 id="services-cta-title" className="max-w-[20ch] text-h1">
            {s.cta.title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-h3 text-muted">{s.cta.text}</p>
          <div className="mt-10">
            <Link href={lp(s.cta.button.href)} className="btn btn-solid min-h-12 px-7">
              {s.cta.button.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
