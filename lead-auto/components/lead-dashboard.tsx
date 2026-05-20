"use client";

import { CalendarCheck, CheckCircle2, Download, ExternalLink, KeyRound, LogOut, Mail, MapPin, MessageSquare, Phone, RefreshCw, Save, Search, Trash2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { OutreachStatus } from "@prisma/client";
import { generateColdMessage } from "@/lib/cold-message";
import { signOut } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { LeadRecord } from "@/types/lead";

type Filters = {
  location: string;
  businessType: string;
  priority: string;
  outreachStatus: string;
  websiteStatus: string;
  provider: string;
  limit: string;
  country: string;
  countryName: string;
};

type Props = {
  user: DashboardUser;
  leads: LeadRecord[];
  filters: Filters;
  settings: UserSettings;
  outreachSummary: OutreachSummary;
};

type DashboardUser = {
  name: string;
  email: string;
};

type UserSettings = {
  leadProvider: string;
  googlePlacesApiKeyConfigured: boolean;
  enrichWithPlaywright: boolean;
  defaultCountry: string;
  defaultLocation: string;
  defaultBusinessType: string;
  defaultLimit: string;
};

type OutreachSummary = Record<"all" | OutreachStatus, number>;

const priorityLabels = {
  high: "Alta",
  medium: "Média",
  low: "Baixa"
};

const websiteLabels = {
  missing: "Sem site",
  weak: "Fraco",
  ok: "Ok",
  unknown: "Desconhecido"
};

const sourceLabels: Record<string, string> = {
  "google-places": "Google Places"
};

const outreachOptions: Array<{ value: "" | OutreachStatus; label: string }> = [
  { value: "", label: "Todas" },
  { value: "not_contacted", label: "Não contactado" },
  { value: "contacted", label: "Contactado" },
  { value: "meeting_booked", label: "Reunião" },
  { value: "not_interested", label: "Sem interesse" }
];

type Suggestion = {
  label: string;
  value: string;
};

type CountrySuggestion = Suggestion & {
  flag?: string;
};

export function LeadDashboard({ user, leads, filters, settings, outreachSummary }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(filters);
  const [settingsForm, setSettingsForm] = useState({
    ...settings,
    googlePlacesApiKey: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<Suggestion[]>([]);
  const [categorySuggestions, setCategorySuggestions] = useState<Suggestion[]>([]);
  const [countrySuggestions, setCountrySuggestions] = useState<CountrySuggestion[]>([]);

  const stats = useMemo(
    () => ({
      total: leads.length,
      high: leads.filter((lead) => lead.priority === "high").length,
      missing: leads.filter((lead) => lead.websiteStatus === "missing").length,
      contacted: leads.filter((lead) => lead.outreachStatus === "contacted").length,
      meetings: leads.filter((lead) => lead.outreachStatus === "meeting_booked").length,
      lost: leads.filter((lead) => lead.outreachStatus === "not_interested").length
    }),
    [leads]
  );

  function updateForm(key: keyof Filters, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateSettingsForm(key: keyof typeof settingsForm, value: string | boolean) {
    setSettingsForm((current) => ({ ...current, [key]: value }));
  }

  function buildParams(nextForm = form) {
    const params = new URLSearchParams();
    Object.entries(nextForm).forEach(([key, value]) => {
      if (key === "countryName") return;
      if (value) params.set(key, value);
    });
    return params;
  }

  function navigateWithForm(nextForm = form) {
    router.push(`/?${buildParams(nextForm).toString()}`);
  }

  function updateCountry(value: string) {
    const selectedCountry = countrySuggestions.find(
      (country) => country.value.toLowerCase() === value.toLowerCase() || country.label.toLowerCase() === value.toLowerCase()
    );

    setForm((current) => ({
      ...current,
      countryName: selectedCountry?.label ?? value,
      country: selectedCountry?.value ?? current.country
    }));
  }

  function selectCountry(suggestion: Suggestion) {
    setForm((current) => ({
      ...current,
      countryName: suggestion.value,
      country: suggestion.label
    }));
  }

  function setOutreachFilter(value: "" | OutreachStatus) {
    const nextForm = { ...form, outreachStatus: value };
    setForm(nextForm);
    navigateWithForm(nextForm);
  }

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      if (form.location.trim().length < 2) {
        setLocationSuggestions([]);
        return;
      }

      const params = new URLSearchParams({ q: form.location, country: form.country || "PT" });
      const response = await fetch(`/api/search/locations?${params.toString()}`, { signal: controller.signal }).catch(() => null);
      if (!response?.ok) return;
      const payload = (await response.json()) as { locations?: Suggestion[] };
      setLocationSuggestions(payload.locations ?? []);
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [form.location, form.country]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      const params = new URLSearchParams({ q: form.businessType });
      const response = await fetch(`/api/search/categories?${params.toString()}`, { signal: controller.signal }).catch(() => null);
      if (!response?.ok) return;
      const payload = (await response.json()) as { categories?: Suggestion[] };
      setCategorySuggestions(payload.categories ?? []);
    }, 200);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [form.businessType]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      const params = new URLSearchParams({ q: form.countryName });
      const response = await fetch(`/api/search/countries?${params.toString()}`, { signal: controller.signal }).catch(() => null);
      if (!response?.ok) return;
      const payload = (await response.json()) as { countries?: CountrySuggestion[] };
      setCountrySuggestions(payload.countries ?? []);
    }, 200);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [form.countryName]);

  function applyFilters() {
    navigateWithForm();
  }

  async function generateList() {
    if (form.provider === "google-places" && !settingsForm.googlePlacesApiKeyConfigured) {
      window.alert("Adiciona e guarda a tua Google Places API key antes de gerar leads reais.");
      return;
    }

    setIsGenerating(true);
    const response = await fetch("/api/leads/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location: form.location, businessType: form.businessType, limit: Number(form.limit || 20), provider: form.provider, country: form.country })
    });
    setIsGenerating(false);
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      window.alert(payload?.errors?.join("\n") ?? "Erro ao gerar lista.");
      return;
    }
    applyFilters();
    router.refresh();
  }

  async function saveSettings() {
    setIsSavingSettings(true);
    const response = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadProvider: settingsForm.leadProvider,
        googlePlacesApiKey: settingsForm.googlePlacesApiKey,
        enrichWithPlaywright: settingsForm.enrichWithPlaywright,
        defaultCountry: form.country,
        defaultLocation: form.location,
        defaultBusinessType: form.businessType,
        defaultLimit: Number(form.limit || 20)
      })
    });
    setIsSavingSettings(false);

    if (!response.ok) {
      window.alert("Não foi possível guardar a configuração.");
      return;
    }

    const payload = (await response.json()) as UserSettings;
    setSettingsForm((current) => ({
      ...current,
      ...payload,
      defaultLimit: String(payload.defaultLimit),
      googlePlacesApiKey: ""
    }));
    router.refresh();
  }

  async function clearGoogleKey() {
    setIsSavingSettings(true);
    const response = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clearGooglePlacesApiKey: true })
    });
    setIsSavingSettings(false);

    if (!response.ok) {
      window.alert("Não foi possível remover a chave.");
      return;
    }

    setSettingsForm((current) => ({ ...current, googlePlacesApiKeyConfigured: false, googlePlacesApiKey: "" }));
  }

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        }
      }
    });
  }

  async function updateStatus(id: string, outreachStatus: OutreachStatus) {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ outreachStatus })
    });
    router.refresh();
  }

  async function copyMessage(lead: LeadRecord) {
    await navigator.clipboard.writeText(generateColdMessage(lead));
    setCopiedId(lead.id);
    window.setTimeout(() => setCopiedId(null), 1600);
  }

  function exportUrl() {
    return `/api/leads/export?${buildParams().toString()}`;
  }

  return (
    <main className="min-h-screen">
      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-7">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Velvet Neuron</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-normal">Prospeção local em {form.location || "Portugal"}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{user.name}</span>
                <span>·</span>
                <span>{user.email}</span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut />
                  Sair
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Stat label="Leads" value={stats.total} icon={<Users />} />
              <Stat label="Alta prioridade" value={stats.high} icon={<Search />} />
              <Stat label="Contactados" value={stats.contacted} icon={<CheckCircle2 />} />
              <Stat label="Reuniões" value={stats.meetings} icon={<CalendarCheck />} />
            </div>
          </div>

          <div className="rounded-md border bg-muted/45 p-4">
            <div className="mb-4 grid gap-3 border-b pb-4 xl:grid-cols-[minmax(260px,1fr)_180px_180px_auto_auto] xl:items-end">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Google Places API key</label>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    type="password"
                    value={settingsForm.googlePlacesApiKey}
                    onChange={(event) => updateSettingsForm("googlePlacesApiKey", event.target.value)}
                    placeholder={settingsForm.googlePlacesApiKeyConfigured ? "Chave guardada. Escreve para substituir." : "Adiciona a tua chave Google Places"}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Provider</label>
                <Select
                  value={settingsForm.leadProvider}
                  onChange={(event) => {
                    updateSettingsForm("leadProvider", event.target.value);
                    updateForm("provider", event.target.value);
                  }}
                >
                  <option value="google-places">Google Places</option>
                </Select>
              </div>
              <label className="flex h-9 items-center gap-2 rounded-md border bg-white px-3 text-sm">
                <input
                  type="checkbox"
                  checked={settingsForm.enrichWithPlaywright}
                  onChange={(event) => updateSettingsForm("enrichWithPlaywright", event.target.checked)}
                />
                Enriquecer websites
              </label>
              <Button onClick={saveSettings} disabled={isSavingSettings}>
                <Save />
                {isSavingSettings ? "A guardar" : "Guardar config"}
              </Button>
              <Button variant="outline" onClick={clearGoogleKey} disabled={isSavingSettings || !settingsForm.googlePlacesApiKeyConfigured}>
                <Trash2 />
                Remover chave
              </Button>
            </div>
            <div className="grid gap-3 lg:grid-cols-[180px_minmax(220px,1fr)_minmax(240px,1.1fr)_140px_auto_auto]">
              <AutocompleteInput
                value={form.countryName}
                onChange={updateCountry}
                onSelect={selectCountry}
                placeholder="País"
                suggestions={countrySuggestions.map((country) => ({ label: country.value, value: `${country.flag ? `${country.flag} ` : ""}${country.label}` }))}
              />
              <AutocompleteInput
                value={form.location}
                onChange={(value) => updateForm("location", value)}
                placeholder="Localização"
                suggestions={locationSuggestions}
              />
              <AutocompleteInput
                value={form.businessType}
                onChange={(value) => updateForm("businessType", value)}
                placeholder="Tipo de negócio"
                suggestions={categorySuggestions}
              />
              <Input value={form.limit} onChange={(event) => updateForm("limit", event.target.value)} type="number" min={1} max={60} placeholder="Limite" />
              <Button onClick={generateList} disabled={isGenerating}>
                <RefreshCw className={isGenerating ? "animate-spin" : ""} />
                Gerar lista
              </Button>
              <Button asChild variant="outline">
                <a href={exportUrl()}>
                  <Download />
                  CSV
                </a>
              </Button>
            </div>

            <div className="mt-3 flex flex-col gap-3 border-t pt-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap gap-2">
                {outreachOptions.map((option) => {
                  const key = option.value || "all";
                  const isActive = form.outreachStatus === option.value;
                  return (
                    <button
                      key={option.value || "all"}
                      type="button"
                      onClick={() => setOutreachFilter(option.value)}
                      className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors ${
                        isActive ? "border-primary bg-primary text-primary-foreground" : "bg-white hover:bg-muted"
                      }`}
                    >
                      {option.label}
                      <span className={`rounded px-1.5 py-0.5 text-xs ${isActive ? "bg-white/20" : "bg-muted"}`}>{outreachSummary[key as keyof OutreachSummary]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-2 sm:grid-cols-3 xl:w-[520px]">
                <Select value={form.websiteStatus} onChange={(event) => updateForm("websiteStatus", event.target.value)}>
                  <option value="">Website</option>
                  <option value="missing">Sem site</option>
                  <option value="weak">Fraco</option>
                  <option value="ok">Ok</option>
                  <option value="unknown">Desconhecido</option>
                </Select>
                <Select value={form.priority} onChange={(event) => updateForm("priority", event.target.value)}>
                  <option value="">Prioridade</option>
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="low">Baixa</option>
                </Select>
                <Button variant="outline" onClick={applyFilters}>
                  Aplicar filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-6">
        <div className="overflow-hidden rounded-md border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1240px] border-collapse text-sm">
              <thead className="bg-muted/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Negócio</th>
                  <th className="px-4 py-3">Categoria</th>
                  <th className="px-4 py-3">Fonte</th>
                  <th className="px-4 py-3">Localização</th>
                  <th className="px-4 py-3">Website</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Prioridade</th>
                  <th className="px-4 py-3">Contacto</th>
                  <th className="px-4 py-3">Outreach</th>
                  <th className="px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t align-top">
                    <td className="px-4 py-3">
                      <div className="font-medium">{lead.businessName}</div>
                      <div className="mt-1 max-w-64 text-xs text-muted-foreground">{lead.notes}</div>
                    </td>
                    <td className="px-4 py-3 capitalize">{lead.category}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{sourceLabels[lead.source] ?? lead.source}</Badge>
                    </td>
                    <td className="px-4 py-3">{lead.location}</td>
                    <td className="px-4 py-3">
                      <Badge variant={lead.websiteStatus === "missing" ? "destructive" : lead.websiteStatus === "weak" ? "amber" : "teal"}>
                        {websiteLabels[lead.websiteStatus]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-semibold">{lead.score}</td>
                    <td className="px-4 py-3">
                      <Badge variant={lead.priority === "high" ? "default" : lead.priority === "medium" ? "amber" : "outline"}>{priorityLabels[lead.priority]}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1 text-xs">
                        {lead.phone ? (
                          <span className="inline-flex items-center gap-1">
                            <Phone className="size-3" />
                            {lead.phone}
                          </span>
                        ) : null}
                        {lead.email ? (
                          <span className="inline-flex items-center gap-1">
                            <Mail className="size-3" />
                            {lead.email}
                          </span>
                        ) : null}
                        {lead.scoringReasons.length > 0 ? (
                          <span className="mt-1 max-w-48 text-muted-foreground">{lead.scoringReasons.slice(0, 3).join(" • ")}</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Select value={lead.outreachStatus} onChange={(event) => updateStatus(lead.id, event.target.value as OutreachStatus)} className="w-40">
                        <option value="not_contacted">Não contactado</option>
                        <option value="contacted">Contactado</option>
                        <option value="meeting_booked">Reunião marcada</option>
                        <option value="not_interested">Sem interesse</option>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {(lead.mapsUrl ?? lead.googleMapsUrl) ? (
                          <Button asChild variant="outline" size="icon" title="Abrir Google Maps">
                            <a href={lead.mapsUrl ?? lead.googleMapsUrl ?? "#"} target="_blank" rel="noreferrer">
                              <MapPin />
                            </a>
                          </Button>
                        ) : null}
                        {lead.website ? (
                          <Button asChild variant="outline" size="icon" title="Abrir website">
                            <a href={lead.website} target="_blank" rel="noreferrer">
                              <ExternalLink />
                            </a>
                          </Button>
                        ) : null}
                        <Button variant="outline" size="sm" onClick={() => copyMessage(lead)}>
                          <MessageSquare />
                          {copiedId === lead.id ? "Copiado" : "Mensagem"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-muted-foreground">
                      Sem leads para estes filtros. Usa “Gerar lista” para importar leads do provider selecionado.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="min-w-28 rounded-md border bg-background px-3 py-2">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="[&_svg]:size-3.5">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}

function AutocompleteInput({
  value,
  onChange,
  onSelect,
  placeholder,
  suggestions
}: {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: Suggestion) => void;
  placeholder: string;
  suggestions: Suggestion[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const visibleSuggestions = suggestions.slice(0, 8);

  return (
    <div className="relative min-w-0">
      <Input
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => window.setTimeout(() => setIsOpen(false), 120)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {isOpen && visibleSuggestions.length > 0 ? (
        <div className="absolute left-0 right-0 top-10 z-20 overflow-hidden rounded-md border bg-white shadow-lg">
          {visibleSuggestions.map((suggestion) => (
            <button
              key={`${suggestion.value}-${suggestion.label}`}
              type="button"
              className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-muted"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                onSelect?.(suggestion);
                if (!onSelect) onChange(suggestion.value);
                setIsOpen(false);
              }}
            >
              <span className="truncate">{suggestion.value}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{suggestion.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
