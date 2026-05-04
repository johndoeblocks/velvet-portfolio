'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const CONSENT_STORAGE_KEY = 'velvet-neuron-cookie-consent';

type ConsentStatus = 'granted' | 'denied';

function updateConsent(status: ConsentStatus) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
      analytics_storage: status,
      personalization_storage: status,
      functionality_storage: status,
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'consent_update',
    consent_status: status,
  });
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (storedConsent === 'granted' || storedConsent === 'denied') {
      updateConsent(storedConsent);
      return;
    }

    setIsVisible(true);
  }, []);

  const chooseConsent = (status: ConsentStatus) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
    updateConsent(status);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-label="Cookie preferences"
      className="fixed bottom-4 right-4 z-[60] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/10 bg-brand-dark p-5 text-white shadow-2xl"
    >
      <h2 className="text-sm font-semibold">Cookies no site</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/75">
        Utilizamos cookies para analisar o tráfego e melhorar a experiência. Pode
        aceitar ou recusar cookies opcionais.
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => chooseConsent('denied')}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => chooseConsent('granted')}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-secondary/18 px-4 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-white"
        >
          Aceitar
        </button>
      </div>
    </section>
  );
}
