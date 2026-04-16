import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLandingPageBySlug, landingPagesData } from '@/lib/landing-pages-data';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return landingPagesData.map((page) => ({
    locale: 'pt',
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    keywords: [
      `${page.service} em ${page.location}`,
      `agência de ${page.service} ${page.location}`,
      `empresa de ${page.service} em ${page.location}`,
      `desenvolvimento web ${page.location}`,
      `web design ${page.location}`,
      `criação de sites ${page.location}`,
      'Next.js Portugal',
      'React Portugal',
      'Velvet Neuron',
    ].join(', '),
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      locale: 'pt_PT',
      type: 'website',
    },
    alternates: {
      canonical: `/pt/${page.slug}`,
    },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLandingPageBySlug(slug);
  if (!page) notFound();

  return (
    <div dangerouslySetInnerHTML={{ __html: page.content }} />
  );
}