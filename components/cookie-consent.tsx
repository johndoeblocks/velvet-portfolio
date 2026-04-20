'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    cookieconsent: any;
    gtag: any;
    dataLayer: any[];
  }
}

export function CookieConsent() {
  return (
    <Script 
      src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" 
      strategy="afterInteractive"
      onReady={() => {
        if (!window.cookieconsent) return;
        window.cookieconsent.initialise({
          "palette": {
            "popup": {
              "background": "#0a0a0a",
              "text": "#ffffff",
              "border": "1px solid rgba(139, 92, 246, 0.1)"
            },
            "button": {
              "background": "#8b5cf6",
              "text": "#ffffff"
            }
          },
          "theme": "classic",
          "position": "bottom-right",
          "type": "opt-in",
          "content": {
            "header": 'Cookies no site',
            "message": 'Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar anúncios.',
            "dismiss": 'Recusar',
            "allow": 'Aceitar tudo',
            "link": 'Saiba mais',
            "href": '/privacy',
            "policy": 'Preferências de Cookies',
          },
          onInitialise: function (status: string) {
            if (this.hasConsented()) updateGCM('granted');
          },
          onStatusChange: function(status: string, chosenBefore: boolean) {
            if (this.hasConsented()) updateGCM('granted');
            else updateGCM('denied');
          },
          onRevokeChoice: function() {
            updateGCM('denied');
          },
        });

        function updateGCM(status: string) {
          if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
              'ad_storage': status,
              'ad_user_data': status,
              'ad_personalization': status,
              'analytics_storage': status,
              'personalization_storage': status,
              'functionality_storage': status
            });
          }
          
          window.dataLayer.push({
            'event': 'consent_update',
            'consent_status': status
          });
        }
      }}
    />
  );
}
