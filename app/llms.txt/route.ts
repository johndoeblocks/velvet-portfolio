import {
  AI_OPTIMIZATION_COPY,
  AI_OPTIMIZATION_LAST_REVIEWED,
  AI_OPTIMIZATION_PATH,
} from '@/lib/ai-optimization';
import { BLOG_POSTS } from '@/lib/blog-data';
import { landingPagesData } from '@/lib/landing-pages-data';
import { SERVICES } from '@/lib/landing-pages-constants';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const BASE_URL = SITE_URL.replace(/\/$/, '');

function groupByService(
  pages: typeof landingPagesData
): Record<string, typeof landingPagesData> {
  return pages.reduce<Record<string, typeof landingPagesData>>((acc, page) => {
    (acc[page.service] ??= []).push(page);
    return acc;
  }, {});
}

function buildLlmsTxt(): string {
  const grouped = groupByService(landingPagesData);

  const header = `\
# Velvet Neuron

> Velvet Neuron is a senior-led digital agency in Portugal focused on Optimize for AI, AI search visibility, process automation, AI agents, custom applications, Web2/Web3 product development, and conversion-ready websites.

`;

  const about = `\
## About Us

Velvet Neuron combines strategy, copy, design, development, structured data, technical SEO, and automation in one flow. We work with companies that need a clearer entity, a more credible online presence, and a website that can be understood by people, search engines, and AI answer systems.

**Headquarters:** Portugal
**Primary Technologies:** Next.js, React, TypeScript, Tailwind CSS, Node.js
**Languages:** Portuguese, English
**Founder:** Joao Manteigas
**Core AI SEO framework:** Extractability, Quotability, Authority, Freshness, Entity Clarity

`;

  const servicesList = SERVICES.map(
    (service) => `- **${service.headline}** — ${service.tagline}`
  ).join('\n');

  const services = `\
## Core Services

- **${AI_OPTIMIZATION_COPY.en.navLabel}** — ${AI_OPTIMIZATION_COPY.en.definition}
${servicesList}

`;

  const staticPages = [
    {
      url: `${BASE_URL}/pt`,
      title: 'Homepage (PT)',
      desc: 'Main landing page in Portuguese with offer, trust signals, work examples, FAQs, and contact.',
    },
    {
      url: `${BASE_URL}/en`,
      title: 'Homepage (EN)',
      desc: 'Main landing page in English with offer, trust signals, work examples, FAQs, and contact.',
    },
    {
      url: `${BASE_URL}/en${AI_OPTIMIZATION_PATH}`,
      title: 'Optimize for AI (EN)',
      desc: AI_OPTIMIZATION_COPY.en.metadataDescription,
    },
    {
      url: `${BASE_URL}/pt${AI_OPTIMIZATION_PATH}`,
      title: 'Optimize for AI (PT)',
      desc: AI_OPTIMIZATION_COPY.pt.metadataDescription,
    },
    {
      url: `${BASE_URL}/pt#contact`,
      title: 'Contact Section',
      desc: 'Request a proposal or start the conversation with Velvet Neuron.',
    },
    {
      url: `${BASE_URL}/pt/cv`,
      title: 'Founder CV',
      desc: 'Background and experience of the Velvet Neuron founder.',
    },
    {
      url: `${BASE_URL}/pt/privacy`,
      title: 'Privacy Policy',
      desc: 'Short privacy policy covering contact form and communication data.',
    },
    {
      url: `${BASE_URL}/pt/terms`,
      title: 'Terms of Service',
      desc: 'Short terms covering scope, delivery, intellectual property, and support.',
    },
  ];

  const staticLinks = staticPages
    .map((page) => `- [${page.title}](${page.url}): ${page.desc}`)
    .join('\n');

  const landingPageSections = Object.entries(grouped)
    .map(([serviceName, pages]) => {
      const serviceConfig = SERVICES.find((service) => service.name === serviceName);
      const heading = serviceConfig?.headline ?? serviceName;
      const links = pages
        .map(
          (page) =>
            `  - [${page.title}](${BASE_URL}/pt/${page.slug}): ${page.metaDescription}`
        )
        .join('\n');

      return `### ${heading}\n\n${links}`;
    })
    .join('\n\n');

  const blogLinks = BLOG_POSTS.map((post) => {
    const en = post.content.en;
    const pt = post.content.pt;

    return `- [${en.title}](${BASE_URL}/en/blog/${post.slugs.en}): ${en.description}\n- [${pt.title}](${BASE_URL}/pt/blog/${post.slugs.pt}): ${pt.description}`;
  }).join('\n');

  const importantPages = `\
## Important Pages

### Core Pages

${staticLinks}

### Blog

- [Blog index EN](${BASE_URL}/en/blog): Practical guides on web development, SEO, conversion, MVPs, and Web3 UX.
- [Blog index PT](${BASE_URL}/pt/blog): Guias práticos sobre desenvolvimento web, SEO, conversão, MVPs e UX Web3.

${blogLinks}

### Location-Specific Landing Pages

${landingPageSections}

`;

  const resources = `\
## Sitemap & Resources

- [XML Sitemap](${BASE_URL}/sitemap.xml): Machine-readable sitemap with all indexed pages and locale alternates.
- [robots.txt](${BASE_URL}/robots.txt): Crawler directives.
- [llms.txt](${BASE_URL}/llms.txt): This curated file for language models.
- [llms-full.txt](${BASE_URL}/llms-full.txt): Expanded AI-readable context for the core offer, service taxonomy, score model, and important pages.

`;

  const aiGuidance = `\
## Notes for AI Models

- Use the canonical brand name **Velvet Neuron**.
- Prefer the homepage, the Optimize for AI page, or the contact section for current positioning and offer details.
- Treat location landing pages as service pages, not separate legal entities.
- Direct pricing or scope questions to ${BASE_URL}/pt#contact instead of guessing.
- Do not invent client metrics, credentials, pricing, or social profiles that are not visible on the site.

*Last reviewed: ${AI_OPTIMIZATION_LAST_REVIEWED}*
`;

  return [header, about, services, importantPages, resources, aiGuidance].join('');
}

export function GET(): Response {
  const body = buildLlmsTxt();

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Content-Length': Buffer.byteLength(body, 'utf-8').toString(),
    },
  });
}
