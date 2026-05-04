import { ArrowRight, PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PromoVideoPlayer } from '@/components/promo-video-player';

export const PromoVideoSection: React.FC = () => {
  const t = useTranslations('promoVideo');

  return (
    <section id="promo-video" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
              <PlayCircle className="h-4 w-4 text-brand-primary" />
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-normal text-brand-ink sm:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-muted">
              {t('description')}
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-brand-primaryHover"
            >
              <span>{t('cta')}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-brand-border bg-white p-3 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.35)] sm:p-4">
            {/* Floating video overlay badge */}
            <div className="pointer-events-none absolute left-6 top-6 z-10 hidden sm:block">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-tertiary opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-tertiary"></span>
                </span>
                {t('videoOverlay')}
              </span>
            </div>
            <PromoVideoPlayer />
          </div>
        </div>
      </div>
    </section>
  );
};
