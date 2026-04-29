export const SUPPORTED_LANGUAGES = ["ru", "en", "zh"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "ru";
export const LANGUAGE_STORAGE_KEY = "site_language";
