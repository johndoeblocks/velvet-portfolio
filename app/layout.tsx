import '@/app/globals.css';
import type { Metadata } from 'next';
import { DM_Mono, DM_Sans, Syne } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import Script from 'next/script';
import { CookieConsent } from '@/components/cookie-consent';
import {
  BRAND_SAME_AS,
  FOUNDER_NAME,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo';

const GTM_ID = 'GTM-5HWH5NMR';

const dmSans = DM_Sans({
  variable: '--font-body',
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const syne = Syne({
  variable: '--font-display',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const dmMono = DM_Mono({
  variable: '--font-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Velvet Neuron | Automação Prática para PMEs em Portugal',
  description:
    'Automação de processos, agentes de IA e aplicações à medida para PMEs em Portugal. Poupe tempo, reduza erros e comece com diagnóstico gratuito.',
  keywords: [
    'Velvet Neuron',
    'Optimize for AI',
    'AI search optimization',
    'LLM SEO',
    'GEO',
    'process automation Portugal',
    'AI agents Portugal',
    'Next.js agency Portugal',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png',
        color: '#124e46',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Velvet Neuron | Automação Prática para PMEs em Portugal',
    description:
      'Automação de processos, agentes de IA e aplicações à medida para PMEs em Portugal. Poupe tempo, reduza erros e comece com diagnóstico gratuito.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Velvet Neuron',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velvet Neuron | Automação Prática para PMEs em Portugal',
    description:
      'Automação de processos, agentes de IA e aplicações à medida para PMEs em Portugal. Poupe tempo, reduza erros e comece com diagnóstico gratuito.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      pt: `${SITE_URL}/pt`,
      'x-default': `${SITE_URL}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Velvet Neuron',
  },
  formatDetection: {
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const isPortuguese = locale.startsWith('pt');
  const htmlLang = isPortuguese ? 'pt-PT' : 'en';
  const siteDescription = isPortuguese
    ? 'Agência de automação em Portugal que cria processos automáticos, agentes de IA e aplicações à medida para PMEs sem equipa técnica interna.'
    : 'Automation agency in Portugal building process automation, AI agents, and custom applications for SMEs without internal IT teams.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: SITE_NAME,
        description: siteDescription,
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: isPortuguese ? 'pt-PT' : 'en',
      },
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/logo.png`,
          contentUrl: `${SITE_URL}/logo.png`,
          caption: 'Velvet Neuron logo',
          inLanguage: isPortuguese ? 'pt-PT' : 'en',
        },
        image: {
          '@id': `${SITE_URL}/#logo`,
        },
        description: siteDescription,
        sameAs: BRAND_SAME_AS,
        founder: {
          '@id': `${SITE_URL}/#founder`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lisbon',
          addressCountry: 'PT',
        },
        areaServed: ['Portugal', 'Europe'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          availableLanguage: ['English', 'Portuguese'],
          areaServed: ['PT', 'EU'],
        },
        priceRange: '$$',
        availableLanguage: ['English', 'Portuguese'],
        knowsAbout: [
          'AI Search Optimization',
          'LLM SEO',
          'Generative Engine Optimization',
          'Google AI Overviews',
          'ChatGPT Search',
          'Perplexity Search',
          'Structured Data',
          'Schema.org',
          'Process Automation',
          'AI Agents',
          'WhatsApp Business API',
          'ERP Integrations',
          'CRM Integrations',
          'Digital Product Development',
          'Conversion Optimisation',
          'AI Automations',
          'Web Applications',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isPortuguese ? 'Serviços da Velvet Neuron' : 'Velvet Neuron services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isPortuguese
                  ? 'Otimização para Pesquisa com IA'
                  : 'Optimize for AI Search',
                serviceType: isPortuguese
                  ? 'Otimização para pesquisa com IA'
                  : 'AI search optimization',
                url: `${SITE_URL}/${isPortuguese ? 'pt' : 'en'}/optimize-for-ai`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isPortuguese ? 'Automação de Processos' : 'Process Automation',
                serviceType: isPortuguese
                  ? 'Automação de processos'
                  : 'Process automation',
                url: `${SITE_URL}/${isPortuguese ? 'pt' : 'en'}/automacao-processos`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isPortuguese ? 'Agentes de IA' : 'AI Agents',
                serviceType: isPortuguese ? 'Agentes de IA' : 'AI agents',
                url: `${SITE_URL}/${isPortuguese ? 'pt' : 'en'}/agentes-ia`,
              },
            },
          ],
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: FOUNDER_NAME,
        alternateName: 'Joao Manteigas',
        jobTitle: isPortuguese
          ? 'Cofundador e engenheiro de produto full-stack'
          : 'Co-Founder and Full-Stack Product Engineer',
        url: `${SITE_URL}/${isPortuguese ? 'pt' : 'en'}/cv`,
        worksFor: {
          '@id': `${SITE_URL}/#organization`,
        },
        knowsAbout: [
          'Next.js',
          'React',
          'TypeScript',
          'Process Automation',
          'AI Workflows',
          'Web3 Product Development',
          'Technical SEO',
          'AI Search Optimization',
        ],
      },
    ],
  };

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <Script
          id="gtm-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'personalization_storage': 'denied',
                'functionality_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
              window.gtag = gtag;
            `,
          }}
        />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${syne.variable} ${dmMono.variable} antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <CookieConsent />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  );
}
