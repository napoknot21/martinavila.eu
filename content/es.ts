import type { Content } from './types';

/** Textos en español. Misma estructura que `content/en.ts` (la referencia). */
export const es: Content = {
  meta: {
    siteName: 'Martin Avila Technologies',
    tagline: 'Software diseñado con precisión matemática.',
    description:
      'Martin Avila Technologies diseña y desarrolla software para empresas de cualquier sector, con precisión matemática. Con sede en Dublín, trabaja en toda Europa en inglés, francés y español.',
  },

  a11y: {
    skipToContent: 'Ir al contenido',
    openMenu: 'Abrir el menú',
    closeMenu: 'Cerrar el menú',
    mainNav: 'Navegación principal',
    home: 'Martin Avila Technologies, inicio',
    externalLink: '(se abre en una pestaña nueva)',
    languages: 'Idioma',
  },

  nav: {
    services: { label: 'Servicios', href: '/services' },
    about: { label: 'Acerca de', href: '/about' },
    contact: { label: 'Contacto', href: '/contact' },
  },

  footer: {
    motto: 'Software diseñado con precisión matemática.',
    pagesLabel: 'Sitio',
    elsewhereLabel: 'Redes',
    legalLabel: 'Información legal',
    copyright: '© 2026 Martin Avila Technologies',
    location: 'Dublín, Irlanda',
    backToTop: 'Volver arriba',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    legal: { label: 'Aviso legal', href: '/legal' },
    privacy: { label: 'Privacidad', href: '/privacy' },
  },

  cta: {
    title: '¿Tiene un sistema que construir?',
    lines: ['¿Tiene un sistema', 'que construir?'],
    button: { label: 'Empezar un proyecto', href: '/contact' },
  },

  home: {
    meta: {
      title: 'Martin Avila Technologies — Software diseñado con precisión matemática',
      description:
        'Diseñamos y desarrollamos plataformas, sistemas de datos, herramientas de IA y sitios web para empresas de toda Europa, de cualquier sector.',
    },
    loaderLabel: 'Cargando Martin Avila Technologies',
    hero: {
      label: 'Ingeniería · Matemáticas · Aplicación',
      titleLines: ['Software diseñado', 'con precisión matemática.'],
      subtitle:
        'Diseñamos y desarrollamos plataformas, sistemas de datos, herramientas de IA y sitios web para empresas de toda Europa, de cualquier sector.',
      primary: { label: 'Empezar un proyecto', href: '/contact' },
      secondary: { label: 'Nuestros servicios', href: '/services' },
      surfaceAlt:
        'Ilustración: un paisaje de malla que se mueve despacio, una función de dos variables que se convierte en un mapa de curvas de nivel al desplazarse.',
    },
    firm: {
      number: '§ 01',
      label: 'La empresa',
      statement:
        'Martin Avila Technologies es una empresa de ingeniería con sede en Dublín. Desarrollamos software fiable para equipos cuyo trabajo depende de los datos, en finanzas, ciencia, industria y más allá. Cada sistema se diseña con el rigor de un matemático y el pragmatismo de un ingeniero.',
      facts:
        'Dublín, Irlanda · Registrado a efectos de IVA en la UE · English · Français · Español',
    },
    services: {
      number: '§ 02',
      label: 'Servicios',
      title: 'Lo que construimos',
    },
    approach: {
      number: '§ 03',
      label: 'Enfoque',
      columns: [
        {
          title: 'Ingeniería',
          text: 'Software de producción, no prototipos: tipado, probado, documentado y entregado con orden.',
          detail: 'LATENCIA 10 s → <1 s',
          detailLabel: 'Latencia reducida de 10 segundos a menos de un segundo',
        },
        {
          title: 'Matemáticas',
          text: 'Modelos en los que puede confiar: probabilidad, estadística y métodos numéricos detrás de cada número que calculamos.',
          detail: '∂u/∂t = Δu',
          detailLabel:
            'La ecuación del calor: la derivada parcial de u respecto de t es igual al laplaciano de u',
        },
        {
          title: 'Aplicación',
          text: 'Probado en mundos muy distintos: un hedge fund, un laboratorio de ciencias del mar, un equipo de IA de automoción.',
          detail: 'FINANZAS · CIENCIA · MOVILIDAD',
          detailLabel: 'Finanzas, ciencia, movilidad',
        },
      ],
    },
    domains: {
      number: '§ 04',
      label: 'Dónde se aplica',
      items: [
        {
          title: 'Finanzas',
          text: 'Plataformas de cartera, riesgo y reporting; herramientas de investigación y backtesting.',
        },
        {
          title: 'Ciencia e investigación',
          text: 'Adquisición de datos, cadenas de procesamiento y computación científica.',
        },
        {
          title: 'Industria y movilidad',
          text: 'Conjuntos de datos de visión por computador, herramientas de simulación y automatización.',
        },
        {
          title: 'Empresas y servicios',
          text: 'Herramientas internas, automatización y sitios web para equipos en crecimiento.',
        },
      ],
    },
    work: {
      number: '§ 05',
      label: 'Trabajos destacados',
      feature: {
        meta: 'Caso de estudio · Finanzas · Luxemburgo · 2025–2026',
        title: 'Una única plataforma de cartera para un hedge fund',
        clientLabel: 'Cliente',
        client: 'Heroics Capital',
        problemLabel: 'Problema',
        problem:
          'Los gestores de cartera, riesgos, compliance y middle office trabajaban con herramientas dispersas y procesos manuales.',
        builtLabel: 'Desarrollado',
        built:
          'Una plataforma centralizada para la gestión de operaciones, la documentación de compliance, el seguimiento de riesgos y el reporting, con servicios de automatización, flujos de correo e integraciones de API en Python, además de una cadena LLM que clasifica los correos de mercado por sentimiento para cada acción e índice.',
        resultLabel: 'Resultado',
        resultFrom: '10 s',
        resultTo: 'menos de 1 s',
        resultCaption:
          'tiempo de respuesta de las operaciones clave tras la caché y la optimización del procesamiento de datos',
        stackLabel: 'Stack',
        stack:
          'Python · Polars · Pandas · PostgreSQL · Supabase · Streamlit · PyTorch · Ollama · Docker',
        diagram: {
          title: 'Arquitectura de la plataforma',
          description:
            'Cuatro equipos (gestión de cartera, riesgos, compliance y middle office) alimentan una plataforma central, conectada a una base de datos PostgreSQL y a un servicio de sentimiento con LLM.',
          teams: ['PM', 'Riesgos', 'Compliance', 'Middle Office'],
          platform: 'Plataforma',
          database: 'PostgreSQL',
          llm: 'Sentimiento LLM',
        },
      },
      others: [
        {
          meta: 'Ciencia · Ifremer',
          title: 'Kosmos',
          text: 'Contribución al desarrollo full-stack de una plataforma de registro de datos submarinos con Ifremer y KonkArLab: front end en JavaScript, back end en Python, PostgreSQL.',
        },
        {
          meta: 'Movilidad · Valeo',
          title: 'Etiquetado de datos de simulación',
          text: 'Una herramienta interactiva para revisar vídeos de simulación de conducción, etiquetar segmentos y generar conjuntos de datos de entrenamiento para modelos de percepción (Python, OpenCV, Pandas).',
        },
      ],
    },
    technologies: {
      number: '§ 06',
      label: 'Tecnologías',
      groups: [
        {
          label: 'Lenguajes',
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
          label: 'Datos y ML',
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
          label: 'Back end y almacenamiento',
          items: [
            { name: 'PostgreSQL', slug: 'postgresql' },
            { name: 'MySQL', slug: 'mysql' },
            { name: 'Supabase', slug: 'supabase' },
            { name: 'Spring Boot', slug: 'springboot' },
            { name: 'Node.js', slug: 'nodedotjs' },
          ],
        },
        {
          label: 'Entrega',
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
      title: 'Servicios — Martin Avila Technologies',
      description:
        'Software y plataformas a medida, ingeniería de datos y automatización, IA aplicada, computación cuantitativa y científica, y sitios web. Cinco servicios, todos basados en trabajo ya entregado en producción.',
    },
    label: '§ Servicios',
    title: 'Lo que construimos',
    intro: 'Cinco servicios, todos basados en trabajo ya entregado en producción.',
    navLabel: 'Servicios en esta página',
    audienceLabel: 'Para:',
    includedLabel: 'Qué incluye',
    proofLabel: 'Prueba',
    items: [
      {
        id: 'platforms',
        number: '01',
        name: 'Software y plataformas a medida',
        short: 'Plataformas',
        summary:
          'Herramientas internas y plataformas de negocio que sustituyen las hojas de cálculo y el trabajo manual.',
        audience: 'Pymes, scale-ups, equipos de investigación, equipos de finanzas',
        body: 'Sustituimos las hojas de cálculo y los procesos manuales por una aplicación web fiable que su equipo realmente quiera usar: una única fuente de verdad, flujos de trabajo claros y un registro de auditoría.',
        included: [
          'Talleres de requisitos con las personas que la usarán',
          'Lógica de negocio y diseño de la base de datos',
          'Acceso por roles',
          'Despliegue y traspaso con documentación',
        ],
        proof: 'Plataforma de cartera en uso diario en un hedge fund',
      },
      {
        id: 'data',
        number: '02',
        name: 'Ingeniería de datos y automatización',
        short: 'Datos',
        summary:
          'Pipelines, integraciones e informes automatizados, y sistemas lentos que pasan a ser rápidos.',
        audience: 'Equipos que pierden horas en informes, copiar y pegar o herramientas lentas',
        body: 'Automatizamos el trabajo que nadie debería hacer a mano: pipelines de datos, integraciones de API, informes programados, flujos de correo. Y cuando una aplicación es demasiado lenta, averiguamos por qué y lo arreglamos.',
        included: [
          'Diseño y programación de pipelines',
          'Integraciones con sus herramientas y API actuales',
          'Informes y alertas automatizados',
          'Auditorías de rendimiento y optimización',
        ],
        proof: 'Operaciones clave de ~10 s a menos de 1 s',
      },
      {
        id: 'ai',
        number: '03',
        name: 'IA aplicada y machine learning',
        short: 'IA',
        summary:
          'Modelos y cadenas de modelos de lenguaje que clasifican, extraen y predicen, alojados en local si hace falta.',
        audience: 'Empresas con grandes volúmenes de documentos, correos, imágenes o vídeo',
        body: 'Clasificación, extracción, resumen y predicción con modelos de machine learning y de lenguaje, alojados en su propia infraestructura cuando sus datos no pueden salir de ella.',
        included: [
          'Estudio de viabilidad sobre sus datos',
          'Modelo o cadena LLM',
          'Una evaluación que se puede leer',
          'Integración en sus herramientas',
        ],
        proof:
          'Cadena LLM de sentimiento sobre correos de mercado · Conjuntos de datos de vídeo para percepción en automoción',
      },
      {
        id: 'quant',
        number: '04',
        name: 'Computación cuantitativa y científica',
        short: 'Quant',
        summary:
          'Modelización, simulación, optimización y análisis, desde laboratorios de investigación hasta mesas de trading.',
        audience: 'Laboratorios de investigación, equipos de ingeniería, fondos y fintechs',
        body: 'Convertimos modelos matemáticos en software fiable: modelización estadística, simulación, optimización, análisis de series temporales, backtesting y paneles de análisis.',
        included: [
          'Implementación y validación de modelos',
          'Herramientas de simulación y Monte Carlo',
          'Optimización',
          'Paneles de investigación',
        ],
        note: 'Desarrollamos software. No ofrecemos asesoramiento de inversión ni señales de trading.',
      },
      {
        id: 'web',
        number: '05',
        name: 'Sitios y aplicaciones web',
        short: 'Web',
        summary: 'Sitios y aplicaciones web rápidos, precisos y a medida, diseñados como este.',
        audience: 'Empresas y profesionales independientes',
        body: 'Sitios y aplicaciones web rápidos, precisos y a medida, diseñados con el mismo cuidado que este.',
        included: [
          'Diseño y desarrollo',
          'Estructura de contenidos',
          'Rendimiento y accesibilidad',
          'Configuración del alojamiento',
        ],
      },
    ],
    process: {
      title: 'Cómo se desarrolla un proyecto',
      steps: [
        {
          title: 'Llamada inicial',
          detail: 'Gratuita, 30 minutos, para entender el problema.',
        },
        {
          title: 'Propuesta escrita',
          detail: 'Alcance, plazos, precio cerrado o tarifa diaria.',
        },
        {
          title: 'Desarrollo',
          detail: 'Demos semanales: ve el avance cada semana.',
        },
        {
          title: 'Entrega',
          detail: 'Documentación, propiedad total del código, soporte opcional.',
        },
      ],
      trust:
        'NDA bajo petición · Registrado a efectos de IVA en la UE (VIES) · English · Français · Español',
    },
    cta: {
      title: '¿No sabe qué servicio encaja?',
      text: 'Describa el problema; le diremos con sinceridad si podemos ayudarle.',
      button: { label: 'Empezar un proyecto', href: '/contact' },
    },
  },

  about: {
    meta: {
      title: 'Acerca de — Martin Avila Technologies',
      description:
        'Charly Martin-Avila, fundador de Martin Avila Technologies. Matemático de formación, ingeniero de oficio: París, Brest, Luxemburgo, Dublín.',
    },
    name: 'Charly Martin-Avila',
    role: 'Fundador, Martin Avila Technologies',
    motto: 'Matemático de formación, ingeniero de oficio.',
    route: 'París → Brest → Luxemburgo → Dublín',
    linkedin: 'LinkedIn',
    scrollHint: 'Desplazar',
    openingImage: '/images/dublin-dusk.jpg',
    openingAlt: 'Dublín al atardecer',
    journeyLabel: 'Cuatro ciudades',
    chapters: [
      {
        id: 'paris',
        city: 'París',
        coords: '48,8566° N · 2,3522° E',
        lat: 48.8566,
        lon: 2.3522,
        years: '2020–2023',
        start: '2020-09',
        end: '2023-09',
        text: 'Un doble grado en Informática y Matemáticas en la Université Paris Cité: algoritmos y probabilidad, de la mano desde el primer día. Después, unas primeras prácticas de software de IA en Valeo Vision, creando una herramienta para etiquetar vídeos de simulación de conducción y generar conjuntos de datos de entrenamiento.',
        image: '/images/paris.jpg',
        alt: 'Los tejados de París junto al Sena',
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
        text: 'Un título de ingeniero en IMT Atlantique, especializado en ingeniería de software y sistemas distribuidos. Proyectos reales con usuarios reales, entre ellos Kosmos, una plataforma de registro de datos submarinos desarrollada con Ifremer.',
        image: '/images/brest.jpg',
        alt: 'El puerto de Brest frente al Atlántico',
        video: '/videos/brest.mp4',
      },
      {
        id: 'luxembourg',
        city: 'Luxemburgo',
        coords: '49,6116° N · 6,1319° E',
        lat: 49.6116,
        lon: 6.1319,
        years: '2025–2026',
        start: '2025-07',
        end: '2026-09',
        text: 'Catorce meses en Heroics Capital, un hedge fund: una plataforma de cartera usada a diario por los equipos de inversión y de operaciones, una cadena de sentimiento con modelos de lenguaje y operaciones clave reducidas de diez segundos a menos de uno.',
        image: '/images/luxembourg.jpg',
        alt: 'El casco antiguo de la ciudad de Luxemburgo',
        video: '/videos/luxembourg.mp4',
      },
      {
        id: 'dublin',
        city: 'Dublín',
        coords: '53,3498° N · 6,2603° O',
        lat: 53.3498,
        lon: -6.2603,
        years: '2026–',
        start: '2026-09',
        end: '2027-08',
        text: 'Un MSc en Informática, Sistemas Inteligentes, en el Trinity College Dublin, junto con un máster en Matemáticas en la Sorbonne Université, cursado a distancia. Y la fundación de Martin Avila Technologies.',
        image: '/images/dublin-dusk.jpg',
        alt: 'El río Liffey en Dublín al atardecer',
        video: '/videos/dublin.mp4',
      },
    ],
    timeline: {
      label: 'Cronología, de 2020 a 2027',
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
          label: 'Sorbonne Université (a distancia)',
          short: 'Sorbonne (a distancia)',
          lane: 2,
          start: '2026-09',
          end: '2027-06',
          years: '2026–2027',
          chapter: 3,
        },
      ],
    },
    ending: {
      mapTitle: 'Mapa de Europa occidental',
      mapDescription: 'Una ruta de París a Brest, luego Luxemburgo, hasta Dublín.',
      title: 'Hoy trabajando para clientes de toda Europa.',
      button: { label: 'Trabajemos juntos', href: '/contact' },
    },
  },

  contact: {
    meta: {
      title: 'Contacto',
      description:
        'Hable de su proyecto con Martin Avila Technologies. Con sede en Dublín, trabajando en toda Europa. Respuesta en un día laborable.',
    },
    label: '§ Contacto',
    title: 'Hablemos de su proyecto.',
    intro:
      'Cuéntenos qué necesita construir. Recibirá una respuesta clara en un día laborable, aunque sea «no somos la opción adecuada».',
    directLabel: 'O escríbame directamente:',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    facts: ['Con sede en Dublín · Trabajando en toda Europa', 'Respuesta en un día laborable'],
    form: {
      title: 'Su proyecto',
      name: 'Nombre',
      email: 'Correo profesional',
      company: 'Empresa',
      optional: 'opcional',
      projectType: 'Tipo de proyecto',
      projectTypes: [
        'Software a medida',
        'Datos y automatización',
        'IA aplicada',
        'Cuantitativo y científico',
        'Sitio web',
        'Otro',
      ],
      budget: 'Presupuesto',
      budgets: [
        'Menos de 5.000 €',
        '5.000–15.000 €',
        '15.000–40.000 €',
        'Más de 40.000 €',
        'Aún no lo sé',
      ],
      message: 'Mensaje',
      messagePlaceholder: '¿Qué problema debe resolver este sistema?',
      consentBefore:
        'Acepto que mis datos se utilicen para responder a esta solicitud. Consulte la ',
      consentLink: 'política de privacidad',
      consentAfter: '.',
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
      sent: 'Enviado',
      success: 'Recibido. Le responderé en un día laborable.',
      errorBefore:
        'No se ha podido enviar el mensaje. Inténtelo de nuevo en un minuto, o escríbame en ',
      errorLink: 'LinkedIn',
      errorAfter: '.',
      notConfigured: 'El formulario aún no está configurado.',
      errors: {
        name: 'Indique su nombre.',
        email: 'Indique su correo profesional.',
        emailInvalid: 'Indique una dirección de correo como nombre@empresa.com.',
        projectType: 'Elija el tipo de proyecto.',
        message: 'Escriba unas palabras sobre su proyecto.',
        consent: 'Marque la casilla para que sus datos puedan usarse para responderle.',
        summary: 'Algunos campos necesitan su atención.',
      },
    },
    trust: [
      'IVA UE registrado · Verificable en VIES',
      'English · Français · Español',
      'NDA bajo petición · Precio cerrado o tarifa diaria',
    ],
  },

  legal: {
    meta: {
      title: 'Aviso legal',
      description:
        'Aviso legal de martinavila.eu: prestador, dirección profesional, número de IVA y alojamiento de Martin Avila Technologies.',
    },
    title: 'Aviso legal',
    updated: 'Última actualización: 8 de noviembre de 2026',
    publisherHeading: 'Prestador del servicio',
    publisher:
      'Charly Martin-Avila, empresario individual (sole trader), registrado a efectos del IVA en Irlanda. Martin Avila Technologies es el nombre de este sitio; los contratos y facturas se emiten a nombre de Charly Martin-Avila.',
    addressLabel: 'Dirección profesional',
    contactLabel: 'Contacto',
    contactValue: 'Mediante el [formulario de contacto](/contact). Respuesta en un día laborable.',
    vatLabel: 'Número de IVA',
    vatCheck: 'Verificar en VIES',
    hostingHeading: 'Alojamiento',
    hostingLabel: 'Proveedor de alojamiento',
    sections: [
      {
        heading: 'Naturaleza de los servicios',
        paragraphs: [
          'Martin Avila Technologies presta servicios de ingeniería de software y tecnología. No presta asesoramiento de inversión, financiero ni jurídico.',
        ],
      },
      {
        heading: 'Propiedad intelectual',
        paragraphs: [
          'Contenido del sitio © Martin Avila Technologies: textos, diseño, ilustraciones y código, salvo indicación contraria.',
          'Las fotografías proceden de Unsplash y Pexels y se utilizan conforme a sus respectivas licencias.',
          'Los logotipos y nombres de tecnologías son marcas de sus respectivos titulares. Se muestran solo para describir las herramientas con las que trabajamos.',
        ],
      },
      {
        heading: 'Datos personales',
        paragraphs: [
          'El tratamiento de los datos enviados mediante el formulario de contacto se explica en la [política de privacidad](/privacy).',
        ],
      },
    ],
  },

  privacy: {
    meta: {
      title: 'Política de privacidad',
      description:
        'Cómo trata Martin Avila Technologies los datos personales enviados mediante el formulario de contacto de martinavila.eu. Sin cookies, sin rastreo.',
    },
    title: 'Política de privacidad',
    updated: 'Última actualización: 8 de noviembre de 2026',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        paragraphs: [
          'El responsable del tratamiento es Charly Martin-Avila, empresario individual, Dublín, Irlanda, que publica este sitio con el nombre Martin Avila Technologies.',
          'Para cualquier solicitud sobre sus datos, utilice el [formulario de contacto](/contact). La dirección postal figura en el [aviso legal](/legal).',
        ],
      },
      {
        heading: 'Qué datos recogemos',
        paragraphs: [
          'Solo lo que envía el formulario de contacto: su nombre, su correo profesional, su empresa (opcional), el tipo de proyecto, el rango de presupuesto (opcional) y su mensaje. Este sitio no recoge nada más.',
        ],
      },
      {
        heading: 'Finalidad y base jurídica',
        paragraphs: [
          'Estos datos se utilizan para responder a su solicitud y, si lo desea, preparar una propuesta. Las bases jurídicas son su consentimiento (artículo 6, apartado 1, letra a del RGPD) y la aplicación de medidas precontractuales a petición suya (artículo 6, apartado 1, letra b del RGPD).',
          'Sus datos nunca se venden ni se añaden a una lista de envío.',
        ],
      },
      {
        heading: 'Encargado del tratamiento',
        paragraphs: [
          'Los envíos del formulario los entrega Formspree (Formspree, Inc., Estados Unidos), que actúa como encargado del tratamiento conforme a su acuerdo de tratamiento de datos, el cual incluye las garantías exigidas para las transferencias fuera del Espacio Económico Europeo.',
          'Ningún otro tercero recibe los datos enviados mediante el formulario.',
        ],
      },
      {
        heading: 'Plazo de conservación',
        paragraphs: [
          'Los mensajes se conservan 24 meses después de nuestro último intercambio y después se eliminan. Si el intercambio da lugar a un contrato, los registros exigidos a efectos contables y fiscales se conservan durante el plazo legal.',
        ],
      },
      {
        heading: 'Sus derechos',
        paragraphs: ['El RGPD le reconoce el derecho a:'],
        list: [
          'acceder a los datos que le conciernen;',
          'rectificarlos;',
          'suprimirlos;',
          'limitar su uso (limitación);',
          'oponerse a su uso (oposición);',
          'recibirlos en un formato reutilizable (portabilidad).',
        ],
      },
      {
        heading: 'Cómo ejercerlos',
        paragraphs: [
          'Escríbanos mediante el [formulario de contacto](/contact). Puede retirar su consentimiento en cualquier momento, sin que ello afecte a lo realizado antes. Recibirá respuesta en el plazo de un mes.',
          'También tiene derecho a presentar una reclamación ante la Data Protection Commission de Irlanda: [www.dataprotection.ie](https://www.dataprotection.ie).',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'Este sitio no utiliza cookies ni rastreo. No se carga ningún script de analítica, publicidad ni redes sociales; por eso no hay banner de cookies.',
          'Como en cualquier sitio web, los servidores del proveedor de alojamiento registran datos técnicos, como las direcciones IP, para servir las páginas y proteger el servicio frente a abusos.',
        ],
      },
    ],
  },

  notFound: {
    meta: {
      title: 'Página no encontrada',
      description: 'Esta página no existe.',
    },
    label: 'Error 404',
    title: 'Página no encontrada',
    text: 'Esta página no existe, o se ha movido.',
    home: { label: 'Volver al inicio', href: '/' },
  },
};
