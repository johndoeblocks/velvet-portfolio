import React from 'react';
import { ServiceConfig, LocationConfig } from '@/lib/landing-pages-constants';

const testimonialsByCity: Record<string, { name: string; role: string; quote: string }[]> = {
  Lisboa: [
    {
      name: "Mariana Costa",
      role: "Fundadora, Studio Branco — Lisboa",
      quote: "Transformou por completo a nossa presença online. Em três meses após o lançamento do novo website, os leads qualificados subiram 180%. Comunicação direta, código impecável e entrega dentro do prazo.",
    },
    {
      name: "Ricardo Ferreira",
      role: "CEO, LisboaTech Solutions",
      quote: "Trabalhar com a Velvet Neuron foi a melhor decisão do ano. O website carrega em menos de 1 segundo e já estamos na primeira página do Google — tudo comunicado de forma clara e sem jargão.",
    },
    {
      name: "Catarina Mendes",
      role: "Diretora Comercial, Grupo Restelo",
      quote: "Finalmente um freelancer que fala a linguagem do negócio. Não entregou apenas um website bonito — entregou uma máquina de conversão que trabalha 24/7 por nós.",
    },
  ],
  Porto: [
    {
      name: "Paulo Rodrigues",
      role: "Gerente, Bom Porto Restauração",
      quote: "Duplicámos as reservas online em dois meses. O website é rápido, bonito e aparece no topo do Google quando alguém procura restaurante no Porto — resultado concreto e mensurável.",
    },
    {
      name: "Sofia Lopes",
      role: "Fundadora, Porto Handmade",
      quote: "A loja online passou de 5 encomendas por mês para 40+ após o redesign. Comunicação clara, prazos cumpridos e um resultado que excedeu todas as expectativas.",
    },
    {
      name: "António Mota",
      role: "Diretor, Mota & Associados",
      quote: "Começámos a ver o website como um custo. Hoje percebemos que foi o melhor investimento do ano — cada euro gasto trouxe pelo menos cinco de retorno.",
    },
  ],
  Braga: [
    {
      name: "Inês Barbosa",
      role: "CEO, Bragatech Innovations",
      quote: "Qualidade técnica que rivaliza com qualquer estúdio europeu — mas com o contacto direto e atenção ao detalhe que só um freelancer de topo consegue dar.",
    },
    {
      name: "Miguel Torres",
      role: "Fundador, MindBraga Studio",
      quote: "Desde o dia 1, a comunicação foi exemplar. Prazos cumpridos, qualidade acima do esperado e um suporte pós-lançamento que nos deixa completamente tranquilos.",
    },
  ],
  default: [
    {
      name: "Ana Oliveira",
      role: "Diretora Comercial",
      quote: "A Velvet Neuron superou todas as expectativas. Entregue em tempo recorde, com uma qualidade técnica raramente encontrada — e contacto direto do início ao fim do projeto.",
    },
    {
      name: "João Silva",
      role: "CEO & Fundador",
      quote: "Triplicámos a taxa de conversão. O investimento pagou-se no primeiro mês. Recomendo sem hesitar a qualquer empresa que queira resultados reais no digital.",
    },
    {
      name: "Marta Pereira",
      role: "Gestora de Marketing Digital",
      quote: "Trabalhámos com vários fornecedores antes. Nenhum chegou perto deste nível de profissionalismo, proatividade e qualidade final — e tudo com um só ponto de contacto.",
    },
  ],
};

function getTestimonials(city: string) {
  return testimonialsByCity[city] ?? testimonialsByCity["default"];
}

interface LandingSeoContentProps {
  service: ServiceConfig;
  location: LocationConfig;
}

export const LandingSeoContent: React.FC<LandingSeoContentProps> = ({ service, location }) => {
  const primaryKeyword = `${service.name} em ${location.name}`;
  const testimonials = getTestimonials(location.name);

  return (
    <>
      {/* ── PROBLEMA + CONTEXTO LOCAL ────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-t border-white/5 relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5">O mercado em {location.name} exige mais</h2>
              <p className="text-white/60 leading-relaxed mb-4 text-sm sm:text-base">
                {location.name} é a {location.description}. As empresas aqui não competem apenas localmente — competem com o mundo inteiro. Uma presença digital lenta, desatualizada ou visualmente fraca custa-lhe clientes todos os dias.
              </p>
              <p className="text-white/60 leading-relaxed mb-4 text-sm sm:text-base">
                {location.vibe}
              </p>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Em setores como {location.industries.slice(0, 4).join(", ")} — dominantes em {location.name} — a primeira impressão digital é decisiva. Mais de 70% dos consumidores portugueses pesquisam online antes de comprar. A questão é: quando encontram a sua empresa, o que veem?
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 w-full">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold mb-1 text-sm">Websites lentos perdem clientes</h3>
                <p className="text-white/50 text-sm leading-relaxed">53% dos utilizadores abandona uma página que demora mais de 3 segundos a carregar.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold mb-1 text-sm">Sem SEO, é invisível</h3>
                <p className="text-white/50 text-sm leading-relaxed">92% dos cliques acontece na primeira página do Google.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold mb-1 text-sm">Design amador afasta negócios</h3>
                <p className="text-white/50 text-sm leading-relaxed">75% dos utilizadores julga a credibilidade pelo design do website.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold mb-1 text-sm">Concorrência avança rápido</h3>
                <p className="text-white/50 text-sm leading-relaxed">Empresas que investem em {primaryKeyword} crescem significativamente mais.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFÍCIOS + RESULTADOS ──────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-t border-white/5 relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-5">Resultados que Transformam Negócios</h2>
              <p className="text-white/60 leading-relaxed mb-8 text-sm sm:text-base">
                Clientes que investem em {primaryKeyword} com a Velvet Neuron não estão apenas a comprar um projeto — estão a construir uma vantagem competitiva duradoura.
              </p>
              <ul className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-white mt-0.5 shrink-0 leading-none">✓</span>
                    <span className="text-white/70 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
              <div className="bg-white/5 rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-white/10">
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 text-purple-400">3×</div>
                <div className="text-white/40 text-xs leading-snug">Aumento médio de leads qualificados</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-white/10">
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 text-blue-400">&lt;&nbsp;1s</div>
                <div className="text-white/40 text-xs leading-snug">Tempo de carregamento garantido</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-white/10">
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 text-green-400">Top 5</div>
                <div className="text-white/40 text-xs leading-snug">Posicionamento Google melhorado</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-white/10">
                <div className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2 text-pink-400">98+</div>
                <div className="text-white/40 text-xs leading-snug">Google PageSpeed Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTEMUNHOS LOCAIS ───────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-t border-white/5 relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">O Que Dizem os Clientes</h2>
            <p className="text-white/50 text-sm sm:text-base">Resultados reais. Palavras reais. Empresas em Portugal que confiam no meu trabalho.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-white/20 transition-all duration-200 flex flex-col">
                <div className="text-white/20 text-4xl font-serif mb-3 leading-none">"</div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic flex-1">{t.quote}</p>
                <div className="border-t border-white/10 pt-4 mt-auto">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 sm:px-8 border-t border-white/5 relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-white/50 text-sm sm:text-base">Tudo o que precisa de saber sobre {service.name} em {location.name}.</p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer hover:bg-white/10 transition-colors list-none gap-4">
                    <h3 className="font-medium text-sm sm:text-base text-left">{faq.question}</h3>
                    <span className="text-white/40 shrink-0 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
