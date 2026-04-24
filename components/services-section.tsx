import React from 'react';
import {
  Bot,
  Gauge,
  LayoutTemplate,
  MonitorSmartphone,
  PenSquare,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const services = [
  { icon: LayoutTemplate, key: 'websites' },
  { icon: PenSquare, key: 'positioning' },
  { icon: MonitorSmartphone, key: 'web_apps' },
  { icon: Bot, key: 'ai_automation' },
  { icon: Gauge, key: 'seo_performance' },
];

export const ServicesSection: React.FC = () => {
  const t = useTranslations('services');

  return (
    <section id="services" className="px-6 py-24 sm:py-28">
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

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.key}
                className="group rounded-[1.75rem] border border-slate-900/10 bg-white p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.3)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3e6d7] text-[#0f4c5c]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">
                  {t(`items.${service.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {t(`items.${service.key}.description`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
