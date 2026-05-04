import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { TrustSection } from '@/components/trust-section';
import { PromoVideoSection } from '@/components/promo-video-section';
import { ServicesSection } from '@/components/services-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { ProcessSection } from '@/components/process-section';
import { FAQ_SECTION_KEYS, FAQSection } from '@/components/faq-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

type HomeProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'pt' ? 'pt-PT' : 'en',
    mainEntity: FAQ_SECTION_KEYS.map((key) => ({
      '@type': 'Question',
      name: t(`items.${key}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`items.${key}.answer`),
      },
    })),
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-paper text-brand-ink noise">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-brand-paper" />
        <div className="absolute inset-0 grid-pattern opacity-80" />
      </div>

      <Header />
      <HeroSection />
      {/* <TrustSection /> */}
      <PromoVideoSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
      <Footer />

      <script type="application/ld+json">
        {JSON.stringify(faqSchema).replace(/</g, '\\u003c')}
      </script>
    </main>
  );
}
