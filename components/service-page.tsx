'use client';

import React from 'react';
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Header } from '@/components/header';

type StatItem = {
  value: string;
  label: string;
};

type ServiceCard = {
  title: string;
  features: string[];
};

type ROIItem = {
  text: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

export type ServicePageProps = {
  backLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroTitle: string;
  heroDescription: string;
  stats: StatItem[];
  sectionTitle: string;
  sectionDescription: string;
  cards: ServiceCard[];
  roiTitle: string;
  roiItems: ROIItem[];
  processTitle?: string;
  processDescription?: string;
  processSteps?: ProcessStep[];
  faqTitle: string;
  faqItems: FAQItem[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
};

function FAQAccordion({ items, title }: { items: FAQItem[]; title: string }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="mt-20">
      <h2 className="text-center text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-brand-border bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <span className="pr-4 text-base font-semibold text-brand-ink">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-brand-muted transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="overflow-hidden">
                <div className="border-t border-brand-border/50 px-6 pb-5 pt-4 text-sm leading-relaxed text-brand-muted">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicePage({
  backLabel,
  breadcrumbHome,
  breadcrumbCurrent,
  heroTitle,
  heroDescription,
  stats,
  sectionTitle,
  sectionDescription,
  cards,
  roiTitle,
  roiItems,
  processTitle,
  processDescription,
  processSteps,
  faqTitle,
  faqItems,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
}: ServicePageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-paper text-brand-ink noise">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-brand-paper" />
        <div className="absolute inset-0 grid-pattern opacity-80" />
      </div>
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-24">

        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-brand-muted" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-brand-ink">
            {breadcrumbHome}
          </Link>
          <span>/</span>
          <span className="font-medium text-brand-ink">{breadcrumbCurrent}</span>
        </nav>

        {/* Hero */}
        <section className="mb-16">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
            {heroDescription}
          </p>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm"
                >
                  <p className="text-3xl font-bold tracking-tight text-brand-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-brand-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Decorative divider */}
        <div className="relative mx-auto flex max-w-4xl items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-border to-brand-border" />
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-tertiary" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-tertiary" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-brand-border to-brand-border" />
        </div>

        {/* Services section */}
        <section className="mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              {sectionTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-muted">
              {sectionDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <article
                key={index}
                className="group rounded-[1.75rem] border border-brand-border/60 bg-white/70 p-7 shadow-[var(--shadow-level-1)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/20 hover:shadow-[var(--shadow-level-2)]"
              >
                <h3 className="text-lg font-bold tracking-tight text-brand-ink">
                  {card.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-brand-muted">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ROI section */}
        <section className="mt-20">
          <div className="rounded-[2rem] bg-brand-primary p-8 text-white shadow-[0_30px_80px_-50px_rgba(18,78,70,0.7)] sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {roiTitle}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roiItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/6 p-4"
                >
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-tertiary" />
                  <span className="text-sm leading-relaxed text-white/90">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process steps */}
        {processSteps && processSteps.length > 0 && (
          <section className="mt-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                {processTitle}
              </h2>
              {processDescription && (
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-muted">
                  {processDescription}
                </p>
              )}
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="group relative flex gap-5 rounded-[1.75rem] border border-brand-border/60 bg-white/70 p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex shrink-0 select-none items-start">
                    <span className="font-heading text-5xl font-bold leading-none tracking-tighter text-brand-tertiary/70 transition-colors duration-300 group-hover:text-brand-tertiary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-brand-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <FAQAccordion items={faqItems} title={faqTitle} />

        {/* CTA */}
        <section className="mt-20">
          <div className="rounded-[2rem] border border-brand-border bg-white p-8 text-center shadow-[0_30px_80px_-55px_rgba(15,23,42,0.28)] sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              {ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-muted">
              {ctaDescription}
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-primaryHover"
            >
              {ctaButtonLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
