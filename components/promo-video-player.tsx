'use client';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function PromoVideoPlayer() {
  const trackVideoEvent = (action: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action,
      video_title: 'VSL',
      video_url: '/videos/VSL.mp4',
      video_provider: 'html5',
    });
  };

  return (
    <video
      className="aspect-video w-full rounded-[1.25rem] bg-brand-dark object-cover"
      src="/videos/VSL.mp4"
      controls
      poster="/videos/VSL-poster.webp"
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
  );
}
