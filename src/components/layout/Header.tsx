import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Anchor, Phone, LogIn, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const { t } = useI18n();

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
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Anchor className="w-5 h-5 text-primary" />
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-lg text-foreground">{t("brand.name")}</span>
            <span className="block text-xs text-muted-foreground">{t("brand.tagline")}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
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
            <a href="tel:+79991234567" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{t("header.call")}</span>
            </a>
          </Button>
          <Button size="sm" className="btn-glow" asChild>
            <Link to="/contacts">{t("header.request")}</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="container-custom py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <LanguageSwitcher />
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
                <a href="tel:+79991234567" className="flex items-center justify-center gap-2">
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
