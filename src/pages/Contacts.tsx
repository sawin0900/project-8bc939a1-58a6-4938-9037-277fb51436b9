import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { YandexMap } from "@/components/YandexMap";
import { Phone, Mail, Send, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+7 (924) 730-14-54",
    href: "tel:+79247301454",
    description: "Круглосуточная линия",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@centr-prityazheniya.ru",
    href: "mailto:info@centr-prityazheniya.ru",
    description: "Ответ в течение 24 часов",
  },
  {
    icon: Send,
    title: "Telegram",
    value: "@morproekt",
    href: "https://t.me/morproekt",
    description: "Быстрая связь",
  },
  {
    icon: MapPin,
    title: "Адрес",
    value: "г. Владивосток",
    href: null,
    description: "Дальний Восток",
  },
];

const Contacts = () => {
  return (
    <Layout>
      <SEOHead
        title="Контакты — Центр Притяжения | Владивосток"
        description="Свяжитесь с нами для заказа судоподъёма и водолазных работ. Телефон, email, Telegram. Владивосток, Приморский край. Круглосуточная аварийная служба."
        keywords="контакты судоподъём, Владивосток, Центр Притяжения, заявка на судоподъём"
        canonical="/contacts"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <SectionHeader
              badge="Контакты"
              title="Свяжитесь с нами"
              description="Оставьте заявку или свяжитесь любым удобным способом — мы ответим в кратчайшие сроки"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedSection animation="slideLeft">
              <div className="card-ocean p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Оставить заявку</h3>
                <p className="text-muted-foreground mb-6">
                  Заполните форму — мы свяжемся с вами для обсуждения деталей
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection animation="slideRight">
              <div className="space-y-6">
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((contact, index) => (
                    <StaggerItem key={index}>
                      <div className="card-ocean p-6 h-full">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <contact.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-medium text-foreground mb-1">{contact.title}</h4>
                        {contact.href ? (
                          <a 
                            href={contact.href}
                            target={contact.href.startsWith("http") ? "_blank" : undefined}
                            rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-primary hover:underline font-medium"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{contact.value}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">{contact.description}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {/* Additional Info */}
                <AnimatedSection delay={0.3}>
                  <div className="card-ocean p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Режим работы</h4>
                        <p className="text-muted-foreground text-sm">
                          Офис: Пн–Пт с 9:00 до 18:00<br />
                          Аварийная служба: круглосуточно, без выходных
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Yandex Map */}
                <AnimatedSection delay={0.4}>
                  <div className="card-ocean p-0 overflow-hidden">
                    <YandexMap 
                      center={[43.1155, 131.8855]} 
                      zoom={13}
                      address="г. Владивосток, Дальний Восток"
                      className="aspect-video"
                    />
                    <div className="p-4 border-t border-border">
                      <p className="text-sm text-muted-foreground text-center">
                        Регион работы: Дальний Восток • Владивосток, Хабаровск, Сахалин
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
