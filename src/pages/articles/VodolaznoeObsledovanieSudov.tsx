import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, Eye, Camera, FileText, Ruler, Ship, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const stages = [
  {
    icon: Eye,
    title: "Визуальный осмотр",
    description: "Водолаз осматривает корпус судна, фиксирует положение на грунте, наличие повреждений, крен, дифферент.",
  },
  {
    icon: Camera,
    title: "Фото- и видеофиксация",
    description: "Ведётся подводная съёмка всех значимых элементов: пробоин, деформаций, состояния надстроек.",
  },
  {
    icon: Ruler,
    title: "Замеры и промеры",
    description: "Определяются габариты, глубина залегания, расстояние до грунта, толщина ила и наносов.",
  },
  {
    icon: FileText,
    title: "Составление акта",
    description: "По результатам обследования составляется официальный акт с описанием состояния судна и рекомендациями.",
  },
];

const whatWeCheck = [
  "Положение судна на грунте (крен, дифферент, курс)",
  "Наличие и характер повреждений корпуса",
  "Состояние надстроек и палубного оборудования",
  "Наличие груза в трюмах",
  "Наличие топлива и масел в танках",
  "Глубина залегания и тип грунта",
  "Степень обрастания и заиливания",
  "Наличие препятствий для подъёма",
  "Возможные точки крепления стропов/понтонов",
  "Состояние окружающей акватории",
];

const documents = [
  {
    title: "Акт водолазного обследования",
    description: "Официальный документ с описанием состояния судна, подписанный водолазным специалистом.",
  },
  {
    title: "Фото- и видеоматериалы",
    description: "Визуальная документация состояния объекта для проектирования работ и согласований.",
  },
  {
    title: "Схема положения судна",
    description: "Чертёж с указанием координат, глубин, положения относительно навигационных ориентиров.",
  },
  {
    title: "Заключение о возможности подъёма",
    description: "Предварительные рекомендации по методу подъёма и необходимым ресурсам.",
  },
];

export default function VodolaznoeObsledovanieSudov() {
  return (
    <Layout>
      <SEOHead
        title="Водолазное обследование затонувших судов — диагностика | Владивосток"
        description="Водолазное обследование затонувших судов: этапы, что проверяем, какие документы получаете. Профессиональная диагностика в Приморском крае."
        keywords="водолазное обследование судна, обследование затонувшего судна, водолазная диагностика, осмотр затонувшего судна Владивосток"
        canonical="/articles/vodolaznoye-obsledovanie-sudov"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Диагностика
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Водолазное обследование затонувших судов
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Водолазное обследование — первый и обязательный этап любого судоподъёма. От качества 
                диагностики зависит точность проекта, выбор метода и итоговая стоимость работ.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stages */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Этапы водолазного обследования
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stages.map((stage, index) => (
              <AnimatedSection key={stage.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <stage.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">Этап {index + 1}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What we check */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Что проверяют водолазы
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Полный перечень параметров, которые фиксируются при обследовании:
              </p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-3">
              {whatWeCheck.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.03}>
                  <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Документы по результатам обследования
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-card border border-border rounded-2xl p-6 h-full">
                    <div className="flex items-start gap-4">
                      <FileText className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timing */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Сроки обследования</h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Полевые работы:</strong> 1-3 дня в зависимости 
                        от размера судна и условий видимости.
                      </p>
                      <p>
                        <strong className="text-foreground">Подготовка документации:</strong> 2-5 рабочих дней 
                        после завершения погружений.
                      </p>
                      <p>
                        <strong className="text-foreground">Экстренное обследование:</strong> возможен выезд 
                        в течение 24 часов с предоставлением предварительного отчёта.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Important */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Важно знать</h3>
                    <p className="text-muted-foreground">
                      Качественное водолазное обследование позволяет избежать непредвиденных расходов 
                      на этапе подъёма. Попытки сэкономить на диагностике часто приводят к ошибкам 
                      в проектировании и удорожанию работ.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <Ship className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Заказать водолазное обследование
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Наши водолазы имеют допуски ко всем категориям работ. Выполняем обследования 
                во Владивостоке, Находке и других портах Приморья.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">
                    Оставить заявку
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+79247301454">
                    <Phone className="w-5 h-5 mr-2" />
                    +7 (924) 730-14-54
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
