import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

import { Header } from '@/components/header';
import { LandingHero } from '@/components/landing-hero';
import { LandingSeoContent } from '@/components/landing-seo-content';
import { SectionDivider } from '@/components/section-divider';
import { Footer } from '@/components/footer';
import { landingPagesData, getLandingPageBySlug } from '@/lib/landing-pages-data';
import { SERVICES, LOCATIONS } from '@/lib/landing-pages-constants';

// Same dynamic imports as the homepage — keeps the bundle split identical
const ServicesSection   = dynamic(async () => (await import('@/components/services-section')).ServicesSection);
const PromoVideoSection = dynamic(async () => (await import('@/components/promo-video-section')).PromoVideoSection);
const PortfolioSection  = dynamic(async () => (await import('@/components/portfolio-section')).PortfolioSection);
const ProcessSection    = dynamic(async () => (await import('@/components/process-section')).ProcessSection);
const TechnologySection = dynamic(async () => (await import('@/components/technology-section')).TechnologySection);
const ContactSection    = dynamic(async () => (await import('@/components/contact-section')).ContactSection);

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return landingPagesData.map((page) => ({
    locale: 'pt',
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    keywords: [
      `${page.service} em ${page.location}`,
      `agência de ${page.service} ${page.location}`,
      `empresa de ${page.service} em ${page.location}`,
      `desenvolvimento web ${page.location}`,
      `web design ${page.location}`,
      `criação de sites ${page.location}`,
      'Next.js Portugal',
      'React Portugal',
      'Velvet Neuron',
    ].join(', '),
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      locale: 'pt_PT',
      type: 'website',
    },
    alternates: {
      canonical: `/pt/${page.slug}`,
    },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) notFound();

  // Get the configs
  const serviceConfig = SERVICES.find((s) => s.name === page.service);
  const locationConfig = LOCATIONS.find((l) => l.name === page.location);
  const tagline = serviceConfig?.tagline ?? '';

  return (
    <main className="bg-black text-white overflow-hidden noise relative">
      {/* Background — identical to homepage */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <Header />

      {/* Location-specific hero replaces <HeroSection /> */}
      <LandingHero
        service={page.service}
        location={page.location}
        tagline={tagline}
      />

      {/* SEO Body content (benefits, testimonials, FAQ, local context) */}
      {serviceConfig && locationConfig && (
        <LandingSeoContent service={serviceConfig} location={locationConfig} />
      )}

      {/* All other sections are reused verbatim from the homepage */}
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