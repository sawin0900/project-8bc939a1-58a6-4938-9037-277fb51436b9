import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight } from "lucide-react";
import projectImage from "@/assets/project-salvage.jpg";
import divingImage from "@/assets/diving-inspection.jpg";
import heroImage from "@/assets/hero-salvage.jpg";

const projects = [
  {
    title: "Подъём сейнера в порту Владивосток",
    location: "Владивосток",
    year: "2024",
    task: "Подъём затонувшего рыболовецкого сейнера длиной 28 м, препятствующего судоходству в акватории порта",
    solution: "Разработка проекта подъёма, согласование с Росморречфлотом и МЧС, применение понтонного метода подъёма",
    result: "Судно поднято и утилизировано в установленные сроки, акватория освобождена для судоходства",
    image: projectImage,
  },
  {
    title: "Обследование акватории бухты Золотой Рог",
    location: "Владивосток",
    year: "2024",
    task: "Комплексное водолазное обследование акватории для выявления затонувших объектов и оценки состояния дна",
    solution: "Организация водолазных спусков с применением современного оборудования, фото- и видеофиксация",
    result: "Составлена карта акватории с указанием всех затонувших объектов, подготовлен технический отчёт",
    image: divingImage,
  },
  {
    title: "Подъём баржи на реке Амур",
    location: "Хабаровск",
    year: "2023",
    task: "Аварийный подъём затонувшей баржи с грузом после столкновения на судоходном участке реки",
    solution: "Срочная мобилизация, разработка аварийного проекта, координация с речным регистром",
    result: "Баржа поднята в течение 72 часов, предотвращён экологический ущерб, судоходство восстановлено",
    image: heroImage,
  },
];

const Projects = () => {
  return (
    <Layout>
      <SEOHead
        title="Проекты судоподъёма — выполненные работы"
        description="Реализованные проекты по судоподъёму и водолазным обследованиям: подъём сейнеров, барж, обследование акваторий. Владивосток, Хабаровск, Дальний Восток."
        keywords="проекты судоподъёма, кейсы водолазные работы, подъём судна Владивосток, обследование акватории"
        canonical="/projects"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <SectionHeader
              badge="Проекты"
              title="Опыт выполненных работ"
              description="Реализованные проекты по судоподъёму и водолазным обследованиям в акваториях Дальнего Востока"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <StaggerItem key={index}>
                <ProjectCard {...project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom text-center">
          <AnimatedSection animation="scale">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Есть похожая задача?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Расскажите о вашем проекте — мы подберём оптимальное решение на основе накопленного опыта
            </p>
            <Button size="lg" className="btn-glow" asChild>
              <Link to="/contacts">
                Обсудить проект
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
