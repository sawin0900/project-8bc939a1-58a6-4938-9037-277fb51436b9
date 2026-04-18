import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { SUPPORTED_LANGUAGES, type Language } from "@/i18n/types";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="flex items-center gap-1" aria-label={t("language.label")}>
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = language === lang;
        return (
          <Button
            key={lang}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage(lang as Language)}
            aria-pressed={isActive}
            className="min-w-12"
          >
            {t(`language.${lang}`)}
          </Button>
        );
      })}
    </div>
  );
}
