import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { LandingHero } from '@/components/landing-hero';
import { LandingSeoContent } from '@/components/landing-seo-content';
import { SectionDivider } from '@/components/section-divider';
import { Footer } from '@/components/footer';
import {
  getLandingPageBySlug,
  getLandingPageKeywords,
  landingPagesData,
} from '@/lib/landing-pages-data';
import { LOCATIONS, SERVICES } from '@/lib/landing-pages-constants';
import {
  LOCALES,
  buildLocaleAlternates,
  buildLocalizedUrl,
  toAppLocale,
} from '@/lib/seo';

const ServicesSection = dynamic(
  async () => (await import('@/components/services-section')).ServicesSection
);
const PromoVideoSection = dynamic(
  async () => (await import('@/components/promo-video-section')).PromoVideoSection
);
const PortfolioSection = dynamic(
  async () => (await import('@/components/portfolio-section')).PortfolioSection
);
const ProcessSection = dynamic(
  async () => (await import('@/components/process-section')).ProcessSection
);
const TechnologySection = dynamic(
  async () => (await import('@/components/technology-section')).TechnologySection
);
const ContactSection = dynamic(
  async () => (await import('@/components/contact-section')).ContactSection
);

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

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

  return {
    title: page.title,
    description: page.metaDescription,
    keywords: getLandingPageKeywords(page),
    openGraph: {
      title: page.title,
      description: page.metaDescription,
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
      title: page.title,
      description: page.metaDescription,
      images: ['/logo.png'],
    },
    alternates: buildLocaleAlternates(`/${page.slug}`, activeLocale),
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const serviceConfig = SERVICES.find((service) => service.name === page.service);
  const locationConfig = LOCATIONS.find((location) => location.name === page.location);
  const tagline = serviceConfig?.tagline ?? '';

  return (
    <main className="bg-black text-white overflow-hidden noise relative">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <Header />

      <LandingHero
        service={page.service}
        location={page.location}
        tagline={tagline}
      />

      {serviceConfig && locationConfig && (
        <LandingSeoContent service={serviceConfig} location={locationConfig} />
      )}

      <SectionDivider />
      <ServicesSection />
      <SectionDivider />
      <PromoVideoSection />
      <SectionDivider />
      <PortfolioSection />
      <SectionDivider />
      <ProcessSection />
      <SectionDivider />
      <TechnologySection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </main>
  );
}
