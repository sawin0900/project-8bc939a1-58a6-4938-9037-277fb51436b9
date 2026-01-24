import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, Anchor, Ship, Waves, Box, Settings, CheckCircle } from "lucide-react";

const methods = [
  {
    icon: Box,
    title: "Понтонный метод",
    description: "Подъём с использованием понтонов — наиболее распространённый способ для судов среднего тоннажа. Понтоны крепятся к корпусу затонувшего судна и заполняются воздухом.",
    advantages: [
      "Подходит для глубин до 40 метров",
      "Возможность подъёма судов до 5000 тонн",
      "Минимальное воздействие на корпус судна",
      "Контролируемый процесс всплытия",
    ],
    limitations: [
      "Требует хорошей видимости под водой",
      "Зависит от погодных условий",
    ],
  },
  {
    icon: Anchor,
    title: "Крановый метод",
    description: "Подъём плавучими кранами — применяется для небольших судов и объектов с известным положением. Обеспечивает точный контроль на всех этапах.",
    advantages: [
      "Высокая точность позиционирования",
      "Быстрота выполнения работ",
      "Подходит для повреждённых судов",
      "Независимость от состояния корпуса",
    ],
    limitations: [
      "Ограничение по грузоподъёмности крана",
      "Требует глубоководного причала",
    ],
  },
  {
    icon: Waves,
    title: "Комбинированный метод",
    description: "Сочетание понтонного и кранового методов — используется для сложных объектов. Позволяет адаптировать технологию под конкретные условия.",
    advantages: [
      "Гибкость в выборе технологии",
      "Повышенная надёжность операции",
      "Подходит для нестандартных случаев",
      "Снижение рисков аварийных ситуаций",
    ],
    limitations: [
      "Более высокая стоимость",
      "Требует опытной команды",
    ],
  },
  {
    icon: Settings,
    title: "Метод герметизации",
    description: "Восстановление герметичности корпуса с последующей откачкой воды — применяется для судов с незначительными повреждениями.",
    advantages: [
      "Сохранение целостности судна",
      "Возможность восстановления после подъёма",
      "Экономически выгодный при небольших повреждениях",
      "Минимальный риск для экологии",
    ],
    limitations: [
      "Не подходит для сильно повреждённых судов",
      "Требует времени на подготовку",
    ],
  },
];

const factors = [
  "Глубина залегания затонувшего судна",
  "Водоизмещение и габариты объекта",
  "Степень повреждения корпуса",
  "Наличие груза и опасных веществ",
  "Гидрологические условия района",
  "Тип грунта и течения",
  "Требования заказчика к срокам",
  "Дальнейшая судьба судна (утилизация или восстановление)",
];

export default function MetodyPodemaZatonuvshihSudov() {
  return (
    <Layout>
      <SEOHead
        title="Методы подъёма затонувших судов — технологии судоподъёма | Владивосток"
        description="Обзор методов подъёма затонувших судов: понтонный, крановый, комбинированный, герметизация. Выбор оптимальной технологии для Приморского края."
        keywords="методы подъёма судов, понтонный подъём судна, крановый подъём судна, технология судоподъёма, подъём затонувших судов Владивосток"
        canonical="/articles/metody-podema-zatonuvshih-sudov"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Технологии
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Методы подъёма затонувших судов: обзор технологий
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Выбор метода судоподъёма зависит от множества факторов: глубины, состояния судна, 
                гидрологических условий. Разберём основные технологии и их применение в акватории 
                Приморского края.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Methods */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="space-y-8 max-w-5xl mx-auto">
            {methods.map((method, index) => (
              <AnimatedSection key={method.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <method.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground mb-3">{method.title}</h2>
                      <p className="text-muted-foreground mb-6">{method.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                            Преимущества
                          </h3>
                          <ul className="space-y-2">
                            {method.advantages.map((adv, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                {adv}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                            Ограничения
                          </h3>
                          <ul className="space-y-2">
                            {method.limitations.map((lim, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0 mt-2" />
                                {lim}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Factors */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Факторы выбора метода подъёма
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                При проектировании судоподъёмной операции учитываются следующие параметры:
              </p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-4">
              {factors.map((factor, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{factor}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
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
                Нужна консультация по методу подъёма?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Наши инженеры проведут оценку ситуации и предложат оптимальное техническое решение 
                для подъёма вашего судна.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">
                    Получить консультацию
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
