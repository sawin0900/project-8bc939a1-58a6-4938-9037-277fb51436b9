import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Anchor,
  Phone,
  LogIn,
  LogOut,
  Settings,
  Globe,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/i18n";
import { SUPPORTED_LANGUAGES, type Language } from "@/i18n/types";

const PHONE_HREF = "tel:+79247301454";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const { t, language, setLanguage } = useI18n();

  useEffect(() => {
    // On the home page we want the top navigation to be visibly expanded.
    setMobileMenuOpen(location.pathname === "/");
  }, [location.pathname, setMobileMenuOpen]);

  const navigation = [
    { key: "navigation.home", href: "/" },
    { key: "navigation.services", href: "/services" },
    { key: "navigation.dismantling", href: "/services/dismantling-cutting" },
    { key: "navigation.stages", href: "/stages" },
    { key: "navigation.documentation", href: "/documentation" },
    { key: "navigation.projects", href: "/projects" },
    { key: "navigation.emergency", href: "/emergency" },
    { key: "navigation.news", href: "/news" },
    { key: "navigation.articles", href: "/articles" },
    { key: "navigation.faq", href: "/faq" },
    { key: "navigation.contacts", href: "/contacts" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container-custom flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3 group min-w-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
            <Anchor className="w-5 h-5 text-primary" />
          </div>
          <div className="hidden sm:block min-w-0">
            <span className="font-bold text-lg text-foreground truncate block">{t("brand.name")}</span>
            <span className="block text-xs text-muted-foreground truncate">{t("brand.tagline")}</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                <span>Меню / {t(`language.${language}`)}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 max-h-[70vh] overflow-y-auto">
              <DropdownMenuLabel>Разделы сайта</DropdownMenuLabel>
              {navigation.map((item) => (
                <DropdownMenuItem key={item.key} asChild>
                  <Link
                    to={item.href}
                    className={location.pathname === item.href ? "text-primary" : ""}
                  >
                    {t(item.key)}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t("language.label")}</DropdownMenuLabel>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setLanguage(lang as Language)}>
                  <span className={language === lang ? "text-primary font-semibold" : ""}>{t(`language.${lang}`)}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAdmin && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>{t("header.admin")}</span>
              </Link>
            </Button>
          )}
          {user ? (
            <Button variant="outline" size="sm" onClick={signOut} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>{t("header.signOut")}</span>
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>{t("header.signIn")}</span>
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <a href={PHONE_HREF} className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{t("header.call")}</span>
            </a>
          </Button>
          <Button size="sm" className="btn-glow" asChild>
            <Link to="/contacts">{t("header.request")}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
          <div className="container-custom py-4 space-y-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="inline-flex items-center gap-2"><Globe className="w-4 h-4" />Меню и язык</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[calc(100vw-3rem)] max-h-[60vh] overflow-y-auto">
                <DropdownMenuLabel>Разделы сайта</DropdownMenuLabel>
                {navigation.map((item) => (
                  <DropdownMenuItem key={item.key} asChild>
                    <Link to={item.href} onClick={() => setMobileMenuOpen(false)}>{t(item.key)}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t("language.label")}</DropdownMenuLabel>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <DropdownMenuItem key={lang} onClick={() => setLanguage(lang as Language)}>
                    {t(`language.${lang}`)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="grid grid-cols-1 gap-2">
              {isAdmin && (
                <Button variant="outline" asChild>
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>{t("header.adminPanel")}</span>
                  </Link>
                </Button>
              )}
              {user ? (
                <Button variant="outline" onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>{t("header.signOut")}</span>
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                    <LogIn className="w-4 h-4" />
                    <span>{t("header.signIn")}</span>
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <a href={PHONE_HREF} className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{t("header.call")}</span>
                </a>
              </Button>
              <Button className="btn-glow" asChild>
                <Link to="/contacts" onClick={() => setMobileMenuOpen(false)}>
                  {t("header.request")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
