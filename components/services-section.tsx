import React from 'react';
import Image from 'next/image';
import {
  Bot,
  MonitorSmartphone,
  Repeat2,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const services = [
  { icon: Bot, key: 'ai_agents', footerKey: 'solutions_ai_agents', step: '01', href: '/agentes-ia' },
  { icon: Repeat2, key: 'automation', footerKey: 'solutions_automation', step: '02', href: '/automacao-processos' },
  { icon: MonitorSmartphone, key: 'web_apps', footerKey: 'solutions_web_apps', step: '03', href: '/aplicacoes-web' },
  { icon: ShoppingCart, key: 'ecommerce', footerKey: 'solutions_ecommerce', step: '04', href: '/sites-ecommerce' },
] as const;

export const ServicesSection: React.FC = () => {
  const t = useTranslations('services');
  const footerT = useTranslations('footer');

  return (
    <section id="services" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Background image */}
      <div className="absolute top-0 left-1/2 z-0 h-[704px] w-[1504px] -translate-x-1/2 opacity-30 pointer-events-none mix-blend-multiply">
        <Image
          src="/gallery/services-bg.webp"
          alt=""
          fill
          sizes="1504px"
          className="object-cover [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_70%)]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-primary">
            <span className="text-base">{'</>'}</span>
            {t('eyebrow')}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-brand-ink sm:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
            {t('description')}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="relative mx-auto mt-14 flex max-w-4xl items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-border to-brand-border" />
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-tertiary" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-tertiary" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-brand-border to-brand-border" />
        </div>

        {/* Services grid */}
        <div className="mt-14 grid gap-x-8 gap-y-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.key}
                href={service.href as '/agentes-ia' | '/automacao-processos' | '/aplicacoes-web' | '/sites-ecommerce'}
                className="group relative flex gap-5 rounded-[1.75rem] border border-brand-border/60 bg-white/70 p-7 shadow-[var(--shadow-level-1)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/20 hover:shadow-[var(--shadow-level-2)] sm:gap-7 sm:p-8"
              >
                {/* Oversized step number */}
                <div className="flex shrink-0 select-none items-start">
                  <span className="font-heading text-6xl font-bold leading-none tracking-tighter text-brand-tertiary/70 transition-colors duration-300 group-hover:text-brand-tertiary sm:text-7xl">
                    {service.step}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/8 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary/14">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-brand-ink sm:text-xl">
                      {footerT(service.footerKey)}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-[0.938rem]">
                    {t(`items.${service.key}.description`)}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition-all duration-300 group-hover:gap-2.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                    <span>{t('learn_more')}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
