import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { MenuSEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight } from "lucide-react";
import projectImage from "@/assets/project-salvage.jpg";
import divingImage from "@/assets/diving-inspection.jpg";
import heroImage from "@/assets/hero-salvage.jpg";
import tugboatImg from "@/assets/images/tugboat-salvage-operation.jpg";
import floatingCraneImg from "@/assets/images/floating-crane-salvage.jpg";
import pierImg from "@/assets/images/pier-inspection-divers.jpg";
import trawlerImg from "@/assets/images/trawler-dismantling.jpg";
import oilSpillImg from "@/assets/images/oil-spill-containment.jpg";

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
  {
    title: "Подъём и утилизация танкера «Надежда»",
    location: "Находка",
    year: "2024",
    task: "Подъём затонувшего танкера водоизмещением 1200 т с остатками нефтепродуктов на глубине 12 м вблизи нефтеналивного терминала",
    solution: "Предварительная откачка нефтепродуктов, установка боновых заграждений, крановый подъём с использованием плавкрана грузоподъёмностью 300 т",
    result: "Откачано 85 т нефтепродуктов, судно поднято и отбуксировано на судоразделочную площадку, загрязнение акватории предотвращено",
    image: floatingCraneImg,
  },
  {
    title: "Демонтаж затонувших траулеров в бухте Диомид",
    location: "Владивосток",
    year: "2023",
    task: "Демонтаж и подъём по частям трёх брошенных рыболовецких траулеров, лежащих на грунте в районе причалов",
    solution: "Подводная газокислородная резка корпусов на фрагменты массой до 5 т, подъём краном на баржу",
    result: "Извлечено более 420 т металлолома, акватория очищена, получено заключение Росприроднадзора",
    image: trawlerImg,
  },
  {
    title: "Обследование причалов порта Восточный",
    location: "Находка",
    year: "2024",
    task: "Водолазное обследование подводной части 6 причальных стенок общей протяжённостью 1,2 км для оценки технического состояния",
    solution: "Обследование с применением подводного видеокомплекса, ультразвуковая толщинометрия шпунтовых стенок",
    result: "Составлены дефектовочные ведомости, выявлены 14 участков, требующих ремонта, подготовлен технический отчёт",
    image: pierImg,
  },
  {
    title: "Ликвидация последствий аварии буксира",
    location: "Сахалин",
    year: "2023",
    task: "Аварийный подъём затонувшего буксира с разливом дизельного топлива в прибрежной зоне Корсакова",
    solution: "Экстренное развёртывание боновых заграждений, откачка топлива, понтонный подъём судна",
    result: "Разлив локализован в течение 4 часов, судно поднято за 5 суток, экосистема сохранена",
    image: oilSpillImg,
  },
  {
    title: "Буксировка аварийного сухогруза",
    location: "Японское море",
    year: "2024",
    task: "Спасательная буксировка обесточенного сухогруза длиной 86 м, дрейфующего в штормовых условиях",
    solution: "Выход спасательного буксира, заведение буксирного троса в условиях волнения 4 балла, буксировка в порт-убежище",
    result: "Судно доставлено в безопасную акваторию, предотвращена посадка на мель и возможный разлив",
    image: tugboatImg,
  },
];

const Projects = () => {
  return (
    <Layout pageClass="page-projects">
      <MenuSEOHead
        pageKey="projects"
        pageName="Проекты"
        title="Проекты судоподъёма — выполненные работы"
        description="Реализованные проекты по судоподъёму и водолазным обследованиям: подъём танкеров, траулеров, барж, обследование причалов. Владивосток, Находка, Сахалин."
        keywords="проекты судоподъёма, кейсы водолазные работы, подъём судна Владивосток, обследование акватории, демонтаж судов"
        canonical="/projects"
      />

      {/* Hero */}
      <section className="section-padding pt-32 hero relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <SectionHeader
              badge="Проекты"
              headingLevel="h1"
              title="Опыт выполненных работ"
              description="Реализованные проекты по судоподъёму и водолазным обследованиям в акваториях Дальнего Востока"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pt-8">
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
