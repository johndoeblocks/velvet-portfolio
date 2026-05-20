import { NextResponse } from "next/server";
import { requireSessionFromRequest } from "@/lib/session";
import { getOrCreateUserLeadSettings, updateUserLeadSettings, type LeadSettingsInput } from "@/lib/user-settings";

export async function GET(request: Request) {
  const session = await requireSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await getOrCreateUserLeadSettings(session.user.id);

  return NextResponse.json({
    leadProvider: settings.leadProvider,
    googlePlacesApiKeyConfigured: Boolean(settings.googlePlacesApiKey),
    enrichWithPlaywright: settings.enrichWithPlaywright,
    defaultCountry: settings.defaultCountry,
    defaultLocation: settings.defaultLocation,
    defaultBusinessType: settings.defaultBusinessType,
    defaultLimit: settings.defaultLimit
  });
}

export async function PATCH(request: Request) {
  const session = await requireSessionFromRequest(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as LeadSettingsInput;
  const settings = await updateUserLeadSettings(session.user.id, body);

  return NextResponse.json({
    leadProvider: settings.leadProvider,
    googlePlacesApiKeyConfigured: Boolean(settings.googlePlacesApiKey),
    enrichWithPlaywright: settings.enrichWithPlaywright,
    defaultCountry: settings.defaultCountry,
    defaultLocation: settings.defaultLocation,
    defaultBusinessType: settings.defaultBusinessType,
    defaultLimit: settings.defaultLimit
  });
}
