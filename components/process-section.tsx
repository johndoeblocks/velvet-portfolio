import React from 'react';
import Image from 'next/image';
import { Blocks, PenTool, Rocket, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

const steps = [
  { icon: Search, key: 'step_1', number: '01' },
  { icon: PenTool, key: 'step_2', number: '02' },
  { icon: Blocks, key: 'step_3', number: '03' },
  { icon: Rocket, key: 'step_4', number: '04' },
];

export const ProcessSection: React.FC = () => {
  const t = useTranslations('process');

  return (
    <section id="process" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-muted">
            {t('description')}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-brand-border bg-brand-dark shadow-[0_28px_70px_-42px_rgba(15,23,42,0.42)] sm:min-h-[30rem]">
            <Image
              src="/gallery/process-automation-workspace.webp"
              alt={t('image_alt')}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/78 via-brand-dark/12 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.25rem] border border-white/15 bg-brand-dark/62 p-5 text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-primary">
                {t('image_label')}
              </span>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/82">
                {t('image_caption')}
              </p>
            </div> */}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.key}
                  className="rounded-[1.75rem] border border-brand-border bg-brand-surface p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.28)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold tracking-[0.3em] text-brand-muted/55">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-brand-ink">
                    {t(`items.${step.key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {t(`items.${step.key}.description`)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
