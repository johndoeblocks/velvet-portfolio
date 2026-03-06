'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { ProcessSection } from '@/components/process-section';
import { TechnologySection } from '@/components/technology-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/custom-cursor';
import { SectionDivider } from '@/components/section-divider';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <motion.main
        className="bg-black text-white overflow-hidden noise relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Persistent animated gradient background */}
        <div className="fixed inset-0 -z-20">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 grid-pattern opacity-50" />
        </div>

        <Header />
        <HeroSection />
        <SectionDivider />
        <ServicesSection />
        <SectionDivider />
        <PortfolioSection />
        <SectionDivider />
        <ProcessSection />
        <SectionDivider />
        <TechnologySection />
        <SectionDivider />
        <ContactSection />
        <Footer />
      </motion.main>
    </>
  );
}
