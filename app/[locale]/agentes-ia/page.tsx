import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { JsonLd } from '@/components/json-ld';
import { AgentesIAClient } from './client';
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
  const t = await getTranslations({ locale, namespace: 'agentesIA' });

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
      url: buildLocalizedUrl(activeLocale, '/agentes-ia'),
      siteName: 'Velvet Neuron',
    },
    alternates: buildLocaleAlternates('/agentes-ia', activeLocale),
  };
}

export default async function AgentesIAPage({ params }: PageProps) {
  const { locale } = await params;
  const activeLocale = toAppLocale(locale);
  const t = await getTranslations({ locale, namespace: 'agentesIA' });
  const faqItems = [
    { question: t('faq_1_q'), answer: t('faq_1_a') },
    { question: t('faq_2_q'), answer: t('faq_2_a') },
    { question: t('faq_3_q'), answer: t('faq_3_a') },
    { question: t('faq_4_q'), answer: t('faq_4_a') },
  ];
  const jsonLd = buildServicePageJsonLd({
    locale: activeLocale,
    path: '/agentes-ia',
    name: t('hero_title'),
    description: t('hero_description'),
    breadcrumbName: t('breadcrumb'),
    serviceType:
      activeLocale === 'pt'
        ? 'Agentes de IA e automação conversacional'
        : 'AI agents and conversational automation',
    faqItems,
  });

  return (
    <>
      <AgentesIAClient />
      <JsonLd data={jsonLd} />
    </>
  );
}
