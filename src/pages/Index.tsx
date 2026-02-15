import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SEOHead, OrganizationSchema } from "@/components/seo";
import { motion } from "framer-motion";
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
  Scale,
  Scissors
} from "lucide-react";
import heroImage from "@/assets/hero-salvage.jpg";
import divingImage from "@/assets/diving-inspection.jpg";
import { LatestNews } from "@/components/LatestNews";

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
    icon: Scissors,
    title: "Демонтаж и резка",
    description: "Подводная и надводная резка металлоконструкций, демонтаж затонувших судов и объектов на месте.",
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
      <SEOHead
        title="Судоподъём и водолазные работы во Владивостоке | Центр Притяжения"
        description="Профессиональный судоподъём затонувших судов, водолазные обследования акваторий, демонтаж и резка металлоконструкций в Приморском крае. Работаем по Приказу Минтранса РФ №176."
        keywords="судоподъём, подъём затонувших судов, водолазные работы Владивосток, обследование акватории, проект подъёма судна, Приказ Минтранса 176, аварийный судоподъём, водолазное обследование"
        canonical="/"
      />
      <OrganizationSchema />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Судоподъёмные работы" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/70 to-background/40" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              Приказ Минтранса РФ №176
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Судоподъём, демонтаж, резка и водолазные работы{" "}
              <span className="text-gradient">под ключ</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
            >
              Подводная и надводная резка металлоконструкций, демонтаж затонувших объектов. 
              Полный цикл работ от обследования до сдачи отчётной документации.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Преимущества"
              title="Почему нам доверяют"
              description="Профессиональный подход и строгое соответствие нормативным требованиям"
            />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyTrustUs.map((item, index) => (
              <StaggerItem key={index}>
                <div className="card-ocean p-6 text-center hover:border-primary/50 transition-colors h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-foreground font-medium">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Clients */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Клиенты"
              title="Для кого мы работаем"
              description="Широкий спектр заказчиков — от государственных органов до частных судовладельцев"
            />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {clients.map((client, index) => (
              <StaggerItem key={index}>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <client.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{client.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Услуги"
              title="Ключевые направления"
              description="Полный спектр услуг по судоподъёму, демонтажу, резке и подготовке документации"
            />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection delay={0.3} className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">
                Все услуги
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Work Stages Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slideLeft">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Этапы
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Как мы работаем
              </h2>
              <p className="text-muted-foreground mb-8">
                Системный подход к выполнению работ — от первичного анализа до сдачи отчётной документации
              </p>
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {workStages.map((stage, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{stage.title}</p>
                        <p className="text-xs text-muted-foreground">{stage.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
              <Button className="mt-8" asChild>
                <Link to="/stages">
                  Подробнее об этапах
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </AnimatedSection>
            <AnimatedSection animation="slideRight">
              <div className="relative">
                <motion.img 
                  src={divingImage} 
                  alt="Водолазное обследование" 
                  className="rounded-lg shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute -bottom-6 -left-6 card-ocean p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">24/7</p>
                      <p className="text-sm text-muted-foreground">Аварийные работы</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <LatestNews />

      {/* CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <AnimatedSection animation="scale">
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
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
