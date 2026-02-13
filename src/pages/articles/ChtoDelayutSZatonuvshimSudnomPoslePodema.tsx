import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, Wrench, Recycle, Ship, Anchor, FileText, CheckCircle, Scale } from "lucide-react";
import demolitionImg from "@/assets/images/ship-demolition.jpg";
import salvageImg from "@/assets/images/salvage-crane-operation.jpg";

const options = [
  {
    icon: Wrench,
    title: "Ремонт и восстановление",
    description: "Если повреждения незначительны, судно может быть восстановлено и возвращено в эксплуатацию. Это наиболее экономически выгодный вариант при сохранности основных конструкций.",
    suitable: [
      "Судно находилось на дне непродолжительное время",
      "Корпус не имеет критических повреждений",
      "Двигатель и оборудование подлежат восстановлению",
      "Стоимость ремонта меньше стоимости замены",
    ],
    steps: [
      "Осушение и очистка",
      "Дефектация конструкций и механизмов",
      "Ремонтные работы",
      "Освидетельствование Регистром",
    ],
  },
  {
    icon: Scale,
    title: "Продажа на запчасти",
    description: "Демонтаж работоспособного оборудования и продажа отдельных узлов. Актуально для старых судов, где ремонт нецелесообразен.",
    suitable: [
      "Оборудование в рабочем состоянии",
      "Есть спрос на запчасти данного типа",
      "Корпус не подлежит восстановлению",
      "Судно снято с классификации",
    ],
    steps: [
      "Оценка состояния оборудования",
      "Демонтаж годных узлов",
      "Подготовка к продаже",
      "Утилизация остатков",
    ],
  },
  {
    icon: Recycle,
    title: "Полная утилизация",
    description: "Разборка и переработка судна на металлолом. Применяется, когда восстановление невозможно или экономически нецелесообразно.",
    suitable: [
      "Значительные повреждения корпуса",
      "Длительное нахождение на дне",
      "Морально устаревшее судно",
      "Отсутствие документов и классификации",
    ],
    steps: [
      "Получение разрешения на утилизацию",
      "Демонтаж опасных материалов",
      "Резка на транспортабельные фрагменты",
      "Сдача металла на переработку",
    ],
  },
  {
    icon: Anchor,
    title: "Создание рифа",
    description: "В некоторых случаях судно может быть затоплено в специально отведённом месте для создания искусственного рифа. Требует специальных согласований.",
    suitable: [
      "Судно очищено от загрязняющих веществ",
      "Получено разрешение экологических служб",
      "Выбрано подходящее место",
      "Есть интерес дайв-сообщества",
    ],
    steps: [
      "Очистка от топлива и опасных материалов",
      "Согласование с органами власти",
      "Подготовка к затоплению",
      "Контролируемое затопление",
    ],
  },
];

const factors = [
  {
    factor: "Состояние корпуса",
    description: "Степень повреждений определяет возможность восстановления",
  },
  {
    factor: "Время на дне",
    description: "Чем дольше — тем сильнее коррозия и повреждения",
  },
  {
    factor: "Возраст судна",
    description: "Для старых судов ремонт может быть нецелесообразен",
  },
  {
    factor: "Наличие документов",
    description: "Без документов восстановление классификации затруднено",
  },
  {
    factor: "Рыночная стоимость",
    description: "Сравнение затрат на ремонт и стоимости аналогичного судна",
  },
  {
    factor: "Планы владельца",
    description: "Намерение продолжать эксплуатацию или выйти из бизнеса",
  },
];

export default function ChtoDelayutSZatonuvshimSudnomPoslePodema() {
  return (
    <Layout>
      <SEOHead
        title="Что делают с судном после подъёма — варианты дальнейшей судьбы | Владивосток"
        description="Варианты использования поднятого судна: ремонт, продажа, утилизация, создание рифа. Как выбрать оптимальное решение. Приморский край."
        keywords="поднятое судно что делать, ремонт затонувшего судна, утилизация судна, продажа судна на запчасти"
        canonical="/articles/chto-delayut-s-sudnom-posle-podema"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                После подъёма
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Что делают с судном после подъёма
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                После успешного подъёма затонувшего судна перед владельцем встаёт вопрос о его 
                дальнейшей судьбе. Рассмотрим возможные варианты и критерии выбора.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0 pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={demolitionImg} alt="Разделка и утилизация судна после подъёма" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Options */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Варианты дальнейшей судьбы судна
            </h2>
          </AnimatedSection>
          <div className="space-y-6 max-w-5xl mx-auto">
            {options.map((option, index) => (
              <AnimatedSection key={option.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <option.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{option.title}</h3>
                      <p className="text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                        Когда подходит
                      </h4>
                      <ul className="space-y-2">
                        {option.suitable.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Этапы
                      </h4>
                      <ul className="space-y-2">
                        {option.steps.map((step, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
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
                Факторы выбора решения
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                При принятии решения о дальнейшей судьбе судна учитываются:
              </p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-4">
              {factors.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-1">{item.factor}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image 2 */}
      <section className="py-8">
        <div className="container-custom">
          <AnimatedSection>
            <img src={salvageImg} alt="Судоподъёмные работы" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
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
                Поможем определить оптимальный вариант
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                На основе обследования и оценки состояния судна порекомендуем наиболее выгодное 
                решение и поможем с его реализацией.
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
