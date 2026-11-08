import type { Content } from './types';

/**
 * All English copy. Components never hard-code text; they read from here.
 * Private values (email, address, VAT) are injected from `config/site.ts`.
 */
export const en: Content = {
  meta: {
    siteName: 'Martin Avila Technologies',
    tagline: 'Software engineered with mathematical precision.',
    description:
      'Martin Avila Technologies designs and builds software for companies in every industry, engineered with mathematical precision. A Dublin-based firm working across Europe in English, French and Spanish.',
  },

  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main',
    home: 'Martin Avila Technologies, home',
    externalLink: '(opens in a new tab)',
    languages: 'Language',
  },

  nav: {
    services: { label: 'Services', href: '/services' },
    about: { label: 'About', href: '/about' },
    contact: { label: 'Contact', href: '/contact' },
  },

  footer: {
    motto: 'Software engineered with mathematical precision.',
    pagesLabel: 'Site',
    elsewhereLabel: 'Elsewhere',
    legalLabel: 'Legal',
    copyright: '© 2026 Martin Avila Technologies',
    location: 'Dublin, Ireland',
    backToTop: 'Back to top',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    legal: { label: 'Legal notice', href: '/legal' },
    privacy: { label: 'Privacy policy', href: '/privacy' },
  },

  cta: {
    title: 'Have a system to build?',
    lines: ['Have a system', 'to build?'],
    button: { label: 'Start a project', href: '/contact' },
  },

  home: {
    meta: {
      title: 'Martin Avila Technologies — Software engineered with mathematical precision',
      description:
        'We design and build platforms, data systems, AI tools and websites for companies across Europe, in any industry.',
    },
    loaderLabel: 'Loading Martin Avila Technologies',
    hero: {
      label: 'Engineering · Mathematics · Applied',
      titleLines: ['Software engineered', 'with mathematical precision.'],
      subtitle:
        'We design and build platforms, data systems, AI tools and websites for companies across Europe, in any industry.',
      primary: { label: 'Start a project', href: '/contact' },
      secondary: { label: 'Our services', href: '/services' },
      surfaceAlt:
        'Illustration: a slowly moving wireframe landscape, a function of two variables that turns into a contour map as you scroll.',
    },
    firm: {
      number: '§ 01',
      label: 'The firm',
      statement:
        'Martin Avila Technologies is an engineering firm based in Dublin. We build reliable software for teams whose work depends on data, in finance, science, industry and beyond. Every system is designed with the rigour of a mathematician and the pragmatism of an engineer.',
      facts: 'Dublin, Ireland · EU VAT registered · English · Français · Español',
    },
    services: {
      number: '§ 02',
      label: 'Services',
      title: 'What we build',
    },
    approach: {
      number: '§ 03',
      label: 'Approach',
      columns: [
        {
          title: 'Engineering',
          text: 'Production software, not prototypes: typed, tested, documented and handed over cleanly.',
          detail: 'LATENCY 10s → <1s',
          detailLabel: 'Latency brought from 10 seconds to under one second',
        },
        {
          title: 'Mathematics',
          text: 'Models you can trust: probability, statistics and numerical methods behind every number we compute.',
          detail: '∂u/∂t = Δu',
          detailLabel:
            'The heat equation: the partial derivative of u with respect to t equals the Laplacian of u',
        },
        {
          title: 'Applied',
          text: 'Proven in very different worlds: a hedge fund, an ocean-science lab, an automotive AI team.',
          detail: 'FINANCE · SCIENCE · MOBILITY',
          detailLabel: 'Finance, science, mobility',
        },
      ],
    },
    domains: {
      number: '§ 04',
      label: 'Where it applies',
      items: [
        {
          title: 'Finance',
          text: 'Portfolio, risk and reporting platforms; research and backtesting tooling.',
        },
        {
          title: 'Science and research',
          text: 'Data acquisition, processing pipelines and scientific computing.',
        },
        {
          title: 'Industry and mobility',
          text: 'Computer-vision datasets, simulation tooling and automation.',
        },
        {
          title: 'Companies and services',
          text: 'Internal tools, automation and websites for growing teams.',
        },
      ],
    },
    work: {
      number: '§ 05',
      label: 'Selected work',
      feature: {
        meta: 'Case study · Finance · Luxembourg · 2025–2026',
        title: 'A single portfolio platform for a hedge fund',
        clientLabel: 'Client',
        client: 'Heroics Capital',
        problemLabel: 'Problem',
        problem:
          'Portfolio managers, risk, compliance and middle office worked across fragmented tools and manual processes.',
        builtLabel: 'Built',
        built:
          'A centralised platform for trade management, compliance documentation, risk monitoring and reporting, with automation services, email workflows and Python API integrations, plus an LLM pipeline that classifies market emails by sentiment for each stock and index.',
        resultLabel: 'Result',
        resultFrom: '10 s',
        resultTo: 'under 1 s',
        resultCaption:
          'response time on key operations after caching and data-processing optimisation',
        stackLabel: 'Stack',
        stack:
          'Python · Polars · Pandas · PostgreSQL · Supabase · Streamlit · PyTorch · Ollama · Docker',
        diagram: {
          title: 'Platform architecture',
          description:
            'Four teams (portfolio management, risk, compliance and middle office) feed one central platform, which connects to a PostgreSQL database and an LLM sentiment service.',
          teams: ['PM', 'Risk', 'Compliance', 'Middle Office'],
          platform: 'Platform',
          database: 'PostgreSQL',
          llm: 'LLM sentiment',
        },
      },
      others: [
        {
          meta: 'Science · Ifremer',
          title: 'Kosmos',
          text: 'Contributed to the full-stack development of an underwater data-logging platform with Ifremer and KonkArLab: JavaScript front end, Python back end, PostgreSQL.',
        },
        {
          meta: 'Mobility · Valeo',
          title: 'Simulation data labelling',
          text: 'Built an interactive tool to review driving-simulation videos, label segments and generate training datasets for perception models (Python, OpenCV, Pandas).',
        },
      ],
    },
    technologies: {
      number: '§ 06',
      label: 'Technologies',
      groups: [
        {
          label: 'Languages',
          items: [
            { name: 'Python', slug: 'python' },
            { name: 'TypeScript', slug: 'typescript' },
            { name: 'C++', slug: 'cplusplus' },
            { name: 'Java', slug: null },
            { name: 'OCaml', slug: 'ocaml' },
            { name: 'Go', slug: 'go' },
          ],
        },
        {
          label: 'Data and ML',
          items: [
            { name: 'Pandas', slug: 'pandas' },
            { name: 'Polars', slug: 'polars' },
            { name: 'NumPy', slug: 'numpy' },
            { name: 'PyTorch', slug: 'pytorch' },
            { name: 'scikit-learn', slug: 'scikitlearn' },
            { name: 'TensorFlow', slug: 'tensorflow' },
          ],
        },
        {
          label: 'Back end and storage',
          items: [
            { name: 'PostgreSQL', slug: 'postgresql' },
            { name: 'MySQL', slug: 'mysql' },
            { name: 'Supabase', slug: 'supabase' },
            { name: 'Spring Boot', slug: 'springboot' },
            { name: 'Node.js', slug: 'nodedotjs' },
          ],
        },
        {
          label: 'Delivery',
          items: [
            { name: 'React', slug: 'react' },
            { name: 'Next.js', slug: 'nextdotjs' },
            { name: 'Streamlit', slug: 'streamlit' },
            { name: 'Docker', slug: 'docker' },
            { name: 'Git', slug: 'git' },
          ],
        },
      ],
    },
  },

  services: {
    meta: {
      title: 'Services — Martin Avila Technologies',
      description:
        'Custom software and platforms, data engineering and automation, applied AI, quantitative and scientific computing, and websites. Five services, each grounded in work already delivered in production.',
    },
    label: '§ Services',
    title: 'What we build',
    intro: 'Five services, each grounded in work already delivered in production.',
    navLabel: 'Services on this page',
    audienceLabel: 'For:',
    includedLabel: 'What’s included',
    proofLabel: 'Proof',
    items: [
      {
        id: 'platforms',
        number: '01',
        name: 'Custom software and platforms',
        short: 'Platforms',
        summary: 'Internal tools and business platforms that replace spreadsheets and manual work.',
        audience: 'SMEs, scale-ups, research teams, finance teams',
        body: 'We replace spreadsheets and manual processes with a reliable web application your team actually wants to use: one source of truth, clear workflows, an audit trail.',
        included: [
          'Requirements workshops with the people who will use it',
          'Business logic and database design',
          'Role-based access',
          'Deployment and handover with documentation',
        ],
        proof: 'Portfolio platform in daily use at a hedge fund',
      },
      {
        id: 'data',
        number: '02',
        name: 'Data engineering and automation',
        short: 'Data',
        summary: 'Pipelines, integrations and automated reporting, and slow systems made fast.',
        audience: 'Teams losing hours to reporting, copy-paste or slow tools',
        body: 'We automate the work nobody should do by hand: data pipelines, API integrations, scheduled reports, email workflows. And when an application is too slow, we find out why and fix it.',
        included: [
          'Pipeline design and scheduling',
          'Integrations with your existing tools and APIs',
          'Automated reports and alerts',
          'Performance audits and optimisation',
        ],
        proof: 'Key operations from ~10 s to under 1 s',
      },
      {
        id: 'ai',
        number: '03',
        name: 'Applied AI and machine learning',
        short: 'AI',
        summary:
          'Models and language-model pipelines that classify, extract and predict, hosted locally if needed.',
        audience: 'Companies with large volumes of documents, emails, images or video',
        body: 'Classification, extraction, summarisation and prediction with machine-learning and language models, hosted on your own infrastructure when your data cannot leave it.',
        included: [
          'Feasibility study on your data',
          'Model or LLM pipeline',
          'Evaluation you can read',
          'Integration into your tools',
        ],
        proof: 'LLM sentiment pipeline on market emails · Video datasets for automotive perception',
      },
      {
        id: 'quant',
        number: '04',
        name: 'Quantitative and scientific computing',
        short: 'Quant',
        summary:
          'Modelling, simulation, optimisation and analytics, from research labs to trading desks.',
        audience: 'Research labs, engineering teams, funds and fintechs',
        body: 'We turn mathematical models into dependable software: statistical modelling, simulation, optimisation, time-series analysis, backtesting and analytics dashboards.',
        included: [
          'Model implementation and validation',
          'Simulation and Monte Carlo tooling',
          'Optimisation',
          'Research dashboards',
        ],
        note: 'We build software. We do not provide investment advice or trading signals.',
      },
      {
        id: 'web',
        number: '05',
        name: 'Websites and web applications',
        short: 'Web',
        summary: 'Fast, precise, custom-built sites and web apps, designed like this one.',
        audience: 'Companies and independent professionals',
        body: 'Fast, precise, custom-built websites and web apps, designed with the same care as this one.',
        included: [
          'Design and build',
          'Content structure',
          'Performance and accessibility',
          'Hosting setup',
        ],
      },
    ],
    process: {
      title: 'How a project runs',
      steps: [
        { title: 'Discovery call', detail: 'Free, 30 minutes, to understand the problem.' },
        { title: 'Written proposal', detail: 'Scope, timeline, fixed price or daily rate.' },
        { title: 'Build', detail: 'Weekly demos, you see progress every week.' },
        {
          title: 'Handover',
          detail: 'Documentation, full code ownership, optional support.',
        },
      ],
      trust: 'NDA on request · EU VAT registered (VIES) · English · Français · Español',
    },
    cta: {
      title: 'Not sure which service fits?',
      text: 'Describe the problem; we’ll tell you honestly whether we can help.',
      button: { label: 'Start a project', href: '/contact' },
    },
  },

  about: {
    meta: {
      title: 'About — Martin Avila Technologies',
      description:
        'Charly Martin-Avila, founder of Martin Avila Technologies. Mathematician by training, engineer by trade: Paris, Brest, Luxembourg, Dublin.',
    },
    name: 'Charly Martin-Avila',
    role: 'Founder, Martin Avila Technologies',
    motto: 'Mathematician by training, engineer by trade.',
    route: 'Paris → Brest → Luxembourg → Dublin',
    linkedin: 'LinkedIn',
    scrollHint: 'Scroll',
    openingImage: '/images/dublin-dusk.jpg',
    openingAlt: 'Dublin at dusk',
    journeyLabel: 'Four cities',
    chapters: [
      {
        id: 'paris',
        city: 'Paris',
        coords: '48.8566° N, 2.3522° E',
        lat: 48.8566,
        lon: 2.3522,
        years: '2020–2023',
        start: '2020-09',
        end: '2023-09',
        text: 'A double BSc in Computer Science and Mathematics at Université Paris Cité: algorithms and probability, side by side from day one. Then a first AI software internship at Valeo Vision, building a tool to label driving-simulation videos and produce training datasets.',
        image: '/images/paris.jpg',
        alt: 'Paris rooftops along the Seine',
        video: '/videos/paris.mp4',
      },
      {
        id: 'brest',
        city: 'Brest',
        coords: '48.3904° N, 4.4861° W',
        lat: 48.3904,
        lon: -4.4861,
        years: '2023–2027',
        start: '2023-09',
        end: '2025-07',
        text: 'An engineering degree at IMT Atlantique, specialising in software engineering and distributed systems. Real projects with real users, including Kosmos, an underwater data-logging platform built with Ifremer.',
        image: '/images/brest.jpg',
        alt: 'The harbour of Brest facing the Atlantic',
        video: '/videos/brest.mp4',
      },
      {
        id: 'luxembourg',
        city: 'Luxembourg',
        coords: '49.6116° N, 6.1319° E',
        lat: 49.6116,
        lon: 6.1319,
        years: '2025–2026',
        start: '2025-07',
        end: '2026-09',
        text: 'Fourteen months at Heroics Capital, a hedge fund: a portfolio platform used daily by investment and operations teams, a language-model sentiment pipeline, and key operations brought from ten seconds to under one.',
        image: '/images/luxembourg.jpg',
        alt: 'The old town of Luxembourg City',
        video: '/videos/luxembourg.mp4',
      },
      {
        id: 'dublin',
        city: 'Dublin',
        coords: '53.3498° N, 6.2603° W',
        lat: 53.3498,
        lon: -6.2603,
        years: '2026–',
        start: '2026-09',
        end: '2027-08',
        text: 'An MSc in Computer Science, Intelligent Systems, at Trinity College Dublin, alongside an MSc in Mathematics at Sorbonne Université, studied remotely. And the founding of Martin Avila Technologies.',
        // Same photo as the opening until a separate Liffey shot is added.
        image: '/images/dublin-dusk.jpg',
        alt: "Dublin's River Liffey at dusk",
        video: '/videos/dublin.mp4',
      },
    ],
    timeline: {
      label: 'Timeline, 2020 to 2027',
      from: '2020-01',
      to: '2027-12',
      entries: [
        {
          label: 'Paris Cité',
          lane: 1,
          start: '2020-09',
          end: '2023-06',
          years: '2020–2023',
          chapter: 0,
        },
        {
          label: 'IMT Atlantique',
          lane: 1,
          start: '2023-09',
          end: '2027-06',
          years: '2023–2027',
          chapter: 1,
        },
        {
          label: 'Trinity College Dublin',
          lane: 1,
          start: '2026-09',
          end: '2027-08',
          years: '2026–2027',
          chapter: 3,
        },
        {
          label: 'Valeo Vision',
          lane: 2,
          start: '2022-06',
          end: '2022-07',
          years: '2022',
          chapter: 0,
        },
        {
          label: 'Heroics Capital',
          lane: 2,
          start: '2025-07',
          end: '2026-08',
          years: '2025–2026',
          chapter: 2,
        },
        {
          label: 'Sorbonne Université (remote)',
          short: 'Sorbonne (remote)',
          lane: 2,
          start: '2026-09',
          end: '2027-06',
          years: '2026–2027',
          chapter: 3,
        },
      ],
    },
    ending: {
      mapTitle: 'Map of western Europe',
      mapDescription: 'A route drawn from Paris to Brest, then Luxembourg, ending in Dublin.',
      title: 'Now building for clients across Europe.',
      button: { label: 'Work with me', href: '/contact' },
    },
  },

  contact: {
    meta: {
      title: 'Contact',
      description:
        'Discuss your project with Martin Avila Technologies. Based in Dublin, working across Europe. Reply within one business day.',
    },
    label: '§ Contact',
    title: "Let's discuss your project.",
    intro:
      "Tell us what you need to build. You'll get a clear answer within one business day, even if it's 'we're not the right fit'.",
    directLabel: 'Or reach me directly:',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    facts: ['Based in Dublin · Working across Europe', 'Reply within one business day'],
    form: {
      title: 'Project details',
      name: 'Name',
      email: 'Work email',
      company: 'Company',
      optional: 'optional',
      projectType: 'Project type',
      projectTypes: [
        'Custom software',
        'Data & automation',
        'Applied AI',
        'Quant & scientific',
        'Website',
        'Other',
      ],
      budget: 'Budget',
      budgets: ['Under €5k', '€5–15k', '€15–40k', '€40k+', 'Not sure yet'],
      message: 'Message',
      messagePlaceholder: 'What problem should this system solve?',
      consentBefore: 'I agree that my details are used to answer this request. See the ',
      consentLink: 'privacy policy',
      consentAfter: '.',
      submit: 'Send message',
      sending: 'Sending…',
      sent: 'Sent',
      success: "Received. I'll reply within one business day.",
      errorBefore:
        'The message could not be sent. Please try again in a minute, or write to me on ',
      errorLink: 'LinkedIn',
      errorAfter: '.',
      notConfigured: 'The form is not configured yet.',
      errors: {
        name: 'Please enter your name.',
        email: 'Please enter your work email.',
        emailInvalid: 'Please enter an email address like name@company.com.',
        projectType: 'Please choose the type of project.',
        message: 'Please write a few words about your project.',
        consent: 'Please tick the box so your details can be used to reply.',
        summary: 'A few fields need your attention.',
      },
    },
    trust: [
      'EU VAT registered · Verifiable on VIES',
      'English · Français · Español',
      'NDA on request · Fixed price or daily rate',
    ],
  },

  legal: {
    meta: {
      title: 'Legal notice',
      description:
        'Legal notice of martinavila.eu: service provider, business address, VAT number and hosting of Martin Avila Technologies.',
    },
    title: 'Legal notice',
    updated: 'Last updated: 8 November 2026',
    publisherHeading: 'Service provider',
    publisher:
      'Charly Martin-Avila, sole trader, registered for VAT in Ireland. Martin Avila Technologies is the name of this website; contracts and invoices are issued in the name of Charly Martin-Avila.',
    addressLabel: 'Business address',
    contactLabel: 'Contact',
    contactValue: 'Through the [contact form](/contact). Reply within one business day.',
    vatLabel: 'VAT number',
    vatCheck: 'Verify on VIES',
    hostingHeading: 'Hosting',
    hostingLabel: 'Hosting provider',
    sections: [
      {
        heading: 'Nature of the services',
        paragraphs: [
          'Martin Avila Technologies provides software engineering and technology services. It does not provide investment, financial or legal advice.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'Site content © Martin Avila Technologies: text, design, illustrations and code, unless stated otherwise.',
          'Photographs come from Unsplash and Pexels and are used under their respective licences.',
          'Technology logos and names are trademarks of their respective owners. They are shown only to describe the tools we work with.',
        ],
      },
      {
        heading: 'Personal data',
        paragraphs: [
          'How the details you send through the contact form are handled is explained in the [privacy policy](/privacy).',
        ],
      },
    ],
  },

  privacy: {
    meta: {
      title: 'Privacy policy',
      description:
        'How Martin Avila Technologies handles the personal data sent through the contact form of martinavila.eu. No cookies, no tracking.',
    },
    title: 'Privacy policy',
    updated: 'Last updated: 8 November 2026',
    sections: [
      {
        heading: 'Who is responsible',
        paragraphs: [
          'The data controller is Charly Martin-Avila, sole trader, Dublin, Ireland, who publishes this website under the name Martin Avila Technologies.',
          'For any privacy request, use the [contact form](/contact). The postal address is given in the [legal notice](/legal).',
        ],
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'Only what the contact form sends: your name, work email, company (optional), project type, budget range (optional) and message. Nothing else is collected through this site.',
        ],
      },
      {
        heading: 'Why, and on what legal basis',
        paragraphs: [
          'These details are used to answer your request and, if you ask for one, to prepare a proposal. The legal bases are your consent (Article 6(1)(a) GDPR) and steps taken at your request before entering into a contract (Article 6(1)(b) GDPR).',
          'Your data is never sold and never added to a mailing list.',
        ],
      },
      {
        heading: 'Processor',
        paragraphs: [
          'Form submissions are delivered by Formspree (Formspree, Inc., United States), acting as our processor under its data processing agreement, which includes the safeguards required for transfers outside the European Economic Area.',
          'No other third party receives the data you send through the form.',
        ],
      },
      {
        heading: 'How long it is kept',
        paragraphs: [
          'Messages are kept for 24 months after our last exchange, then deleted. If the exchange leads to a contract, the records required for accounting and tax purposes are kept for the period set by law.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: ['Under the GDPR, you have the right to:'],
        list: [
          'access the data held about you;',
          'have it corrected (rectification);',
          'have it deleted (erasure);',
          'restrict its use (restriction);',
          'object to its use (objection);',
          'receive it in a reusable format (portability).',
        ],
      },
      {
        heading: 'How to exercise them',
        paragraphs: [
          'Write through the [contact form](/contact). You can withdraw your consent at any time; this does not affect what was done before. You will get a reply within one month.',
          'You also have the right to complain to the Irish Data Protection Commission: [www.dataprotection.ie](https://www.dataprotection.ie).',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'This site uses no cookies and no tracking. No analytics, advertising or social-media scripts are loaded, which is why there is no cookie banner.',
          "Like any website, the host's servers record technical data, such as IP addresses, to deliver pages and protect the service against abuse.",
        ],
      },
    ],
  },

  notFound: {
    meta: {
      title: 'Page not found',
      description: 'This page does not exist.',
    },
    label: 'Error 404',
    title: 'Page not found',
    text: "This page doesn't exist, or has moved.",
    home: { label: 'Back to home', href: '/' },
  },
};
