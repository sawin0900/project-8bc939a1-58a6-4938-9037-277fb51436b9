import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineStep } from "@/components/ui/TimelineStep";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight } from "lucide-react";
import divingTeamImg from "@/assets/images/diving-team-equipment.jpg";
import pontoonImg from "@/assets/images/pontoon-salvage.jpg";

const stages = [
  {
    title: "Сбор и анализ исходных данных",
    description: "Изучение архивных материалов, определение координат объекта, анализ гидрологических условий, оценка глубины и характера дна. Сбор информации о судне: размеры, тоннаж, характер груза, причины затопления.",
  },
  {
    title: "Водолазное обследование объекта",
    description: "Детальное обследование затонувшего судна водолазами с фото- и видеофиксацией. Определение положения объекта, степени разрушения, наличия опасных веществ. Составление дефектовочной ведомости и акта обследования.",
  },
  {
    title: "Инженерные расчёты и технические решения",
    description: "Расчёт водоизмещения, определение центра тяжести, выбор метода подъёма. Расчёт необходимой грузоподъёмности, подбор оборудования и плавсредств. Разработка технических решений с учётом особенностей объекта.",
  },
  {
    title: "Разработка проектной документации",
    description: "Подготовка проекта подъёма судна, плана производства работ (ППР), технического отчёта. Разработка экологической документации и оценки воздействия на окружающую среду. Формирование комплекта документов для согласования.",
  },
  {
    title: "Получение согласований и допусков",
    description: "Согласование проекта в Росморречфлоте, МЧС, Росприроднадзоре, администрации порта. Получение разрешений на проведение работ в акватории. Оформление допусков и уведомлений для всех участников работ.",
  },
  {
    title: "Выполнение судоподъёмных работ",
    description: "Мобилизация техники и персонала. Подготовительные работы: установка понтонов, крепление строп. Непосредственный подъём с соблюдением всех мер безопасности. Транспортировка к месту разделки или отстоя.",
  },
  {
    title: "Утилизация и вывоз",
    description: "Разделка корпуса судна на металлолом в соответствии с требованиями экологического законодательства. Вывоз и утилизация опасных отходов. Очистка акватории от загрязнений.",
  },
  {
    title: "Подготовка и сдача отчётной документации",
    description: "Формирование полного комплекта отчётной документации: акты выполненных работ, технический отчёт, фото- и видеоматериалы. Передача документов заказчику и в надзорные органы. Получение акта приёмки работ.",
  },
];

const WorkStages = () => {
  return (
    <Layout>
      <SEOHead
        title="Этапы судоподъёмных работ — от обследования до сдачи"
        description="Пошаговый процесс выполнения судоподъёма: сбор данных, водолазное обследование, инженерные расчёты, проектная документация, согласования и подъём судна."
        keywords="этапы судоподъёма, процесс подъёма судна, водолазное обследование, проект подъёма судна, согласования судоподъёма"
        canonical="/stages"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <SectionHeader
              badge="Этапы работ"
              title="Пошаговый процесс выполнения работ"
              description="Системный подход к каждому проекту — от первичного анализа до сдачи готовой документации"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0 pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={divingTeamImg} alt="Водолазная бригада готовится к работе" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding pt-8">
        <div className="container-custom max-w-3xl">
          <StaggerContainer staggerDelay={0.15}>
            {stages.map((stage, index) => (
              <StaggerItem key={index}>
                <TimelineStep
                  number={index + 1}
                  title={stage.title}
                  description={stage.description}
                  isLast={index === stages.length - 1}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Image 2 */}
      <section className="py-8">
        <div className="container-custom">
          <AnimatedSection>
            <img src={pontoonImg} alt="Понтонный метод подъёма" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom text-center">
          <AnimatedSection animation="scale">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Готовы начать проект?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Оставьте заявку — мы свяжемся с вами для обсуждения деталей и подготовки коммерческого предложения
            </p>
            <Button size="lg" className="btn-glow" asChild>
              <Link to="/contacts">
                Оставить заявку
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default WorkStages;
