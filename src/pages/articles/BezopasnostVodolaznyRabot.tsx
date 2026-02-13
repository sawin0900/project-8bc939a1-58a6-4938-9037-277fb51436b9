import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, Shield, Users, Radio, Heart, Ship, CheckCircle, AlertTriangle, Thermometer } from "lucide-react";
import divingTeamImg from "@/assets/images/diving-team-equipment.jpg";
import diverImg from "@/assets/images/diver-underwater-inspection.jpg";

const safetyRules = [
  {
    icon: Users,
    title: "Состав водолазной станции",
    description: "Минимальный состав для выполнения работ — 3 человека: работающий водолаз, страхующий водолаз, обеспечивающий (командир спуска).",
    requirements: [
      "Наличие действующих водолазных книжек",
      "Медицинский допуск к погружениям",
      "Прохождение ежегодной переподготовки",
      "Знание сигналов и команд",
    ],
  },
  {
    icon: Radio,
    title: "Связь и сигнализация",
    description: "Обязательна двусторонняя связь с работающим водолазом. При её отсутствии — сигнальный конец и условные сигналы.",
    requirements: [
      "Проверка связи перед каждым спуском",
      "Дублирование голосовой связи сигналами",
      "Знание аварийных сигналов всеми членами",
      "Запасные средства связи",
    ],
  },
  {
    icon: Heart,
    title: "Медицинское обеспечение",
    description: "На месте работ должны быть средства оказания первой помощи и возможность экстренной эвакуации.",
    requirements: [
      "Аптечка первой помощи",
      "Кислородный ингалятор",
      "Связь со скорой помощью",
      "Барокамера в доступности (при глубоководных работах)",
    ],
  },
  {
    icon: Thermometer,
    title: "Контроль условий погружения",
    description: "Перед спуском оцениваются температура воды, видимость, течение, состояние грунта и возможные опасности.",
    requirements: [
      "Замер температуры воды",
      "Оценка видимости",
      "Измерение скорости течения",
      "Осмотр места спуска",
    ],
  },
];

const risks = [
  {
    risk: "Декомпрессионная болезнь",
    prevention: "Соблюдение режимов декомпрессии, контроль времени и глубины, отдых между погружениями",
  },
  {
    risk: "Баротравма",
    prevention: "Плавные спуски и подъёмы, контроль дыхания, проверка оборудования",
  },
  {
    risk: "Переохлаждение",
    prevention: "Использование гидрокостюмов, ограничение времени под водой, согревание после спуска",
  },
  {
    risk: "Запутывание в конструкциях",
    prevention: "Обследование объекта, использование ножа, страхующий трос, световые маркеры",
  },
  {
    risk: "Потеря ориентации",
    prevention: "Сигнальный конец, освещение, предварительное изучение объекта",
  },
  {
    risk: "Отказ оборудования",
    prevention: "Проверка перед спуском, запасное оборудование, страхующий водолаз",
  },
];

const regulations = [
  "Правила по охране труда при проведении водолазных работ (Приказ Минтруда №269н)",
  "Межотраслевые правила по охране труда при эксплуатации водолазных станций",
  "Правила водолазной службы ВМФ (для специализированных работ)",
  "Инструкции по безопасности предприятия",
];

export default function BezopasnostVodolaznyRabot() {
  return (
    <Layout>
      <SEOHead
        title="Безопасность водолазных работ — правила и требования | Владивосток"
        description="Безопасность при водолазных работах: состав станции, связь, медицинское обеспечение, риски. Нормативные требования. Приморский край."
        keywords="безопасность водолазных работ, правила водолазных работ, охрана труда водолазы, требования к водолазным работам"
        canonical="/articles/bezopasnost-vodolaznyh-rabot"
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-destructive/5 to-background">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
                Безопасность
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Безопасность водолазных работ
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Водолазные работы относятся к работам повышенной опасности. Соблюдение правил 
                безопасности — обязательное условие для допуска к выполнению судоподъёмных операций.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0 pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={divingTeamImg} alt="Водолазная бригада" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Safety Rules */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Основные требования безопасности
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {safetyRules.map((rule, index) => (
              <AnimatedSection key={rule.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <rule.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{rule.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{rule.description}</p>
                  <ul className="space-y-2">
                    {rule.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Risks */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Риски и меры предотвращения
            </h2>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto space-y-4">
            {risks.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{item.risk}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Предотвращение:</strong> {item.prevention}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Нормативная база
              </h2>
              <p className="text-muted-foreground mb-8">
                Безопасность водолазных работ регламентируется следующими документами:
              </p>
            </AnimatedSection>
            <div className="space-y-3">
              {regulations.map((reg, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{reg}</span>
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
            <img src={diverImg} alt="Водолаз под водой" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
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
                Безопасность — наш приоритет
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Все наши водолазы имеют необходимые допуски и проходят регулярную переподготовку. 
                Работы выполняются в строгом соответствии с требованиями охраны труда.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">
                    Заказать работы
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
