import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, Calculator, Ship, Ruler, Clock, MapPin, Wrench, FileText, CheckCircle } from "lucide-react";
import salvageImg from "@/assets/images/salvage-crane-operation.jpg";
import pontoonImg from "@/assets/images/pontoon-salvage.jpg";

const factors = [
  {
    icon: Ship,
    title: "Размеры и водоизмещение судна",
    description: "Чем больше судно, тем больше требуется оборудования, понтонов, рабочей силы. Водоизмещение напрямую влияет на сложность и продолжительность работ.",
    impact: "высокий",
  },
  {
    icon: Ruler,
    title: "Глубина залегания",
    description: "Работы на глубине требуют специализированного водолазного оборудования и обученного персонала. Декомпрессионные режимы увеличивают время работ.",
    impact: "высокий",
  },
  {
    icon: MapPin,
    title: "Удалённость от базы",
    description: "Доставка оборудования и персонала, мобилизация плавсредств — значительная часть затрат для удалённых объектов.",
    impact: "средний",
  },
  {
    icon: Wrench,
    title: "Состояние судна",
    description: "Степень повреждения корпуса определяет выбор метода подъёма. Разрушенное судно может потребовать поэтапной разборки.",
    impact: "высокий",
  },
  {
    icon: Clock,
    title: "Сроки выполнения",
    description: "Экстренные работы с сжатыми сроками требуют мобилизации дополнительных ресурсов и могут стоить дороже плановых.",
    impact: "средний",
  },
  {
    icon: FileText,
    title: "Объём согласований",
    description: "Наличие экологических ограничений, работа в охраняемых акваториях увеличивают затраты на проектирование и согласования.",
    impact: "средний",
  },
];

const stages = [
  {
    name: "Водолазное обследование",
    range: "от 150 000 ₽",
    includes: ["Оценка состояния судна", "Фото/видеофиксация", "Замеры и схемы", "Акт обследования"],
  },
  {
    name: "Проектирование",
    range: "от 200 000 ₽",
    includes: ["Проект подъёма по Приказу №176", "Расчёты нагрузок", "План производства работ", "Согласования"],
  },
  {
    name: "Судоподъём",
    range: "от 500 000 ₽",
    includes: ["Мобилизация оборудования", "Подготовительные работы", "Подъём судна", "Транспортировка"],
  },
  {
    name: "Утилизация",
    range: "от 300 000 ₽",
    includes: ["Демонтаж конструкций", "Резка металла", "Вывоз и переработка", "Документы на утилизацию"],
  },
];

const tips = [
  "Обращайтесь сразу после затопления — чем дольше судно на дне, тем сложнее и дороже подъём",
  "Предоставьте всю имеющуюся документацию на судно — это ускорит проектирование",
  "Рассмотрите вариант утилизации на месте — может быть дешевле транспортировки",
  "Уточните условия страхования — возможно возмещение части затрат",
  "Запросите несколько коммерческих предложений для сравнения",
];

export default function StoimostSudopodemnyRabot() {
  return (
    <Layout pageClass="page-article">
      <SEOHead
        title="Стоимость судоподъёмных работ — ценообразование | Владивосток"
        description="Из чего складывается стоимость подъёма затонувшего судна: факторы ценообразования, этапы работ, ориентировочные цены. Приморский край."
        keywords="стоимость судоподъёма, цена подъём затонувшего судна, расчёт стоимости судоподъёма, судоподъёмные работы цена Владивосток"
        canonical="/articles/stoimost-sudopodemnyx-rabot"
      />

      {/* Hero */}
      <section className="section-padding pt-32 hero relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Ценообразование
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Из чего складывается стоимость судоподъёмных работ
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Стоимость подъёма затонувшего судна зависит от множества факторов. Разберём, 
                что влияет на цену и как оптимизировать затраты.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0 pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={salvageImg} alt="Судоподъёмная операция" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Factors */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Факторы, влияющие на стоимость
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {factors.map((factor, index) => (
              <AnimatedSection key={factor.title} delay={index * 0.05}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <factor.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      factor.impact === 'высокий' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-600'
                    }`}>
                      {factor.impact} влияние
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{factor.title}</h3>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Image 2 */}
      <section className="py-8">
        <div className="container-custom">
          <AnimatedSection>
            <img src={pontoonImg} alt="Понтоны для подъёма судна" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Stages Pricing */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Ориентировочная стоимость этапов
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Цены указаны для судов малого и среднего тоннажа. Точная стоимость определяется 
              после обследования объекта.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stages.map((stage, index) => (
              <AnimatedSection key={stage.name} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{stage.name}</h3>
                  <div className="text-2xl font-bold text-primary mb-4">{stage.range}</div>
                  <ul className="space-y-2">
                    {stage.includes.map((item, i) => (
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

      {/* Tips */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Как оптимизировать затраты
              </h2>
            </AnimatedSection>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <Calculator className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-foreground">{tip}</p>
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
                Рассчитать стоимость подъёма
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Оставьте заявку — мы проведём предварительную оценку и подготовим коммерческое 
                предложение с детализацией стоимости.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">
                    Получить расчёт
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
