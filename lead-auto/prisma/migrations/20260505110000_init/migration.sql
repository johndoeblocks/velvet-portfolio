CREATE TYPE "WebsiteStatus" AS ENUM ('missing', 'weak', 'ok', 'unknown');
CREATE TYPE "Priority" AS ENUM ('high', 'medium', 'low');
CREATE TYPE "OutreachStatus" AS ENUM ('not_contacted', 'contacted', 'meeting_booked', 'not_interested');

CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "googleMapsUrl" TEXT,
    "source" TEXT NOT NULL DEFAULT 'google-places',
    "sourceId" TEXT,
    "mapsUrl" TEXT,
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "rating" DOUBLE PRECISION,
    "reviewCount" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "notes" TEXT,
    "enrichmentJson" JSONB,
    "scoringReasons" TEXT[],
    "websiteStatus" "WebsiteStatus" NOT NULL DEFAULT 'unknown',
    "score" INTEGER NOT NULL DEFAULT 0,
    "priority" "Priority" NOT NULL DEFAULT 'low',
    "outreachStatus" "OutreachStatus" NOT NULL DEFAULT 'not_contacted',
    "lastImportedAt" TIMESTAMP(3),
    "lastEnrichedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Lead_source_sourceId_key" ON "Lead"("source", "sourceId");
CREATE INDEX "Lead_location_idx" ON "Lead"("location");
CREATE INDEX "Lead_category_idx" ON "Lead"("category");
CREATE INDEX "Lead_priority_idx" ON "Lead"("priority");
CREATE INDEX "Lead_outreachStatus_idx" ON "Lead"("outreachStatus");
CREATE INDEX "Lead_source_idx" ON "Lead"("source");
