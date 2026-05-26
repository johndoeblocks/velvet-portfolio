import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/json-ld';
import { Header } from '@/components/header';
import { LandingHero } from '@/components/landing-hero';
import { LandingSeoContent } from '@/components/landing-seo-content';
import { TrustSection } from '@/components/trust-section';
import { PromoVideoSection } from '@/components/promo-video-section';
import { ServicesSection } from '@/components/services-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { ProcessSection } from '@/components/process-section';
import { FAQSection } from '@/components/faq-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import {
  getLandingPageBySlug,
  getLandingPageKeywords,
  landingPagesData,
} from '@/lib/landing-pages-data';
import { LOCATIONS, SERVICES } from '@/lib/landing-pages-constants';
import {
  LOCALES,
  SITE_URL,
  buildLocaleAlternates,
  buildLocalizedUrl,
  toAppLocale,
} from '@/lib/seo';

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const serviceTranslations: Record<string, string> = {
  'desenvolvimento de websites': 'website development',
  'desenvolvimento de aplicações': 'app development',
  'SEO técnico e performance web': 'technical SEO and web performance',
  'loja online': 'ecommerce development',
  'aplicações desktop': 'desktop app development',
};

const taglineTranslations: Record<string, string> = {
  'desenvolvimento de websites':
    'Fast, trustworthy websites and landing pages designed to explain your offer clearly and generate better enquiries.',
  'desenvolvimento de aplicações':
    'Web and mobile products built for usability, speed, and a stronger customer experience.',
  'SEO técnico e performance web':
    'Technical SEO and performance improvements that help your website load faster, rank better, and convert with less friction.',
  'loja online':
    'Online stores designed for clearer product discovery, smoother checkout, and stronger ecommerce conversion.',
  'aplicações desktop':
    'Desktop applications built for internal workflows, operational speed, and reliable day-to-day use.',
};

const locationTranslations: Record<string, string> = {
  Lisboa: 'Lisbon',
  Porto: 'Porto',
  Braga: 'Braga',
  Coimbra: 'Coimbra',
  Aveiro: 'Aveiro',
  Setúbal: 'Setubal',
  Guimarães: 'Guimaraes',
  Faro: 'Faro',
  Guarda: 'Guarda',
  Leiria: 'Leiria',
  Funchal: 'Funchal',
  'Ponta Delgada': 'Ponta Delgada',
  Évora: 'Evora',
  Viseu: 'Viseu',
  'Viana do Castelo': 'Viana do Castelo',
  Santarém: 'Santarem',
  'Castelo Branco': 'Castelo Branco',
  Bragança: 'Braganca',
  'Vila Real': 'Vila Real',
  Portalegre: 'Portalegre',
  Beja: 'Beja',
};

function capitalizeFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getLocalizedServiceLabel(locale: string, service: string) {
  if (locale === 'pt') {
    return service;
  }

  return serviceTranslations[service] ?? service;
}

function getLocalizedTagline(locale: string, serviceName: string, fallback: string) {
  if (locale === 'pt') {
    return fallback;
  }

  return taglineTranslations[serviceName] ?? fallback;
}

function getLocalizedLocationLabel(locale: string, location: string) {
  if (locale === 'pt') {
    return location;
  }

  return locationTranslations[location] ?? location;
}

function getLocalizedMetadata(locale: string, service: string, location: string, fallbackDescription: string) {
  if (locale === 'pt') {
    return {
      title: `${capitalizeFirst(service)} em ${location} | Velvet Neuron`,
      description: fallbackDescription,
    };
  }

  return {
    title: `${capitalizeFirst(service)} in ${location} | Velvet Neuron`,
    description: `Senior-led ${service} in ${location}. Velvet Neuron combines strategy, design, development, and technical SEO to build trustworthy digital experiences that convert.`,
  };
}

function getEnglishKeywords(service: string, location: string) {
  return [
    `${service} in ${location}`,
    `${location} digital agency`,
    `${location} website agency`,
    `${location} web development`,
    `${location} SEO agency`,
    'Velvet Neuron',
  ];
}

export async function generateStaticParams() {
  return landingPagesData.flatMap((page) =>
    LOCALES.map((locale) => ({
      locale,
      slug: page.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const activeLocale = toAppLocale(locale);
  const page = getLandingPageBySlug(slug);

  if (!page) {
    return {};
  }

  const localizedService = getLocalizedServiceLabel(activeLocale, page.service);
  const localizedLocation = getLocalizedLocationLabel(activeLocale, page.location);
  const localizedMetadata = getLocalizedMetadata(
    activeLocale,
    localizedService,
    localizedLocation,
    page.metaDescription
  );

  return {
    title: localizedMetadata.title,
    description: localizedMetadata.description,
    keywords:
      activeLocale === 'pt'
        ? getLandingPageKeywords(page)
        : getEnglishKeywords(localizedService, localizedLocation),
    openGraph: {
      title: localizedMetadata.title,
      description: localizedMetadata.description,
      locale: activeLocale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
      url: buildLocalizedUrl(activeLocale, `/${page.slug}`),
      siteName: 'Velvet Neuron',
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
      title: localizedMetadata.title,
      description: localizedMetadata.description,
      images: ['/logo.png'],
    },
    alternates: buildLocaleAlternates(`/${page.slug}`, activeLocale),
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const page = getLandingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const activeLocale = toAppLocale(locale);
  const serviceConfig = SERVICES.find((service) => service.name === page.service);
  const locationConfig = LOCATIONS.find((location) => location.name === page.location);

  if (!serviceConfig || !locationConfig) {
    notFound();
  }

  const serviceLabel = getLocalizedServiceLabel(activeLocale, page.service);
  const locationLabel = getLocalizedLocationLabel(activeLocale, page.location);
  const tagline = getLocalizedTagline(activeLocale, page.service, serviceConfig.tagline);
  const localizedMetadata = getLocalizedMetadata(
    activeLocale,
    serviceLabel,
    locationLabel,
    page.metaDescription
  );
  const pageUrl = buildLocalizedUrl(activeLocale, `/${page.slug}`);
  const serviceId = `${pageUrl}#service`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: localizedMetadata.title,
        description: localizedMetadata.description,
        inLanguage: activeLocale === 'pt' ? 'pt-PT' : 'en',
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
        name:
          activeLocale === 'pt'
            ? `${capitalizeFirst(serviceLabel)} em ${locationLabel}`
            : `${capitalizeFirst(serviceLabel)} in ${locationLabel}`,
        description: localizedMetadata.description,
        serviceType: serviceLabel,
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: {
          '@type': 'City',
          name: locationLabel,
        },
        url: pageUrl,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          url: buildLocalizedUrl(activeLocale, '/#contact'),
          itemOffered: {
            '@id': serviceId,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: activeLocale === 'pt' ? 'Início' : 'Home',
            item: buildLocalizedUrl(activeLocale, '/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: localizedMetadata.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-paper text-brand-ink noise">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-brand-paper" />
        <div className="absolute inset-0 grid-pattern opacity-80" />
      </div>

      <Header />

      <LandingHero
        locale={activeLocale}
        service={serviceLabel}
        location={locationLabel}
        tagline={tagline}
      />

      {/* <TrustSection /> */}
      <PromoVideoSection />

      {activeLocale === 'pt' ? (
        <>
          <LandingSeoContent service={serviceConfig} location={locationConfig} />
          <ServicesSection />
          <PortfolioSection />
          <ProcessSection />
        </>
      ) : (
        <>
          <ServicesSection />
          <PortfolioSection />
          <ProcessSection />
          <FAQSection />
        </>
      )}

      <ContactSection />
      <Footer />
      <JsonLd data={jsonLd} />
    </main>
  );
}
