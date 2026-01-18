import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineStep } from "@/components/ui/TimelineStep";
import { 
  Ship, 
  Anchor, 
  FileText, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  Send,
  Shield,
  Camera,
  Clock,
  Building2,
  Truck,
  Scale
} from "lucide-react";
import heroImage from "@/assets/hero-salvage.jpg";
import divingImage from "@/assets/diving-inspection.jpg";

const whyTrustUs = [
  { icon: Shield, text: "Работа строго по нормативам РФ" },
  { icon: Anchor, text: "Опыт работ в портовых акваториях" },
  { icon: FileText, text: "Документация, принимаемая надзорными органами" },
  { icon: Camera, text: "Фото- и видеофиксация всех этапов" },
  { icon: CheckCircle2, text: "Полный цикл работ под ключ" },
];

const clients = [
  { icon: Building2, text: "Государственные и муниципальные заказчики" },
  { icon: Anchor, text: "Порты и судоходные компании" },
  { icon: Ship, text: "Судовладельцы" },
  { icon: Scale, text: "Страховые компании" },
  { icon: Truck, text: "Генподрядчики" },
];

const services = [
  {
    icon: Ship,
    title: "Судоподъём затонувших судов",
    description: "Аварийный и плановый подъём затонувших судов в портовых и прибрежных акваториях с полным комплексом работ.",
    href: "/services"
  },
  {
    icon: Anchor,
    title: "Водолазные обследования",
    description: "Обследование акваторий, затонувших объектов и металлоконструкций с фото- и видеофиксацией.",
    href: "/services"
  },
  {
    icon: FileText,
    title: "Проектная документация",
    description: "Разработка проекта подъёма судна, ППР, технических отчётов в соответствии с Приказом Минтранса №176.",
    href: "/documentation"
  },
  {
    icon: Users,
    title: "Согласования в органах",
    description: "Сопровождение согласований в Росморречфлоте, МЧС, Росприроднадзоре, капитаниях портов.",
    href: "/services"
  },
];

const workStages = [
  { title: "Сбор данных", description: "Анализ исходных данных, архивов и координат" },
  { title: "Обследование", description: "Водолазное обследование объекта" },
  { title: "Расчёты", description: "Инженерные расчёты и технические решения" },
  { title: "Документация", description: "Разработка проектной документации" },
  { title: "Согласования", description: "Получение допусков и разрешений" },
  { title: "Выполнение работ", description: "Судоподъёмные работы" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Судоподъёмные работы" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              Приказ Минтранса РФ №176
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
              Судоподъём, водолазные обследования и проектная документация{" "}
              <span className="text-gradient">под ключ</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Работы в соответствии с требованиями надзорных органов. 
              Полный цикл от обследования до сдачи отчётной документации.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="btn-glow" asChild>
                <Link to="/contacts">
                  Оставить заявку
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+79991234567">
                  <Phone className="w-5 h-5 mr-2" />
                  Получить консультацию
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="https://t.me/morproekt" target="_blank" rel="noopener noreferrer">
                  <Send className="w-5 h-5 mr-2" />
                  Написать в Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom">
          <SectionHeader
            badge="Преимущества"
            title="Почему нам доверяют"
            description="Профессиональный подход и строгое соответствие нормативным требованиям"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyTrustUs.map((item, index) => (
              <div 
                key={index}
                className="card-ocean p-6 text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-foreground font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Клиенты"
            title="Для кого мы работаем"
            description="Широкий спектр заказчиков — от государственных органов до частных судовладельцев"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {clients.map((client, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <client.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{client.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom">
          <SectionHeader
            badge="Услуги"
            title="Ключевые направления"
            description="Полный спектр услуг по судоподъёму и подготовке документации"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">
                Все услуги
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Work Stages Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Этапы
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Как мы работаем
              </h2>
              <p className="text-muted-foreground mb-8">
                Системный подход к выполнению работ — от первичного анализа до сдачи отчётной документации
              </p>
              <div className="grid grid-cols-2 gap-4">
                {workStages.map((stage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{stage.title}</p>
                      <p className="text-xs text-muted-foreground">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-8" asChild>
                <Link to="/stages">
                  Подробнее об этапах
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src={divingImage} 
                alt="Водолазное обследование" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 card-ocean p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">24/7</p>
                    <p className="text-sm text-muted-foreground">Аварийные работы</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <div className="card-ocean p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Нужна консультация?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта. 
              Мы подготовим индивидуальное решение с учётом всех нормативных требований.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="btn-glow" asChild>
                <Link to="/contacts">
                  Оставить заявку
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://t.me/morproekt" target="_blank" rel="noopener noreferrer">
                  <Send className="w-5 h-5 mr-2" />
                  Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
