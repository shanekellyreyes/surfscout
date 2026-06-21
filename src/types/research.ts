export type ResearchSourceType =
  | "official_safety"
  | "public_safety_page"
  | "educational_hazard"
  | "supplemental_surf_condition"
  | "news_media_historical";

export type ResearchExtractionMethod =
  | "api"
  | "fetch"
  | "browserbase_search"
  | "browserbase_fetch"
  | "seeded";

export type ResearchConfidence =
  | "official"
  | "public_safety"
  | "educational"
  | "supplemental"
  | "news_media"
  | "seeded_fallback";

export type ResearchRequestBody = {
  beachId: string;
  beachName?: string;
  region?: string;
};

export type ResearchSourceNote = {
  id: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: ResearchSourceType;
  extractionMethod: ResearchExtractionMethod;
  confidence: ResearchConfidence;
  fetchedAt: string;
  notes: string[];
  degraded?: boolean;
  degradedReason?: string;
};

export type ResearchResponse = {
  beachId: string;
  beachName: string;
  region: string;
  fetchedAt: string;
  degradedMode: boolean;
  degradedReasons: string[];
  sourceNotes: ResearchSourceNote[];
  safetyDisclaimer: string;
};
