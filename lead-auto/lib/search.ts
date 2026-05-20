import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { LeadRecord } from "@/types/lead";

export const DEFAULT_COUNTRY = "PT";

export const DEFAULT_CATEGORIES = [
  "restaurante",
  "cafe",
  "pastelaria",
  "barbearia",
  "cabeleireiro",
  "estetica",
  "clinica dentaria",
  "fisioterapia",
  "psicologo",
  "advogado",
  "contabilista",
  "imobiliaria",
  "ginásio",
  "yoga",
  "pilates",
  "oficina automovel",
  "lavagem auto",
  "canalizador",
  "eletricista",
  "limpeza",
  "jardim",
  "florista",
  "veterinario",
  "hotel",
  "alojamento local",
  "escola de conducao",
  "explicacoes",
  "fotografo",
  "eventos",
  "loja de roupa"
];

export type LeadFilters = {
  location?: string;
  businessType?: string;
  priority?: string;
  outreachStatus?: string;
  websiteStatus?: string;
};

export function normalizeSearchText(value?: string | null) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function includesSearchText(value: string | null | undefined, query: string | null | undefined) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;
  return normalizeSearchText(value).includes(normalizedQuery);
}

export function buildStructuredLeadWhere(filters: LeadFilters): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};

  if (filters.priority) where.priority = filters.priority as Prisma.EnumPriorityFilter["equals"];
  if (filters.outreachStatus) where.outreachStatus = filters.outreachStatus as Prisma.EnumOutreachStatusFilter["equals"];
  if (filters.websiteStatus) where.websiteStatus = filters.websiteStatus as Prisma.EnumWebsiteStatusFilter["equals"];

  return where;
}

export function matchesLeadSearch(lead: LeadRecord, filters: LeadFilters) {
  const matchesLocation = includesSearchText(lead.location, filters.location);
  const matchesBusinessType =
    includesSearchText(lead.category, filters.businessType) ||
    includesSearchText(lead.businessName, filters.businessType);

  return matchesLocation && matchesBusinessType;
}

export async function findLeads(filters: LeadFilters) {
  const leads = await prisma.lead.findMany({
    where: buildStructuredLeadWhere(filters),
    orderBy: [{ priority: "asc" }, { score: "desc" }, { createdAt: "desc" }]
  });

  return leads.filter((lead) => matchesLeadSearch(lead, filters));
}

export async function getCategorySuggestions(query: string, limit = 12) {
  const dbCategories = await prisma.lead.findMany({
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
    take: 200
  });

  const seen = new Set<string>();
  const allCategories = [...DEFAULT_CATEGORIES, ...dbCategories.map((item) => item.category)]
    .map((category) => category.trim())
    .filter(Boolean)
    .filter((category) => {
      const key = normalizeSearchText(category);
      if (seen.has(key)) return false;
      seen.add(key);
      return includesSearchText(category, query);
    });

  return allCategories.slice(0, limit).map((category) => ({ label: category, value: category }));
}
