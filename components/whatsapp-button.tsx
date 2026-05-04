import React from 'react';
import { useTranslations } from 'next-intl';

export const WhatsAppButton: React.FC = () => {
  const t = useTranslations('contact.form');

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
      <a
        href="https://wa.me/365969370801"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
        aria-label={t('whatsapp')}
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
      </a>
    </div>
  );
};
