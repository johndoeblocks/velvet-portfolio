import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import {
  AI_OPTIMIZATION_COPY,
  AI_OPTIMIZATION_LAST_REVIEWED,
  AI_OPTIMIZATION_PATH,
} from '@/lib/ai-optimization';
import type { AppLocale } from '@/lib/seo';

type AiOptimizationSectionProps = {
  locale: AppLocale;
};

export function AiOptimizationSection({ locale }: AiOptimizationSectionProps) {
  const copy = AI_OPTIMIZATION_COPY[locale];
  const highlightedFactors = copy.scoringModel.slice(0, 5);
  const reviewedLabel = locale === 'pt' ? 'Revisto em' : 'Last reviewed';
  const factorLabel = locale === 'pt' ? 'Fator' : 'Factor';
  const signalLabel = locale === 'pt' ? 'Sinal' : 'Signal';

  return (
    <section id="optimize-for-ai" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
              {copy.eyebrow}
            </p>
            <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-brand-ink sm:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-muted">
              {copy.definition}
            </p>
            <blockquote className="mt-8 border-l-2 border-brand-primary pl-5 text-lg font-semibold leading-8 text-brand-ink">
              {copy.quote}
            </blockquote>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={AI_OPTIMIZATION_PATH}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-primaryHover"
              >
                {copy.navLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-brand-border bg-white px-7 py-4 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
              >
                {copy.ctaButton}
              </a>
            </div>
            <p className="mt-5 text-sm text-brand-muted">
              {reviewedLabel}:{' '}
              <time dateTime={AI_OPTIMIZATION_LAST_REVIEWED}>
                {locale === 'pt' ? '20 de maio de 2026' : '20 May 2026'}
              </time>
            </p>
          </div>

          <div className="rounded-[2rem] border border-brand-border bg-white p-6 shadow-[var(--shadow-level-1)] sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight text-brand-ink">
              {copy.summaryTitle}
            </h3>
            <p className="mt-4 text-base leading-7 text-brand-muted">
              {copy.summary}
            </p>

            <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-brand-border">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">{copy.scoringTitle}</caption>
                <thead className="bg-brand-paper text-brand-ink">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {factorLabel}
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {signalLabel}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {highlightedFactors.map((factor) => (
                    <tr key={factor.factor}>
                      <th scope="row" className="align-top px-4 py-4 font-semibold text-brand-ink">
                        {factor.factor}
                      </th>
                      <td className="px-4 py-4 leading-6 text-brand-muted">
                        {factor.implementation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {copy.fitFor.slice(0, 4).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-brand-muted">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 flex-none text-brand-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
