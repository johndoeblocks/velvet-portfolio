import React from 'react';
import { useTranslations } from 'next-intl';

const faqKeys = ['timeline', 'budget', 'collaboration'] as const;

export const FAQ_SECTION_KEYS = faqKeys;

export const FAQSection: React.FC = () => {
  const t = useTranslations('faq');

  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
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

        <div className="mt-12 space-y-4">
          {faqKeys.map((key) => (
            <details
              key={key}
              className="group overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-[0_20px_60px_-45px_rgba(15,23,42,0.22)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5">
                <h3 className="text-left text-base font-semibold tracking-tight text-brand-ink sm:text-lg">
                  {t(`items.${key}.question`)}
                </h3>
                <span className="text-2xl leading-none text-slate-400 transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-brand-border px-6 py-5 text-sm leading-relaxed text-brand-muted">
                {t(`items.${key}.answer`)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
