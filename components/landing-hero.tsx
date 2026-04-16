import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingHeroProps {
  service: string;   // e.g. "desenvolvimento de websites"
  location: string;  // e.g. "Lisboa"
  tagline: string;   // one-line benefit from the service config
}

/**
 * Drop-in replacement for <HeroSection /> on SEO landing pages.
 * Keeps the same visual language (glows, grid, scroll indicator) but
 * injects the location-specific H1 and keyword-rich sub-headline.
 */
export const LandingHero: React.FC<LandingHeroProps> = ({ service, location, tagline }) => {
  const serviceCapitalized = service.charAt(0).toUpperCase() + service.slice(1);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glows — same as HeroSection */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-[100px]" />

      {/* Grid & fade */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Location badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/60 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0 inline-block" />
          Freelancer · {location} · Portugal
        </div>

        {/* H1 — keyword-optimised */}
        <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-black leading-[0.95] tracking-tight mb-8 text-glow">
          <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
            {serviceCapitalized}
          </span>
          <br />
          <span className="bg-gradient-to-b from-white/80 via-white/60 to-gray-600 bg-clip-text text-transparent">
            em {location}
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          {tagline}{' '}
          Trabalho diretamente consigo — sem intermediários, do briefing à entrega.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#portfolio"
            className="group w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full inline-flex items-center justify-center space-x-2 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-shadow duration-500"
          >
            <span>Ver Portfólio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>

          <a
            href="#contact"
            className="group w-full sm:w-auto px-8 py-4 bg-white/[0.06] text-white font-semibold rounded-full border border-white/[0.1] inline-flex items-center justify-center space-x-2 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-500"
          >
            <span>Solicitar Cotação</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
