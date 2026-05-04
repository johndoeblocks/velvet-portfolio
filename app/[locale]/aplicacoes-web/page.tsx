import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AplicacoesWebClient } from './client';
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
  const t = await getTranslations({ locale, namespace: 'aplicacoesWeb' });

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
      url: buildLocalizedUrl(activeLocale, '/aplicacoes-web'),
      siteName: 'Velvet Neuron',
    },
    alternates: buildLocaleAlternates('/aplicacoes-web', activeLocale),
  };
}

export default async function AplicacoesWebPage({ params }: PageProps) {
  await params;
  return <AplicacoesWebClient />;
}
