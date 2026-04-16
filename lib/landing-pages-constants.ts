// ─── LOCATION CONSTANTS ───────────────────────────────────────────────────────

export interface LocationConfig {
  name: string;           // Display name (e.g. "Lisboa")
  slug: string;           // URL-safe name (e.g. "lisboa")
  description: string;   // Short descriptor for copy
  industries: string[];  // Dominant local industries for personalisation
  vibe: string;          // One-line cultural/economic characterisation
}

export const LOCATIONS: LocationConfig[] = [
  {
    name: "Lisboa",
    slug: "lisboa",
    description: "capital de Portugal e maior hub de inovação tecnológica da Península Ibérica",
    industries: ["turismo", "tecnologia", "finanças", "serviços", "startups", "comércio"],
    vibe: "Cosmopolita, acelerada e repleta de talento — Lisboa atrai empresas que querem crescer à escala europeia.",
  },
  {
    name: "Porto",
    slug: "porto",
    description: "segundo maior mercado económico do país e polo de inovação do Norte",
    industries: ["indústria", "turismo", "tecnologia", "comércio", "exportação"],
    vibe: "Dinâmico e empreendedor — o Porto combina tradição industrial com um ecossistema de startups em aceleração.",
  },
  {
    name: "Braga",
    slug: "braga",
    description: "capital do Minho e um dos maiores centros tecnológicos de Portugal",
    industries: ["tecnologia", "indústria", "educação", "comércio", "saúde"],
    vibe: "Bracarense e ambicioso — Braga é hoje reconhecida como a 'Silicon Valley portuguesa' graças à sua densidade de startups tech.",
  },
  {
    name: "Coimbra",
    slug: "coimbra",
    description: "cidade universitária e polo de conhecimento do Centro de Portugal",
    industries: ["educação", "saúde", "tecnologia", "serviços", "investigação"],
    vibe: "Culta e inovadora — Coimbra mistura séculos de saber académico com um crescente écossistema de biotech e SaaS.",
  },
  {
    name: "Aveiro",
    slug: "aveiro",
    description: "polo industrial e tecnológico da Região Centro, conhecida como a Veneza de Portugal",
    industries: ["indústria", "tecnologia", "comércio", "logística", "ambiente"],
    vibe: "Moderna e conectada — Aveiro é uma das cidades com maior densidade de empresas exporadoras e PMEs industriais 4.0.",
  },
  {
    name: "Setúbal",
    slug: "setubal",
    description: "capital de distrito na Margem Sul, com forte base industrial e turística",
    industries: ["indústria", "turismo", "logística", "pesca", "comércio"],
    vibe: "Estratégica e em crescimento — Setúbal beneficia da proximidade a Lisboa e de um tecido empresarial sólido.",
  },
  {
    name: "Guimarães",
    slug: "guimaraes",
    description: "berço de Portugal e cidade Património Mundial da UNESCO",
    industries: ["têxtil", "indústria", "turismo", "comércio", "tecnologia"],
    vibe: "Com raízes históricas únicas, Guimarães une tradição industrial à modernidade digital.",
  },
  {
    name: "Faro",
    slug: "faro",
    description: "capital do Algarve e porta de entrada do turismo no Sul de Portugal",
    industries: ["turismo", "hotelaria", "comércio", "imobiliário", "tecnologia"],
    vibe: "Ensolarada e cosmopolita — o Algarve é um mercado de alto valor com milhões de visitantes internacionais por ano.",
  },
  {
    name: "Leiria",
    slug: "leiria",
    description: "cidade intermunicipal com forte tradição industrial e localização estratégica no Centro",
    industries: ["indústria", "comércio", "tecnologia", "logística", "construção"],
    vibe: "Central e produtiva — Leiria é um polo de PMEs dinâmicas que procuram cada vez mais soluções digitais competitivas.",
  },
  {
    name: "Funchal",
    slug: "funchal",
    description: "capital da Madeira e destino turístico premium de classe mundial",
    industries: ["turismo", "hotelaria", "serviços", "comércio", "imobiliário"],
    vibe: "Exclusiva e internacional — o Funchal combina beleza natural única com um mercado empresarial em plena digitalização.",
  },
  {
    name: "Évora",
    slug: "evora",
    description: "capital do Alentejo e cidade Património Mundial da UNESCO",
    industries: ["agricultura", "turismo", "tecnologia", "serviços", "imobiliário"],
    vibe: "Tranquila e de carácter único — Évora atrai empresas que valorizam qualidade de vida sem abdicar de crescimento digital.",
  },
  {
    name: "Viseu",
    slug: "viseu",
    description: "capital da Beira Alta, reconhecida repetidamente como uma das melhores cidades para viver em Portugal",
    industries: ["comércio", "tecnologia", "agricultura", "saúde", "educação"],
    vibe: "Qualidade de vida superior e comunidade empresarial crescente — Viseu é um mercado por explorar com alto potencial digital.",
  },
  {
    name: "Viana do Castelo",
    slug: "viana-do-castelo",
    description: "capital do Alto Minho, com forte identidade cultural e base naval e industrial",
    industries: ["indústria naval", "turismo", "comércio", "tecnologia", "pesca"],
    vibe: "Atlântica e determinada — Viana do Castelo combina tradição marítima com novos investimentos digitais.",
  },
  {
    name: "Santarém",
    slug: "santarem",
    description: "capital do Ribatejo, coração agrícola e logístico de Portugal",
    industries: ["agricultura", "logística", "comércio", "tecnologia", "agro-indústria"],
    vibe: "Estratégica e em transformação — Santarém é o epicentro das PMEs ribatejanas que descobrem o poder do digital.",
  },
  {
    name: "Castelo Branco",
    slug: "castelo-branco",
    description: "capital da Beira Baixa, distrito fronteiriço com crescente aposta na digitalização",
    industries: ["comércio", "saúde", "energia", "serviços", "agricultura"],
    vibe: "Resiliente e em crescimento — Castelo Branco aposta na modernização como alavanca para reter talento e capital.",
  },
  {
    name: "Bragança",
    slug: "braganca",
    description: "capital de Trás-os-Montes, com ecossistema empresarial único no interior norte",
    industries: ["agricultura", "turismo", "tecnologia", "comércio", "educação"],
    vibe: "Autêntica e com identidade forte — Bragança tem muito a ganhar com uma presença digital bem posicionada.",
  },
  {
    name: "Vila Real",
    slug: "vila-real",
    description: "capital do Alto Douro Vinhateiro e porta de entrada do Douro Património Mundial",
    industries: ["enoturismo", "agricultura", "tecnologia", "comércio", "serviços"],
    vibe: "Ligada ao Douro e ao mundo — Vila Real alia o prestígio do vinho a um tecido empresarial cada vez mais digital.",
  },
  {
    name: "Portalegre",
    slug: "portalegre",
    description: "capital do Alto Alentejo, com forte ligação à industria corticeira e ao turismo de natureza",
    industries: ["cortiça", "turismo", "agricultura", "comércio", "energia renovável"],
    vibe: "Verde e competitiva — Portalegre aposta em digitalizaçao para valorizar os seus recursos únicos no mercado global.",
  },
  {
    name: "Beja",
    slug: "beja",
    description: "capital do Baixo Alentejo, planície fértil e berço da agro-indústria portuguesa",
    industries: ["agricultura", "agro-indústria", "energia", "comércio", "turismo"],
    vibe: "Vasta e estratégica — Beja tem um dos maiores potenciais de transformação digital agrícola do sul europeu.",
  },
];

// ─── SERVICE CONSTANTS ────────────────────────────────────────────────────────

export interface ServiceConfig {
  name: string;          // Display name (e.g. "desenvolvimento de websites")
  slug: string;          // URL-safe prefix for slug (e.g. "desenvolvimento-de-websites")
  headline: string;      // Short punchy name for headings
  tagline: string;       // One-line benefit statement
  techStack: string[];   // Relevant technologies
  benefits: string[];    // 4-6 key benefits (for bullets)
  solutions: {           // 4-6 specific solutions offered
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICES: ServiceConfig[] = [
  {
    name: "desenvolvimento de websites",
    slug: "desenvolvimento-de-websites",
    headline: "Websites de Alta Performance",
    tagline: "Websites rápidos, bonitos e otimizados que convertem visitantes em clientes — 24 horas por dia, 7 dias por semana.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel"],
    benefits: [
      "Carregamento em menos de 1 segundo — Core Web Vitals no verde",
      "Posicionamento Google melhorado com SEO técnico avançado",
      "Design responsivo e premium que transmite credibilidade imediata",
      "Integração com CRM, analytics e ferramentas de marketing",
      "Conversão optimizada com CTAs estratégicos e UX testado",
      "Suporte técnico e manutenção pós-lançamento incluídos",
    ],
    solutions: [
      {
        title: "Website Institucional Premium",
        description: "Apresente a sua empresa com um design de impacto que faz os visitantes confiar imediatamente na sua marca.",
      },
      {
        title: "Landing Page de Alta Conversão",
        description: "Páginas especializadas para campanhas digitais com taxas de conversão até 3× acima da média do mercado.",
      },
      {
        title: "E-commerce Profissional",
        description: "Loja online completa, segura e otimizada para vender — integração com pagamentos, stock e logística.",
      },
      {
        title: "Website com Painel de Gestão",
        description: "Backend intuitivo que permite atualizar conteúdos, produtos e dados sem conhecimento técnico.",
      },
      {
        title: "Redesign e Migração",
        description: "Modernize o seu website atual sem perder o histórico de SEO — migração cuidada, sem quebras de ranking.",
      },
    ],
    faqs: [
      {
        question: "Quanto tempo demora a desenvolver um website?",
        answer: "O prazo varia consoante a complexidade do projeto. Um website institucional está tipicamente pronto em 2–4 semanas. Projetos com e-commerce ou funcionalidades avançadas podem levar 4–8 semanas. Garantimos sempre prazos claros desde o início.",
      },
      {
        question: "Quanto custa um website profissional?",
        answer: "O investimento depende do âmbito do projeto. Websites institucionais começam nos 1 500€. Projetos de maior complexidade são orçamentados após consulta gratuita, garantindo transparência total sem surpresas.",
      },
      {
        question: "O meu website vai aparecer no Google?",
        answer: "Sim. Todos os projetos incluem SEO técnico de base: estrutura de headings, meta tags, velocidade otimizada, sitemap e Schema.org. Oferecemos também serviços de SEO contínuo para posicionamento de longo prazo.",
      },
      {
        question: "O website funciona bem no telemóvel?",
        answer: "Absolutamente. Desenvolvemos mobile-first — o design começa pelo ecrã mais pequeno e expande-se para desktop. Fazemos testes em múltiplos dispositivos e browsers antes de cada lançamento.",
      },
      {
        question: "Posso gerir o conteúdo do website eu mesmo?",
        answer: "Sim. Integramos sistemas de gestão de conteúdo de acordo com o seu perfil: desde soluções headless como Sanity ou Contentful a painéis desenvolvidos à medida — simples e intuitivos.",
      },
      {
        question: "A Velvet Neuron oferece suporte após o lançamento?",
        answer: "Sim. Temos planos de suporte e manutenção mensal que incluem atualizações de segurança, monitorização de performance e alterações de conteúdo. Nunca ficará sozinho após o lançamento.",
      },
    ],
  },
  {
    name: "desenvolvimento de aplicações",
    slug: "desenvolvimento-de-aplicacoes",
    headline: "Aplicações Móveis & Web Apps",
    tagline: "Aplicações iOS, Android e web com UX premium — construídas para reter utilizadores e escalar o seu negócio.",
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Next.js", "Node.js", "Firebase", "AWS"],
    benefits: [
      "Aplicação disponível no App Store e Google Play em simultâneo",
      "UX/UI de classe mundial desenhada para retenção e conversão",
      "Performance nativa com React Native ou Flutter",
      "Sincronização em tempo real e suporte offline",
      "Integrações com pagamentos (MB WAY, Stripe), notificações push e analytics",
      "Escalabilidade técnica preparada para crescimento rápido",
    ],
    solutions: [
      {
        title: "Aplicação Mobile Cross-Platform",
        description: "Uma aplicação, dois sistemas operativos — desenvolvemos com React Native ou Flutter para iOS e Android com qualidade nativa.",
      },
      {
        title: "Aplicação iOS Nativa",
        description: "Experiência Apple impecável com Swift, animações fluidas e integração profunda com o ecossistema iOS.",
      },
      {
        title: "Aplicação Android Nativa",
        description: "Tudo o que o Material Design 3 tem de melhor, optimizado para a vasta diversidade de dispositivos Android.",
      },
      {
        title: "Progressive Web App (PWA)",
        description: "A velocidade de uma app web com experiência quase nativa — sem necessidade de instalação na loja.",
      },
      {
        title: "Backend & API para Aplicações",
        description: "Infraestrutura robusta com Node.js, autenticação segura, base de dados escalável e APIs RESTful ou GraphQL.",
      },
    ],
    faqs: [
      {
        question: "É mais vantajoso desenvolver uma app nativa ou cross-platform?",
        answer: "Depende dos seus objetivos. Para máxima performance e experiência específica de plataforma, o nativo é ideal. Para rapidez de lançamento e orçamento optimizado com 90% da qualidade nativa, React Native ou Flutter são a escolha certa. Aconselhamos gratuitamente na consulta inicial.",
      },
      {
        question: "Quanto custa o desenvolvimento de uma aplicação móvel?",
        answer: "Uma app mobile de complexidade média começa a partir dos 1 000€. O custo final depende das funcionalidades, integrações e design. Após a consulta gratuita, apresentamos uma proposta detalhada e transparente.",
      },
      {
        question: "A Velvet Neuron publica a aplicação nas lojas?",
        answer: "Sim. Entregamos o processo de submissão completo — App Store Connect para iOS e Google Play Console para Android, incluindo a preparação de assets gráficos, descrições otimizadas para ASO e gestão de aprovação.",
      },
      {
        question: "Como é feita a manutenção da aplicação após o lançamento?",
        answer: "Oferecemos planos de manutenção mensal que incluem updates de SO e SDK, correção de bugs, monitorização de crashes e melhorias incrementais — mantendo a app funcional e competitiva ao longo do tempo.",
      },
      {
        question: "A aplicação pode integrar MB WAY e outros pagamentos portugueses?",
        answer: "Sim. Integramos MB WAY, Multibanco, Stripe, PayPal e outros gateways de pagamento compatíveis com o mercado português e europeu, cumprindo integralmente os regulamentos PSD2.",
      },
    ],
  },
  {
    name: "SEO técnico e performance web",
    slug: "seo-tecnico-e-performance-web",
    headline: "SEO Técnico & Performance Web",
    tagline: "Websites que carregam em menos de 1 segundo, dominam o Google e convertem mais — com engenharia SEO de raiz e Core Web Vitals no verde.",
    techStack: ["Next.js", "Lighthouse", "Google Search Console", "Schema.org", "Core Web Vitals", "Vercel Analytics", "Ahrefs"],
    benefits: [
      "Auditoria técnica completa com plano de ação prioritizado",
      "Core Web Vitals (LCP, CLS, INP) otimizados para score 90+ no PageSpeed",
      "Estrutura de URL, sitemap, robots.txt e canonicals corretos desde o primeiro dia",
      "Schema.org e rich snippets para maior visibilidade nos resultados de pesquisa",
      "Otimização de imagens, fontes e bundle JS/CSS para carregamento sub-1s",
      "Relatórios mensais de posicionamento e evolução das palavras-chave",
    ],
    solutions: [
      {
        title: "Auditoria SEO Técnica Completa",
        description: "Análise aprofundada de crawlability, indexação, velocidade, links internos e erros técnicos — com relatório detalhado e roadmap de correções.",
      },
      {
        title: "Otimização Core Web Vitals",
        description: "Identificamos e eliminamos os bottlenecks que travam o LCP, CLS e INP — garantindo score verde no PageSpeed Insights e vantagem de ranking no Google.",
      },
      {
        title: "SEO On-Page & Arquitetura de Conteúdo",
        description: "Estrutura de headings, meta tags, linking interno e estratégia de conteúdo alinhada com intenção de pesquisa transacional e informacional.",
      },
      {
        title: "Dados Estruturados & Rich Snippets",
        description: "Implementação de Schema.org (Organization, LocalBusiness, FAQ, Product) para rich results que aumentam o CTR organicamente.",
      },
      {
        title: "Migração SEO-Safe",
        description: "Redesigns e migrações de plataforma sem perda de ranking — mapeamento de redirects 301, preservação de authority e monitorização pós-migração.",
      },
    ],
    faqs: [
      {
        question: "O que é SEO técnico e como difere do SEO de conteúdo?",
        answer: "O SEO técnico foca-se na infraestrutura do website — velocidade, crawlability, indexação, estrutura de URLs, dados estruturados e Core Web Vitals. O SEO de conteúdo foca-se no texto e palavras-chave. Ambos são complementares; nós dominamos os dois.",
      },
      {
        question: "Em quanto tempo vejo melhorias de posicionamento?",
        answer: "Melhorias técnicas (velocidade, erros de crawl) têm impacto em 4–8 semanas após reindexação. Ganhos de ranking para palavras-chave competitivas consolidam-se tipicamente em 3–6 meses. O SEO técnico é o investimento com retorno mais duradouro no digital.",
      },
      {
        question: "O meu website precisa de ser reconstruído para melhorar o SEO?",
        answer: "Nem sempre. Muitas melhorias são feitas sem reconstrução — otimização de imagens, lazy loading, ajustes de configuração e correção de erros técnicos. Após auditoria, sabemos exatamente o que é necessário.",
      },
      {
        question: "O que são Core Web Vitals e por que importam?",
        answer: "Core Web Vitals são métricas Google que medem a experiência real do utilizador: LCP (velocidade de carregamento), CLS (estabilidade visual) e INP (resposta a interações). Desde 2021 são fator de ranking direto — websites com score verde têm vantagem competitiva mensurável.",
      },
      {
        question: "Fazem SEO para websites já existentes ou só para projetos novos?",
        answer: "Trabalhamos com ambos. Para websites existentes, começamos por uma auditoria completa. Para projetos novos, implementamos SEO técnico de raiz desde a arquitetura — muito mais eficiente do que corrigir depois.",
      },
    ],
  },
  {
    name: "loja online",
    slug: "loja-online",
    headline: "Lojas Online que Vendem",
    tagline: "E-commerce de alto desempenho que transforma o seu catálogo digital num motor de vendas contínuo.",
    techStack: ["Next.js", "Shopify", "WooCommerce", "Stripe", "MB WAY", "Vercel", "Cloudflare"],
    benefits: [
      "Experiência de compra fluida que reduz abandono de carrinho",
      "MB WAY, Multibanco, Stripe e PayPal integrados de raiz",
      "Velocidade de carregamento sub-1s — mais conversões, menos bounce",
      "Gestão de stock, encomendas e clientes num painel intuitivo",
      "SEO de produto optimizado para Google Shopping e pesquisa orgânica",
      "Compatível com marketplaces: integração com Amazon, Worten, FNAC PT",
    ],
    solutions: [
      {
        title: "E-commerce Personalizado com Next.js",
        description: "Loja online desenvolvida de raiz para máxima performance, UX impecável e diferenciação total face à concorrência.",
      },
      {
        title: "Shopify Premium",
        description: "Setup, personalização e otimização da sua loja Shopify — com apps estratégicas, integrações e copy de conversão.",
      },
      {
        title: "WooCommerce Otimizado",
        description: "Loja WordPress/WooCommerce rápida, segura e pronta para SEO — ideal para quem já tem presença WordPress.",
      },
      {
        title: "Integração de Pagamentos PT",
        description: "MB WAY, Multibanco por referência, cartão de crédito e PayPal — todos os métodos de pagamento preferidos pelos portugueses.",
      },
      {
        title: "Estratégia de Conversão E-commerce",
        description: "Auditoria de conversão, optimização de produto, checkout e campanhas de remarketing para recuperar carrinhos abandonados.",
      },
    ],
    faqs: [
      {
        question: "Qual a diferença entre e-commerce personalizado e Shopify?",
        answer: "O e-commerce personalizado oferece total flexibilidade, performance superior e diferenciação — ideal para marcas com necessidades específicas. O Shopify é mais rápido de lançar e tem ecossistema robusto — ideal para começar rapidamente com menor investimento inicial.",
      },
      {
        question: "A loja online aceita MB WAY?",
        answer: "Sim. Integramos MB WAY, Multibanco por referência, cartão de crédito e PayPal em todas as lojas que desenvolvemos — cobrindo os métodos de pagamento preferidos pelos consumidores portugueses.",
      },
      {
        question: "Consigo gerir a loja sozinho após o lançamento?",
        answer: "Absolutamente. Entregamos a loja com uma sessão de formação incluída e um manual de utilizador. A maioria dos nossos clientes gere os produtos, stock e encomendas de forma totalmente autónoma desde o primeiro dia.",
      },
      {
        question: "A loja aparece no Google Shopping?",
        answer: "Sim. Configuramos o Google Merchant Center, feed de produtos e campanhas de Shopping para que os seus produtos apareçam nos resultados de pesquisa do Google com imagem e preço.",
      },
      {
        question: "Quanto custa uma loja online profissional?",
        answer: "Lojas mais simples com Shopify ou WooCommerce começam nos 2 000€. Soluções personalizadas com features avançadas situam-se entre 4 000€ e 15 000€. Solicitamos sempre um briefing antes de apresentar proposta.",
      },
    ],
  },
  {
    name: "aplicações desktop",
    slug: "aplicacoes-desktop",
    headline: "Aplicações Desktop à Medida",
    tagline: "Software desktop profissional para Windows e macOS — rápido, intuitivo e construído especificamente para o fluxo de trabalho do seu negócio.",
    techStack: ["Electron", "Tauri", "React", "TypeScript", "Rust", "SQLite", "Node.js"],
    benefits: [
      "Interface intuitiva desenhada para a realidade do seu negócio",
      "Funciona offline — sem dependência de internet para operação crítica",
      "Integração com sistemas existentes: ERP, bases de dados, APIs externas",
      "Instalador profissional para Windows (.exe) e macOS (.dmg)",
      "Atualizações automáticas silenciosas sem interrupção do fluxo de trabalho",
      "Performance nativa com acesso completo ao sistema operativo",
    ],
    solutions: [
      {
        title: "Software de Gestão Empresarial",
        description: "Aplicação desktop à medida para gerir stocks, encomendas, faturação ou processos internos — substituindo Excel e ferramentas genéricas.",
      },
      {
        title: "Ferramenta Interna de Produtividade",
        description: "Dashboard, painel de controlo ou automação que poupa horas à equipa e elimina erros manuais repetitivos.",
      },
      {
        title: "Aplicação com Base de Dados Local",
        description: "Software com SQLite ou PostgreSQL embebido — estrutura robusta, consultas rápidas e dados 100% sob o seu controlo.",
      },
      {
        title: "Integração com Hardware e Periféricos",
        description: "Aplicações que comunicam com impressoras, leitores de código de barras, balanças ou outro hardware específico do negócio.",
      },
      {
        title: "Migração de Software Legado",
        description: "Modernize aplicações desktop antigas (VB6, Delphi, Access) para tecnologia atual — mantendo a lógica de negócio, melhorando tudo o resto.",
      },
    ],
    faqs: [
      {
        question: "Qual a diferença entre uma aplicação desktop e uma aplicação web?",
        answer: "A aplicação desktop instala-se no computador, funciona offline, tem acesso ao sistema de ficheiros e hardware local, e é tipicamente mais rápida para operações intensivas. A aplicação web corre no browser e é acessível de qualquer lugar. Para muitos negócios, o desktop é a escolha certa para ferramentas de uso diário intensivo.",
      },
      {
        question: "A aplicação funciona em Windows e macOS?",
        answer: "Sim. Com Electron ou Tauri desenvolvemos uma única base de código que gera instaladores para Windows e macOS. Para requisitos muito específicos de uma plataforma, podemos também desenvolver soluções nativas.",
      },
      {
        question: "Como são feitas as atualizações após o lançamento?",
        answer: "Implementamos sistemas de auto-update — a aplicação verifica atualizações automaticamente e instala-as de forma silenciosa, sem interromper o trabalho do utilizador. Pode também forçar atualizações obrigatórias quando necessário.",
      },
      {
        question: "A aplicação pode sincronizar dados com um servidor ou cloud?",
        answer: "Sim. Desenvolvemos aplicações híbridas que funcionam offline mas sincronizam com uma API ou base de dados central quando há ligação — ideal para equipas distribuídas ou lojas com múltiplos pontos de venda.",
      },
      {
        question: "Quanto custa desenvolver uma aplicação desktop?",
        answer: "Aplicações mais simples (ferramenta interna, formulário avançado, dashboard) começam nos 2 000€. Software com lógica de negócio complexa e integrações situa-se tipicamente entre 4 000€ e 12 000€. Solicite uma consulta gratuita para um orçamento preciso.",
      },
    ],
  },
];

// ─── HELPER: BUILD SLUG ───────────────────────────────────────────────────────

export function buildSlug(service: ServiceConfig, location: LocationConfig): string {
  return `${service.slug}-em-${location.slug}`;
}

// ─── COMBINATION MATRIX ───────────────────────────────────────────────────────
// Use these to generate all landing pages:
// SERVICES.forEach(service => LOCATIONS.forEach(location => generatePage(service, location)))
