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
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(15,76,92,0.16),transparent_36%),radial-gradient(circle_at_top_right,rgba(198,124,78,0.16),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center rounded-full border border-slate-900/10 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm">
              {copy.eyebrow}
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
              {locale === 'pt' ? `${service} em ${location}` : `${service} in ${location}`}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {tagline} {copy.direct}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f4c5c] px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0c3d49]"
              >
                <span>{copy.primaryCta}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/20"
              >
                {copy.secondaryCta}
              </a>
            </div>

            <a
              href="#promo-video"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f4c5c] underline-offset-4 transition-colors hover:text-[#0c3d49] hover:underline"
            >
              <PlayCircle className="h-4 w-4" />
              {copy.videoCta}
            </a>
          </div>

          <div className="rounded-[2rem] border border-slate-900/10 bg-white p-8 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.28)] sm:p-10">
            <div className="inline-flex items-center rounded-full bg-[#f3e6d7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f4c5c]">
              {copy.badge}
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-[#fffaf3] px-4 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f4c5c]" />
                <p className="text-sm leading-relaxed text-slate-700">{copy.note}</p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-[#fffaf3] px-4 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f4c5c]" />
                <p className="text-sm leading-relaxed text-slate-700">
                  {locale === 'pt'
                    ? 'Âmbito claro, comunicação rápida e foco em resultados concretos.'
                    : 'Clear scope, fast communication, and focus on outcomes that matter.'}
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-[#fffaf3] px-4 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0f4c5c]" />
                <p className="text-sm leading-relaxed text-slate-700">
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
