import React from 'react';
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';
import type { AppLocale } from '@/lib/seo';

interface LandingHeroProps {
  service: string;
  location: string;
  tagline: string;
  locale: AppLocale;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  service,
  location,
  tagline,
  locale,
}) => {
  const copy =
    locale === 'pt'
      ? {
          eyebrow: `Especialistas em ${location}`,
          primaryCta: 'Pedir proposta',
          secondaryCta: 'Ver trabalhos',
          videoCta: 'Ver vídeo',
          badge: 'Equipa sénior em Portugal',
          note: 'Estratégia, design, desenvolvimento e SEO no mesmo projeto.',
          direct: 'Trabalha diretamente com especialistas, sem intermediários.',
        }
      : {
          eyebrow: `Specialists for teams in ${location}`,
          primaryCta: 'Request a proposal',
          secondaryCta: 'See selected work',
          videoCta: 'Watch the video',
          badge: 'Senior-led team in Portugal',
          note: 'Strategy, design, development, and SEO in the same engagement.',
          direct: 'You work directly with specialists, without layers of handoff.',
        };

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pb-24 sm:pt-36">
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(18,78,70,0.16),transparent_36%),radial-gradient(circle_at_top_right,rgba(155,90,50,0.16),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center rounded-full border border-brand-border bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted shadow-sm">
              {copy.eyebrow}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.02] tracking-tight text-brand-ink sm:text-5xl lg:text-7xl">
              {locale === 'pt' ? `${service} em ${location}` : `${service} in ${location}`}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted sm:text-xl">
              {tagline} {copy.direct}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-primaryHover"
              >
                <span>{copy.primaryCta}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-7 py-4 text-sm font-semibold text-brand-ink transition-transform duration-300 hover:-translate-y-0.5 hover:border-brand-primary/20"
              >
                {copy.secondaryCta}
              </a>
            </div>

            <a
              href="#promo-video"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary underline-offset-4 transition-colors hover:text-brand-primaryHover hover:underline"
            >
              <PlayCircle className="h-4 w-4" />
              {copy.videoCta}
            </a>
          </div>

          <div className="rounded-[2rem] border border-brand-border bg-white p-8 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.28)] sm:p-10">
            <div className="inline-flex items-center rounded-full bg-brand-secondary/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-primary">
              {copy.badge}
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-brand-surface px-4 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                <p className="text-sm leading-relaxed text-brand-muted">{copy.note}</p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-brand-surface px-4 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                <p className="text-sm leading-relaxed text-brand-muted">
                  {locale === 'pt'
                    ? 'Âmbito claro, comunicação rápida e foco em resultados concretos.'
                    : 'Clear scope, fast communication, and focus on outcomes that matter.'}
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-brand-surface px-4 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                <p className="text-sm leading-relaxed text-brand-muted">
                  {locale === 'pt'
                    ? 'Ideal para empresas que precisam de uma presença digital mais credível e eficaz.'
                    : 'Ideal for teams that need a more credible and more effective digital presence.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
