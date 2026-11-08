import { CaseDiagram } from '@/components/diagrams/CaseDiagram';
import { CountDown } from '@/components/motion/CountDown';
import { Reveal } from '@/components/motion/Reveal';
import { ScrubDraw } from '@/components/motion/ScrubDraw';
import { SectionLabel } from '@/components/SectionLabel';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/** Scene 7, § 05: one large case study (Heroics Capital) and two short ones. No screenshots. */
export function SelectedWork({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const w = t.home.work;
  const c = w.feature;
  const rows = [
    { label: c.clientLabel, value: c.client },
    { label: c.problemLabel, value: c.problem },
    { label: c.builtLabel, value: c.built },
  ];

  return (
    <section className="py-24 md:py-32" aria-labelledby="work-title">
      <div className="wrap">
        <SectionLabel number={w.number} label={w.label} />
        <h2 id="work-title" className="sr-only">
          {w.label}
        </h2>

        <article className="grid-12 mt-12 gap-y-14" aria-labelledby="work-feature-title">
          <div className="col-span-12 lg:col-span-6">
            <p className="label text-accent">{c.meta}</p>
            <h3 id="work-feature-title" className="mt-5 text-h1">
              {c.title}
            </h3>

            <dl className="hairlines mt-10 border-y border-rule">
              {rows.map((row) => (
                <div key={row.label} className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr]">
                  <dt className="label pt-1 text-muted">{row.label}</dt>
                  <dd className="measure">{row.value}</dd>
                </div>
              ))}
              <div className="grid gap-4 py-7">
                <dt className="label text-muted">{c.resultLabel}</dt>
                <dd>
                  <span
                    className="block font-display leading-none whitespace-nowrap text-ink tabular-nums"
                    style={{ fontSize: 'clamp(2.25rem, 1.1rem + 3.4vw, 4rem)' }}
                  >
                    {c.resultFrom} <span className="text-accent">→</span>{' '}
                    <CountDown final={c.resultTo} />
                  </span>
                  <span className="mt-4 block max-w-[44ch] text-muted">{c.resultCaption}</span>
                </dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr]">
                <dt className="label pt-1 text-muted">{c.stackLabel}</dt>
                <dd className="label text-ink">{c.stack}</dd>
              </div>
            </dl>
          </div>

          <ScrubDraw className="col-span-12 self-center lg:col-span-5 lg:col-start-8">
            <CaseDiagram locale={locale} className="mx-auto h-auto w-full max-w-[480px]" />
          </ScrubDraw>
        </article>

        <Reveal stagger className="mt-20 grid border-t border-rule md:grid-cols-2">
          {w.others.map((item, i) => (
            <article
              key={item.title}
              className={`pt-8 pb-2 ${i > 0 ? 'mt-8 border-t border-rule md:mt-0 md:border-t-0 md:border-l md:pl-10' : 'md:pr-10'}`}
            >
              <p className="label text-accent">{item.meta}</p>
              <h3 className="mt-4 text-h2">{item.title}</h3>
              <p className="measure mt-4 text-muted">{item.text}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default SelectedWork;
