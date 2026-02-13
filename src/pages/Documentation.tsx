import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs, ServiceSchema } from "@/components/seo";
import { FileText, Scale, Leaf, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import docsImg from "@/assets/images/documentation-blueprints.jpg";

const regulations = [
  {
    icon: FileText,
    title: "Приказ Минтранса РФ №176",
    description: "Основной нормативный документ, регулирующий порядок подъёма затонувшего имущества на внутренних водных путях Российской Федерации.",
  },
  {
    icon: Scale,
    title: "Кодекс торгового мореплавания РФ",
    description: "Устанавливает правовые основы торгового мореплавания, включая вопросы ответственности за затонувшее имущество.",
  },
  {
    icon: FileText,
    title: "КВВТ РФ",
    description: "Кодекс внутреннего водного транспорта Российской Федерации — регулирует отношения в сфере внутреннего водного транспорта.",
  },
  {
    icon: Leaf,
    title: "Экологические требования",
    description: "Федеральные законы и подзаконные акты, регулирующие охрану водных объектов и предотвращение загрязнения акваторий.",
  },
  {
    icon: Building2,
    title: "Требования портовых администраций",
    description: "Местные правила и регламенты, устанавливаемые администрациями морских и речных портов.",
  },
];

const documents = [
  "Проект подъёма судна",
  "План производства работ (ППР)",
  "Технический отчёт",
  "Акт водолазного обследования",
  "Дефектовочная ведомость",
  "Фото- и видеоотчёт",
  "Экологическое заключение",
  "Материалы для надзорных органов",
  "Материалы для страховых компаний",
  "Акт приёмки выполненных работ",
];

const Documentation = () => {
  return (
    <Layout>
      <SEOHead
        title="Документация по судоподъёму | Приказ Минтранса №176"
        description="Разработка проектной документации для судоподъёма: проект подъёма судна, ППР, технические отчёты. Полное соответствие Приказу Минтранса РФ №176, КТМ и КВВТ."
        keywords="документация судоподъём, Приказ Минтранса 176, проект подъёма судна, ППР судоподъём, КТМ РФ, КВВТ, нормативная база"
        canonical="/documentation"
      />
      <ServiceSchema
        name="Разработка проектной документации для судоподъёма"
        description="Подготовка полного комплекта документации по Приказу Минтранса РФ №176: проект подъёма судна, ППР, технические отчёты"
        url="/documentation"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <SectionHeader
              badge="Документация"
              title="Нормативная база и документация"
              description="Полное соответствие законодательству РФ и требованиям надзорных органов"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0 pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={docsImg} alt="Проектная документация и чертежи" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Regulations */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <h3 className="text-2xl font-bold text-foreground mb-8">Нормативная база</h3>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regulations.map((reg, index) => (
              <StaggerItem key={index}>
                <div className="card-ocean p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <reg.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{reg.title}</h4>
                  <p className="text-sm text-muted-foreground">{reg.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Documents List */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection animation="slideLeft">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Документы, которые мы готовим
              </h3>
              <p className="text-muted-foreground mb-8">
                Полный комплект проектной, рабочей и отчётной документации, 
                соответствующий требованиям законодательства и принимаемый надзорными органами
              </p>
              <Button size="lg" className="btn-glow" asChild>
                <Link to="/contacts">
                  Заказать документацию
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documents.map((doc, index) => (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{doc}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <AnimatedSection animation="scale">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Нужна помощь с документацией?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Наши специалисты подготовят полный комплект документов в соответствии 
              с требованиями законодательства и обеспечат их согласование в надзорных органах
            </p>
            <Button size="lg" className="btn-glow" asChild>
              <Link to="/contacts">
                Получить консультацию
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Documentation;
