import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import '@/app/globals.css';
import Script from 'next/script';
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
  title: 'Velvet Neuron | Produtos Digitais de Alta Performance',
  description: 'Engenharia de produto digital de exceção. Desenhamos tecnologias de alta performance que garantem vantagem competitiva à sua empresa. Inicie o seu projeto.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png',
        color: '#8b5cf6',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: SITE_URL,
    siteName: 'Velvet Neuron',
    title: 'Velvet Neuron | Produtos Digitais de Alta Performance',
    description: 'Engenharia de produto digital de exceção. Desenhamos tecnologias de alta performance que garantem vantagem competitiva à sua empresa.',
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
    title: 'Velvet Neuron | Produtos Digitais de Alta Performance',
    description: 'Engenharia de produto digital de exceção. Desenhamos tecnologias de alta performance que garantem vantagem competitiva à sua empresa.',
    images: ['/logo.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
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
  const htmlLang = locale.startsWith('pt') ? 'pt' : 'en';

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": "Velvet Neuron",
        "description": "Engenharia de produto digital de exceção. Desenhamos tecnologias de alta performance que garantem vantagem competitiva à sua empresa.",
        "publisher": {
          "@id": `${SITE_URL}/#organization`
        },
        "inLanguage": "pt-PT"
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        "name": "Velvet Neuron",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          "url": `${SITE_URL}/logo.png`,
          "contentUrl": `${SITE_URL}/logo.png`,
          "caption": "Logótipo Velvet Neuron",
          "inLanguage": "pt-PT"
        },
        "image": {
          "@id": `${SITE_URL}/#logo`
        },
        "description": "A Velvet Neuron é uma agência especializada em Digital Product Engineering. Projetamos e construímos produtos digitais de alta performance focados em criar vantagem competitiva e fomentar a liderança de mercado para os nossos clientes.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lisboa",
          "addressCountry": "PT"
        },
        "email": "hello@velvetneuron.com",
        "priceRange": "$$$",
        "knowsAbout": [
          "Digital Product Engineering",
          "Product Design",
          "Software Development",
          "High-performance Applications",
          "AI & Automation",
          "Web Platforms",
          "Trading & Data Systems"
        ],
        // "sameAs": [
        //   "https://www.linkedin.com/company/velvetneuron",
        //   "https://www.instagram.com/velvetneuron",
        //   "https://www.behance.net/velvetneuron"
        // ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    ]
  };

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 - Default State (Before any other scripts) */}
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
        
        {/* Silktide Style */}
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        {/* Google Analytics & Ads Integration */}
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

        {/* Cookie Consent Manager */}
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
