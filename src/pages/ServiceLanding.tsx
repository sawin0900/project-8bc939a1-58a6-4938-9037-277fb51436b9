import { Link, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileText, Phone, Ship, Waves } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, SEOHead, ServiceSchema } from "@/components/seo";

const servicePages = {
  "sudopodem-zatonuvshih-sudov": {
    title: "Судоподъём затонувших судов",
    seoTitle: "Судоподъём затонувших судов во Владивостоке | Центр Притяжения",
    description:
      "Подъём затонувших судов под ключ: обследование, проект работ, согласования, техника, водолазное сопровождение и отчётная документация.",
    icon: Ship,
    deliverables: [
      "обследование корпуса и района работ",
      "проект судоподъёма и план производства работ",
      "подбор плавкрана, понтонов, строповки и такелажа",
      "выполнение подъёма с фото- и видеофиксацией",
    ],
  },
  "vodolaznye-raboty": {
    title: "Водолазные работы",
    seoTitle: "Водолазные работы и обследования акваторий | Центр Притяжения",
    description:
      "Профессиональные водолазные обследования судов, причалов, гидротехнических сооружений и акваторий с дефектовкой и отчётом.",
    icon: Waves,
    deliverables: [
      "визуальное и инструментальное обследование под водой",
      "поиск и идентификация подводных объектов",
      "фото-, видеофиксация и дефектовочные ведомости",
      "рекомендации по ремонту, подъёму или демонтажу",
    ],
  },
  "proektnaya-dokumentaciya": {
    title: "Проектная документация",
    seoTitle: "Проектная документация для судоподъёма | Центр Притяжения",
    description:
      "Разработка проектной и рабочей документации для судоподъёма, демонтажа и водолазных работ с учётом требований надзорных органов.",
    icon: FileText,
    deliverables: [
      "проект подъёма судна и технологические карты",
      "план производства работ и меры безопасности",
      "экологический раздел и мероприятия по снижению рисков",
      "комплект материалов для согласований",
    ],
  },
} as const;

type ServiceSlug = keyof typeof servicePages;

function isServiceSlug(slug: string | undefined): slug is ServiceSlug {
  return Boolean(slug && slug in servicePages);
}

interface ServiceLandingProps {
  slug?: string;
}

export default function ServiceLanding({ slug }: ServiceLandingProps) {
  if (!isServiceSlug(slug)) {
    return <Navigate to="/services" replace />;
  }

  const service = servicePages[slug];
  const Icon = service.icon;
  const canonical = `/${slug}`;

  return (
    <Layout pageClass="page-services">
      <SEOHead
        title={service.seoTitle}
        description={service.description}
        keywords={`${service.title.toLowerCase()}, Владивосток, Приморский край, судоподъём, водолазное обследование`}
        canonical={canonical}
      />
      <ServiceSchema name={service.title} description={service.description} url={canonical} />

      <section className="section-padding bg-ocean-dark">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { name: "Главная", href: "/" },
              { name: "Услуги", href: "/services" },
              { name: service.title, href: canonical },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center pt-8">
            <div>
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-8 w-8" />
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl">
                {service.title}
              </h1>
              <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {service.description} Работаем по Дальнему Востоку, готовим понятное техническое решение и сопровождаем задачу до сдачи результата заказчику.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">
                    Запросить расчёт стоимости
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+79247301454">
                    <Phone className="mr-2 h-5 w-5" />
                    Получить консультацию инженера
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/80 p-6 shadow-xl">
              <h2 className="mb-5 text-2xl font-semibold text-foreground">Что входит в работу</h2>
              <ul className="space-y-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
