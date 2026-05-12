import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Link } from '@/i18n/routing';
import {
  BLOG_POSTS,
  buildBlogAlternates,
  getBlogImagePath,
  getBlogPostBySlug,
  getBlogUrl,
  getRelatedBlogPosts,
} from '@/lib/blog-data';
import { LOCALES, SITE_NAME, buildAbsoluteUrl, buildLocalizedUrl, toAppLocale } from '@/lib/seo';

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const articleCopy = {
  en: {
    back: 'Back to blog',
    updated: 'Updated',
    tableOfContents: 'In this guide',
    faqTitle: 'FAQ',
    relatedTitle: 'Related reading',
    ctaLabel: 'Conversion hook',
    readNext: 'Read next',
    contact: 'Start the conversation',
    author: 'Velvet Neuron',
  },
  pt: {
    back: 'Voltar ao blog',
    updated: 'Atualizado',
    tableOfContents: 'Neste guia',
    faqTitle: 'Perguntas frequentes',
    relatedTitle: 'Leitura relacionada',
    ctaLabel: 'Gancho de conversão',
    readNext: 'Ler a seguir',
    contact: 'Começar conversa',
    author: 'Velvet Neuron',
  },
} as const;

export function generateStaticParams() {
  return BLOG_POSTS.flatMap((post) =>
    LOCALES.map((locale) => ({
      locale,
      slug: post.slugs[locale],
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const activeLocale = toAppLocale(locale);
  const post = getBlogPostBySlug(activeLocale, slug);

  if (!post) {
    return {};
  }

  const content = post.content[activeLocale];
  const image = getBlogImagePath(post.id);

  return {
    title: content.metaTitle,
    description: content.description,
    keywords: content.keywords,
    authors: [{ name: SITE_NAME, url: buildAbsoluteUrl('/') }],
    openGraph: {
      title: content.metaTitle,
      description: content.description,
      locale: activeLocale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'article',
      url: getBlogUrl(activeLocale, post),
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ['Velvet Neuron'],
      tags: content.keywords,
      images: [
        {
          url: image,
          width: 1200,
          height: 675,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.description,
      images: [image],
    },
    alternates: buildBlogAlternates(post, activeLocale),
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const activeLocale = toAppLocale(locale);
  const post = getBlogPostBySlug(activeLocale, slug);

  if (!post) {
    notFound();
  }

  const content = post.content[activeLocale];
  const t = articleCopy[activeLocale];
  const relatedPosts = getRelatedBlogPosts(post, activeLocale);
  const articleUrl = getBlogUrl(activeLocale, post);
  const image = getBlogImagePath(post.id);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: buildAbsoluteUrl('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: buildAbsoluteUrl('/logo.png'),
      },
    },
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    image: buildAbsoluteBlogImageUrl(image),
    inLanguage: activeLocale === 'pt' ? 'pt-PT' : 'en',
    keywords: content.keywords.join(', '),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: activeLocale === 'pt' ? 'pt-PT' : 'en',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: buildLocalizedUrl(activeLocale, '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: buildLocalizedUrl(activeLocale, '/blog'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.title,
        item: articleUrl,
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
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-muted transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.back}
          </Link>

          <header className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-brand-muted">
                <span className="rounded-full bg-white px-3 py-1 text-brand-primary">
                  {post.category[activeLocale]}
                </span>
                <span>{post.readingTime[activeLocale]}</span>
                <time dateTime={post.updatedAt}>
                  {t.updated} {formatDate(post.updatedAt, activeLocale)}
                </time>
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
                {content.title}
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-brand-muted">
                {content.excerpt}
              </p>
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2rem] border border-brand-border bg-brand-primary/10 shadow-[var(--shadow-level-1)]">
                <Image
                  src={image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) calc(100vw - 30rem), 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <aside className="rounded-[2rem] border border-brand-border bg-white p-6 shadow-[var(--shadow-level-2)] lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                {t.tableOfContents}
              </p>
              <ol className="mt-5 space-y-3 text-sm leading-6 text-brand-muted">
                {content.sections.map((section, index) => (
                  <li key={section.title}>
                    <a href={`#section-${index + 1}`} className="hover:text-brand-ink">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-6 rounded-[1.5rem] bg-brand-primary p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                  {t.ctaLabel}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-white">
                  {content.cta.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/90">{content.cta.body}</p>
                <Link
                  href="/#contact"
                  className="mt-5 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-primary"
                >
                  {content.cta.button}
                </Link>
              </div>
            </aside>
          </header>

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <section
                  key={section.title}
                  id={`section-${index + 1}`}
                  className="scroll-mt-28 rounded-[2rem] border border-brand-border bg-white p-7 shadow-sm md:p-10"
                >
                  <h2 className="text-3xl font-semibold tracking-tight text-brand-ink">
                    {section.title}
                  </h2>
                  {section.intro ? (
                    <p className="mt-5 text-lg leading-8 text-brand-muted">{section.intro}</p>
                  ) : null}
                  {section.body?.map((paragraph) => (
                    <p key={paragraph} className="mt-5 text-lg leading-8 text-brand-muted">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3 text-base leading-7 text-brand-muted">
                          <CheckCircle2
                            className="mt-1 h-5 w-5 flex-none text-brand-primary"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.subsections?.map((subsection) => (
                    <div
                      key={subsection.title}
                      className="mt-7 rounded-[1.5rem] bg-brand-paper p-6"
                    >
                      <h3 className="text-xl font-semibold text-brand-ink">
                        {subsection.title}
                      </h3>
                      {subsection.body.map((paragraph) => (
                        <p key={paragraph} className="mt-3 text-base leading-7 text-brand-muted">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </section>
              ))}

              <section className="rounded-[2rem] border border-brand-border bg-white p-7 shadow-sm md:p-10">
                <h2 className="text-3xl font-semibold leading-tight tracking-tight text-brand-ink">
                  {t.faqTitle}
                </h2>
                <div className="mt-6 divide-y divide-brand-border">
                  {content.faqs.map((faq) => (
                    <div key={faq.question} className="py-6 first:pt-0 last:pb-0">
                      <h3 className="text-xl font-semibold text-brand-ink">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-brand-muted">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[2rem] border border-brand-border bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {content.cta.eyebrow}
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-brand-ink">
                  {content.cta.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-brand-muted">{content.cta.body}</p>
                <Link
                  href="/#contact"
                  className="mt-6 inline-flex items-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {t.contact}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-semibold tracking-tight text-brand-ink">
              {t.relatedTitle}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group overflow-hidden rounded-[2rem] border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-level-2)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-brand-primary/10">
                    <Image
                      src={relatedPost.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
                      {relatedPost.category}
                    </p>
                    <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-brand-ink">
                      <Link
                        href={relatedPost.href}
                        className="transition-colors group-hover:text-brand-primary"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="mt-4 text-base leading-7 text-brand-muted">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      href={relatedPost.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary"
                    >
                      {t.readNext}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />

      <script type="application/ld+json">
        {JSON.stringify(articleSchema).replace(/</g, '\\u003c')}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema).replace(/</g, '\\u003c')}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')}
      </script>
    </main>
  );
}

function buildAbsoluteBlogImageUrl(path: string) {
  return buildAbsoluteUrl(path);
}

function formatDate(value: string, locale: 'en' | 'pt') {
  return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-PT' : 'en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}
