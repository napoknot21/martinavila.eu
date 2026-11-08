import { Reveal } from '@/components/motion/Reveal';
import { TypeLine } from '@/components/motion/TypeLine';
import { SectionLabel } from '@/components/SectionLabel';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/** Scene 5, § 03: navy band, three columns revealed 150 ms apart; each mono line types itself. */
export function Approach({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const a = t.home.approach;
  return (
    <section data-header="dark" className="on-ink py-24 md:py-32" aria-labelledby="approach-title">
      <div className="wrap">
        <SectionLabel number={a.number} label={a.label} />
        <h2 id="approach-title" className="sr-only">
          {a.label}
        </h2>
        <Reveal
          stagger
          step={150}
          className="mt-12 grid gap-y-12 md:grid-cols-3 md:gap-x-10 lg:gap-x-16"
        >
          {a.columns.map((col, i) => (
            <div key={col.title} className="border-t border-line pt-6">
              <h3 className="text-h2 text-white">{col.title}</h3>
              <p className="mt-4 max-w-[36ch] text-sky">{col.text}</p>
              <p className="mt-8 font-mono text-[0.8125rem] tracking-[0.08em] text-white tabular-nums">
                <TypeLine text={col.detail} label={col.detailLabel} delay={500 + i * 150} />
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default Approach;
