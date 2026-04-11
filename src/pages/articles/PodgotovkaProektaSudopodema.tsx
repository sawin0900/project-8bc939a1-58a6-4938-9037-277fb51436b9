import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, FileText, Calculator, Compass, Ship, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import docsImg from "@/assets/images/documentation-blueprints.jpg";
import pontoonImg from "@/assets/images/pontoon-salvage.jpg";

const projectSections = [
  {
    icon: FileText,
    title: "Общая часть",
    items: [
      "Описание объекта и условий работ",
      "Характеристики затонувшего судна",
      "Гидрометеорологические условия",
      "Обоснование выбранного метода подъёма",
    ],
  },
  {
    icon: Calculator,
    title: "Расчётная часть",
    items: [
      "Расчёт грузоподъёмности понтонов",
      "Расчёт прочности стропов и такелажа",
      "Расчёт устойчивости при подъёме",
      "Определение критических нагрузок",
    ],
  },
  {
    icon: Compass,
    title: "Технологическая часть",
    items: [
      "Последовательность операций",
      "Схемы строповки и крепления",
      "Требования к оборудованию",
      "Меры безопасности",
    ],
  },
];

const pprSections = [
  "Организация работ и состав бригады",
  "Размещение оборудования и плавсредств",
  "Порядок выполнения водолазных спусков",
  "Связь и сигнализация",
  "Действия в аварийных ситуациях",
  "Экологические мероприятия",
  "График производства работ",
  "Требования охраны труда",
];

const approvals = [
  {
    authority: "Администрация порта / бассейна ВВП",
    document: "Согласование на проведение работ",
    term: "5-10 дней",
  },
  {
    authority: "Росприроднадзор",
    document: "Заключение об экологической безопасности",
    term: "10-20 дней",
  },
  {
    authority: "МЧС России",
    document: "Уведомление о проведении работ",
    term: "3-5 дней",
  },
  {
    authority: "ГИМС",
    document: "Согласование для маломерных судов",
    term: "3-7 дней",
  },
];

export default function PodgotovkaProektaSudopodema() {
  return (
    <Layout pageClass="page-article">
      <SEOHead
        title="Подготовка проекта судоподъёма — Приказ Минтранса №176 | Владивосток"
        description="Разработка проекта подъёма затонувшего судна по Приказу Минтранса №176: состав, расчёты, согласования. Приморский край."
        keywords="проект судоподъёма, Приказ Минтранса 176, ППР судоподъём, проектирование подъёма судна, согласование судоподъёма"
        canonical="/articles/podgotovka-proekta-sudopodema"
      />

      {/* Hero */}
      <section className="section-padding pt-32 hero relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Проектирование
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Подготовка проекта судоподъёма
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Согласно <strong>Приказу Минтранса России №176</strong>, выполнение судоподъёмных работ 
                на внутренних водных путях требует разработки проекта подъёма. Разберём его состав 
                и порядок согласования.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0 pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={docsImg} alt="Проектная документация судоподъёма" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Project Sections */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Состав проекта подъёма
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projectSections.map((section, index) => (
              <AnimatedSection key={section.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <section.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PPR */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                План производства работ (ППР)
              </h2>
              <p className="text-muted-foreground mb-8">
                ППР — обязательный документ, детализирующий организацию и безопасность работ:
              </p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-3">
              {pprSections.map((section, index) => (
                <AnimatedSection key={index} delay={index * 0.03}>
                  <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm text-foreground">{section}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approvals */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Согласования проекта
              </h2>
              <p className="text-muted-foreground mb-8">
                Перед началом работ проект подлежит согласованию с контролирующими органами:
              </p>
            </AnimatedSection>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 font-semibold text-foreground">Орган</th>
                    <th className="text-left p-4 font-semibold text-foreground">Документ</th>
                    <th className="text-left p-4 font-semibold text-foreground">Срок</th>
                  </tr>
                </thead>
                <tbody>
                  {approvals.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 text-foreground">{item.authority}</td>
                      <td className="p-4 text-muted-foreground">{item.document}</td>
                      <td className="p-4 text-muted-foreground">{item.term}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
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
                    <h2 className="text-2xl font-bold text-foreground mb-4">Сроки подготовки</h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Разработка проекта:</strong> 5-15 рабочих дней 
                        в зависимости от сложности объекта.
                      </p>
                      <p>
                        <strong className="text-foreground">Согласования:</strong> от 2 до 4 недель 
                        в зависимости от количества инстанций.
                      </p>
                      <p>
                        <strong className="text-foreground">Общий срок:</strong> от 3 до 6 недель 
                        до начала полевых работ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Важно</h3>
                    <p className="text-muted-foreground">
                      Выполнение судоподъёмных работ без утверждённого проекта является нарушением 
                      законодательства и может повлечь административную ответственность. Качество 
                      проектной документации напрямую влияет на безопасность и успех операции.
                    </p>
                  </div>
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
            <img src={pontoonImg} alt="Понтонные работы" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <Ship className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Разработаем проект под ключ
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Выполняем полный цикл проектирования: от обследования до получения всех согласований. 
                Опыт работы с контролирующими органами Приморья.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">
                    Заказать проект
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
