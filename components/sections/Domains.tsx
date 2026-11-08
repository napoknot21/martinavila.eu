import { Reveal } from '@/components/motion/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';

/** Scene 6, § 04: four application domains, separated by vertical hairlines. */
export function Domains({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const d = t.home.domains;
  return (
    <section className="py-24 md:py-32" aria-labelledby="domains-title">
      <div className="wrap">
        <SectionLabel number={d.number} label={d.label} />
        <h2 id="domains-title" className="sr-only">
          {d.label}
        </h2>
        <Reveal
          as="ul"
          stagger
          className="mt-12 grid border-y border-rule md:grid-cols-2 lg:grid-cols-4"
        >
          {d.items.map((item) => (
            <li
              key={item.title}
              className="border-t border-rule py-8 first:border-t-0 md:odd:pr-6 md:even:border-l md:even:pl-6 lg:border-t-0 lg:border-l lg:px-6 lg:py-10 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 md:[&:nth-child(2)]:border-t-0"
            >
              <h3 className="text-h3 font-normal text-ink md:text-[1.375rem]">{item.title}</h3>
              <p className="mt-3 max-w-[30ch] text-muted">{item.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default Domains;
