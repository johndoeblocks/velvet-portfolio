import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from '@/components/language-switcher';

type LegalSection = {
  title: string;
  body: ReactNode;
};

type LegalPageProps = {
  title: string;
  intro: string;
  badge: string;
  backLabel: string;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  intro,
  badge,
  backLabel,
  sections,
}: LegalPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f1e8] text-slate-950 noise">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[#f6f1e8]" />
        <div className="absolute inset-0 grid-pattern opacity-80" />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
          <LanguageSwitcher />
        </div>

        <article className="rounded-[2rem] border border-slate-900/10 bg-white p-8 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.28)] sm:p-10">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            {badge}
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            {intro}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
