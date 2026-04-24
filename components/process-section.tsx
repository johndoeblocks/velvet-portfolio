import React from 'react';
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
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            {t('description')}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.key}
                className="rounded-[1.75rem] border border-slate-900/10 bg-[#fffaf3] p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.28)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f4c5c] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.3em] text-slate-400">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">
                  {t(`items.${step.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t(`items.${step.key}.description`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
