import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import {
  AI_OPTIMIZATION_COPY,
  AI_OPTIMIZATION_LAST_REVIEWED,
  AI_OPTIMIZATION_PATH,
} from '@/lib/ai-optimization';
import {
  SITE_NAME,
  SITE_URL,
  buildLocaleAlternates,
  buildLocalizedUrl,
  toAppLocale,
} from '@/lib/seo';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const copy = AI_OPTIMIZATION_COPY[activeLocale];
  const pageUrl = buildLocalizedUrl(activeLocale, AI_OPTIMIZATION_PATH);
  const ogImageUrl = buildLocalizedUrl(
    activeLocale,
    `${AI_OPTIMIZATION_PATH}/opengraph-image`
  );
  const twitterImageUrl = buildLocalizedUrl(
    activeLocale,
    `${AI_OPTIMIZATION_PATH}/twitter-image`
  );

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    keywords:
      activeLocale === 'pt'
        ? [
            'Optimize for AI',
            'otimizacao para pesquisa IA',
            'AI search optimization',
            'LLM SEO',
            'GEO',
            'ChatGPT Search',
            'Perplexity',
            'Google AI Overviews',
            'Velvet Neuron',
          ]
        : [
            'Optimize for AI',
            'AI search optimization',
            'LLM SEO',
            'generative engine optimization',
            'GEO',
            'ChatGPT Search',
            'Perplexity',
            'Google AI Overviews',
            'Velvet Neuron',
          ],
    openGraph: {
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      locale: activeLocale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
      url: pageUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt:
            activeLocale === 'pt'
              ? 'Velvet Neuron Otimização para Pesquisa com IA'
              : 'Velvet Neuron Optimize for AI Search',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.metadataTitle,
      description: copy.metadataDescription,
      images: [twitterImageUrl],
    },
    alternates: buildLocaleAlternates(AI_OPTIMIZATION_PATH, activeLocale),
  };
}

export default async function OptimizeForAiPage({ params }: PageProps) {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const copy = AI_OPTIMIZATION_COPY[activeLocale];
  const pageUrl = buildLocalizedUrl(activeLocale, AI_OPTIMIZATION_PATH);
  const language = activeLocale === 'pt' ? 'pt-PT' : 'en';
  const reviewedDate =
    activeLocale === 'pt' ? '20 de maio de 2026' : '20 May 2026';

  const serviceId = `${pageUrl}#service`;
  const webpageId = `${pageUrl}#webpage`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: pageUrl,
        name: copy.metadataTitle,
        description: copy.metadataDescription,
        inLanguage: language,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': serviceId,
        },
        mainEntity: {
          '@id': serviceId,
        },
        lastReviewed: AI_OPTIMIZATION_LAST_REVIEWED,
        dateModified: AI_OPTIMIZATION_LAST_REVIEWED,
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name:
          activeLocale === 'pt'
            ? 'Otimização para Pesquisa com IA'
            : 'Optimize for AI',
        alternateName: [
          'AI Search Optimization',
          'LLM SEO',
          'Generative Engine Optimization',
          'GEO',
        ],
        serviceType:
          activeLocale === 'pt'
            ? 'Otimização para pesquisa com IA'
            : 'AI search optimization',
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: ['Portugal', 'Europe'],
        url: pageUrl,
        description: copy.definition,
        audience: {
          '@type': 'BusinessAudience',
          audienceType:
            activeLocale === 'pt'
              ? 'Empresas de serviços B2B, fundadores, equipas de crescimento e equipas de produto'
              : 'B2B service companies, founders, growth teams, and product teams',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          url: buildLocalizedUrl(activeLocale, '/#contact'),
          itemOffered: {
            '@id': serviceId,
          },
        },
        termsOfService: buildLocalizedUrl(activeLocale, '/terms'),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: language,
        mainEntity: copy.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: activeLocale === 'pt' ? 'Início' : 'Home',
            item: buildLocalizedUrl(activeLocale, '/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: copy.breadcrumb,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-paper text-brand-ink noise">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-brand-paper" />
        <div className="absolute inset-0 grid-pattern opacity-80" />
      </div>

      <Header />

      <article className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <nav
            className="mb-10 flex items-center gap-2 text-sm text-brand-muted"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-colors hover:text-brand-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {activeLocale === 'pt' ? 'Início' : 'Home'}
            </Link>
            <span>/</span>
            <span className="font-medium text-brand-ink">{copy.breadcrumb}</span>
          </nav>

          <header className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
                {copy.eyebrow}
              </p>
              <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.02] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-brand-muted">
                {copy.intro}
              </p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-muted">
                {copy.definition}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-primaryHover"
                >
                  {copy.ctaButton}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#ai-score"
                  className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-7 py-4 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
                >
                  {copy.scoringTitle}
                </a>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-brand-border bg-white p-6 shadow-[var(--shadow-level-2)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {copy.summaryTitle}
              </p>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                {copy.summary}
              </p>
              <blockquote className="mt-6 border-l-2 border-brand-primary pl-5 text-lg font-semibold leading-8 text-brand-ink">
                {copy.quote}
              </blockquote>
              <p className="mt-6 text-sm text-brand-muted">
                {activeLocale === 'pt' ? 'Revisto em' : 'Last reviewed'}:{' '}
                <time dateTime={AI_OPTIMIZATION_LAST_REVIEWED}>{reviewedDate}</time>
              </p>
            </aside>
          </header>

          <section className="mt-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {copy.fitTitle}
              </h2>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {copy.fitFor.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-[1.25rem] border border-brand-border bg-white p-5 text-sm leading-6 text-brand-muted shadow-sm"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-none text-brand-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-20">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
                {copy.deliverablesTitle}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {copy.deliverablesDescription}
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {copy.deliverables.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-brand-border bg-white p-7 shadow-[var(--shadow-level-1)]"
                >
                  <h3 className="text-lg font-bold tracking-tight text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="ai-score" className="mt-20 scroll-mt-28">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
                {copy.scoringTitle}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {copy.scoringDescription}
              </h2>
            </div>
            <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-sm">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">{copy.scoringTitle}</caption>
                <thead className="bg-brand-primary text-white">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold text-white">
                      {activeLocale === 'pt' ? 'Fator' : 'Factor'}
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold text-white">
                      {activeLocale === 'pt' ? 'O que mede' : 'What it measures'}
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold text-white">
                      {activeLocale === 'pt' ? 'Como implementamos' : 'How we implement it'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {copy.scoringModel.map((item) => (
                    <tr key={item.factor}>
                      <th scope="row" className="align-top px-5 py-5 text-base font-semibold text-brand-ink">
                        {item.factor}
                      </th>
                      <td className="align-top px-5 py-5 leading-7 text-brand-muted">
                        {item.meaning}
                      </td>
                      <td className="align-top px-5 py-5 leading-7 text-brand-muted">
                        {item.implementation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-20">
            <div className="rounded-[2rem] bg-brand-primary p-8 text-white shadow-[0_30px_80px_-50px_rgba(18,78,70,0.7)] sm:p-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {copy.processTitle}
                </h2>
                <p className="mt-4 text-base leading-7 text-white/86">
                  {copy.processDescription}
                </p>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {copy.process.map((step, index) => (
                  <article
                    key={step.title}
                    className="rounded-[1.25rem] border border-white/10 bg-white/6 p-5"
                  >
                    <p className="font-heading text-4xl font-bold leading-none text-brand-tertiary">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-5 text-base font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/82">
                      {step.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {copy.faqTitle}
              </h2>
            </div>
            <div className="mt-10 space-y-4">
              {copy.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5">
                    <h3 className="text-left text-base font-semibold tracking-tight text-brand-ink sm:text-lg">
                      {faq.question}
                    </h3>
                    <span className="text-2xl leading-none text-slate-400 transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="border-t border-brand-border px-6 py-5 text-sm leading-relaxed text-brand-muted">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="contact" className="mt-20 scroll-mt-28">
            <div className="rounded-[2rem] border border-brand-border bg-white p-8 text-center shadow-[0_30px_80px_-55px_rgba(15,23,42,0.28)] sm:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {copy.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-muted">
                {copy.ctaBody}
              </p>
              <a
                href={buildLocalizedUrl(activeLocale, '/#contact')}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-primaryHover"
              >
                {copy.ctaButton}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </article>

      <Footer />
      <JsonLd data={jsonLd} />
    </main>
  );
}
