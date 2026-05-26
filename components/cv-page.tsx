'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Link } from '@/i18n/routing';
import type { AppLocale } from '@/lib/seo';

type CvPageProps = {
  locale: AppLocale;
};

const copy = {
  en: {
    eyebrow: 'Founder profile',
    name: 'João Manteigas',
    role: 'Co-founder of Velvet Neuron and full-stack product engineer',
    intro:
      'I build practical digital systems for companies that need clearer positioning, stronger technical execution, and less operational drag. My work sits between product engineering, automation, AI workflows, Web2/Web3 delivery, and technical SEO.',
    statement:
      'Velvet Neuron is the studio where I turn that experience into direct, senior-led work for founders and teams that want fewer layers and better decisions.',
    location: 'Lisbon, Portugal',
    contact: 'Start a conversation',
    home: 'Back to home',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    highlightsTitle: 'What I usually help with',
    highlights: [
      {
        title: 'AI-search ready websites',
        body:
          'Entity clarity, structured data, technical SEO, copy architecture, and content that answer engines can understand and cite.',
      },
      {
        title: 'Automation and internal tools',
        body:
          'Workflow automation, dashboards, CRM/ERP integrations, WhatsApp flows, lead handling, and reporting systems that remove repeated work.',
      },
      {
        title: 'Product engineering',
        body:
          'Next.js, React, React Native, Node.js, Prisma, PostgreSQL, Web3 integrations, analytics, deployment, and iteration after launch.',
      },
    ],
    experienceTitle: 'Selected experience',
    experienceIntro:
      'A compact view of the work behind Velvet Neuron: agency delivery, product teams, enterprise commerce, and founder-led builds.',
    experience: [
      {
        period: '2025 - Present',
        title: 'Co-founder & product engineer',
        company: 'Velvet Neuron',
        body:
          'Building full-stack applications, AI workflows, automation systems, SEO-ready websites, and Web2/Web3 product infrastructure for client and product-led work.',
      },
      {
        period: '2024 - 2025',
        title: 'Frontend engineer, identity and authorization',
        company: 'Human IT · Burberry',
        body:
          'Worked inside enterprise engineering teams on secure identity, profile, permissions, validation, and internal platform experiences.',
      },
      {
        period: '2024 - 2025',
        title: 'Frontend and full-stack product engineer',
        company: 'Boost IT · Made',
        body:
          'Delivered Next.js, React Native, NestJS, Electron, API, authentication, notification, and product workflow surfaces.',
      },
      {
        period: '2020 - 2025',
        title: 'Frontend and React Native engineer',
        company: 'Syone · Domino’s Norway & Sweden',
        body:
          'Owned customer-facing and back-office surfaces across ordering, localization, payments, analytics, CI/CD, and multi-region platform work.',
      },
      {
        period: '2019 - 2020',
        title: 'Frontend engineer',
        company: 'Upbeater',
        body:
          'Built the frontend for an e-learning platform with course catalog, video, quiz, progress, dashboard, and admin flows.',
      },
    ],
    projectsTitle: 'Founder-led work',
    projects: [
      {
        name: 'ScorePlay',
        label: 'Web3 product',
        body:
          'Product, architecture, and full-stack delivery for a sports prediction platform with wallet authentication, smart contracts, Prisma/PostgreSQL, rankings, and analytics.',
      },
      {
        name: 'Growth and automation systems',
        label: 'Operations',
        body:
          'WhatsApp automation, CRM integrations, AI conversations, lead qualification, GTM/PostHog tracking, and conversion infrastructure for Portuguese businesses.',
      },
      {
        name: 'Web3 and product systems',
        label: 'Platform engineering',
        body:
          'Frontend, backend, wallet, database, and smart contract integrations across Base, Solana, subgraphs, and product-facing web apps.',
      },
    ],
    stackTitle: 'Tools I reach for',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'React Native',
      'Node.js',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'GTM',
      'PostHog',
      'AWS',
      'Vercel',
      'Web3',
      'Automation',
      'Technical SEO',
      'AI workflows',
    ],
  },
  pt: {
    eyebrow: 'Perfil do fundador',
    name: 'João Manteigas',
    role: 'Cofundador da Velvet Neuron e engenheiro de produto full-stack',
    intro:
      'Construo sistemas digitais práticos para empresas que precisam de posicionamento mais claro, execução técnica forte e menos trabalho operacional repetitivo. O meu trabalho cruza engenharia de produto, automação, fluxos com IA, Web2/Web3 e SEO técnico.',
    statement:
      'A Velvet Neuron é o estúdio onde transformo essa experiência em trabalho sénior, direto e sem camadas desnecessárias para founders e equipas que querem decidir melhor.',
    location: 'Lisboa, Portugal',
    contact: 'Começar conversa',
    home: 'Voltar ao início',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    highlightsTitle: 'Onde costumo ajudar',
    highlights: [
      {
        title: 'Websites preparados para pesquisa por IA',
        body:
          'Clareza de entidade, dados estruturados, SEO técnico, arquitetura de copy e conteúdo que motores de resposta conseguem compreender e citar.',
      },
      {
        title: 'Automação e ferramentas internas',
        body:
          'Automação de processos, dashboards, integrações CRM/ERP, fluxos de WhatsApp, tratamento de leads e relatórios que reduzem trabalho repetido.',
      },
      {
        title: 'Engenharia de produto',
        body:
          'Next.js, React, React Native, Node.js, Prisma, PostgreSQL, integrações Web3, analytics, deployment e melhoria depois do lançamento.',
      },
    ],
    experienceTitle: 'Experiência selecionada',
    experienceIntro:
      'Uma visão compacta do trabalho por trás da Velvet Neuron: entrega de agência, equipas de produto, commerce empresarial e produtos próprios.',
    experience: [
      {
        period: '2025 - Presente',
        title: 'Cofundador e engenheiro de produto',
        company: 'Velvet Neuron',
        body:
          'Desenvolvimento de aplicações full-stack, fluxos com IA, sistemas de automação, websites preparados para SEO e infraestrutura Web2/Web3 para clientes e produtos próprios.',
      },
      {
        period: '2024 - 2025',
        title: 'Frontend engineer, identidade e autorização',
        company: 'Human IT · Burberry',
        body:
          'Trabalho integrado em equipas enterprise em experiências de identidade, perfil, permissões, validação e ferramentas internas seguras.',
      },
      {
        period: '2024 - 2025',
        title: 'Engenheiro frontend e full-stack de produto',
        company: 'Boost IT · Made',
        body:
          'Entrega de superfícies em Next.js, React Native, NestJS, Electron, APIs, autenticação, notificações e fluxos de produto.',
      },
      {
        period: '2020 - 2025',
        title: 'Engenheiro frontend e React Native',
        company: 'Syone · Domino’s Noruega e Suécia',
        body:
          'Responsabilidade por áreas customer-facing e back-office em encomendas, localização, pagamentos, analytics, CI/CD e plataformas multi-região.',
      },
      {
        period: '2019 - 2020',
        title: 'Frontend engineer',
        company: 'Upbeater',
        body:
          'Desenvolvimento frontend de uma plataforma de e-learning com catálogo de cursos, vídeo, quizzes, progresso, dashboard e área de administração.',
      },
    ],
    projectsTitle: 'Trabalho founder-led',
    projects: [
      {
        name: 'ScorePlay',
        label: 'Produto Web3',
        body:
          'Produto, arquitetura e entrega full-stack de uma plataforma de previsões desportivas com autenticação por wallet, smart contracts, Prisma/PostgreSQL, rankings e analytics.',
      },
      {
        name: 'Sistemas de crescimento e automação',
        label: 'Operações',
        body:
          'Automação WhatsApp, integrações CRM, conversas com IA, qualificação de leads, tracking GTM/PostHog e infraestrutura de conversão para empresas portuguesas.',
      },
      {
        name: 'Sistemas Web3 e produto',
        label: 'Engenharia de plataforma',
        body:
          'Frontend, backend, wallet, base de dados e integrações com smart contracts em Base, Solana, subgraphs e aplicações web orientadas a produto.',
      },
    ],
    stackTitle: 'Ferramentas que uso',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'React Native',
      'Node.js',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'GTM',
      'PostHog',
      'AWS',
      'Vercel',
      'Web3',
      'Automação',
      'SEO técnico',
      'Fluxos com IA',
    ],
  },
} as const;

export function CvPage({ locale }: CvPageProps) {
  const t = copy[locale];
  const openEmailClient = () => {
    const contactEmail = ['hello', '@', 'velvetneuron.com'].join('');
    window.location.href = ['mailto:', contactEmail].join('');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-paper text-brand-ink noise">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-brand-paper" />
        <div className="absolute inset-0 grid-pattern opacity-80" />
      </div>

      <Header />

      <section className="px-6 pb-16 pt-32 sm:pb-20 sm:pt-36">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primaryHover"
            >
              {t.home}
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
              {t.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.02] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
              {t.name}
            </h1>
            <p className="mt-5 text-xl font-semibold leading-8 text-brand-ink">
              {t.role}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-muted">
              {t.intro}
            </p>
            <blockquote className="mt-8 max-w-3xl border-l-2 border-brand-primary pl-5 text-lg font-semibold leading-8 text-brand-ink">
              {t.statement}
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-3">
              <ProfileLink onClick={openEmailClient} icon={<Mail className="h-4 w-4" />}>
                {t.contact}
              </ProfileLink>
              <ProfileLink
                href="https://www.linkedin.com/in/jo%C3%A3o-manteigas/"
                icon={<Linkedin className="h-4 w-4" />}
                external
              >
                {t.linkedin}
              </ProfileLink>
              <ProfileLink
                href="https://github.com/johndoeblocks"
                icon={<Github className="h-4 w-4" />}
                external
              >
                {t.github}
              </ProfileLink>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-brand-border bg-white p-6 shadow-[var(--shadow-level-2)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-brand-primary/10">
              <Image
                src="/profile-picture.png"
                alt={t.name}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-brand-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-paper px-4 py-2">
                <MapPin className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                {t.location}
              </span>
              <span className="rounded-full border border-brand-border bg-brand-paper px-4 py-2">
                Velvet Neuron
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            {t.highlightsTitle}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold tracking-tight text-brand-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
              {t.experienceTitle}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              {t.experienceIntro}
            </h2>
          </div>
          <div className="space-y-4">
            {t.experience.map((item) => (
              <article
                key={`${item.period}-${item.company}`}
                className="grid gap-4 rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-sm sm:grid-cols-[9rem_1fr]"
              >
                <p className="font-mono text-sm text-brand-muted">{item.period}</p>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brand-primary">
                    {item.company}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
            {t.projectsTitle}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.projects.map((project) => (
              <article
                key={project.name}
                className="rounded-[1.5rem] border border-brand-border bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {project.label}
                </p>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-brand-ink">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{project.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand-primary p-8 text-white shadow-[0_30px_80px_-50px_rgba(18,78,70,0.7)] sm:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t.stackTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">
                {locale === 'pt'
                  ? 'Uma base técnica prática para websites, automação, produto e IA aplicada.'
                  : 'A practical technical base for websites, automation, product, and applied AI.'}
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-primary transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.contact}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {t.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/88"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const ProfileLink = ({
  children,
  href,
  icon,
  external = false,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  icon: ReactNode;
  external?: boolean;
  onClick?: () => void;
}) => (
  <a
    href={href ?? '#'}
    onClick={(event) => {
      if (onClick) {
        event.preventDefault();
        onClick();
      }
    }}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-semibold text-brand-ink shadow-sm transition-colors hover:border-brand-primary/30 hover:text-brand-primary"
  >
    {icon}
    <span>{children}</span>
  </a>
);
