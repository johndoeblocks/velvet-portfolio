import {
  SITE_NAME,
  SITE_URL,
  type AppLocale,
  buildLocalizedUrl,
} from '@/lib/seo';

type FaqItem = {
  question: string;
  answer: string;
};

type ServiceSchemaInput = {
  locale: AppLocale;
  path: string;
  name: string;
  description: string;
  breadcrumbName: string;
  serviceType: string;
  faqItems: FaqItem[];
};

export function buildServicePageJsonLd({
  locale,
  path,
  name,
  description,
  breadcrumbName,
  serviceType,
  faqItems,
}: ServiceSchemaInput) {
  const url = buildLocalizedUrl(locale, path);
  const inLanguage = locale === 'pt' ? 'pt-PT' : 'en';
  const serviceId = `${url}#service`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${name} | ${SITE_NAME}`,
        description,
        inLanguage,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        mainEntity: {
          '@id': serviceId,
        },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name,
        description,
        serviceType,
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: ['Portugal', 'Europe'],
        url,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          url: buildLocalizedUrl(locale, '/#contact'),
          itemOffered: {
            '@id': serviceId,
          },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage,
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'pt' ? 'Início' : 'Home',
            item: buildLocalizedUrl(locale, '/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: breadcrumbName,
            item: url,
          },
        ],
      },
    ],
  };
}
