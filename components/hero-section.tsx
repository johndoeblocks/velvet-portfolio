import React from 'react';
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const HeroSection: React.FC = () => {
  const t = useTranslations('hero');

  const stats = [
    { value: t('stat_1_value'), label: t('stat_1_label') },
    { value: t('stat_2_value'), label: t('stat_2_label') },
    { value: t('stat_3_value'), label: t('stat_3_label') },
  ];

  const proofPoints = [
    t('proof_point_1'),
    t('proof_point_2'),
    t('proof_point_3'),
  ];

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pb-24 sm:pt-36">
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(198,124,78,0.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(15,76,92,0.16),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#f6f1e8]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center rounded-full border border-slate-900/10 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm">
              {t('eyebrow')}
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
              {t('headline')}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {t('subheadline')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f4c5c] px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0c3d49]"
              >
                <span>{t('cta_primary')}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/20"
              >
                {t('cta_secondary')}
              </a>
            </div>

            <a
              href="#promo-video"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f4c5c] underline-offset-4 transition-colors hover:text-[#0c3d49] hover:underline"
            >
              <PlayCircle className="h-4 w-4" />
              {t('cta_video')}
            </a>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-slate-900/10 bg-white/90 px-5 py-4 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.35)]"
                >
                  <p className="text-lg font-bold tracking-tight text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-900/10 bg-[#0f4c5c] p-8 text-white shadow-[0_30px_80px_-50px_rgba(15,76,92,0.75)] sm:p-10">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              Velvet Neuron
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
              {t('proof_title')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78">
              {t('proof_intro')}
            </p>

            <div className="mt-8 space-y-4">
              {proofPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f6d7b8]" />
                  <p className="text-sm leading-relaxed text-white/84">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
