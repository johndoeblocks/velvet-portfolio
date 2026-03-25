import dynamic from 'next/dynamic';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { Footer } from '@/components/footer';
import { SectionDivider } from '@/components/section-divider';

const ServicesSection = dynamic(async () => (await import('@/components/services-section')).ServicesSection);
const PromoVideoSection = dynamic(async () => (await import('@/components/promo-video-section')).PromoVideoSection);
const PortfolioSection = dynamic(async () => (await import('@/components/portfolio-section')).PortfolioSection);
const ProcessSection = dynamic(async () => (await import('@/components/process-section')).ProcessSection);
const TechnologySection = dynamic(async () => (await import('@/components/technology-section')).TechnologySection);
const ContactSection = dynamic(async () => (await import('@/components/contact-section')).ContactSection);

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden noise relative">
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <Header />
      <HeroSection />
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
