import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Anchor, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Главная", href: "/" },
  { name: "Услуги", href: "/services" },
  { name: "Этапы работ", href: "/stages" },
  { name: "Документация", href: "/documentation" },
  { name: "Проекты", href: "/projects" },
  { name: "Срочные работы", href: "/emergency" },
  { name: "Статьи", href: "/articles" },
  { name: "FAQ", href: "/faq" },
  { name: "Контакты", href: "/contacts" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Anchor className="w-5 h-5 text-primary" />
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-lg text-foreground">МорПроект</span>
            <span className="block text-xs text-muted-foreground">Судоподъём • Водолазные работы</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href="tel:+79991234567" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Позвонить</span>
            </a>
          </Button>
          <Button size="sm" className="btn-glow" asChild>
            <Link to="/contacts">Оставить заявку</Link>
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
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="outline" asChild>
                <a href="tel:+79991234567" className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Позвонить</span>
                </a>
              </Button>
              <Button className="btn-glow" asChild>
                <Link to="/contacts" onClick={() => setMobileMenuOpen(false)}>
                  Оставить заявку
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
