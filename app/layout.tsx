import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import Script from 'next/script';
import '@/app/globals.css';
import { CookieConsent } from '@/components/cookie-consent';
import { SITE_URL } from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Velvet Neuron | Trustworthy Websites and Digital Products',
  description:
    'Senior-led digital agency in Portugal building trustworthy websites, landing pages, apps, and SEO-ready experiences that turn traffic into qualified leads.',
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
        color: '#0f4c5c',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Velvet Neuron',
    title: 'Velvet Neuron | Trustworthy Websites and Digital Products',
    description:
      'Senior-led digital agency in Portugal building trustworthy websites, landing pages, apps, and SEO-ready experiences that turn traffic into qualified leads.',
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
    title: 'Velvet Neuron | Trustworthy Websites and Digital Products',
    description:
      'Senior-led digital agency in Portugal building trustworthy websites, landing pages, apps, and SEO-ready experiences that turn traffic into qualified leads.',
    images: ['/logo.png'],
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
  const htmlLang = isPortuguese ? 'pt' : 'en';
  const siteDescription = isPortuguese
    ? 'Agência sénior em Portugal que cria websites, landing pages, apps e experiências digitais preparadas para SEO e focadas em gerar leads qualificados.'
    : 'Senior-led digital agency in Portugal building trustworthy websites, landing pages, apps, and SEO-ready experiences that turn traffic into qualified leads.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Velvet Neuron',
        description: siteDescription,
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: isPortuguese ? 'pt-PT' : 'en',
      },
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${SITE_URL}/#organization`,
        name: 'Velvet Neuron',
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
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lisbon',
          addressCountry: 'PT',
        },
        areaServed: ['Portugal', 'Europe'],
        email: 'hello@velvetneuron.com',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'hello@velvetneuron.com',
          availableLanguage: ['English', 'Portuguese'],
          areaServed: ['PT', 'EU'],
        },
        priceRange: '$$',
        availableLanguage: ['English', 'Portuguese'],
        knowsAbout: [
          'Website Design',
          'Landing Pages',
          'Digital Product Development',
          'Technical SEO',
          'Conversion Optimisation',
          'AI Automations',
          'Web Applications',
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
  };

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <script
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
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WYPHX4MX4F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WYPHX4MX4F', {
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=None;Secure'
            });
          `}
        </Script>
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`
            function initApollo() {
              var n = Math.random().toString(36).substring(7);
              var o = document.createElement('script');
              o.src = 'https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=' + n;
              o.async = true;
              o.defer = true;
              o.onload = function() {
                window.trackingFunctions.onLoad({ appId: '69e8f7a90f50e3001d12b881' });
              };
              document.head.appendChild(o);
            }
            initApollo();
          `}
        </Script>

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
