import { Reveal } from '@/components/motion/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { getContent } from '@/content';
import type { Locale } from '@/lib/i18n';
import { iconFor, TECH_SPRITE_URL, techSymbolId } from '@/lib/techIcons';

/** Scene 8, § 06: monochrome logos grouped under four mono labels. No marquee. */
export function Technologies({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const s = t.home.technologies;
  return (
    <section className="py-24 md:py-32" aria-labelledby="tech-title">
      <div className="wrap">
        <SectionLabel number={s.number} label={s.label} />
        <h2 id="tech-title" className="sr-only">
          {s.label}
        </h2>

        <div className="hairlines mt-12 border-y border-rule">
          {s.groups.map((group) => (
            <Reveal
              stagger
              key={group.label}
              className="grid gap-y-6 py-8 md:grid-cols-[14rem_1fr] md:items-center"
            >
              <h3 className="label text-muted">{group.label}</h3>
              <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-6">
                {group.items.map((item) => {
                  const icon = iconFor(item.slug);
                  return (
                    <li key={item.name} className="group flex flex-col items-start gap-2 text-ink">
                      {icon ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-7 w-7 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden="true"
                          focusable="false"
                          fill="currentColor"
                        >
                          <use href={`${TECH_SPRITE_URL}#${techSymbolId(item.slug ?? '')}`} />
                        </svg>
                      ) : (
                        <span
                          aria-hidden="true"
                          className="flex h-7 items-center font-mono text-[13px] font-medium opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          {item.name}
                        </span>
                      )}
                      <span className="text-[0.8125rem] text-muted">{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Technologies;
