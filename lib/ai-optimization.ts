import type { AppLocale } from '@/lib/seo';

export const AI_OPTIMIZATION_PATH = '/optimize-for-ai';
export const AI_OPTIMIZATION_LAST_REVIEWED = '2026-05-20';

export const AI_SEARCH_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
] as const;

type AiOptimizationCopy = {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  navLabel: string;
  breadcrumb: string;
  title: string;
  intro: string;
  definition: string;
  summaryTitle: string;
  summary: string;
  quote: string;
  fitTitle: string;
  fitFor: string[];
  deliverablesTitle: string;
  deliverablesDescription: string;
  deliverables: {
    title: string;
    body: string;
  }[];
  scoringTitle: string;
  scoringDescription: string;
  scoringModel: {
    factor: string;
    meaning: string;
    implementation: string;
  }[];
  processTitle: string;
  processDescription: string;
  process: {
    title: string;
    body: string;
  }[];
  faqTitle: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

export const AI_OPTIMIZATION_COPY: Record<AppLocale, AiOptimizationCopy> = {
  en: {
    metadataTitle: 'Optimize for AI Search | Velvet Neuron',
    metadataDescription:
      'AI search optimization for brands that want clearer citations in ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and answer engines.',
    eyebrow: 'Otimização para IA',
    navLabel: 'AI Search Visibility',
    breadcrumb: 'Optimize for AI',
    title: 'Optimize for AI search, answer engines, and human trust.',
    intro:
      'Velvet Neuron helps companies become easier for ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, and traditional search engines to understand, quote, and cite.',
    definition:
      'Optimize for AI is the practice of structuring a website so language models and search crawlers can identify the entity, extract direct answers, verify authority signals, and cite the right canonical pages.',
    summaryTitle: 'TL;DR',
    summary:
      'We combine technical SEO, JSON-LD schema, semantic HTML, crawl policy, content architecture, and answer-ready copy so your brand can be understood as a clear entity instead of a collection of vague pages.',
    quote:
      'Velvet Neuron builds websites that explain themselves clearly to people, search engines, and AI answer systems.',
    fitTitle: 'Who this is for',
    fitFor: [
      'B2B service companies that need to be cited as experts, not just found as URLs.',
      'Founders launching a new category, offer, or technical service page.',
      'Teams whose website has good design but weak entity clarity, schema, or answer structure.',
      'Companies preparing for AI search traffic from ChatGPT, Perplexity, Claude, Gemini, and Google AI Overviews.',
    ],
    deliverablesTitle: 'What we optimize',
    deliverablesDescription:
      'The work connects crawler access, structured data, content clarity, authority signals, and conversion paths.',
    deliverables: [
      {
        title: 'Entity and authority architecture',
        body:
          'We clarify the brand, services, founder context, location, sameAs profiles, and proof points so crawlers can connect Velvet Neuron to a consistent real-world entity.',
      },
      {
        title: 'Structured data and canonical signals',
        body:
          'We implement Organization, WebSite, Service, FAQPage, BreadcrumbList, Article, and Person schema where it matches visible content.',
      },
      {
        title: 'Answer-ready content blocks',
        body:
          'We write direct definitions, TL;DR blocks, concise FAQs, comparison tables, deliverables, process steps, and quotable statements near relevant headings.',
      },
      {
        title: 'Crawler and sitemap logic',
        body:
          'We align robots.txt, sitemap.xml, canonical URLs, hreflang alternates, llms.txt, and llms-full.txt with the pages that should be discoverable.',
      },
      {
        title: 'SSR-first implementation',
        body:
          'We keep important content in server-rendered HTML so bots and AI retrieval systems can read it without relying on client-only JavaScript.',
      },
      {
        title: 'Measurement plan',
        body:
          'We define an AI Visibility Score across extractability, quotability, authority, freshness, and entity clarity before and after implementation.',
      },
    ],
    scoringTitle: 'AI Visibility Score model',
    scoringDescription:
      'Every page is evaluated against five practical factors that influence whether an answer system can reuse it confidently.',
    scoringModel: [
      {
        factor: 'Extractability',
        meaning: 'Can a crawler or model pull a direct answer from the page?',
        implementation: 'Definitions, summaries, headings, lists, tables, and SSR HTML.',
      },
      {
        factor: 'Quotability',
        meaning: 'Does the page contain concise, attributable language worth citing?',
        implementation: 'Short answer blocks, named frameworks, crisp service statements, and FAQ answers.',
      },
      {
        factor: 'Authority',
        meaning: 'Does the page show why the brand should be trusted?',
        implementation: 'Organization, Person, project, service, location, and contact signals.',
      },
      {
        factor: 'Freshness',
        meaning: 'Can systems tell the content is maintained?',
        implementation: 'Last reviewed dates, accurate sitemap lastModified values, and updated blog metadata.',
      },
      {
        factor: 'Entity Clarity',
        meaning: 'Is it obvious who Velvet Neuron is and what it does?',
        implementation: 'Consistent names, sameAs links, canonical URLs, service taxonomy, and schema @ids.',
      },
    ],
    processTitle: 'Process',
    processDescription:
      'The engagement is deliberately practical: audit first, then implement the highest-impact changes in production.',
    process: [
      {
        title: 'Audit',
        body:
          'We review metadata, schema, headings, crawlability, page rendering, internal links, and the current AI Visibility Score.',
      },
      {
        title: 'Architecture',
        body:
          'We define the entity graph, canonical page map, service taxonomy, and answer blocks that should exist on each important page.',
      },
      {
        title: 'Implementation',
        body:
          'We ship metadata, JSON-LD, sitemap/robots updates, llms files, semantic HTML, FAQs, summaries, and internal links.',
      },
      {
        title: 'Validation',
        body:
          'We build the site, inspect rendered output, and leave a prioritized TODO list for off-site authority and profile completion.',
      },
    ],
    faqTitle: 'Optimize for AI FAQ',
    faqs: [
      {
        question: 'What is Optimize for AI?',
        answer:
          'Optimize for AI is a website optimization discipline focused on helping AI answer engines understand, extract, quote, and cite your brand accurately.',
      },
      {
        question: 'Is AI search optimization different from SEO?',
        answer:
          'Yes, but it builds on SEO. Technical SEO gets pages crawled and indexed; AI search optimization adds entity clarity, direct answer structure, schema, quotable language, and maintained context files.',
      },
      {
        question: 'Do llms.txt and llms-full.txt guarantee AI citations?',
        answer:
          'No. They are useful machine-readable context files, not a guarantee. They work best when the site also has crawlable HTML, strong internal links, accurate schema, and useful content.',
      },
      {
        question: 'Which AI crawlers should a brand allow?',
        answer:
          'For visibility, a brand should intentionally allow discovery and retrieval crawlers such as OAI-SearchBot, Claude-SearchBot, Claude-User, PerplexityBot, Googlebot, and Bingbot, while deciding separately how to handle training crawlers.',
      },
      {
        question: 'How fast can AI visibility improve?',
        answer:
          'Technical fixes can be shipped quickly, but citations depend on recrawling, external authority, query demand, and model/search-provider behavior. The safe promise is better eligibility and clearer machine-readable evidence.',
      },
    ],
    ctaTitle: 'Make your website easier to cite.',
    ctaBody:
      'Send the current site, target services, and the AI answers you want to be eligible for. We will identify the highest-impact fixes first.',
    ctaButton: 'Book a free diagnosis',
  },
  pt: {
    metadataTitle: 'Otimização para Pesquisa com IA | Velvet Neuron',
    metadataDescription:
      'Otimização para pesquisa por IA, citações em ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews e motores de resposta.',
    eyebrow: 'Otimização para IA',
    navLabel: 'Visibilidade em IA',
    breadcrumb: 'Otimização para IA',
    title: 'Otimize o seu website para pesquisa por IA, motores de resposta e confiança humana.',
    intro:
      'A Velvet Neuron ajuda empresas a serem mais fáceis de compreender, citar e recomendar por ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews e motores de pesquisa tradicionais.',
    definition:
      'Otimização para IA é a prática de estruturar um website para que modelos de linguagem e rastreadores identifiquem a entidade, extraiam respostas diretas, validem sinais de autoridade e citem as páginas canónicas certas.',
    summaryTitle: 'Resumo',
    summary:
      'Combinamos SEO técnico, schema JSON-LD, HTML semântico, política de rastreio, arquitetura de conteúdo e texto pronto para respostas para que a marca seja entendida como uma entidade clara.',
    quote:
      'A Velvet Neuron constrói websites que se explicam com clareza a pessoas, motores de pesquisa e sistemas de resposta com IA.',
    fitTitle: 'Para quem é',
    fitFor: [
      'Empresas B2B que querem ser citadas como especialistas, não apenas encontradas como URLs.',
      'Fundadores a lançar uma nova categoria, oferta ou página de serviço técnico.',
      'Equipas com bom design, mas pouca clareza de entidade, schema ou estrutura de resposta.',
      'Empresas a preparar tráfego de ChatGPT, Perplexity, Claude, Gemini e Google AI Overviews.',
    ],
    deliverablesTitle: 'O que otimizamos',
    deliverablesDescription:
      'O trabalho liga acesso de rastreadores, dados estruturados, clareza de conteúdo, sinais de autoridade e caminhos de conversão.',
    deliverables: [
      {
        title: 'Arquitetura de entidade e autoridade',
        body:
          'Clarificamos marca, serviços, contexto do fundador, localização, perfis sameAs e prova para ligar a Velvet Neuron a uma entidade real e consistente.',
      },
      {
        title: 'Dados estruturados e sinais canónicos',
        body:
          'Implementamos schema Organization, WebSite, Service, FAQPage, BreadcrumbList, Article e Person quando corresponde ao conteúdo visível.',
      },
      {
        title: 'Blocos de conteúdo prontos para resposta',
        body:
          'Escrevemos definições diretas, resumos, FAQs concisas, tabelas, entregáveis, passos de processo e frases citáveis junto dos headings relevantes.',
      },
      {
        title: 'Política de rastreadores e sitemap',
        body:
          'Alinhamos robots.txt, sitemap.xml, URLs canónicos, hreflang, llms.txt e llms-full.txt com as páginas que devem ser descobertas.',
      },
      {
        title: 'Implementação SSR-first',
        body:
          'Mantemos o conteúdo importante em HTML renderizado no servidor para bots e sistemas de recuperação de informação lerem sem depender de JavaScript apenas no cliente.',
      },
      {
        title: 'Plano de medição',
        body:
          'Definimos um modelo de visibilidade em IA com extração, citabilidade, autoridade, atualidade e clareza de entidade antes e depois da implementação.',
      },
    ],
    scoringTitle: 'Modelo de Visibilidade em IA',
    scoringDescription:
      'Cada página é avaliada por cinco fatores práticos que influenciam se um motor de resposta consegue reutilizar a informação com confiança.',
    scoringModel: [
      {
        factor: 'Capacidade de extração',
        meaning: 'A página permite extrair uma resposta direta?',
        implementation: 'Definições, resumos, headings, listas, tabelas e HTML SSR.',
      },
      {
        factor: 'Citabilidade',
        meaning: 'A página tem frases curtas, atribuíveis e citáveis?',
        implementation: 'Blocos de resposta, modelos nomeados, declarações de serviço e FAQs.',
      },
      {
        factor: 'Autoridade',
        meaning: 'A página mostra porque a marca merece confiança?',
        implementation: 'Sinais de organização, pessoa, projetos, serviços, localização e contacto.',
      },
      {
        factor: 'Atualidade',
        meaning: 'É claro que o conteúdo é mantido?',
        implementation: 'Datas de revisão, lastModified correto no sitemap e metadados atualizados.',
      },
      {
        factor: 'Clareza de entidade',
        meaning: 'É óbvio quem é a Velvet Neuron e o que faz?',
        implementation: 'Nome consistente, sameAs, URLs canónicos, taxonomia de serviços e @ids.',
      },
    ],
    processTitle: 'Processo',
    processDescription:
      'O processo é prático: primeiro auditamos, depois implementamos as melhorias de maior impacto em produção.',
    process: [
      {
        title: 'Auditoria',
        body:
          'Revemos metadados, schema, headings, rastreabilidade, renderização, links internos e a pontuação atual de visibilidade em IA.',
      },
      {
        title: 'Arquitetura',
        body:
          'Definimos o grafo de entidade, o mapa de páginas canónicas, a taxonomia de serviços e os blocos de resposta por página importante.',
      },
      {
        title: 'Implementação',
        body:
          'Entregamos metadados, JSON-LD, sitemap/robots, ficheiros llms.txt, HTML semântico, FAQs, resumos e links internos.',
      },
      {
        title: 'Validação',
        body:
          'Construímos o site, verificamos o resultado renderizado e deixamos uma lista de TODOs para autoridade externa e perfis.',
      },
    ],
    faqTitle: 'FAQ sobre otimização para IA',
    faqs: [
      {
        question: 'O que é otimização para IA?',
        answer:
          'Otimização para IA é uma disciplina de otimização de websites para ajudar motores de resposta com IA a compreender, extrair, citar e referenciar a marca corretamente.',
      },
      {
        question: 'A otimização para IA é diferente de SEO?',
        answer:
          'Sim, mas parte do SEO. SEO técnico ajuda a rastrear e indexar páginas; a otimização para pesquisa com IA acrescenta clareza de entidade, estrutura de resposta, schema, linguagem citável e ficheiros de contexto mantidos.',
      },
      {
        question: 'llms.txt e llms-full.txt garantem citações em IA?',
        answer:
          'Não. São ficheiros de contexto úteis para máquinas, mas não garantem citações. Funcionam melhor com HTML rastreável, links internos fortes, schema correto e conteúdo útil.',
      },
      {
        question: 'Que rastreadores de IA devo permitir?',
        answer:
          'Para visibilidade, a marca deve permitir rastreadores de descoberta e recuperação de informação como OAI-SearchBot, Claude-SearchBot, Claude-User, PerplexityBot, Googlebot e Bingbot, decidindo à parte como lidar com rastreadores de treino.',
      },
      {
        question: 'Em quanto tempo melhora a visibilidade em IA?',
        answer:
          'As correções técnicas podem ser publicadas rapidamente, mas as citações dependem de novo rastreio, autoridade externa, procura e comportamento de cada motor. A promessa segura é melhorar a elegibilidade e a clareza da evidência.',
      },
    ],
    ctaTitle: 'Torne o website mais fácil de citar.',
    ctaBody:
      'Envie o website atual, os serviços prioritários e as respostas de IA onde quer aparecer. Identificamos primeiro as correções de maior impacto.',
    ctaButton: 'Agendar diagnóstico gratuito',
  },
};
