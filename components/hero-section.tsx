import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const HeroSection: React.FC = () => {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-[100px]" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Radial fade from center */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-black leading-[0.95] tracking-tight mb-8 text-glow">
          <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
            {t("headline")}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          {t("subheadline")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#portfolio"
            className="group px-8 py-4 bg-white text-black font-semibold rounded-full inline-flex items-center space-x-2 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-shadow duration-500"
          >
            <span>{t("cta_work")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>

          <a
            href="#contact"
            className="group px-8 py-4 bg-white/[0.06] text-white font-semibold rounded-full border border-white/[0.1] inline-flex items-center space-x-2 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-500"
          >
            <span>{t("cta_project")}</span>
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
