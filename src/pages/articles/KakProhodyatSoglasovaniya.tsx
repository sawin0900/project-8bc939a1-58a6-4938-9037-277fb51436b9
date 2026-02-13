import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, FileText, Building2, Shield, CheckCircle, Clock, Users, Leaf, Ship, AlertTriangle } from "lucide-react";
import docsImg from "@/assets/images/documentation-blueprints.jpg";
import portImg from "@/assets/images/vladivostok-port.jpg";

const agencies = [
  {
    icon: Building2,
    name: "Росморречфлот",
    fullName: "Федеральное агентство морского и речного транспорта",
    description: "Согласование проекта подъёма судна на внутренних водных путях. Выдаёт разрешение на проведение работ в соответствии с Приказом Минтранса №176.",
    documents: ["Проект подъёма судна", "ППР", "Технический отчёт обследования"],
    timeline: "10-30 рабочих дней",
  },
  {
    icon: Shield,
    name: "МЧС России",
    fullName: "Министерство по чрезвычайным ситуациям",
    description: "Согласование при наличии опасных грузов на затонувшем судне, взрывоопасных материалов или при работах вблизи опасных объектов.",
    documents: ["План ликвидации аварийных ситуаций", "Сведения о грузе судна"],
    timeline: "10-20 рабочих дней",
  },
  {
    icon: Leaf,
    name: "Росприроднадзор",
    fullName: "Федеральная служба по надзору в сфере природопользования",
    description: "Экологическая экспертиза при риске загрязнения акватории нефтепродуктами или иными опасными веществами.",
    documents: ["ОВОС", "Экологическое заключение", "План природоохранных мероприятий"],
    timeline: "20-45 рабочих дней",
  },
  {
    icon: Building2,
    name: "Капитания порта",
    fullName: "Администрация морского или речного порта",
    description: "Согласование работ в акватории порта, определение сроков проведения работ, координация с портовыми службами.",
    documents: ["Заявка на проведение работ", "График производства работ"],
    timeline: "5-15 рабочих дней",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Подготовка документации",
    description: "Разработка проекта подъёма судна, ППР, технического отчёта водолазного обследования. Формирование полного пакета документов.",
    duration: "2-4 недели",
  },
  {
    step: 2,
    title: "Подача в Росморречфлот",
    description: "Направление проекта подъёма на рассмотрение в территориальный орган Росморречфлота. Получение замечаний или согласования.",
    duration: "2-4 недели",
  },
  {
    step: 3,
    title: "Экологические согласования",
    description: "При необходимости — получение заключения Росприроднадзора, разработка ОВОС, согласование природоохранных мероприятий.",
    duration: "3-6 недель",
  },
  {
    step: 4,
    title: "Согласование с портом",
    description: "Координация с администрацией порта или бассейна ВВП, определение сроков и условий проведения работ.",
    duration: "1-2 недели",
  },
  {
    step: 5,
    title: "Получение разрешения на работы",
    description: "Получение итогового разрешения на проведение судоподъёмных работ от уполномоченного органа.",
    duration: "1 неделя",
  },
];

const commonIssues = [
  {
    issue: "Неполный пакет документов",
    solution: "Тщательная проверка комплектности перед подачей, использование чек-листов",
  },
  {
    issue: "Ошибки в инженерных расчётах",
    solution: "Привлечение квалифицированных инженеров с опытом судоподъёмных работ",
  },
  {
    issue: "Несоответствие нормативам",
    solution: "Изучение актуальной редакции Приказа №176 и других НПА перед разработкой",
  },
  {
    issue: "Отсутствие экологического обоснования",
    solution: "Проведение оценки экологических рисков на этапе обследования",
  },
];

export default function KakProhodyatSoglasovaniya() {
  return (
    <Layout>
      <SEOHead
        title="Как проходят согласования судоподъёма — полный гид по инстанциям"
        description="Пошаговый процесс согласования судоподъёмных работ: Росморречфлот, МЧС, Росприроднадзор, капитания порта. Сроки, документы, типичные ошибки и как их избежать."
        keywords="согласование судоподъёма, Росморречфлот согласование, разрешение на подъём судна, Приказ Минтранса 176, экологическое согласование"
        canonical="/articles/kak-prohodyat-soglasovaniya"
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Согласования
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Как проходят согласования судоподъёмных работ
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Подробный гид по процессу согласования судоподъёмных работ: какие инстанции нужно пройти, 
                какие документы подготовить, и сколько времени занимает каждый этап.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={docsImg} alt="Документы для согласования" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Agencies */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Какие органы согласовывают судоподъём
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              В зависимости от места затопления и характера работ требуется согласование с различными государственными органами
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {agencies.map((agency, index) => (
              <AnimatedSection key={agency.name} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <agency.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{agency.name}</h3>
                      <p className="text-sm text-muted-foreground">{agency.fullName}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{agency.description}</p>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-foreground">Необходимые документы:</span>
                      <ul className="mt-1 space-y-1">
                        {agency.documents.map((doc, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <FileText className="w-3 h-3 text-primary" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-3 h-3 text-primary" />
                      <span className="text-muted-foreground">Срок рассмотрения: {agency.timeline}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Этапы прохождения согласований
            </h2>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.step} delay={index * 0.1}>
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                      {step.step}
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Типичные причины отказов и как их избежать
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-4">
              {commonIssues.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-card border border-border rounded-xl p-5 h-full">
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                      <span className="font-medium text-foreground">{item.issue}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{item.solution}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Summary */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Общие сроки согласований
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">От 4 до 12 недель</h3>
                    <p className="text-muted-foreground">
                      Типичный срок прохождения всех согласований при наличии полного пакета документов
                    </p>
                  </div>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Минимальный срок (4-6 недель):</strong> простые проекты 
                    без экологических рисков, работы в несудоходных акваториях.
                  </p>
                  <p>
                    <strong className="text-foreground">Стандартный срок (6-8 недель):</strong> типовые 
                    судоподъёмные работы в портовых акваториях.
                  </p>
                  <p>
                    <strong className="text-foreground">Расширенный срок (8-12 недель):</strong> сложные проекты 
                    с экологической экспертизой, опасными грузами или особыми условиями.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Image 2 */}
      <section className="py-8">
        <div className="container-custom">
          <AnimatedSection>
            <img src={portImg} alt="Порт Владивостока" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <Users className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Поможем с согласованиями
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Мы берём на себя полное сопровождение согласований во всех инстанциях. 
                Экономьте время и избегайте отказов.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">
                    Получить консультацию
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/documentation">Подробнее о документации</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
