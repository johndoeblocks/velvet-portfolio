import type { Metadata } from 'next';
import { ArrowRight, BookOpen, Search, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Link } from '@/i18n/routing';
import {
  BLOG_POSTS,
  getBlogCategories,
  getBlogIndexUrl,
  getBlogPosts,
} from '@/lib/blog-data';
import {
  buildLocaleAlternates,
  buildLocalizedUrl,
  toAppLocale,
} from '@/lib/seo';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const copy = {
  en: {
    title: 'Web development insights for founders and growth teams',
    metaTitle: 'Blog | Web Development, SEO and Conversion Insights',
    description:
      'Practical guides on web development, Next.js SEO, conversion, MVPs, and Web3 UX from Velvet Neuron.',
    eyebrow: 'Velvet Neuron Blog',
    intro:
      'Clear, technical, conversion-focused writing for teams that need websites and products to earn trust, rank better, and generate better enquiries.',
    primaryCta: 'Book an audit',
    secondaryCta: 'Browse articles',
    featured: 'Featured guides',
    featuredDescription:
      'Start with the pieces most likely to help you make a better website, SEO, or product decision this week.',
    searchTitle: 'Explore all articles',
    searchDescription:
      'Filter by topic or search across agency selection, startup MVPs, Web3 UX, technical SEO, and website strategy.',
    searchPlaceholder: 'Search by topic, keyword, or problem',
    allCategories: 'All topics',
    noResults: 'No articles match that search yet.',
    readArticle: 'Read article',
    updated: 'Updated',
    articlesLabel: 'articles',
    topicsLabel: 'topics',
    trustTitle: 'Built to turn expertise into qualified conversations',
    trustBody:
      'Every article links education back to action: audits, scope reviews, and practical next steps for teams deciding what to improve.',
    pillarTitle: 'Pillar topic: digital product development for founders',
    pillarBody:
      'The blog cluster connects agency selection, MVP scope, Web3 onboarding, technical SEO, and redesign decisions into one authority hub around building digital products that convert.',
  },
  pt: {
    title: 'Insights de desenvolvimento web para founders e equipas de crescimento',
    metaTitle: 'Blog | Desenvolvimento Web, SEO e Conversão',
    description:
      'Guias práticos sobre desenvolvimento web, SEO em Next.js, conversão, MVPs e UX Web3 da Velvet Neuron.',
    eyebrow: 'Blog Velvet Neuron',
    intro:
      'Conteúdo claro, técnico e orientado a conversão para equipas que precisam de websites e produtos que geram confiança, ranqueiam melhor e trazem pedidos de contacto mais qualificados.',
    primaryCta: 'Agendar auditoria',
    secondaryCta: 'Ver artigos',
    featured: 'Guias em destaque',
    featuredDescription:
      'Comece pelos artigos mais úteis para tomar melhores decisões sobre website, SEO ou produto esta semana.',
    searchTitle: 'Explorar artigos',
    searchDescription:
      'Filtre por tema ou pesquise sobre escolha de agência, MVPs, UX Web3, SEO técnico e estratégia de website.',
    searchPlaceholder: 'Pesquisar por tema, keyword ou problema',
    allCategories: 'Todos os temas',
    noResults: 'Nenhum artigo corresponde a essa pesquisa.',
    readArticle: 'Ler artigo',
    updated: 'Atualizado',
    articlesLabel: 'artigos',
    topicsLabel: 'temas',
    trustTitle: 'Criado para transformar autoridade em conversas qualificadas',
    trustBody:
      'Cada artigo liga educação a ação: auditorias, revisão de scope e próximos passos práticos para equipas que estão a decidir o que melhorar.',
    pillarTitle: 'Tema pilar: desenvolvimento de produto digital para empresas',
    pillarBody:
      'O cluster liga escolha de agência, scope de MVP, onboarding Web3, SEO técnico e decisões de redesign num hub de autoridade sobre produtos digitais que convertem.',
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const t = copy[activeLocale];

  return {
    title: t.metaTitle,
    description: t.description,
    keywords:
      activeLocale === 'pt'
        ? [
            'blog desenvolvimento web',
            'SEO Next.js',
            'agência websites',
            'conversão website',
            'MVP startups',
          ]
        : [
            'web development blog',
            'Next.js SEO',
            'website agency',
            'conversion website design',
            'startup MVP',
          ],
    openGraph: {
      title: t.metaTitle,
      description: t.description,
      locale: activeLocale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
      url: buildLocalizedUrl(activeLocale, '/blog'),
      siteName: 'Velvet Neuron',
      images: [
        {
          url: '/logo.png',
          width: 1200,
          height: 630,
          alt: 'Velvet Neuron',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metaTitle,
      description: t.description,
      images: ['/logo.png'],
    },
    alternates: buildLocaleAlternates('/blog', activeLocale),
  };
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const t = copy[activeLocale];
  const posts = getBlogPosts(activeLocale);
  const featuredPosts = posts.filter((post) => post.featured);
  const categories = getBlogCategories(activeLocale);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.title,
    description: t.description,
    url: getBlogIndexUrl(activeLocale),
    inLanguage: activeLocale === 'pt' ? 'pt-PT' : 'en',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: buildLocalizedUrl(activeLocale, post.href),
        name: post.title,
      })),
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f1e8] text-slate-950 noise">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[#f6f1e8]" />
        <div className="absolute inset-0 grid-pattern opacity-80" />
      </div>

      <Header />

      <section className="px-6 pb-16 pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f4c5c]">
              {t.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {t.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0f4c5c] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0c3d49]"
              >
                {t.primaryCta}
              </a>
              <a
                href="#blog-search"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-[#0f4c5c]/40 hover:text-[#0f4c5c]"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-900/10 bg-white/80 p-6 shadow-xl shadow-slate-900/8 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: BookOpen, title: `${BLOG_POSTS.length} ${t.articlesLabel}`, body: t.featured },
                { icon: Search, title: `${categories.length} ${t.topicsLabel}`, body: t.searchTitle },
                { icon: ShieldCheck, title: 'SEO + CRO', body: t.trustTitle },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[2rem] border border-slate-900/8 bg-[#f6f1e8] p-5"
                  >
                    <Icon className="h-5 w-5 text-[#0f4c5c]" aria-hidden="true" />
                    <h2 className="mt-4 text-lg font-semibold text-slate-950">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f4c5c]">
                {t.featured}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                {t.featuredDescription}
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-[2rem] border border-slate-900/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/8"
              >
                <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span>{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
                  <Link href={post.href} className="transition-colors group-hover:text-[#0f4c5c]">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{post.excerpt}</p>
                <Link
                  href={post.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0f4c5c]"
                >
                  {t.readArticle}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20" id="blog-search">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f4c5c]">
                Blog
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                {t.searchTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                {t.searchDescription}
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-900/10 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {t.topicsLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-slate-900/10 bg-[#f6f1e8] px-3 py-1.5 text-sm font-semibold text-slate-700"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex min-h-[24rem] flex-col rounded-[2rem] border border-slate-900/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/8"
              >
                <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span>{post.category}</span>
                  <time dateTime={post.updatedAt}>
                    {t.updated} {formatDate(post.updatedAt, activeLocale)}
                  </time>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
                  <Link href={post.href} className="transition-colors group-hover:text-[#0f4c5c]">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 text-base leading-7 text-slate-600">
                  {post.excerpt}
                </p>
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-900/8 pt-5">
                  <span className="text-sm text-slate-500">{post.readingTime}</span>
                  <Link
                    href={post.href}
                    className="rounded-full bg-[#0f4c5c] px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 group-hover:-translate-y-0.5"
                  >
                    {t.readArticle}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-900/10 bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {t.pillarTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{t.pillarBody}</p>
          </div>
          <div
            className="rounded-[2rem] border border-[#0f4c5c]/20 bg-[#0f4c5c] p-8 text-white"
            id="contact"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
              CTA
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              {t.trustTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80">{t.trustBody}</p>
            <Link
              href="/#contact"
              className="mt-7 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0f4c5c] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.primaryCta}
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <script type="application/ld+json">
        {JSON.stringify(collectionSchema).replace(/</g, '\\u003c')}
      </script>
    </main>
  );
}

function formatDate(value: string, locale: 'en' | 'pt') {
  return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-PT' : 'en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}
