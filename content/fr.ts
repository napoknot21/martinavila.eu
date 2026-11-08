import type { Content } from './types';

/**
 * Textes en français. Même structure que `content/en.ts` (la référence).
 * Les espaces insécables précèdent « : ; ? ! » selon l'usage français.
 */
export const fr: Content = {
  meta: {
    siteName: 'Martin Avila Technologies',
    tagline: 'Des logiciels conçus avec une précision mathématique.',
    description:
      'Martin Avila Technologies conçoit et développe des logiciels pour les entreprises de tous les secteurs, avec une précision mathématique. Basée à Dublin, elle travaille dans toute l’Europe, en anglais, en français et en espagnol.',
  },

  a11y: {
    skipToContent: 'Aller au contenu',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    mainNav: 'Navigation principale',
    home: 'Martin Avila Technologies, accueil',
    externalLink: '(s’ouvre dans un nouvel onglet)',
    languages: 'Langue',
  },

  nav: {
    services: { label: 'Services', href: '/services' },
    about: { label: 'À propos', href: '/about' },
    contact: { label: 'Contact', href: '/contact' },
  },

  footer: {
    motto: 'Des logiciels conçus avec une précision mathématique.',
    pagesLabel: 'Site',
    elsewhereLabel: 'Réseaux',
    legalLabel: 'Informations légales',
    copyright: '© 2026 Martin Avila Technologies',
    location: 'Dublin, Irlande',
    backToTop: 'Haut de page',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    legal: { label: 'Mentions légales', href: '/legal' },
    privacy: { label: 'Confidentialité', href: '/privacy' },
  },

  cta: {
    title: 'Un système à construire ?',
    lines: ['Un système', 'à construire ?'],
    button: { label: 'Démarrer un projet', href: '/contact' },
  },

  home: {
    meta: {
      title: 'Martin Avila Technologies — Des logiciels conçus avec une précision mathématique',
      description:
        'Nous concevons et développons des plateformes, des systèmes de données, des outils d’IA et des sites web pour les entreprises de toute l’Europe, quel que soit leur secteur.',
    },
    loaderLabel: 'Chargement de Martin Avila Technologies',
    hero: {
      label: 'Ingénierie · Mathématiques · Applications',
      titleLines: ['Des logiciels conçus', 'avec une précision mathématique.'],
      subtitle:
        'Nous concevons et développons des plateformes, des systèmes de données, des outils d’IA et des sites web pour les entreprises de toute l’Europe, quel que soit leur secteur.',
      primary: { label: 'Démarrer un projet', href: '/contact' },
      secondary: { label: 'Nos services', href: '/services' },
      surfaceAlt:
        'Illustration : un paysage filaire qui bouge lentement, une fonction de deux variables qui devient une carte de courbes de niveau au défilement.',
    },
    firm: {
      number: '§ 01',
      label: 'L’entreprise',
      statement:
        'Martin Avila Technologies est une société d’ingénierie basée à Dublin. Nous développons des logiciels fiables pour les équipes dont le travail dépend des données, en finance, en sciences, dans l’industrie et au-delà. Chaque système est conçu avec la rigueur d’un mathématicien et le pragmatisme d’un ingénieur.',
      facts: 'Dublin, Irlande · TVA intracommunautaire · English · Français · Español',
    },
    services: {
      number: '§ 02',
      label: 'Services',
      title: 'Ce que nous construisons',
    },
    approach: {
      number: '§ 03',
      label: 'Approche',
      columns: [
        {
          title: 'Ingénierie',
          text: 'Du logiciel de production, pas des prototypes : typé, testé, documenté et livré proprement.',
          detail: 'LATENCE 10 s → <1 s',
          detailLabel: 'Latence ramenée de 10 secondes à moins d’une seconde',
        },
        {
          title: 'Mathématiques',
          text: 'Des modèles fiables : probabilités, statistiques et méthodes numériques derrière chaque chiffre que nous calculons.',
          detail: '∂u/∂t = Δu',
          detailLabel:
            'L’équation de la chaleur : la dérivée partielle de u par rapport à t est égale au laplacien de u',
        },
        {
          title: 'Applications',
          text: 'Éprouvé dans des mondes très différents : un hedge fund, un laboratoire d’océanographie, une équipe d’IA automobile.',
          detail: 'FINANCE · SCIENCES · MOBILITÉ',
          detailLabel: 'Finance, sciences, mobilité',
        },
      ],
    },
    domains: {
      number: '§ 04',
      label: 'Domaines d’application',
      items: [
        {
          title: 'Finance',
          text: 'Plateformes de portefeuille, de risque et de reporting ; outils de recherche et de backtesting.',
        },
        {
          title: 'Sciences et recherche',
          text: 'Acquisition de données, chaînes de traitement et calcul scientifique.',
        },
        {
          title: 'Industrie et mobilité',
          text: 'Jeux de données de vision par ordinateur, outils de simulation et automatisation.',
        },
        {
          title: 'Entreprises et services',
          text: 'Outils internes, automatisation et sites web pour les équipes en croissance.',
        },
      ],
    },
    work: {
      number: '§ 05',
      label: 'Réalisations',
      feature: {
        meta: 'Étude de cas · Finance · Luxembourg · 2025–2026',
        title: 'Une plateforme de portefeuille unique pour un hedge fund',
        clientLabel: 'Client',
        client: 'Heroics Capital',
        problemLabel: 'Problème',
        problem:
          'Les gérants de portefeuille, le risque, la conformité et le middle office travaillaient avec des outils dispersés et des processus manuels.',
        builtLabel: 'Réalisé',
        built:
          'Une plateforme centralisée pour la gestion des opérations, la documentation de conformité, le suivi des risques et le reporting, avec des services d’automatisation, des workflows e-mail et des intégrations d’API en Python, ainsi qu’une chaîne LLM qui classe les e-mails de marché par sentiment pour chaque action et chaque indice.',
        resultLabel: 'Résultat',
        resultFrom: '10 s',
        resultTo: 'moins d’1 s',
        resultCaption:
          'temps de réponse des opérations clés après mise en cache et optimisation du traitement des données',
        stackLabel: 'Stack',
        stack:
          'Python · Polars · Pandas · PostgreSQL · Supabase · Streamlit · PyTorch · Ollama · Docker',
        diagram: {
          title: 'Architecture de la plateforme',
          description:
            'Quatre équipes (gestion de portefeuille, risque, conformité et middle office) alimentent une plateforme centrale, reliée à une base PostgreSQL et à un service de sentiment par LLM.',
          teams: ['PM', 'Risques', 'Conformité', 'Middle Office'],
          platform: 'Plateforme',
          database: 'PostgreSQL',
          llm: 'Sentiment LLM',
        },
      },
      others: [
        {
          meta: 'Sciences · Ifremer',
          title: 'Kosmos',
          text: 'Contribution au développement full-stack d’une plateforme d’enregistrement de données sous-marines avec l’Ifremer et KonkArLab : front end en JavaScript, back end en Python, PostgreSQL.',
        },
        {
          meta: 'Mobilité · Valeo',
          title: 'Annotation de données de simulation',
          text: 'Un outil interactif pour revoir des vidéos de simulation de conduite, annoter des séquences et générer des jeux de données d’entraînement pour des modèles de perception (Python, OpenCV, Pandas).',
        },
      ],
    },
    technologies: {
      number: '§ 06',
      label: 'Technologies',
      groups: [
        {
          label: 'Langages',
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
          label: 'Données et ML',
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
          label: 'Back-end et stockage',
          items: [
            { name: 'PostgreSQL', slug: 'postgresql' },
            { name: 'MySQL', slug: 'mysql' },
            { name: 'Supabase', slug: 'supabase' },
            { name: 'Spring Boot', slug: 'springboot' },
            { name: 'Node.js', slug: 'nodedotjs' },
          ],
        },
        {
          label: 'Livraison',
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
        'Logiciels et plateformes sur mesure, ingénierie des données et automatisation, IA appliquée, calcul quantitatif et scientifique, et sites web. Cinq services, tous fondés sur des réalisations déjà en production.',
    },
    label: '§ Services',
    title: 'Ce que nous construisons',
    intro: 'Cinq services, tous fondés sur des réalisations déjà en production.',
    navLabel: 'Services sur cette page',
    audienceLabel: 'Pour :',
    includedLabel: 'Ce qui est inclus',
    proofLabel: 'Preuve',
    items: [
      {
        id: 'platforms',
        number: '01',
        name: 'Logiciels et plateformes sur mesure',
        short: 'Plateformes',
        summary:
          'Des outils internes et des plateformes métier qui remplacent les tableurs et le travail manuel.',
        audience: 'PME, scale-ups, équipes de recherche, équipes finance',
        body: 'Nous remplaçons les tableurs et les processus manuels par une application web fiable que votre équipe a vraiment envie d’utiliser : une source unique de vérité, des workflows clairs, une piste d’audit.',
        included: [
          'Ateliers de cadrage avec les personnes qui l’utiliseront',
          'Logique métier et conception de la base de données',
          'Accès par rôles',
          'Déploiement et passation avec documentation',
        ],
        proof: 'Plateforme de portefeuille utilisée chaque jour dans un hedge fund',
      },
      {
        id: 'data',
        number: '02',
        name: 'Ingénierie des données et automatisation',
        short: 'Données',
        summary:
          'Pipelines, intégrations et reporting automatisé, et des systèmes lents rendus rapides.',
        audience:
          'Les équipes qui perdent des heures en reporting, en copier-coller ou avec des outils lents',
        body: 'Nous automatisons le travail que personne ne devrait faire à la main : pipelines de données, intégrations d’API, rapports planifiés, workflows e-mail. Et quand une application est trop lente, nous trouvons pourquoi et nous la corrigeons.',
        included: [
          'Conception et planification des pipelines',
          'Intégrations avec vos outils et API existants',
          'Rapports et alertes automatisés',
          'Audits de performance et optimisation',
        ],
        proof: 'Opérations clés de ~10 s à moins d’1 s',
      },
      {
        id: 'ai',
        number: '03',
        name: 'IA appliquée et machine learning',
        short: 'IA',
        summary:
          'Des modèles et des chaînes de modèles de langage qui classent, extraient et prédisent, hébergés en local si besoin.',
        audience:
          'Les entreprises qui traitent de grands volumes de documents, d’e-mails, d’images ou de vidéos',
        body: 'Classification, extraction, résumé et prédiction avec des modèles de machine learning et de langage, hébergés sur votre propre infrastructure quand vos données ne peuvent pas en sortir.',
        included: [
          'Étude de faisabilité sur vos données',
          'Modèle ou chaîne LLM',
          'Une évaluation lisible',
          'Intégration dans vos outils',
        ],
        proof:
          'Chaîne LLM de sentiment sur des e-mails de marché · Jeux de données vidéo pour la perception automobile',
      },
      {
        id: 'quant',
        number: '04',
        name: 'Calcul quantitatif et scientifique',
        short: 'Quant',
        summary:
          'Modélisation, simulation, optimisation et analyse, des laboratoires de recherche aux salles de marché.',
        audience: 'Laboratoires de recherche, équipes d’ingénierie, fonds et fintechs',
        body: 'Nous transformons des modèles mathématiques en logiciels fiables : modélisation statistique, simulation, optimisation, analyse de séries temporelles, backtesting et tableaux de bord analytiques.',
        included: [
          'Implémentation et validation de modèles',
          'Outils de simulation et de Monte-Carlo',
          'Optimisation',
          'Tableaux de bord de recherche',
        ],
        note: 'Nous développons des logiciels. Nous ne fournissons ni conseil en investissement ni signaux de trading.',
      },
      {
        id: 'web',
        number: '05',
        name: 'Sites et applications web',
        short: 'Web',
        summary:
          'Des sites et applications web rapides, précis et sur mesure, conçus comme celui-ci.',
        audience: 'Entreprises et professionnels indépendants',
        body: 'Des sites et applications web rapides, précis et sur mesure, conçus avec le même soin que celui-ci.',
        included: [
          'Conception et développement',
          'Structure des contenus',
          'Performance et accessibilité',
          'Mise en place de l’hébergement',
        ],
      },
    ],
    process: {
      title: 'Le déroulement d’un projet',
      steps: [
        {
          title: 'Appel de découverte',
          detail: 'Gratuit, 30 minutes, pour comprendre le problème.',
        },
        {
          title: 'Proposition écrite',
          detail: 'Périmètre, calendrier, prix forfaitaire ou taux journalier.',
        },
        {
          title: 'Développement',
          detail: 'Démonstrations hebdomadaires, vous voyez l’avancement chaque semaine.',
        },
        {
          title: 'Passation',
          detail: 'Documentation, propriété complète du code, support en option.',
        },
      ],
      trust: 'NDA sur demande · TVA intracommunautaire (VIES) · English · Français · Español',
    },
    cta: {
      title: 'Vous ne savez pas quel service choisir ?',
      text: 'Décrivez le problème ; nous vous dirons honnêtement si nous pouvons vous aider.',
      button: { label: 'Démarrer un projet', href: '/contact' },
    },
  },

  about: {
    meta: {
      title: 'À propos — Martin Avila Technologies',
      description:
        'Charly Martin-Avila, fondateur de Martin Avila Technologies. Mathématicien de formation, ingénieur de métier : Paris, Brest, Luxembourg, Dublin.',
    },
    name: 'Charly Martin-Avila',
    role: 'Fondateur, Martin Avila Technologies',
    motto: 'Mathématicien de formation, ingénieur de métier.',
    route: 'Paris → Brest → Luxembourg → Dublin',
    linkedin: 'LinkedIn',
    scrollHint: 'Défiler',
    openingImage: '/images/dublin-dusk.jpg',
    openingAlt: 'Dublin au crépuscule',
    journeyLabel: 'Quatre villes',
    chapters: [
      {
        id: 'paris',
        city: 'Paris',
        coords: '48,8566° N · 2,3522° E',
        lat: 48.8566,
        lon: 2.3522,
        years: '2020–2023',
        start: '2020-09',
        end: '2023-09',
        text: 'Une double licence en informatique et mathématiques à l’Université Paris Cité : algorithmes et probabilités, côte à côte dès le premier jour. Puis un premier stage en logiciel d’IA chez Valeo Vision, pour créer un outil d’annotation de vidéos de simulation de conduite et produire des jeux de données d’entraînement.',
        image: '/images/paris.jpg',
        alt: 'Les toits de Paris le long de la Seine',
        video: '/videos/paris.mp4',
      },
      {
        id: 'brest',
        city: 'Brest',
        coords: '48,3904° N · 4,4861° O',
        lat: 48.3904,
        lon: -4.4861,
        years: '2023–2027',
        start: '2023-09',
        end: '2025-07',
        text: 'Un diplôme d’ingénieur à IMT Atlantique, spécialisé en génie logiciel et systèmes distribués. De vrais projets avec de vrais utilisateurs, dont Kosmos, une plateforme d’enregistrement de données sous-marines développée avec l’Ifremer.',
        image: '/images/brest.jpg',
        alt: 'Le port de Brest face à l’Atlantique',
        video: '/videos/brest.mp4',
      },
      {
        id: 'luxembourg',
        city: 'Luxembourg',
        coords: '49,6116° N · 6,1319° E',
        lat: 49.6116,
        lon: 6.1319,
        years: '2025–2026',
        start: '2025-07',
        end: '2026-09',
        text: 'Quatorze mois chez Heroics Capital, un hedge fund : une plateforme de portefeuille utilisée chaque jour par les équipes d’investissement et d’opérations, une chaîne de sentiment par modèle de langage, et des opérations clés ramenées de dix secondes à moins d’une.',
        image: '/images/luxembourg.jpg',
        alt: 'La vieille ville de Luxembourg',
        video: '/videos/luxembourg.mp4',
      },
      {
        id: 'dublin',
        city: 'Dublin',
        coords: '53,3498° N · 6,2603° O',
        lat: 53.3498,
        lon: -6.2603,
        years: '2026–',
        start: '2026-09',
        end: '2027-08',
        text: 'Un MSc en informatique, spécialité systèmes intelligents, au Trinity College Dublin, en parallèle d’un master de mathématiques à Sorbonne Université, suivi à distance. Et la création de Martin Avila Technologies.',
        image: '/images/dublin-dusk.jpg',
        alt: 'La Liffey à Dublin au crépuscule',
        video: '/videos/dublin.mp4',
      },
    ],
    timeline: {
      label: 'Frise chronologique, de 2020 à 2027',
      from: '2020-01',
      to: '2027-12',
      entries: [
        {
          label: 'Université Paris Cité',
          short: 'Paris Cité',
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
          label: 'Sorbonne Université (à distance)',
          short: 'Sorbonne (à distance)',
          lane: 2,
          start: '2026-09',
          end: '2027-06',
          years: '2026–2027',
          chapter: 3,
        },
      ],
    },
    ending: {
      mapTitle: 'Carte de l’Europe de l’Ouest',
      mapDescription: 'Un trajet de Paris à Brest, puis Luxembourg, jusqu’à Dublin.',
      title: 'Aujourd’hui au service de clients dans toute l’Europe.',
      button: { label: 'Travailler ensemble', href: '/contact' },
    },
  },

  contact: {
    meta: {
      title: 'Contact',
      description:
        'Parlez de votre projet avec Martin Avila Technologies. Basée à Dublin, active dans toute l’Europe. Réponse sous un jour ouvré.',
    },
    label: '§ Contact',
    title: 'Parlons de votre projet.',
    intro:
      'Dites-nous ce que vous devez construire. Vous recevrez une réponse claire sous un jour ouvré, même si c’est « nous ne sommes pas les bons interlocuteurs ».',
    directLabel: 'Ou écrivez-moi directement :',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    facts: ['Basée à Dublin · Active dans toute l’Europe', 'Réponse sous un jour ouvré'],
    form: {
      title: 'Votre projet',
      name: 'Nom',
      email: 'E-mail professionnel',
      company: 'Entreprise',
      optional: 'facultatif',
      projectType: 'Type de projet',
      projectTypes: [
        'Logiciel sur mesure',
        'Données et automatisation',
        'IA appliquée',
        'Quantitatif et scientifique',
        'Site web',
        'Autre',
      ],
      budget: 'Budget',
      budgets: ['Moins de 5 k€', '5–15 k€', '15–40 k€', '40 k€ et plus', 'Je ne sais pas encore'],
      message: 'Message',
      messagePlaceholder: 'Quel problème ce système doit-il résoudre ?',
      consentBefore:
        'J’accepte que mes informations soient utilisées pour répondre à cette demande. Voir la ',
      consentLink: 'politique de confidentialité',
      consentAfter: '.',
      submit: 'Envoyer le message',
      sending: 'Envoi…',
      sent: 'Envoyé',
      success: 'Bien reçu. Je vous réponds sous un jour ouvré.',
      errorBefore:
        'Le message n’a pas pu être envoyé. Réessayez dans une minute, ou écrivez-moi sur ',
      errorLink: 'LinkedIn',
      errorAfter: '.',
      notConfigured: 'Le formulaire n’est pas encore configuré.',
      errors: {
        name: 'Indiquez votre nom.',
        email: 'Indiquez votre e-mail professionnel.',
        emailInvalid: 'Indiquez une adresse e-mail comme nom@entreprise.com.',
        projectType: 'Choisissez le type de projet.',
        message: 'Écrivez quelques mots sur votre projet.',
        consent: 'Cochez la case pour que vos informations puissent servir à vous répondre.',
        summary: 'Quelques champs sont à compléter.',
      },
    },
    trust: [
      'Assujettie à la TVA UE · Vérifiable sur VIES',
      'English · Français · Español',
      'NDA sur demande · Forfait ou taux journalier',
    ],
  },

  legal: {
    meta: {
      title: 'Mentions légales',
      description:
        'Mentions légales de martinavila.eu : prestataire, adresse professionnelle, numéro de TVA et hébergeur de Martin Avila Technologies.',
    },
    title: 'Mentions légales',
    updated: 'Dernière mise à jour : 8 novembre 2026',
    publisherHeading: 'Prestataire',
    publisher:
      'Charly Martin-Avila, entrepreneur individuel (sole trader), assujetti à la TVA en Irlande. Martin Avila Technologies est le nom de ce site ; les contrats et factures sont établis au nom de Charly Martin-Avila.',
    addressLabel: 'Adresse professionnelle',
    contactLabel: 'Contact',
    contactValue: 'Par le [formulaire de contact](/contact). Réponse sous un jour ouvré.',
    vatLabel: 'Numéro de TVA',
    vatCheck: 'Vérifier sur VIES',
    hostingHeading: 'Hébergement',
    hostingLabel: 'Hébergeur',
    sections: [
      {
        heading: 'Nature des services',
        paragraphs: [
          'Martin Avila Technologies fournit des services d’ingénierie logicielle et de technologie. Elle ne fournit aucun conseil en investissement, financier ou juridique.',
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        paragraphs: [
          'Contenu du site © Martin Avila Technologies : textes, design, illustrations et code, sauf mention contraire.',
          'Les photographies proviennent d’Unsplash et de Pexels et sont utilisées selon leurs licences respectives.',
          'Les logos et noms de technologies sont des marques de leurs propriétaires respectifs. Ils servent uniquement à décrire les outils que nous utilisons.',
        ],
      },
      {
        heading: 'Données personnelles',
        paragraphs: [
          'Le traitement des informations envoyées par le formulaire de contact est expliqué dans la [politique de confidentialité](/privacy).',
        ],
      },
    ],
  },

  privacy: {
    meta: {
      title: 'Politique de confidentialité',
      description:
        'Comment Martin Avila Technologies traite les données personnelles envoyées par le formulaire de contact de martinavila.eu. Aucun cookie, aucun pistage.',
    },
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : 8 novembre 2026',
    sections: [
      {
        heading: 'Responsable du traitement',
        paragraphs: [
          'Le responsable du traitement est Charly Martin-Avila, entrepreneur individuel, Dublin, Irlande, qui publie ce site sous le nom Martin Avila Technologies.',
          'Pour toute demande relative à vos données, utilisez le [formulaire de contact](/contact). L’adresse postale figure dans les [mentions légales](/legal).',
        ],
      },
      {
        heading: 'Ce que nous collectons',
        paragraphs: [
          'Uniquement ce qu’envoie le formulaire de contact : votre nom, votre e-mail professionnel, votre entreprise (facultatif), le type de projet, la fourchette de budget (facultatif) et votre message. Rien d’autre n’est collecté par ce site.',
        ],
      },
      {
        heading: 'Finalité et base légale',
        paragraphs: [
          'Ces informations servent à répondre à votre demande et, si vous le souhaitez, à préparer une proposition. Les bases légales sont votre consentement (article 6, paragraphe 1, point a du RGPD) et les mesures précontractuelles prises à votre demande (article 6, paragraphe 1, point b du RGPD).',
          'Vos données ne sont jamais vendues ni ajoutées à une liste de diffusion.',
        ],
      },
      {
        heading: 'Sous-traitant',
        paragraphs: [
          'Les envois du formulaire sont acheminés par Formspree (Formspree, Inc., États-Unis), qui agit comme sous-traitant en vertu de son accord de traitement des données, lequel prévoit les garanties requises pour les transferts hors de l’Espace économique européen.',
          'Aucun autre tiers ne reçoit les données envoyées par le formulaire.',
        ],
      },
      {
        heading: 'Durée de conservation',
        paragraphs: [
          'Les messages sont conservés 24 mois après notre dernier échange, puis supprimés. Si l’échange aboutit à un contrat, les pièces exigées à des fins comptables et fiscales sont conservées pendant la durée prévue par la loi.',
        ],
      },
      {
        heading: 'Vos droits',
        paragraphs: ['Le RGPD vous donne le droit :'],
        list: [
          'd’accéder aux données qui vous concernent ;',
          'de les faire corriger (rectification) ;',
          'de les faire supprimer (effacement) ;',
          'd’en limiter l’utilisation (limitation) ;',
          'de vous opposer à leur utilisation (opposition) ;',
          'de les recevoir dans un format réutilisable (portabilité).',
        ],
      },
      {
        heading: 'Comment les exercer',
        paragraphs: [
          'Écrivez-nous via le [formulaire de contact](/contact). Vous pouvez retirer votre consentement à tout moment, sans effet sur ce qui a été fait auparavant. Vous recevrez une réponse dans un délai d’un mois.',
          'Vous pouvez aussi introduire une réclamation auprès de la Data Protection Commission irlandaise : [www.dataprotection.ie](https://www.dataprotection.ie).',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'Ce site n’utilise aucun cookie et aucun pistage. Aucun script de mesure d’audience, de publicité ou de réseau social n’est chargé : c’est pourquoi il n’y a pas de bandeau cookies.',
          'Comme pour tout site web, les serveurs de l’hébergeur enregistrent des données techniques, comme les adresses IP, pour servir les pages et protéger le service contre les abus.',
        ],
      },
    ],
  },

  notFound: {
    meta: {
      title: 'Page introuvable',
      description: 'Cette page n’existe pas.',
    },
    label: 'Erreur 404',
    title: 'Page introuvable',
    text: 'Cette page n’existe pas, ou a été déplacée.',
    home: { label: 'Retour à l’accueil', href: '/' },
  },
};
