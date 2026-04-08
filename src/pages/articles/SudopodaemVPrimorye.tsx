import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, MapPin, Anchor, Ship, Waves, Wind, Thermometer, CheckCircle } from "lucide-react";
import portImg from "@/assets/images/vladivostok-port.jpg";
import salvageImg from "@/assets/images/salvage-crane-operation.jpg";

const ports = [
  {
    name: "Владивосток",
    description: "Крупнейший порт Дальнего Востока. Сложная навигационная обстановка, интенсивное судоходство, экологически чувствительные зоны.",
    features: ["Глубины до 30 м в акватории порта", "Сильные течения в проливах", "Ледовый период до 3 месяцев"],
  },
  {
    name: "Находка",
    description: "Важный транспортный узел. Открытая акватория, подверженная штормам. Особые требования к срокам работ.",
    features: ["Открытые рейды", "Волнение до 5-6 баллов", "Интенсивный грузопоток"],
  },
  {
    name: "Восточный",
    description: "Крупнейший контейнерный порт России. Высокие требования к безопасности судоходства.",
    features: ["Глубоководные причалы", "Постоянное движение судов", "Экологический контроль"],
  },
  {
    name: "Большой Камень",
    description: "Судостроительные мощности, ремонтные предприятия. Специфика работ в закрытых акваториях.",
    features: ["Мелководные участки", "Судоремонтные зоны", "Ограниченные габариты"],
  },
];

const challenges = [
  {
    icon: Wind,
    title: "Сложные погодные условия",
    description: "Тайфуны, штормы, резкие изменения погоды — всё это влияет на планирование и безопасность работ. Мы учитываем метеорологические факторы при составлении графика.",
  },
  {
    icon: Thermometer,
    title: "Ледовый период",
    description: "Зимой акватории частично замерзают. Работы в ледовых условиях требуют специального оборудования и методов.",
  },
  {
    icon: Waves,
    title: "Сильные течения",
    description: "В проливах и бухтах Приморья течения достигают 2-3 узлов. Это усложняет водолазные работы и требует особых мер безопасности.",
  },
  {
    icon: Anchor,
    title: "Сложный рельеф дна",
    description: "Скальные выходы, резкие перепады глубин, заиленные участки — всё это влияет на выбор метода подъёма.",
  },
];

const advantages = [
  "Знание местных условий и особенностей акваторий",
  "Наличие базы и оборудования во Владивостоке",
  "Оперативный выезд в любую точку Приморья",
  "Опыт согласований с местными органами власти",
  "Сотрудничество с портовыми администрациями",
  "Работа в любых погодных условиях",
];

export default function SudopodaemVPrimorye() {
  return (
    <Layout>
      <SEOHead
        title="Судоподъём в Приморском крае — особенности региона | Владивосток"
        description="Особенности судоподъёмных работ в Приморье: порты Владивостока, Находки, Восточного. Региональная специфика, климат, требования. Местная компания."
        keywords="судоподъём Приморский край, подъём судна Владивосток, судоподъём Находка, судоподъёмные работы Приморье"
        canonical="/articles/sudopodem-v-primorye"
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Региональная экспертиза
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Судоподъём в Приморском крае: региональная специфика
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Приморский край — крупнейший морской регион Дальнего Востока с развитой портовой 
                инфраструктурой. Работа здесь требует знания местных условий и опыта в специфических 
                климатических условиях.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0 pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={portImg} alt="Порт Владивостока — акватория работ" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Ports */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Порты и акватории Приморья
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {ports.map((port, index) => (
              <AnimatedSection key={port.name} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{port.name}</h3>
                      <p className="text-muted-foreground mb-4">{port.description}</p>
                      <ul className="space-y-1">
                        {port.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {feature}
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

      {/* Challenges */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Особенности работы в Приморье
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {challenges.map((challenge, index) => (
              <AnimatedSection key={challenge.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                      <challenge.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our advantages */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Почему выбирают местную компанию
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                «Центр Притяжения» базируется во Владивостоке. Это даёт нам преимущества 
                при работе в регионе:
              </p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-4">
              {advantages.map((adv, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{adv}</span>
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
            <img src={salvageImg} alt="Судоподъёмные работы в Приморье" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
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
                Работаем по всему Приморью
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                От Владивостока до самых отдалённых бухт. Выезд на объект — в течение 24 часов.
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
