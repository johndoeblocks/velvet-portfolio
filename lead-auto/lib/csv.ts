import type { LeadRecord } from "@/types/lead";

const columns: Array<keyof LeadRecord> = [
  "businessName",
  "category",
  "location",
  "phone",
  "email",
  "website",
  "googleMapsUrl",
  "source",
  "sourceId",
  "mapsUrl",
  "instagramUrl",
  "linkedinUrl",
  "rating",
  "reviewCount",
  "latitude",
  "longitude",
  "notes",
  "scoringReasons",
  "websiteStatus",
  "score",
  "priority",
  "outreachStatus",
  "lastImportedAt",
  "lastEnrichedAt",
  "createdAt",
  "updatedAt"
];

export function leadsToCsv(leads: LeadRecord[]) {
  const header = columns.join(",");
  const rows = leads.map((lead) =>
    columns
      .map((column) => {
        const value = lead[column];
        if (value instanceof Date) return escapeCsv(value.toISOString());
        if (Array.isArray(value)) return escapeCsv(value.join("; "));
        if (typeof value === "object" && value !== null) return escapeCsv(JSON.stringify(value));
        return escapeCsv(value ?? "");
      })
      .join(",")
  );

  return [header, ...rows].join("\n");
}

function escapeCsv(value: unknown) {
  const text = String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}
