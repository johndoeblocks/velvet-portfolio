import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { JsonLd } from '@/components/json-ld';
import { SitesEcommerceClient } from './client';
import { buildServicePageJsonLd } from '@/lib/service-schema';
import {
  buildLocaleAlternates,
  buildLocalizedUrl,
  toAppLocale,
} from '@/lib/seo';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const t = await getTranslations({ locale, namespace: 'sitesEcommerce' });

  const title = `${t('hero_title')} | Velvet Neuron`;
  const description = t('hero_description');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: activeLocale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
      url: buildLocalizedUrl(activeLocale, '/sites-ecommerce'),
      siteName: 'Velvet Neuron',
    },
    alternates: buildLocaleAlternates('/sites-ecommerce', activeLocale),
  };
}

export default async function SitesEcommercePage({ params }: PageProps) {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const t = await getTranslations({ locale, namespace: 'sitesEcommerce' });
  const faqItems = [
    { question: t('faq_1_q'), answer: t('faq_1_a') },
    { question: t('faq_2_q'), answer: t('faq_2_a') },
    { question: t('faq_3_q'), answer: t('faq_3_a') },
    { question: t('faq_4_q'), answer: t('faq_4_a') },
  ];
  const jsonLd = buildServicePageJsonLd({
    locale: activeLocale,
    path: '/sites-ecommerce',
    name: t('hero_title'),
    description: t('hero_description'),
    breadcrumbName: t('breadcrumb'),
    serviceType:
      activeLocale === 'pt'
        ? 'Desenvolvimento de websites e e-commerce'
        : 'Website and ecommerce development',
    faqItems,
  });

  return (
    <>
      <SitesEcommerceClient />
      <JsonLd data={jsonLd} />
    </>
  );
}
