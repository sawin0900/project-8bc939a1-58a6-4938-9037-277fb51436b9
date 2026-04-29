import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "../../locales/en.json";
import ru from "../../locales/ru.json";
import zh from "../../locales/zh.json";
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, type Language } from "./types";

type TranslationValue = string | Record<string, unknown>;
type Dictionary = Record<string, TranslationValue>;

const dictionaries: Record<Language, Dictionary> = {
  ru: ru as Dictionary,
  en: en as Dictionary,
  zh: zh as Dictionary,
};

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getNestedValue(dictionary: Dictionary, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, segment) => {
    if (!isObject(acc)) {
      return undefined;
    }

    return acc[segment];
  }, dictionary);
}

function normalizeBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const rawLanguage = navigator.language.toLowerCase();

  if (rawLanguage.startsWith("zh")) {
    return "zh";
  }

  if (rawLanguage.startsWith("ru")) {
    return "ru";
  }

  return DEFAULT_LANGUAGE;
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const langFromQuery = new URLSearchParams(window.location.search).get("lang");
  if (langFromQuery === "ru" || langFromQuery === "en" || langFromQuery === "zh") {
    return langFromQuery;
  }

  const persisted = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (persisted === "ru" || persisted === "en" || persisted === "zh") {
    return persisted;
  }

  return normalizeBrowserLanguage();
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url.toString());
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key: string) => {
        const activeValue = getNestedValue(dictionaries[language], key);
        if (typeof activeValue === "string") {
          return activeValue;
        }

        const fallbackValue = getNestedValue(dictionaries[DEFAULT_LANGUAGE], key);
        if (typeof fallbackValue === "string") {
          return fallbackValue;
        }

        return key;
      },
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
