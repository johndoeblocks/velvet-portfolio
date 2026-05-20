import type { LeadProvider } from "@/types/lead";

const SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const SEARCH_FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.websiteUri",
  "places.googleMapsUri",
  "places.rating",
  "places.userRatingCount",
  "places.location",
  "places.primaryType",
  "places.types",
  "nextPageToken"
].join(",");

const DETAILS_FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "nationalPhoneNumber",
  "internationalPhoneNumber",
  "websiteUri",
  "googleMapsUri",
  "rating",
  "userRatingCount",
  "location",
  "primaryType",
  "types"
].join(",");

export const googlePlacesProvider: LeadProvider = {
  name: "google-places",
  async search(params) {
    const apiKey = params.apiKey || process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      throw new Error("Missing Google Places API key. Add one in your user settings before generating real leads.");
    }

    const limit = Math.max(1, Math.min(params.limit ?? 20, 60));
    const pageSize = Math.min(limit, 20);
    const leads = [];
    let pageToken: string | undefined;

    while (leads.length < limit) {
      const response = await fetch(SEARCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": SEARCH_FIELD_MASK
        },
        body: JSON.stringify({
          textQuery: buildTextQuery(params.businessType, params.location),
          pageSize,
          pageToken,
          languageCode: params.language ?? "pt-PT",
          regionCode: params.country ?? "PT"
        })
      });

      if (!response.ok) {
        throw new Error(await googlePlacesError(response));
      }

      const payload = (await response.json()) as GoogleTextSearchResponse;
      const places = payload.places ?? [];
      if (places.length === 0) break;

      for (const place of places) {
        if (leads.length >= limit) break;
        const detailed = await fetchPlaceDetails(apiKey, place.id);
        leads.push(mapPlaceToRawLead(detailed ?? place));
      }

      if (!payload.nextPageToken) break;
      pageToken = payload.nextPageToken;
      await sleep(1800);
    }

    return leads;
  }
};

async function fetchPlaceDetails(apiKey: string, placeId?: string) {
  if (!placeId) return null;

  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": DETAILS_FIELD_MASK
    }
  });

  if (!response.ok) return null;
  return (await response.json()) as GooglePlace;
}

function mapPlaceToRawLead(place: GooglePlace) {
  return {
    name: place.displayName?.text ?? "Unnamed business",
    address: place.formattedAddress,
    phone: place.nationalPhoneNumber ?? place.internationalPhoneNumber,
    website: place.websiteUri,
    email: null,
    category: place.primaryType ?? place.types?.[0] ?? null,
    rating: place.rating,
    reviewCount: place.userRatingCount,
    source: "google-places",
    sourceId: place.id,
    mapsUrl: place.googleMapsUri,
    latitude: place.location?.latitude,
    longitude: place.location?.longitude,
    raw: place
  };
}

function buildTextQuery(businessType: string, location: string) {
  const category = businessType.trim();
  const place = location.trim();
  if (category && place) return `${category} in ${place}`;
  if (place) return `businesses in ${place}`;
  return category || "businesses";
}

async function googlePlacesError(response: Response) {
  let body = "";
  try {
    body = JSON.stringify(await response.json());
  } catch {
    body = await response.text();
  }

  if (response.status === 403) return `Google Places quota/auth error (${response.status}): ${body}`;
  if (response.status === 429) return `Google Places quota exceeded (${response.status}): ${body}`;
  return `Google Places request failed (${response.status}): ${body}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type GoogleTextSearchResponse = {
  places?: GooglePlace[];
  nextPageToken?: string;
};

type GooglePlace = {
  id?: string;
  displayName?: { text?: string; languageCode?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  rating?: number;
  userRatingCount?: number;
  location?: { latitude?: number; longitude?: number };
  primaryType?: string;
  types?: string[];
};
