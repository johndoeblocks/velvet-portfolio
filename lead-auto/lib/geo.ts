import { DEFAULT_COUNTRY, normalizeSearchText } from "@/lib/search";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/all?fields=name,cca2,flag";

const FALLBACK_COUNTRIES = [
  { label: "Portugal", value: "PT", flag: "🇵🇹" },
  { label: "Spain", value: "ES", flag: "🇪🇸" },
  { label: "France", value: "FR", flag: "🇫🇷" },
  { label: "United Kingdom", value: "GB", flag: "🇬🇧" },
  { label: "United States", value: "US", flag: "🇺🇸" },
  { label: "Brazil", value: "BR", flag: "🇧🇷" },
  { label: "Angola", value: "AO", flag: "🇦🇴" },
  { label: "Mozambique", value: "MZ", flag: "🇲🇿" }
];

export type CountryOption = {
  label: string;
  value: string;
  flag?: string;
};

export type LocationOption = {
  label: string;
  value: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
};

export async function searchLocations(query: string, country = DEFAULT_COUNTRY, limit = 8): Promise<LocationOption[]> {
  const trimmedQuery = query.trim();
  if (trimmedQuery.length < 2) return [];

  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("dedupe", "1");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("q", trimmedQuery);
  if (country) url.searchParams.set("countrycodes", country.toLowerCase());

  const response = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "User-Agent": "VelvetNeuronLeadAuto/1.0"
    },
    next: { revalidate: 60 * 60 * 24 }
  });

  if (!response.ok) {
    throw new Error(`Location search failed (${response.status})`);
  }

  const payload = (await response.json()) as NominatimPlace[];
  const seen = new Set<string>();

  return payload
    .map((place) => mapNominatimPlace(place))
    .filter((option) => {
      const key = normalizeSearchText(`${option.value} ${option.countryCode ?? ""}`);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

export async function getCountries(query = "", limit = 60): Promise<CountryOption[]> {
  try {
    const response = await fetch(REST_COUNTRIES_URL, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 60 * 60 * 24 * 7 }
    });

    if (!response.ok) throw new Error(`Country search failed (${response.status})`);

    const payload = (await response.json()) as RestCountry[];
    return filterCountries(
      payload
        .map((country) => ({
          label: country.name.common,
          value: country.cca2,
          flag: country.flag
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      query,
      limit
    );
  } catch {
    return filterCountries(FALLBACK_COUNTRIES, query, limit);
  }
}

function mapNominatimPlace(place: NominatimPlace): LocationOption {
  const address = place.address ?? {};
  const name =
    address.city ??
    address.town ??
    address.village ??
    address.municipality ??
    address.suburb ??
    address.county ??
    place.name ??
    place.display_name.split(",")[0];
  const region = address.county ?? address.state ?? "";
  const country = address.country ?? "";
  const labelParts = [name, region, country].filter(Boolean);

  return {
    label: labelParts.join(", "),
    value: name,
    countryCode: address.country_code?.toUpperCase(),
    latitude: Number(place.lat),
    longitude: Number(place.lon)
  };
}

function filterCountries(countries: CountryOption[], query: string, limit: number) {
  const normalizedQuery = normalizeSearchText(query);
  return countries
    .filter((country) => {
      if (!normalizedQuery) return true;
      return normalizeSearchText(`${country.label} ${country.value}`).includes(normalizedQuery);
    })
    .slice(0, limit);
}

type RestCountry = {
  name: { common: string };
  cca2: string;
  flag?: string;
};

type NominatimPlace = {
  display_name: string;
  name?: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    suburb?: string;
    county?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
};
