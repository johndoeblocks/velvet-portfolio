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
  return `${capitalizeFirst(service.name)} | Menos trabalho manual para PMEs — ${location.name}`;
}

function buildLandingPageMetaDescription(
  service: ServiceConfig,
  location: LocationConfig
) {
  const description = `${capitalizeFirst(service.name)} para PMEs em ${location.name}. Poupe tempo, reduza erros e comece com diagnóstico gratuito.`;

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
    `automação de processos em ${page.location}`,
    `agentes de IA para empresas em ${page.location}`,
    `integração ERP CRM ${page.location}`,
    `${page.service} Portugal`,
    'automação para PMEs Portugal',
    'agência de automação e inteligência artificial',
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
