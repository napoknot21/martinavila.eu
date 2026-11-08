/**
 * Shape of every locale file. `content/en.ts` is the reference; future
 * `content/fr.ts` and `content/es.ts` must satisfy the same type.
 */

export type ServiceId = 'platforms' | 'data' | 'ai' | 'quant' | 'web';

export type DiagramId = ServiceId;

export interface Link {
  label: string;
  href: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface Service {
  id: ServiceId;
  number: string;
  name: string;
  /** Short anchor label on /services, e.g. "Platforms". */
  short: string;
  /** One sentence for the home page table of contents. */
  summary: string;
  /** "For:" line. */
  audience: string;
  body: string;
  included: string[];
  /** Proof line, set in mono. */
  proof?: string;
  /** Small muted note. */
  note?: string;
}

export interface Chapter {
  /** Lower-case key, also the image / video file name. */
  id: 'paris' | 'brest' | 'luxembourg' | 'dublin';
  city: string;
  /** Display coordinates, e.g. "48.8566° N, 2.3522° E". */
  coords: string;
  /** Decimal latitude / longitude, used to place the city on the map. */
  lat: number;
  lon: number;
  years: string;
  /** ISO month the chapter starts and ends ("YYYY-MM"); drives the timeline dot. */
  start: string;
  end: string;
  text: string;
  image: string;
  alt: string;
  /** Optional 4–6 s loop; used only if the file exists (checked at build). */
  video?: string;
}

export interface TimelineEntry {
  label: string;
  /** Shorter label for the horizontal axis, when the full one does not fit. */
  short?: string;
  lane: 1 | 2;
  /** ISO months, "YYYY-MM". */
  start: string;
  end: string;
  /** Years as printed in the mobile list. */
  years: string;
  /** Index of the chapter this entry belongs to (0–3). */
  chapter: number;
}

export interface LegalSection {
  heading: string;
  /** Plain text; [label](href) becomes a link (internal paths are localized). */
  paragraphs: string[];
  /** Optional bullet list after the paragraphs (same link syntax). */
  list?: string[];
}

export interface Content {
  meta: {
    siteName: string;
    tagline: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    home: string;
    externalLink: string;
    languages: string;
  };
  nav: {
    services: Link;
    about: Link;
    contact: Link;
  };
  footer: {
    motto: string;
    pagesLabel: string;
    elsewhereLabel: string;
    legalLabel: string;
    copyright: string;
    location: string;
    backToTop: string;
    linkedin: string;
    github: string;
    legal: Link;
    privacy: Link;
  };
  cta: {
    title: string;
    /** The same title split into the lines that rise in. */
    lines: string[];
    button: Link;
  };
  home: {
    meta: PageMeta;
    loaderLabel: string;
    hero: {
      label: string;
      /** Headline, one entry per line. */
      titleLines: string[];
      subtitle: string;
      primary: Link;
      secondary: Link;
      surfaceAlt: string;
    };
    firm: {
      number: string;
      label: string;
      statement: string;
      facts: string;
    };
    services: {
      number: string;
      label: string;
      title: string;
    };
    approach: {
      number: string;
      label: string;
      columns: { title: string; text: string; detail: string; detailLabel: string }[];
    };
    domains: {
      number: string;
      label: string;
      items: { title: string; text: string }[];
    };
    work: {
      number: string;
      label: string;
      feature: {
        meta: string;
        title: string;
        clientLabel: string;
        client: string;
        problemLabel: string;
        problem: string;
        builtLabel: string;
        built: string;
        resultLabel: string;
        resultFrom: string;
        resultTo: string;
        resultCaption: string;
        stackLabel: string;
        stack: string;
        diagram: {
          title: string;
          description: string;
          teams: string[];
          platform: string;
          database: string;
          llm: string;
        };
      };
      others: { meta: string; title: string; text: string }[];
    };
    technologies: {
      number: string;
      label: string;
      groups: { label: string; items: { name: string; slug: string | null }[] }[];
    };
  };
  services: {
    meta: PageMeta;
    label: string;
    title: string;
    intro: string;
    navLabel: string;
    audienceLabel: string;
    includedLabel: string;
    proofLabel: string;
    items: Service[];
    process: {
      title: string;
      steps: { title: string; detail: string }[];
      trust: string;
    };
    cta: {
      title: string;
      text: string;
      button: Link;
    };
  };
  about: {
    meta: PageMeta;
    name: string;
    role: string;
    motto: string;
    route: string;
    linkedin: string;
    scrollHint: string;
    openingImage: string;
    openingAlt: string;
    journeyLabel: string;
    chapters: Chapter[];
    timeline: {
      label: string;
      /** Axis range, ISO months. */
      from: string;
      to: string;
      entries: TimelineEntry[];
    };
    ending: {
      mapTitle: string;
      mapDescription: string;
      title: string;
      button: Link;
    };
  };
  contact: {
    meta: PageMeta;
    label: string;
    title: string;
    intro: string;
    directLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    /** Mono lines under the links. */
    facts: string[];
    form: {
      title: string;
      name: string;
      email: string;
      company: string;
      optional: string;
      projectType: string;
      projectTypes: string[];
      budget: string;
      budgets: string[];
      message: string;
      messagePlaceholder: string;
      consentBefore: string;
      consentLink: string;
      consentAfter: string;
      submit: string;
      sending: string;
      sent: string;
      success: string;
      errorBefore: string;
      errorLink: string;
      errorAfter: string;
      notConfigured: string;
      errors: {
        name: string;
        email: string;
        emailInvalid: string;
        projectType: string;
        message: string;
        consent: string;
        summary: string;
      };
    };
    trust: string[];
  };
  legal: {
    meta: PageMeta;
    title: string;
    updated: string;
    publisherHeading: string;
    publisher: string;
    addressLabel: string;
    contactLabel: string;
    /** May contain [links](/path). */
    contactValue: string;
    vatLabel: string;
    vatCheck: string;
    hostingHeading: string;
    hostingLabel: string;
    sections: LegalSection[];
  };
  privacy: {
    meta: PageMeta;
    title: string;
    updated: string;
    sections: LegalSection[];
  };
  notFound: {
    meta: PageMeta;
    label: string;
    title: string;
    text: string;
    home: Link;
  };
}
