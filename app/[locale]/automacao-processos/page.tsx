import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AutomacaoProcessosClient } from './client';
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
  const t = await getTranslations({ locale, namespace: 'automacaoProcessos' });

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
      url: buildLocalizedUrl(activeLocale, '/automacao-processos'),
      siteName: 'Velvet Neuron',
    },
    alternates: buildLocaleAlternates('/automacao-processos', activeLocale),
  };
}

export default async function AutomacaoProcessosPage({ params }: PageProps) {
  await params;
  return <AutomacaoProcessosClient />;
}
