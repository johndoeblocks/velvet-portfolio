import type { AppLocale } from '@/lib/seo';

export const BLOG_SLUGS: Record<string, Record<AppLocale, string>> = {
  'web-development-agency': {
    en: 'how-to-choose-web-development-agency',
    pt: 'como-escolher-agencia-websites',
  },
  'mvp-development': {
    en: 'mvp-development-what-to-build-first',
    pt: 'mvp-para-startups-o-que-lancar-primeiro',
  },
  'web3-ux-wallet-dropoff': {
    en: 'web3-ux-why-users-drop-before-wallet-connect',
    pt: 'ux-web3-porque-utilizadores-desistem-antes-da-wallet',
  },
  'nextjs-seo-checklist': {
    en: 'nextjs-seo-checklist-lead-generation',
    pt: 'checklist-seo-nextjs-gerar-leads',
  },
  'website-redesign-rebuild': {
    en: 'website-redesign-rebuild-or-improve',
    pt: 'redesign-website-reconstruir-ou-melhorar',
  },
  'woocommerce-mb-way-checkout-abandonment': {
    en: 'woocommerce-mb-way-checkout-abandonment',
    pt: 'abandono-checkout-woocommerce-mb-way',
  },
  'whatsapp-slow-lead-follow-up': {
    en: 'whatsapp-leads-slow-replies-service-business',
    pt: 'leads-whatsapp-respostas-lentas-servicos',
  },
  'abandoned-cart-email-sequence': {
    en: 'abandoned-cart-emails-shopify-woocommerce',
    pt: 'emails-carrinho-abandonado-shopify-woocommerce',
  },
  'automatic-invoicing-ecommerce': {
    en: 'automatic-invoicing-woocommerce-shopify-portugal',
    pt: 'faturacao-automatica-woocommerce-shopify-portugal',
  },
  'ecommerce-payment-failure-recovery': {
    en: 'ecommerce-payment-failure-recovery',
    pt: 'recuperar-falhas-pagamento-loja-online',
  },
  'contact-form-crm-automation': {
    en: 'contact-form-crm-automation',
    pt: 'automatizar-formulario-contacto-crm',
  },
  'slow-woocommerce-mobile-store': {
    en: 'slow-woocommerce-store-mobile-sales',
    pt: 'loja-woocommerce-lenta-vendas-telemovel',
  },
  'quote-request-crm-pipeline': {
    en: 'quote-request-crm-pipeline-smes',
    pt: 'gestao-pedidos-orcamento-crm-pmes',
  },
  'post-purchase-email-automation': {
    en: 'post-purchase-email-automation-ecommerce',
    pt: 'automacao-email-pos-compra-ecommerce',
  },
  'whatsapp-customer-support-automation': {
    en: 'automate-repetitive-customer-questions-whatsapp',
    pt: 'automatizar-perguntas-clientes-whatsapp',
  },
};

export function getLocalizedBlogPath(pathname: string, targetLocale: AppLocale) {
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/);

  if (!match) {
    return pathname;
  }

  const currentSlug = decodeURIComponent(match[1]);
  const blogSlugs = Object.values(BLOG_SLUGS).find(
    (slugs) => slugs.en === currentSlug || slugs.pt === currentSlug
  );

  if (!blogSlugs) {
    return pathname;
  }

  return `/blog/${blogSlugs[targetLocale]}`;
}
