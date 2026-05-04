import React from 'react';
import { BadgeCheck, Compass, Gauge, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const trustItems = [
  { icon: BadgeCheck, key: 'senior' },
  { icon: Compass, key: 'clarity' },
  { icon: Gauge, key: 'performance' },
  { icon: ShieldCheck, key: 'conversion' },
];

const experienceBrands = ['Burberry', "Domino's", 'Scoreplay', 'Talho Halal', 'QuizFlow'];

export const TrustSection: React.FC = () => {
  const t = useTranslations('trust');

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">
              {t('description')}
            </p>
          </div>

          <div className="rounded-[2rem] border border-brand-border bg-white px-6 py-6 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.3)] sm:px-8">
            <p className="text-sm font-medium text-brand-muted">
              {t('experience_label')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              {t('experience_copy')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {experienceBrands.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm font-medium text-brand-ink"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.key}
                className="rounded-[1.75rem] border border-brand-border bg-brand-surface p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.25)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-secondary/12 text-brand-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-brand-ink">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  {t(`items.${item.key}.description`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
