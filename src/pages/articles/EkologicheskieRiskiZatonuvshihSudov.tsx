import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, AlertTriangle, Droplets, Fish, Leaf, Shield, FileText, Ship } from "lucide-react";
import sunkenShipImg from "@/assets/images/sunken-ship-ecological.jpg";
import diverImg from "@/assets/images/diver-underwater-inspection.jpg";

const risks = [
  {
    icon: Droplets,
    title: "Разлив нефтепродуктов",
    description: "Топливо, масла, смазочные материалы — основная угроза для акватории. Даже небольшое судно может содержать сотни литров горючего.",
    impact: "Загрязнение поверхности воды, гибель птиц и морских млекопитающих, ущерб рыболовству.",
    prevention: "Откачка топлива перед подъёмом, установка боновых заграждений, готовность сорбентов.",
  },
  {
    icon: Fish,
    title: "Гибель морской фауны",
    description: "Затонувшие суда могут выделять токсичные вещества: антикоррозийные покрытия, краски, химические грузы.",
    impact: "Отравление рыбы, ракообразных, повреждение нерестилищ, нарушение пищевых цепочек.",
    prevention: "Водолазное обследование, оценка груза, разработка мер по локализации загрязнения.",
  },
  {
    icon: Leaf,
    title: "Повреждение экосистем дна",
    description: "Корпус судна может разрушать донные биоценозы, перекрывать миграционные пути, создавать зоны замора.",
    impact: "Гибель бентосных организмов, изменение рельефа дна, заиливание.",
    prevention: "Минимизация воздействия при подъёме, выбор щадящих методов работы.",
  },
];

const regulations = [
  {
    title: "Федеральный закон №7-ФЗ",
    description: "«Об охране окружающей среды» — устанавливает общие требования к предотвращению загрязнения.",
  },
  {
    title: "Водный кодекс РФ",
    description: "Регулирует использование и охрану водных объектов, включая акватории морей и рек.",
  },
  {
    title: "КоАП РФ, статья 8.13",
    description: "Предусматривает штрафы за нарушение правил охраны водных объектов.",
  },
  {
    title: "Уголовный кодекс РФ, статья 250",
    description: "Уголовная ответственность за загрязнение вод, повлёкшее существенный вред.",
  },
];

const measures = [
  {
    icon: Shield,
    title: "Боновые заграждения",
    description: "Установка плавучих боновых заграждений вокруг места работ для локализации возможного разлива нефтепродуктов.",
  },
  {
    icon: Droplets,
    title: "Откачка топлива",
    description: "Предварительная откачка топлива, масел и других жидкостей из затонувшего судна перед началом подъёма.",
  },
  {
    icon: FileText,
    title: "Экологический мониторинг",
    description: "Отбор проб воды и грунта до, во время и после работ для контроля уровня загрязнения.",
  },
];

export default function EkologicheskieRiskiZatonuvshihSudov() {
  return (
    <Layout pageClass="page-article">
      <SEOHead
        title="Экологические риски затонувших судов — охрана среды | Владивосток"
        description="Экологические угрозы затонувших судов: разливы нефтепродуктов, гибель фауны, загрязнение. Меры предотвращения и законодательство РФ. Приморский край."
        keywords="экология судоподъём, разлив нефтепродуктов судно, экологические риски затонувшие суда, охрана окружающей среды судоподъём"
        canonical="/articles/ekologicheskie-riski-zatonuvshih-sudov"
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-green-500/5 to-background hero relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
                Экология
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Экологические риски затонувших судов
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Затонувшие суда представляют серьёзную угрозу для морских экосистем. Разберём основные 
                экологические риски и меры их минимизации при проведении судоподъёмных работ.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={sunkenShipImg} alt="Затонувшее судно — экологическая угроза" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Risks */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Основные экологические угрозы
            </h2>
          </AnimatedSection>
          <div className="space-y-6 max-w-5xl mx-auto">
            {risks.map((risk, index) => (
              <AnimatedSection key={risk.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                      <risk.icon className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{risk.title}</h3>
                      <p className="text-muted-foreground mb-4">{risk.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-destructive/5 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-destructive mb-2">Последствия</h4>
                          <p className="text-sm text-muted-foreground">{risk.impact}</p>
                        </div>
                        <div className="bg-primary/5 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-primary mb-2">Меры предотвращения</h4>
                          <p className="text-sm text-muted-foreground">{risk.prevention}</p>
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

      {/* Image 2 */}
      <section className="py-8">
        <div className="container-custom">
          <AnimatedSection>
            <img src={diverImg} alt="Водолазное обследование затонувшего объекта" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Measures */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Меры экологической безопасности при судоподъёме
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {measures.map((measure, index) => (
              <AnimatedSection key={measure.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <measure.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{measure.title}</h3>
                  <p className="text-sm text-muted-foreground">{measure.description}</p>
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
                Законодательство об охране окружающей среды
              </h2>
              <p className="text-muted-foreground mb-8">
                За нарушение экологических требований при судоподъёме предусмотрена административная 
                и уголовная ответственность:
              </p>
            </AnimatedSection>
            <div className="space-y-4">
              {regulations.map((reg, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">{reg.title}</h4>
                      <p className="text-sm text-muted-foreground">{reg.description}</p>
                    </div>
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
                Экологически безопасный судоподъём
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Мы выполняем работы с соблюдением всех экологических норм и требований. 
                Гарантируем минимизацию воздействия на окружающую среду.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">
                    Заказать консультацию
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
