import type { ServiceConfig, LocationConfig } from "./landing-pages-constants";

// ─── TESTIMONIALS DATABASE ─────────────────────────────────────────────────────

const testimonialsByCity: Record<
  string,
  { name: string; role: string; quote: string }[]
> = {
  Lisboa: [
    {
      name: "Mariana Costa",
      role: "Fundadora, Studio Branco — Lisboa",
      quote:
        "Transformou por completo a nossa presença online. Em três meses após o lançamento do novo website, os leads qualificados subiram 180%. Comunicação direta, código impecável e entrega dentro do prazo.",
    },
    {
      name: "Ricardo Ferreira",
      role: "CEO, LisboaTech Solutions",
      quote:
        "Trabalhar com a Velvet Neuron foi a melhor decisão do ano. O website carrega em menos de 1 segundo e já estamos na primeira página do Google — tudo comunicado de forma clara e sem jargão.",
    },
    {
      name: "Catarina Mendes",
      role: "Diretora Comercial, Grupo Restelo",
      quote:
        "Finalmente um freelancer que fala a linguagem do negócio. Não entregou apenas um website bonito — entregou uma máquina de conversão que trabalha 24/7 por nós.",
    },
  ],
  Porto: [
    {
      name: "Paulo Rodrigues",
      role: "Gerente, Bom Porto Restauração",
      quote:
        "Duplicámos as reservas online em dois meses. O website é rápido, bonito e aparece no topo do Google quando alguém procura restaurante no Porto — resultado concreto e mensurável.",
    },
    {
      name: "Sofia Lopes",
      role: "Fundadora, Porto Handmade",
      quote:
        "A loja online passou de 5 encomendas por mês para 40+ após o redesign. Comunicação clara, prazos cumpridos e um resultado que excedeu todas as expectativas.",
    },
    {
      name: "António Mota",
      role: "Diretor, Mota & Associados",
      quote:
        "Começámos a ver o website como um custo. Hoje percebemos que foi o melhor investimento do ano — cada euro gasto trouxe pelo menos cinco de retorno.",
    },
  ],
  Braga: [
    {
      name: "Inês Barbosa",
      role: "CEO, Bragatech Innovations",
      quote:
        "Qualidade técnica que rivaliza com qualquer estúdio europeu — mas com o contacto direto e atenção ao detalhe que só um freelancer de topo consegue dar.",
    },
    {
      name: "Miguel Torres",
      role: "Fundador, MindBraga Studio",
      quote:
        "Desde o dia 1, a comunicação foi exemplar. Prazos cumpridos, qualidade acima do esperado e um suporte pós-lançamento que nos deixa completamente tranquilos.",
    },
  ],
  default: [
    {
      name: "Ana Oliveira",
      role: "Diretora Comercial",
      quote:
        "A Velvet Neuron superou todas as expectativas. Entregue em tempo recorde, com uma qualidade técnica raramente encontrada — e contacto direto do início ao fim do projeto.",
    },
    {
      name: "João Silva",
      role: "CEO & Fundador",
      quote:
        "Triplicámos a taxa de conversão. O investimento pagou-se no primeiro mês. Recomendo sem hesitar a qualquer empresa que queira resultados reais no digital.",
    },
    {
      name: "Marta Pereira",
      role: "Gestora de Marketing Digital",
      quote:
        "Trabalhámos com vários fornecedores antes. Nenhum chegou perto deste nível de profissionalismo, proatividade e qualidade final — e tudo com um só ponto de contacto.",
    },
  ],
};

function getTestimonials(city: string) {
  return testimonialsByCity[city] ?? testimonialsByCity["default"];
}

// ─── HTML GENERATOR ───────────────────────────────────────────────────────────

export function generateLandingPageContent(
  service: ServiceConfig,
  location: LocationConfig,
  slug: string
): string {
  const testimonials = getTestimonials(location.name);
  const serviceCapitalized =
    service.name.charAt(0).toUpperCase() + service.name.slice(1);
  const primaryKeyword = `${service.name} em ${location.name}`;
  const testimonialCols =
    testimonials.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return `<main class="bg-black text-white overflow-hidden noise relative min-h-screen">
  <!-- Background -->
  <div class="fixed inset-0 -z-20">
    <div class="absolute inset-0 bg-black"></div>
    <div class="absolute inset-0 grid-pattern opacity-40"></div>
  </div>

  <!-- ── HERO ─────────────────────────────────────────────────────────── -->
  <section class="relative pt-28 pb-20 px-6 sm:px-8">
    <div class="mx-auto max-w-3xl text-center">

      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/60 mb-8 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0 inline-block"></span>
        Freelancer · ${location.name} · Portugal
      </div>

      <!-- H1 -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
        ${serviceCapitalized}<br />
        <span class="">em ${location.name}</span>
      </h1>

      <!-- Tagline -->
      <p class="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed px-2">
        ${service.tagline} Trabalho diretamente consigo, sem intermediários — foco total no seu projeto, do briefing à entrega.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <a href="/pt#contact" class="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-semibold text-sm sm:text-base text-center hover:bg-white/90 transition-all duration-200 shadow-2xl shadow-white/10">
          Solicitar Cotação Gratuita
        </a>
        <a href="#servicos" class="w-full sm:w-auto border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-sm sm:text-base text-center hover:bg-white/5 transition-all duration-200">
          Ver Serviços
        </a>
      </div>

      <!-- Trust bar -->
  
    </div>
  </section>

  <!-- ── PROBLEMA + CONTEXTO LOCAL ────────────────────────────────────── -->
  <section class="py-20 px-6 sm:px-8 ">
    <div class="mx-auto max-w-4xl">
      <div class="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-14 items-start">

        <!-- Text column -->
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold mb-5">O mercado em ${location.name} exige mais</h2>
          <p class="text-white/60 leading-relaxed mb-4 text-sm sm:text-base">
            ${location.name} é a ${location.description}. As empresas aqui não competem apenas localmente — competem com o mundo inteiro. Uma presença digital lenta, desatualizada ou visualmente fraca custa-lhe clientes todos os dias.
          </p>
          <p class="text-white/60 leading-relaxed mb-4 text-sm sm:text-base">
            ${location.vibe}
          </p>
          <p class="text-white/60 leading-relaxed text-sm sm:text-base">
            Em setores como ${location.industries.slice(0, 4).join(", ")} — dominantes em ${location.name} — a primeira impressão digital é decisiva. Mais de 70% dos consumidores portugueses pesquisam online antes de comprar. A questão é: quando encontram a sua empresa, o que veem?
          </p>
        </div>

        <!-- Stats cards column -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 w-full">
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
            <h3 class="font-semibold mb-1 text-sm">Websites lentos perdem clientes</h3>
            <p class="text-white/50 text-sm leading-relaxed">53% dos utilizadores abandona uma página que demora mais de 3 segundos a carregar.</p>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
            <h3 class="font-semibold mb-1 text-sm">Sem SEO, é invisível</h3>
            <p class="text-white/50 text-sm leading-relaxed">92% dos cliques acontece na primeira página do Google. Se não está lá, não existe.</p>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
            <h3 class="font-semibold mb-1 text-sm">Design amador afasta negócios</h3>
            <p class="text-white/50 text-sm leading-relaxed">75% dos utilizadores julga a credibilidade de uma empresa pelo design do website.</p>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
            <h3 class="font-semibold mb-1 text-sm">Concorrência está a avançar</h3>
            <p class="text-white/50 text-sm leading-relaxed">As empresas em ${location.name} que investem em digital crescem 2× mais rápido.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── SOLUÇÕES / SERVIÇOS ───────────────────────────────────────────── -->
  <section id="servicos" class="py-20 px-6 sm:px-8 border-t border-white/5">
    <div class="mx-auto max-w-4xl">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">${service.headline} em ${location.name}</h2>
        <p class="text-white/50 max-w-xl mx-auto text-sm sm:text-base">Soluções especializadas de ${service.name} adaptadas às necessidades das empresas em ${location.name} — do briefing ao lançamento e além.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        ${service.solutions
      .map(
        (sol, i) => `<div class="bg-white/5 rounded-2xl p-5 sm:p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 group${i === 0 ? " sm:col-span-2" : ""}">
          <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-white/20 transition-colors">0${i + 1}</div>
            <div class="min-w-0">
              <h3 class="font-semibold mb-2 text-sm sm:text-base">${sol.title}</h3>
              <p class="text-white/50 text-sm leading-relaxed">${sol.description}</p>
            </div>
          </div>
        </div>`
      )
      .join("\n        ")}
      </div>
    </div>
  </section>

  <!-- ── POR QUE VELVET NEURON ─────────────────────────────────────────── -->
  <section class="py-20 px-6 sm:px-8 border-t border-white/5">
    <div class="mx-auto max-w-4xl">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Por Que a Velvet Neuron?</h2>
        <p class="text-white/50 max-w-xl mx-auto text-sm sm:text-base">Trabalho diretamente consigo — sem conta-managers, sem subcontratações. O desenvolvedor que faz a proposta é o mesmo que entrega o projeto.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div class="bg-white/5 rounded-2xl p-5 hover:border-white/20 transition-all duration-200">
          <div class="text-3xl mb-4">⚡</div>
          <h3 class="font-semibold mb-2 text-sm">Performance Garantida</h3>
          <p class="text-white/50 text-sm leading-relaxed">Core Web Vitals no verde em todos os projetos. Velocidade não é opcional — é obrigação.</p>
        </div>
        <div class="bg-white/5  rounded-2xl p-5 hover:border-white/20 transition-all duration-200">
          <div class="text-3xl mb-4">🔍</div>
          <h3 class="font-semibold mb-2 text-sm">SEO de Raiz</h3>
          <p class="text-white/50 text-sm leading-relaxed">Estrutura técnica, metadados, Schema.org e estratégia de conteúdo para rankear no topo do Google.</p>
        </div>
        <div class="bg-white/5  rounded-2xl p-5 hover:border-white/20 transition-all duration-200">
          <div class="text-3xl mb-4">🎨</div>
          <h3 class="font-semibold mb-2 text-sm">Design de Alto Nível</h3>
          <p class="text-white/50 text-sm leading-relaxed">Interfaces que surpreendem pela beleza e convertem pela clareza. Cada pixel tem propósito.</p>
        </div>
        <div class="bg-white/5 rounded-2xl p-5 hover:border-white/20 transition-all duration-200">
          <div class="text-3xl mb-4">🤝</div>
          <h3 class="font-semibold mb-2 text-sm">Contacto Direto</h3>
          <p class="text-white/50 text-sm leading-relaxed">Fala sempre com quem faz o trabalho — sem intermediários, sem perdas de informação, sem surpresas.</p>
        </div>
        <div class="bg-white/5  rounded-2xl p-5 hover:border-white/20 transition-all duration-200">
          <div class="text-3xl mb-4">📊</div>
          <h3 class="font-semibold mb-2 text-sm">Foco em ROI</h3>
          <p class="text-white/50 text-sm leading-relaxed">Cada decisão é tomada com base em dados. Medimos o impacto real do nosso trabalho no seu negócio.</p>
        </div>
        <div class="bg-white/5  rounded-2xl p-5 hover:border-white/20 transition-all duration-200">
          <div class="text-3xl mb-4">🛡️</div>
          <h3 class="font-semibold mb-2 text-sm">Suporte Contínuo</h3>
          <p class="text-white/50 text-sm leading-relaxed">Após o lançamento, continuamos ao seu lado — manutenção, updates e evolução permanente.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── BENEFÍCIOS / RESULTADOS ───────────────────────────────────────── -->
  <section class="py-20 px-6 sm:px-8 border-t border-white/5">
    <div class="mx-auto max-w-4xl">
      <div class="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-14 items-start">

        <!-- Benefits list -->
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold mb-5">Resultados que Transformam Negócios</h2>
          <p class="text-white/60 leading-relaxed mb-8 text-sm sm:text-base">
            Clientes que investem em ${primaryKeyword} com a Velvet Neuron não estão apenas a comprar um projeto — estão a construir uma vantagem competitiva duradoura no digital.
          </p>
          <ul class="space-y-4">
            ${service.benefits
      .map(
        (benefit) => `<li class="flex items-start gap-3">
              <span class="text-white mt-0.5 shrink-0 leading-none">✓</span>
              <span class="text-white/70 text-sm leading-relaxed">${benefit}</span>
            </li>`
      )
      .join("\n            ")}
          </ul>
        </div>

        <!-- Stats grid -->
        
      </div>
    </div>
  </section>

  <!-- ── TECNOLOGIAS ───────────────────────────────────────────────────── -->
  <section class="py-20 px-6 sm:px-8 border-t border-white/5">
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="text-2xl sm:text-3xl font-bold mb-4">Tecnologias que Usamos</h2>
      <p class="text-white/50 mb-10 max-w-xl mx-auto text-sm sm:text-base">Trabalhamos com a melhor stack disponível em 2026 — escolhida pela performance, escalabilidade e ecossistema de suporte.</p>
      <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
        ${service.techStack
      .map(
        (tech) => `<div class="bg-white/5  rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-200">${tech}</div>`
      )
      .join("\n        ")}
      </div>
    </div>
  </section>



  <!-- ── FAQ ──────────────────────────────────────────────────────────── -->


  <!-- ── CTA FINAL ─────────────────────────────────────────────────────── -->
  <section class="py-16 sm:py-24 px-6 sm:px-8 border-t border-white/5">
    <div class="mx-auto max-w-3xl text-center">
      <div class="bg-white/5  rounded-2xl sm:rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        <div class="relative">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block shrink-0"></span>
            Consultas gratuitas disponíveis esta semana
          </div>

          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Vamos construir algo<br />extraordinário em ${location.name}?
          </h2>
          <p class="text-white/60 mb-8 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">
            Fale comigo diretamente. A primeira conversa é gratuita, sem compromisso e sem jargão técnico — percebo o seu negócio e digo-lhe exatamente o que consigo fazer por si.
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="/pt#contact" class="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-semibold text-sm sm:text-base text-center hover:bg-white/90 transition-all duration-200">
              Agendar Consulta Gratuita
            </a>
            <a href="mailto:hello@velvetneuron.com" class="w-full sm:w-auto border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-sm sm:text-base text-center hover:bg-white/5 transition-all duration-200 break-all sm:break-normal">
              hello@velvetneuron.com
            </a>
          </div>

          <p class="text-white/30 text-xs mt-8">Resposta garantida em menos de 24 horas úteis · Proposta detalhada em 48h · Sem compromisso</p>
        </div>
      </div>
    </div>
  </section>
</main>`;
}

export function generateLandingPageTitle(
  service: ServiceConfig,
  location: LocationConfig
): string {
  const serviceCapTitle = service.name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return `${serviceCapTitle} em ${location.name} • Agência Premium | Velvet Neuron`;
}
