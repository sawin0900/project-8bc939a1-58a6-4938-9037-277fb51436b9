import { Link } from "react-router-dom";
import { Anchor, Mail, Phone, MapPin, Send } from "lucide-react";

const services = [
  "Судоподъём затонувших судов",
  "Водолазные обследования",
  "Проектная документация",
  "Разрешительная документация",
  "Аварийные работы",
];

const regulations = [
  "Приказ Минтранса РФ №176",
  "Кодекс торгового мореплавания РФ",
  "КВВТ РФ",
];

const quickLinks = [
  { name: "Услуги", href: "/services" },
  { name: "Проекты", href: "/projects" },
  { name: "Документация", href: "/documentation" },
  { name: "FAQ", href: "/faq" },
  { name: "Контакты", href: "/contacts" },
];

export function Footer() {
  return (
    <footer className="bg-ocean-dark border-t border-border">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Anchor className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-bold text-lg text-foreground">Центр Притяжения</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              «Центр Притяжения» — профессиональные услуги по судоподъёму, водолазным обследованиям 
              и подготовке проектной документации в соответствии с требованиями законодательства РФ.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>г. Владивосток, Дальний Восток</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Направления деятельности</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-sm text-muted-foreground">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Regulations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Нормативная база</h3>
            <ul className="space-y-2">
              {regulations.map((reg) => (
                <li key={reg} className="text-sm text-muted-foreground">
                  {reg}
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <h4 className="font-medium text-foreground mb-2">Навигация</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Контакты</h3>
            <div className="space-y-3">
              <a 
                href="tel:+79247301454"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+7 (924) 730-14-54</span>
              </a>
              <a 
                href="mailto:info@centr-prityazheniya.store"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>info@centr-prityazheniya.store</span>
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
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground">
                Регион работы: Российская Федерация, прибрежные и портовые акватории
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} «Центр Притяжения». Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground">
            Работы выполняются в соответствии с Приказом Минтранса РФ №176
          </p>
        </div>
      </div>
    </footer>
  );
}
