import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Company = {
  name: string;
  detail: string;
  logo: string;
  logoSrc?: string;
  logoClassName?: string;
};

const companies: Company[] = [
  {
    name: 'Burberry',
    detail: 'Luxury ecommerce',
    logo: 'burberry',
    logoSrc: '/logos/burberry-logo.jpeg',
    logoClassName: 'h-28 w-36 rounded-2xl object-contain',
  },
  {
    name: "Domino's",
    detail: 'Norway & Sweden',
    logo: 'dominos',
    logoSrc: '/logos/dominos-logo.svg',
    logoClassName: 'h-24 w-24 object-contain',
  },
  {
    name: 'Scoreplay',
    detail: 'Sports media platform',
    logo: 'scoreplay',
    logoSrc: '/logos/scoreplay-logo.svg',
    logoClassName: 'h-16 w-72 object-contain object-left',
  },
  { name: 'Talho Halal', detail: 'Local commerce', logo: 'talho' },
  { name: 'QuizFlow', detail: 'Education product', logo: 'quizflow' },
  { name: 'Syone', detail: 'Engineering consultancy', logo: 'syone' },
];

function CompanyLogo({ company }: { company: Company }) {
  if (company.logoSrc && company.logoClassName) {
    return (
      <div
        className={`flex min-h-[7rem] items-center ${
          company.logo === 'scoreplay'
            ? 'w-fit rounded-2xl bg-brand-dark px-5 py-4'
            : ''
        }`}
      >
        <Image
          src={company.logoSrc}
          alt={`${company.name} logo`}
          width={320}
          height={128}
          className={company.logoClassName}
        />
      </div>
    );
  }

  if (company.logo === 'talho') {
    return (
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary text-2xl font-black text-brand-inverse">
          TH
        </span>
        <span className="text-4xl font-black tracking-tight text-brand-ink sm:text-5xl">
          Talho Halal
        </span>
      </div>
    );
  }

  if (company.logo === 'quizflow') {
    return (
      <span className="text-4xl font-black tracking-tight text-brand-ink sm:text-5xl">
        Quiz<span className="text-brand-primary">Flow</span>
      </span>
    );
  }

  if (company.logo === 'syone') {
    return (
      <span className="text-4xl font-black uppercase tracking-[0.08em] text-brand-ink sm:text-5xl">
        Syone
      </span>
    );
  }

  return (
    <span className="text-4xl font-black tracking-tight text-brand-ink sm:text-5xl">
      {company.name}
    </span>
  );
}

export const PortfolioSection: React.FC = () => {
  const t = useTranslations('portfolio');
  const marqueeCompanies = [...companies, ...companies];

  return (
    <section id="portfolio" className="overflow-hidden px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-5xl">
              {t('title')}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-brand-muted sm:text-right">
            {t('description')}
          </p>
        </div>

        <div className="relative mt-10 -mx-6 overflow-hidden px-6 pb-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-brand-paper to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-brand-paper to-transparent" />

          <div className="flex w-max gap-4 animate-company-marquee">
            {marqueeCompanies.map((company, index) => (
              <article
                key={`${company.name}-${index}`}
                className="group flex h-64 w-[24rem] shrink-0 flex-col justify-between rounded-[1.5rem] border border-brand-border bg-white/88 p-7 shadow-[var(--shadow-level-1)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/25 hover:shadow-[var(--shadow-level-2)] sm:w-[30rem]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
                    {company.detail}
                  </span>
                  <span className="rounded-full bg-brand-tertiary/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="min-w-0">
                  <CompanyLogo company={company} />
                  <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-brand-primary">
                    {t('company_label')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
