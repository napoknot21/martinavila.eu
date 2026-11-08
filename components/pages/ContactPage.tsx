import { ContactForm } from '@/components/contact/ContactForm';
import { site } from '@/config/site';
import { getContent } from '@/content';
import { localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export function contactPageMetadata(locale: Locale) {
  return pageMetadata(locale, '/contact', getContent(locale).contact.meta);
}

/** Thin diagonal arrow (1.25 px stroke), nudged 4 px on hover via .direct-link. */
function Arrow() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="arrow h-[0.6em] w-[0.6em] text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M5 15 L15 5 M7 5 H15 V13" />
    </svg>
  );
}

/**
 * /contact. The visitor came to write: the form is the main channel, nothing
 * moves except one 400 ms fade of the two columns. No email address and no
 * phone number on this page (anti-spam); the legal notice carries the address
 * required by law.
 */
export function ContactPage({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const c = t.contact;
  const links = [
    { label: c.linkedinLabel, href: site.linkedin },
    { label: c.githubLabel, href: site.github },
  ];

  return (
    <section
      aria-labelledby="contact-title"
      className="serif-page pt-[calc(var(--header-h)+3.5rem)] pb-24 md:pt-[calc(var(--header-h)+5.5rem)] md:pb-32"
    >
      <div className="wrap grid-12 gap-y-14">
        <div className="fade-once col-span-12 lg:col-span-5">
          <p className="label text-accent">{c.label}</p>
          <h1 id="contact-title" className="text-contact mt-6 text-ink">
            {c.title}
          </h1>
          <p className="mt-6 max-w-[38ch] text-muted">{c.intro}</p>

          <p className="mt-12 text-ink">{c.directLabel}</p>
          <ul className="hairlines mt-4 border-y border-rule">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-link group flex items-center justify-between gap-4 py-4 font-title text-[1.75rem] leading-tight text-ink hover:text-accent"
                >
                  <span>
                    {l.label}
                    <span className="sr-only"> {t.a11y.externalLink}</span>
                  </span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-1.5">
            {c.facts.map((fact) => (
              <li key={fact} className="label text-muted">
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-once col-span-12 lg:col-span-7">
          <div className="rounded-[4px] border border-rule bg-white p-6 sm:p-10">
            <ContactForm
              copy={c.form}
              privacyHref={localePath(locale, '/privacy')}
              linkedin={site.linkedin}
              formspreeId={site.formspreeId}
              externalHint={t.a11y.externalLink}
            />
          </div>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {c.trust.map((badge) => (
              <li
                key={badge}
                className="label rounded-[4px] border border-rule px-3 py-1.5 text-muted"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
