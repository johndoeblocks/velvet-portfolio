import { SERVICES, LOCATIONS, buildSlug } from "./landing-pages-constants";
import { generateLandingPageContent, generateLandingPageTitle } from "./landing-page-generator";

export interface LandingPageData {
  service: string;
  location: string;
  slug: string;
  title: string;
  metaDescription: string;
  content: string;
}

function generateMetaDescription(service: { name: string }, location: { name: string }): string {
  // Max 155–160 chars
  const base = `Agência premium de ${service.name} em ${location.name}. Next.js, React e design de alto nível ao serviço do seu negócio. Performance, SEO e resultados mensuráveis. Cotação gratuita.`;
  return base.length > 160 ? base.slice(0, 157) + "..." : base;
}

// ─── GENERATED PAGES MATRIX ───────────────────────────────────────────────────
// All combinations: 5 services × 19 locations = 95 landing pages

export const landingPagesData: LandingPageData[] = SERVICES.flatMap((service) =>
  LOCATIONS.map((location) => {
    const slug = buildSlug(service, location);
    return {
      service: service.name,
      location: location.name,
      slug,
      title: generateLandingPageTitle(service, location),
      metaDescription: generateMetaDescription(service, location),
      content: generateLandingPageContent(service, location, slug),
    };
  })
);

// ─── CONVENIENCE HELPERS ─────────────────────────────────────────────────────

export function getLandingPageBySlug(slug: string): LandingPageData | undefined {
  return landingPagesData.find((p) => p.slug === slug);
}

export function getLandingPagesByService(serviceName: string): LandingPageData[] {
  return landingPagesData.filter((p) => p.service === serviceName);
}

export function getLandingPagesByLocation(locationName: string): LandingPageData[] {
  return landingPagesData.filter((p) => p.location === locationName);
}