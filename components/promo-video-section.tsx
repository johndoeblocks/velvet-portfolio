'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

declare global {
  interface Window {
    gtag: (command: string, action: string, params?: any) => void;
  }
}

export const PromoVideoSection: React.FC = () => {
  const t = useTranslations('promoVideo');

  const trackVideoEvent = (action: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        video_title: 'VSL',
        video_url: '/videos/VSL.mp4',
        video_provider: 'html5'
      });
    }
  };

  return (
    <section className="relative z-10 py-20 px-6" id="promo-video">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white">{t('title')}</h3>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 md:p-4">
          <video
            className="w-full aspect-video rounded-xl bg-black/40"
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

        <div className="mt-8 flex justify-center">
          <Link
            href="/cv"
            className="inline-flex items-center rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-purple-100"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
};
