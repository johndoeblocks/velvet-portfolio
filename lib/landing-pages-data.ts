import {
  LOCATIONS,
  SERVICES,
  buildSlug,
  type LocationConfig,
  type ServiceConfig,
} from '@/lib/landing-pages-constants';

export interface LandingPageData {
  service: string;
  serviceSlug: string;
  location: string;
  locationSlug: string;
  slug: string;
  title: string;
  metaDescription: string;
}

function capitalizeFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function truncateMetaDescription(value: string) {
  return value.length > 160 ? `${value.slice(0, 157).trimEnd()}...` : value;
}

function buildLandingPageTitle(service: ServiceConfig, location: LocationConfig) {
  return `${capitalizeFirst(service.name)} em ${location.name} | Velvet Neuron`;
}

function buildLandingPageMetaDescription(
  service: ServiceConfig,
  location: LocationConfig
) {
  const description = `${capitalizeFirst(service.name)} em ${location.name}. Estratégia, design, desenvolvimento e SEO técnico para criar uma presença digital mais clara, rápida e preparada para gerar leads.`;

  return truncateMetaDescription(description);
}

function buildLandingPageData(
  service: ServiceConfig,
  location: LocationConfig
): LandingPageData {
  return {
    service: service.name,
    serviceSlug: service.slug,
    location: location.name,
    locationSlug: location.slug,
    slug: buildSlug(service, location),
    title: buildLandingPageTitle(service, location),
    metaDescription: buildLandingPageMetaDescription(service, location),
  };
}

export function getLandingPageKeywords(
  page: Pick<LandingPageData, 'service' | 'location'>
) {
  return [
    `${page.service} em ${page.location}`,
    `agência de ${page.service} em ${page.location}`,
    `empresa de ${page.service} em ${page.location}`,
    `serviços digitais em ${page.location}`,
    `desenvolvimento web ${page.location}`,
    `web design ${page.location}`,
    `${page.service} Portugal`,
    'Next.js Portugal',
    'React Portugal',
    'Velvet Neuron',
  ];
}

export const landingPagesData: LandingPageData[] = SERVICES.flatMap((service) =>
  LOCATIONS.map((location) => buildLandingPageData(service, location))
);

export function getLandingPageBySlug(slug: string) {
  return landingPagesData.find((page) => page.slug === slug);
}

export function getLandingPagesByService(serviceName: string) {
  return landingPagesData.filter((page) => page.service === serviceName);
}

export function getLandingPagesByLocation(locationName: string) {
  return landingPagesData.filter((page) => page.location === locationName);
}
