import { MagneticLink } from '@/components/MagneticLink';
import { Reveal } from '@/components/motion/Reveal';
import { getContent } from '@/content';
import { localePath, type Locale } from '@/lib/i18n';

/** Scene 9: full-screen navy call to action. The two title lines rise in. */
export function CallToAction({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section
      data-header="dark"
      className="on-ink flex min-h-[80svh] items-center py-24 md:min-h-[100svh]"
      aria-labelledby="cta-title"
    >
      <div className="wrap text-center">
        <Reveal as="h2" stagger id="cta-title" className="mx-auto text-white">
          {t.cta.lines.map((line) => (
            <span
              key={line}
              className="block"
              style={{ fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 4rem)', lineHeight: 1.08 }}
            >
              {line}
            </span>
          ))}
        </Reveal>
        <div className="mt-12 flex justify-center">
          <MagneticLink
            href={localePath(locale, t.cta.button.href)}
            className="btn btn-solid min-h-14 px-9 text-base"
          >
            {t.cta.button.label}
            <span aria-hidden="true">→</span>
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
