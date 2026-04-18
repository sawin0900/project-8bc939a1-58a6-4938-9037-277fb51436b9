import { Link } from "react-router-dom";
import { Anchor, Mail, Phone, MapPin, Send } from "lucide-react";
import { MessengerAvailability } from "@/components/MessengerAvailability";
import { useI18n } from "@/i18n";

const serviceKeys = [
  "footer.services.shipRaising",
  "footer.services.diving",
  "footer.services.designDocs",
  "footer.services.permits",
  "footer.services.emergency",
];

const regulationKeys = [
  "footer.regulationItems.order176",
  "footer.regulationItems.merchantCode",
  "footer.regulationItems.kvvt",
];

const quickLinks = [
  { key: "navigation.services", href: "/services" },
  { key: "navigation.projects", href: "/projects" },
  { key: "navigation.documentation", href: "/documentation" },
  { key: "navigation.faq", href: "/faq" },
  { key: "navigation.contacts", href: "/contacts" },
  { key: "Политика конфиденциальности", href: "/privacy-policy" },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-ocean-dark border-t border-border">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-bold text-lg text-foreground">{t("brand.name")}</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.description")}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t("footer.location")}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.activity")}</h3>
            <ul className="space-y-2">
              {serviceKeys.map((serviceKey) => (
                <li key={serviceKey} className="text-sm text-muted-foreground">
                  {t(serviceKey)}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.regulations")}</h3>
            <ul className="space-y-2">
              {regulationKeys.map((regulationKey) => (
                <li key={regulationKey} className="text-sm text-muted-foreground">
                  {t(regulationKey)}
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <h4 className="font-medium text-foreground mb-2">{t("footer.navigation")}</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.key.startsWith("navigation.") ? t(link.key) : link.key}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t("footer.contacts")}</h3>
            <div className="space-y-3">
              <a
                href="tel:+79247301454"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+7 (924) 730-14-54</span>
              </a>
              <a
                href="mailto:info@centr-prityazheniya.ru"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>info@centr-prityazheniya.ru</span>
              </a>
              <a
                href="https://t.me/morproekt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Send className="w-4 h-4 text-primary" />
                <span>@morproekt</span>
              </a>
              <MessengerAvailability compact className="pt-2 border-t border-border/60 mt-3" />
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground">{t("footer.region")}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <p>{t("footer.compliance")}</p>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors underline underline-offset-2">
              Политика конфиденциальности
            </Link>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Link
            to="/privacy-policy"
            className="inline-flex text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            Политика конфиденциальности (ФЗ-152)
          </Link>
        </div>
      </div>
    </footer>
  );
}
