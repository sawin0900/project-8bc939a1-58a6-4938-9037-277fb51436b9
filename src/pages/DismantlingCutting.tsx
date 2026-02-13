import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead, Breadcrumbs, ServiceSchema } from "@/components/seo";
import { 
  Scissors, 
  Flame, 
  Anchor, 
  CheckCircle, 
  Shield, 
  Clock, 
  Wrench,
  Ship,
  Factory,
  Building,
  HardHat,
  Zap
} from "lucide-react";
import metalCuttingImg from "@/assets/images/metal-cutting-sparks.jpg";
import underwaterCuttingImg from "@/assets/images/underwater-cutting.jpg";
import shipDemolitionImg from "@/assets/images/ship-demolition.jpg";

const cuttingMethods = [
  {
    icon: Flame,
    title: "Газовая резка",
    description: "Кислородно-пропановая и кислородно-ацетиленовая резка металла толщиной до 300 мм. Применяется для работ на открытом воздухе и в вентилируемых помещениях.",
    specs: ["Толщина до 300 мм", "Углеродистые стали", "Высокая производительность"]
  },
  {
    icon: Zap,
    title: "Плазменная резка",
    description: "Высокоточная резка металлов любой толщины с минимальной зоной термического воздействия. Идеально для нержавеющей стали и цветных металлов.",
    specs: ["Любые металлы", "Высокая точность", "Минимальные деформации"]
  },
  {
    icon: Scissors,
    title: "Механическая резка",
    description: "Гидравлические ножницы и резаки для быстрого демонтажа конструкций без применения огневых работ в пожароопасных зонах.",
    specs: ["Без огневых работ", "Пожаробезопасность", "Быстрый демонтаж"]
  },
  {
    icon: Wrench,
    title: "Подводная резка",
    description: "Специализированная резка под водой кислородно-дуговым и электрокислородным методами. Сертифицированные водолазы-резчики.",
    specs: ["Глубина до 60 м", "Сертифицированные водолазы", "Любые конструкции"]
  }
];

const dismantlingObjects = [
  {
    icon: Ship,
    title: "Затонувшие суда",
    description: "Полный цикл работ по демонтажу и утилизации затонувших судов любого водоизмещения. Подъём, разделка на секции, вывоз металлолома."
  },
  {
    icon: Anchor,
    title: "Гидротехнические сооружения",
    description: "Демонтаж причалов, пирсов, шпунтовых стенок, дамб. Работы в акваториях портов и на открытой воде."
  },
  {
    icon: Factory,
    title: "Промышленные объекты",
    description: "Резка и демонтаж трубопроводов, резервуаров, металлоконструкций на нефтегазовых объектах и промышленных предприятиях."
  },
  {
    icon: Building,
    title: "Мостовые конструкции",
    description: "Демонтаж стальных пролётных строений, опор и элементов мостов. Работы над водой и на суше."
  }
];

const advantages = [
  {
    icon: Shield,
    title: "Безопасность",
    description: "Строгое соблюдение требований охраны труда и пожарной безопасности. Все работники аттестованы."
  },
  {
    icon: HardHat,
    title: "Опытные специалисты",
    description: "Резчики и демонтажники с опытом работы от 10 лет. Водолазы 1-3 группы специализации."
  },
  {
    icon: Clock,
    title: "Оперативность",
    description: "Выезд на объект в течение 24 часов. Круглосуточная работа при необходимости срочного демонтажа."
  },
  {
    icon: CheckCircle,
    title: "Комплексный подход",
    description: "От обследования до вывоза и утилизации. Оформление всей разрешительной документации."
  }
];

const workStages = [
  {
    step: 1,
    title: "Обследование объекта",
    description: "Выезд на объект, оценка объёма работ, определение методов демонтажа и резки. Составление технического задания."
  },
  {
    step: 2,
    title: "Проектирование",
    description: "Разработка проекта производства работ (ППР), согласование с надзорными органами при необходимости."
  },
  {
    step: 3,
    title: "Подготовительные работы",
    description: "Организация строительной площадки, подвод коммуникаций, установка ограждений и знаков безопасности."
  },
  {
    step: 4,
    title: "Демонтаж и резка",
    description: "Поэтапный демонтаж конструкций с применением оптимальных методов резки. Контроль качества на каждом этапе."
  },
  {
    step: 5,
    title: "Вывоз и утилизация",
    description: "Погрузка и транспортировка металлолома, оформление актов на утилизацию, рекультивация территории."
  }
];

export default function DismantlingCutting() {
  return (
    <Layout>
      <SEOHead
        title="Демонтаж и резка металлоконструкций | Подводная резка"
        description="Демонтаж затонувших судов, подводная и надводная резка металла. Газовая, плазменная, механическая резка. Работаем в Приморском крае."
        keywords="демонтаж судов, подводная резка, резка металлоконструкций, газовая резка, плазменная резка, утилизация судов"
        canonical="/services/dismantling-cutting"
      />
      <ServiceSchema
        name="Демонтаж и резка металлоконструкций"
        description="Профессиональный демонтаж затонувших судов, подводная и надводная резка металла всеми методами"
        url="/services/dismantling-cutting"
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-cover bg-center" />
        <div className="container-custom relative z-10">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Специализированные услуги
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Демонтаж и резка <span className="text-primary">металлоконструкций</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Профессиональный демонтаж затонувших судов, гидротехнических сооружений и промышленных объектов. 
                Все виды резки металла на суше и под водой.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">Заказать услугу</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+79991234567">Получить консультацию</a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Images Gallery */}
      <section className="py-8">
        <div className="container-custom">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src={metalCuttingImg} alt="Газовая резка металла" className="w-full h-48 object-cover rounded-xl shadow-lg" />
              <img src={underwaterCuttingImg} alt="Подводная резка" className="w-full h-48 object-cover rounded-xl shadow-lg" />
              <img src={shipDemolitionImg} alt="Демонтаж судна" className="w-full h-48 object-cover rounded-xl shadow-lg" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Cutting Methods */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Технологии"
              title="Методы резки металла"
              description="Применяем современное оборудование и проверенные технологии для резки металлоконструкций любой сложности"
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {cuttingMethods.map((method, index) => (
              <AnimatedSection key={method.title} delay={index * 0.1}>
                <div className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <method.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{method.title}</h3>
                      <p className="text-muted-foreground mb-4">{method.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {method.specs.map((spec) => (
                          <span key={spec} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Objects for Dismantling */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Объекты"
              title="Что мы демонтируем"
              description="Выполняем демонтаж объектов любой сложности — от небольших конструкций до крупнотоннажных судов"
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {dismantlingObjects.map((obj, index) => (
              <AnimatedSection key={obj.title} delay={index * 0.1}>
                <div className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <obj.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{obj.title}</h3>
                  <p className="text-muted-foreground">{obj.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Work Stages */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Процесс"
              title="Этапы выполнения работ"
              description="Чёткая последовательность действий обеспечивает качество и безопасность на каждом этапе"
            />
          </AnimatedSection>

          <div className="mt-12 max-w-4xl mx-auto">
            {workStages.map((stage, index) => (
              <AnimatedSection key={stage.step} delay={index * 0.1}>
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
                      {stage.step}
                    </div>
                    {index < workStages.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{stage.title}</h3>
                    <p className="text-muted-foreground">{stage.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Преимущества"
              title="Почему выбирают нас"
              description="Гарантируем профессиональный подход и качественный результат"
            />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {advantages.map((advantage, index) => (
              <AnimatedSection key={advantage.title} delay={index * 0.1}>
                <div className="text-center p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground text-sm">{advantage.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Нужен демонтаж или резка?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Оставьте заявку, и наш специалист свяжется с вами в течение 30 минут для обсуждения деталей проекта
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">Оставить заявку</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/projects">Смотреть проекты</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
