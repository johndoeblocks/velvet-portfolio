import React from 'react';
import { LocationConfig, ServiceConfig } from '@/lib/landing-pages-constants';

interface LandingSeoContentProps {
  service: ServiceConfig;
  location: LocationConfig;
}

export const LandingSeoContent: React.FC<LandingSeoContentProps> = ({
  service,
  location,
}) => {
  const primaryKeyword = `${service.name} em ${location.name}`;

  return (
    <>
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-brand-border bg-white p-8 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.28)] sm:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
              Mercado local
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Porque investir em {primaryKeyword}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-muted">
              {location.name} é {location.description}. Num mercado onde a primeira impressão
              acontece quase sempre online, um website lento, pouco claro ou visualmente fraco
              transmite insegurança e dificulta a geração de oportunidades.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              {location.vibe} Para empresas em setores como{' '}
              {location.industries.slice(0, 4).join(', ')}, a presença digital precisa de
              comunicar profissionalismo, clareza e capacidade de execução desde a primeira visita.
            </p>
          </article>

          <div className="grid gap-5">
            <article className="rounded-[1.75rem] border border-brand-border bg-brand-surface p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.24)]">
              <h3 className="text-lg font-semibold tracking-tight text-brand-ink">
                Clareza comercial
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                A oferta precisa de ser compreendida rapidamente. Quanto menos esforço for
                necessário para perceber o valor, maior a probabilidade de contacto.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-brand-border bg-brand-surface p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.24)]">
              <h3 className="text-lg font-semibold tracking-tight text-brand-ink">
                Confiança visual
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                Um design profissional, consistente e legível faz o visitante sentir que está a
                falar com um parceiro credível, não com um fornecedor improvisado.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-brand-border bg-brand-surface p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.24)]">
              <h3 className="text-lg font-semibold tracking-tight text-brand-ink">
                Base técnica sólida
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                Performance, SEO técnico e uma estrutura bem construída ajudam o site a ser
                encontrado, carregado mais depressa e convertido com menos fricção.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
              O que recebe
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              O que torna este serviço mais eficaz
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">
              A Velvet Neuron combina estratégia, design, desenvolvimento e SEO técnico para que
              {` ${primaryKeyword}`} não seja apenas um projeto bonito, mas um ativo comercial mais
              forte.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-brand-border bg-white p-8 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.28)] sm:p-10">
              <ul className="space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-brand-muted">
                    <span className="mt-0.5 text-brand-primary">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {service.solutions.slice(0, 4).map((solution) => (
                <article
                  key={solution.title}
                  className="rounded-[1.75rem] border border-brand-border bg-brand-surface p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.24)]"
                >
                  <h3 className="text-lg font-semibold tracking-tight text-brand-ink">
                    {solution.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {solution.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
              Perguntas frequentes
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Dúvidas comuns antes de avançar
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">
              Respostas claras para reduzir incerteza antes de iniciar {primaryKeyword}.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-[0_20px_60px_-45px_rgba(15,23,42,0.22)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5">
                  <h3 className="text-left text-base font-semibold tracking-tight text-brand-ink sm:text-lg">
                    {faq.question}
                  </h3>
                  <span className="text-2xl leading-none text-slate-400 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-brand-border px-6 py-5 text-sm leading-relaxed text-brand-muted">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
