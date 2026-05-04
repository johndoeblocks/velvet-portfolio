import React from 'react';
import { ArrowRight, PlayCircle, Plug, Timer, Target } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ShaderBackground from '@/components/ui/shader-background';

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
      <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-65" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(246,241,232,0.98)_0%,rgba(246,241,232,0.9)_39%,rgba(246,241,232,0.26)_100%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(18,78,70,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(18,78,70,0.07)_1px,transparent_1px)] bg-[size:58px_58px] opacity-35 [mask-image:linear-gradient(90deg,transparent,black_38%,black)]"
      />
      <div className="absolute inset-x-0 top-0 z-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(155,90,50,0.18),transparent_38%),radial-gradient(circle_at_top_right,rgba(18,78,70,0.22),transparent_42%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-paper" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center rounded-full border border-brand-border bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted shadow-sm">
              {t('eyebrow')}
            </span>

            <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-[1.02] tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
              {t('headline')}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted sm:text-xl">
              {t('subheadline')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-primaryHover"
              >
                <span>{t('cta_primary')}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-7 py-4 text-sm font-semibold text-brand-ink transition-transform duration-300 hover:-translate-y-0.5 hover:border-brand-primary/20"
              >
                {t('cta_secondary')}
              </a>
            </div>

            <a
              href="#promo-video"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary underline-offset-4 transition-colors hover:text-brand-primaryHover hover:underline"
            >
              <PlayCircle className="h-4 w-4" />
              {t('cta_video')}
            </a>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-brand-border bg-white/90 px-5 py-4 shadow-[var(--shadow-level-1)]"
                >
                  <p className="text-lg font-bold tracking-tight text-brand-ink">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-brand-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-brand-border bg-brand-primary p-8 text-white shadow-[0_30px_80px_-50px_rgba(18,78,70,0.75)] sm:p-10">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              Velvet Neuron
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {t('proof_title')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/78">
              {t('proof_intro')}
            </p>

            <div className="mt-8 space-y-4">
              {[
                { text: t('proof_point_1'), icon: Plug },
                { text: t('proof_point_2'), icon: Timer },
                { text: t('proof_point_3'), icon: Target },
              ].map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/6 px-5 py-4 transition-colors hover:bg-white/10"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-relaxed text-white/84">{point.text}</p>
                  </div>
                );
              })}
            </div>

            <a
              href="#contact"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-white px-6 py-4 text-sm font-semibold text-brand-primary transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              Diagnosticar
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
