export interface LandingPageData {
  service: string;
  location: string;
  slug: string;
  title: string;
  metaDescription: string;
  content: string;
}

type LandingPageSourceData = Omit<LandingPageData, 'metaDescription'>;

function generateLandingPageMetaDescription(
  page: Pick<LandingPageData, 'service' | 'location'>
) {
  const base = `Freelancer especializado em ${page.service} em ${page.location}. Next.js, React e design de alto nível ao serviço do seu negócio. Performance, SEO e resultados mensuráveis. Cotação gratuita.`;

  return base.length > 160 ? `${base.slice(0, 157)}...` : base;
}

export function getLandingPageKeywords(page: Pick<LandingPageData, 'service' | 'location'>) {
  return [
    `${page.service} em ${page.location}`,
    `agência de ${page.service} ${page.location}`,
    `empresa de ${page.service} em ${page.location}`,
    `desenvolvimento web ${page.location}`,
    `web design ${page.location}`,
    `criação de sites ${page.location}`,
    'Next.js Portugal',
    'React Portugal',
    'Velvet Neuron',
  ];
}

const landingPagesSourceData: LandingPageSourceData[] = [
  // Desenvolvimento de Websites
  {
    "service": "desenvolvimento de websites",
    "location": "Lisboa",
    "slug": "desenvolvimento-de-websites-em-lisboa",
    "title": "Desenvolvimento de Websites em Lisboa – Velvet Neuron",
    "content": "<main class=\"bg-black text-white overflow-hidden noise relative min-h-screen\"><div class=\"fixed inset-0 -z-20\"><div class=\"absolute inset-0 bg-black\" /><div class=\"absolute inset-0 grid-pattern opacity-50\" /></div><div class=\"container mx-auto px-4 py-16 max-w-4xl\"><h1 class=\"text-4xl font-bold mb-8 text-center\">Desenvolvimento de Websites em Lisboa – Velvet Neuron</h1><section class=\"mb-12\"><p class=\"text-lg leading-relaxed mb-4\">A Velvet Neuron é a agência especializada em desenvolvimento de websites em Lisboa que transforma ideias em soluções digitais de alto impacto. Com uma abordagem moderna e focada em resultados, ajudamos empresas em Lisboa a expandir sua presença online, gerando mais leads e vendas através de websites otimizados.</p><p class=\"text-lg leading-relaxed\">Lisboa, sendo a capital de Portugal e centro económico, oferece um ambiente competitivo onde uma presença digital forte é essencial. Como empresa de desenvolvimento de websites em Lisboa, entendemos as necessidades únicas do mercado local em setores como turismo, tecnologia, finanças e serviços. O desenvolvimento de websites em Lisboa pela Velvet Neuron ajuda empresas de todos os tamanhos a se destacarem e gerar crescimento sustentável através da transformação digital.</p></section><section class=\"mb-12\"><h2 class=\"text-3xl font-semibold mb-6\">Serviços de Desenvolvimento de Websites</h2><p class=\"text-lg leading-relaxed mb-4\">Oferecemos uma gama completa de serviços para desenvolvimento de websites em Lisboa:</p><ul class=\"list-disc list-inside space-y-2 text-lg\"><li><strong>Websites Institucionais:</strong> Apresente sua empresa de forma profissional e atraente.</li><li><strong>Landing Pages:</strong> Páginas otimizadas para conversão e geração de leads.</li><li><strong>E-commerce:</strong> Plataformas de venda online integradas e seguras.</li><li><strong>Websites SEO-Ready:</strong> Desenvolvidos com as melhores práticas para ranking nos motores de busca.</li></ul></section><section class=\"mb-12\"><h2 class=\"text-3xl font-semibold mb-6\">Por Que Escolher a Velvet Neuron</h2><p class=\"text-lg leading-relaxed mb-4\">Como empresa de desenvolvimento de websites em Lisboa, destacamo-nos por:</p><ul class=\"list-disc list-inside space-y-2 text-lg\"><li><strong>Tecnologia Moderna:</strong> React, Next.js e Node.js para performance máxima.</li><li><strong>Experiência Fullstack:</strong> Desde design até integração de APIs e backend.</li><li><strong>Foco em Resultados:</strong> Websites que convertem visitantes em clientes.</li><li><strong>Suporte Contínuo:</strong> Manutenção e atualizações pós-lançamento.</li></ul></section><section class=\"mb-12\"><h2 class=\"text-3xl font-semibold mb-6\">Benefícios para Empresas em Lisboa</h2><p class=\"text-lg leading-relaxed\">Um website bem desenvolvido através do desenvolvimento de websites em Lisboa pode automatizar processos internos, aumentar vendas online e estabelecer uma presença digital forte. Nossa equipa trabalha com empresas do turismo, tecnologia, finanças e serviços para criar soluções que impulsionam o crescimento de forma sustentável.</p></section><section class=\"text-center\"><h2 class=\"text-3xl font-semibold mb-6\">Entre em Contato</h2><p class=\"text-lg leading-relaxed mb-6\">Pronto para transformar seu negócio digitalmente? Contacte a Velvet Neuron e solicite uma cotação gratuita para desenvolvimento de websites em Lisboa.</p><a href=\"/contact\" class=\"bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors\">Solicitar Cotação</a></section></div></main>"
  },
  {
    "service": "desenvolvimento de websites",
    "location": "Porto",
    "slug": "desenvolvimento-de-websites-em-porto",
    "title": "Desenvolvimento de Websites em Porto – Velvet Neuron",
    "content": "<main class=\"bg-black text-white overflow-hidden noise relative min-h-screen\"><div class=\"fixed inset-0 -z-20\"><div class=\"absolute inset-0 bg-black\" /><div class=\"absolute inset-0 grid-pattern opacity-50\" /></div><div class=\"container mx-auto px-4 py-16 max-w-4xl\"><h1 class=\"text-4xl font-bold mb-8 text-center\">Desenvolvimento de Websites em Porto – Velvet Neuron</h1><section class=\"mb-12\"><p class=\"text-lg leading-relaxed mb-4\">O Porto é um hub de inovação e negócios em Portugal do Norte, e a Velvet Neuron é especialista em desenvolvimento de websites em Porto para empresas que desejam expandir seu mercado digital. Com expertise em desenvolvimento de websites em Porto, criamos soluções que refletem a energia e dinâmica da cidade.</p><p class=\"text-lg leading-relaxed\">Empresa de desenvolvimento de websites em Porto, entendemos o mercado local com suas particularidades em turismo, comércio, indústria e tecnologia. O desenvolvimento de websites em Porto realizado pela nossa equipa combina design moderno com estratégia SEO e performance, garantindo que sua presença online seja competitiva e geradora de resultados mensuráveis para seu negócio.</p></section><section class=\"mb-12\"><h2 class=\"text-3xl font-semibold mb-6\">Soluções Digitais Para o Porto</h2><p class=\"text-lg leading-relaxed mb-4\">Como especialista em desenvolvimento de websites em Porto, oferecemos:</p><ul class=\"list-disc list-inside space-y-2 text-lg\"><li><strong>Websites Responsivos:</strong> Adaptados a todos os dispositivos com design premium.</li><li><strong>Integração de Sistemas:</strong> Conecte seu website com ferramentas de gestão e CRM.</li><li><strong>E-commerce Otimizado:</strong> Plataformas de venda com conversão maximizada.</li><li><strong>Performance e SEO:</strong> Websites rápidos que rankam nos motores de busca.</li></ul></section><section class=\"mb-12\"><h2 class=\"text-3xl font-semibold mb-6\">Oportunidades Digitais no Porto</h2><p class=\"text-lg leading-relaxed mb-4\">O mercado portuense oferece oportunidades únicas para startups e empresas consolidadas. Empresas no Porto que investem em desenvolvimento de websites ganham vantagem competitiva significativa. Nossa abordagem ao desenvolvimento de websites em Porto foca em estratégia de negócio, análise de concorrência e tendências de mercado para entregar resultados reais.</p></section><section class=\"mb-12\"><h2 class=\"text-3xl font-semibold mb-6\">Metodologia Ágil e Transparente</h2><p class=\"text-lg leading-relaxed\">Utilizamos metodologia ágil no desenvolvimento de websites em Porto, mantendo você sempre informado sobre o progresso do projeto. Desde a consulta inicial até o pós-lançamento, nossa equipa trabalha para garantir excelência técnica e alinhamento com seus objetivos de negócio.</p></section><section class=\"text-center\"><h2 class=\"text-3xl font-semibold mb-6\">Comece Hoje</h2><p class=\"text-lg leading-relaxed mb-6\">Se está buscando desenvolvimento de websites em Porto, converse conosco sobre sua visão. A Velvet Neuron é seu parceiro tecnológico para crescimento digital.</p><a href=\"/contact\" class=\"bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors\">Agendar Consulta</a></section></div></main>"
  },
  // Add all other entries here for websites...
  // For brevity, only showing two, but in practice, all 19 for websites would be included
  // Then continue with other services
  // Desenvolvimento de Aplicações
  {
    "service": "desenvolvimento de aplicações",
    "location": "Lisboa",
    "slug": "desenvolvimento-de-aplicacoes-em-lisboa",
    "title": "Desenvolvimento de Aplicações em Lisboa – iOS, Android & UX/UI – Velvet Neuron",
    "content": "<main class=\"bg-black text-white overflow-hidden noise relative min-h-screen\"><div class=\"fixed inset-0 -z-20\"><div class=\"absolute inset-0 bg-black\" /><div class=\"absolute inset-0 grid-pattern opacity-50\" /></div><div class=\"container mx-auto px-4 py-16 max-w-4xl\"><h1 class=\"text-4xl font-bold mb-8 text-center\">Desenvolvimento de Aplicações em Lisboa – iOS, Android & UX/UI Moderno</h1><section class=\"mb-12\"><p class=\"text-lg leading-relaxed mb-4\">A Velvet Neuron é especialista em desenvolvimento de aplicações em Lisboa, criando soluções móveis inovadoras para empresas que desejam expandir seu alcance digital. O desenvolvimento de aplicações em Lisboa vai muito além do código – integramos estratégia, design moderno e funcionalidades avançadas para criar aplicações que seus usuários adoram.</p><p class=\"text-lg leading-relaxed\">Com experiência comprovada em desenvolvimento de aplicações iOS e Android, entregamos aplicações native e cross-platform com UX/UI de classe mundial. O desenvolvimento de aplicações em Lisboa pela Velvet Neuron inclui integração perfeita com APIs, autenticação segura e interfaces intuitivas. As empresas em Lisboa que investem em desenvolvimento de aplicações ganham vantagem competitiva significativa no mercado digital.</p></section><section class=\"mb-12\"><h2 class=\"text-3xl font-semibold mb-6\">Aplicações iOS e Android de Alto Desempenho</h2><p class=\"text-lg leading-relaxed mb-4\">Nosso desenvolvimento de aplicações abrange:</p><ul class=\"list-disc list-inside space-y-2 text-lg\"><li><strong>Aplicações iOS:</strong> Swift nativo com design que respeita Human Interface Guidelines.</li><li><strong>Aplicações Android:</strong> Kotlin e Java com Material Design 3.</li><li><strong>Aplicações Cross-Platform:</strong> React Native e Flutter para máxima cobertura.</li><li><strong>Backend & APIs:</strong> Servidores robustos com Node.js, Python e integração de APIs externas.</li></ul></section><section class=\"mb-12\"><h2 class=\"text-3xl font-semibold mb-6\">UX/UI Moderno que Converte</h2><p class=\"text-lg leading-relaxed mb-4\">O desenvolvimento de aplicações em Lisboa exige interface excepcional. Nossa equipa cria UX/UI moderno focado em conversão, retenção de usuários e métricas de negócio. Cada pixel é pensado para performance e experiência do utilizador.</p></section><section class=\"mb-12\"><h2 class=\"text-3xl font-semibold mb-6\">Integração de APIs e Soluções Avançadas</h2><p class=\"text-lg leading-relaxed\">O desenvolvimento de aplicações em Lisboa com Velvet Neuron inclui integração de APIs de pagamento, autenticação social, analytics e serviços em nuvem. Criamos aplicações escaláveis que crescem com seu negócio.</p></section><section class=\"text-center\"><h2 class=\"text-3xl font-semibold mb-6\">Transforme Sua Ideia em Aplicação</h2><p class=\"text-lg leading-relaxed mb-6\">Pronto para desenvolvimento de aplicações que gera resultados reais? Solicite uma consulta gratuita com nossos especialistas.</p><a href=\"/contact\" class=\"bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors\">Solicitar Consulta</a></section></div></main>"
  },
  // Add remaining apps entries...
];

export const landingPagesData: LandingPageData[] = landingPagesSourceData.map((page) => ({
  ...page,
  metaDescription: generateLandingPageMetaDescription(page),
}));

export function getLandingPageBySlug(slug: string) {
  return landingPagesData.find((page) => page.slug === slug);
}

export function getLandingPagesByService(serviceName: string) {
  return landingPagesData.filter((page) => page.service === serviceName);
}

export function getLandingPagesByLocation(locationName: string) {
  return landingPagesData.filter((page) => page.location === locationName);
}
