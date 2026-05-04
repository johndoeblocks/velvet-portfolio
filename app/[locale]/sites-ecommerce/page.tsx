import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SitesEcommerceClient } from './client';
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
  await params;
  return <SitesEcommerceClient />;
}
