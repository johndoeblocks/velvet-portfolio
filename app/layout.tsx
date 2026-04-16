import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Velvet Neuron',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.velvetneuron.com/#website",
        "url": "https://www.velvetneuron.com",
        "name": "Velvet Neuron",
        "description": "Engenharia de produto digital de exceção. Desenhamos tecnologias de alta performance que garantem vantagem competitiva à sua empresa.",
        "publisher": {
          "@id": "https://www.velvetneuron.com/#organization"
        },
        "inLanguage": "pt-PT"
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://www.velvetneuron.com/#organization",
        "name": "Velvet Neuron",
        "url": "https://www.velvetneuron.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://www.velvetneuron.com/#logo",
          "url": "https://www.velvetneuron.com/logo.png",
          "contentUrl": "https://www.velvetneuron.com/logo.png",
          "caption": "Logótipo Velvet Neuron",
          "inLanguage": "pt-PT"
        },
        "image": {
          "@id": "https://www.velvetneuron.com/#logo"
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
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
