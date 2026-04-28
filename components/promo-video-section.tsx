'use client';

import { ArrowRight, PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const PromoVideoSection: React.FC = () => {
  const t = useTranslations('promoVideo');

  const trackVideoEvent = (action: string) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: action,
        video_title: 'VSL',
        video_url: '/videos/VSL.mp4',
        video_provider: 'html5',
      });
    }
  };

  return (
    <section id="promo-video" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              <PlayCircle className="h-4 w-4 text-[#0f4c5c]" />
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {t('description')}
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f4c5c] px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#0c3d49]"
            >
              <span>{t('cta')}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-slate-900/10 bg-white p-3 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.35)] sm:p-4">
            <video
              className="aspect-video w-full rounded-[1.25rem] bg-slate-950 object-cover"
              src="/videos/VSL.mp4"
              controls
              preload="metadata"
              playsInline
              onPlay={() => trackVideoEvent('video_start')}
              onEnded={() => trackVideoEvent('video_complete')}
            >
              <track
                default
                kind="captions"
                label="English captions"
                src="/videos/VSL.en.vtt"
                srcLang="en"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
