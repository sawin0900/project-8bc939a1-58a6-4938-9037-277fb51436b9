import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Scale, FileText, AlertTriangle, Shield, Gavel, Building2, Ship } from "lucide-react";
import insuranceImg from "@/assets/images/insurance-documents.jpg";
import sunkenShipImg from "@/assets/images/sunken-ship-ecological.jpg";

const lawSources = [
  {
    icon: FileText,
    title: "Кодекс торгового мореплавания РФ (КТМ)",
    description: "Глава XIX устанавливает порядок и ответственность за затонувшее в морских водах имущество. Судовладелец обязан поднять или удалить судно, если оно создаёт препятствие для судоходства.",
  },
  {
    icon: FileText,
    title: "Кодекс внутреннего водного транспорта РФ (КВВТ)",
    description: "Статья 47 определяет обязанности владельцев затонувшего на ВВП имущества по его подъёму или удалению в установленные сроки.",
  },
  {
    icon: FileText,
    title: "Приказ Минтранса России №176",
    description: "Устанавливает порядок подъёма, удаления или уничтожения затонувшего имущества, требования к проектной документации и согласованиям.",
  },
];

const responsibilityTypes = [
  {
    icon: Scale,
    title: "Гражданско-правовая ответственность",
    items: [
      "Возмещение убытков третьим лицам (порты, судоходные компании)",
      "Компенсация экологического ущерба",
      "Оплата простоя причалов и судов",
      "Затраты на принудительный подъём государственными органами",
    ],
  },
  {
    icon: Gavel,
    title: "Административная ответственность",
    items: [
      "Штрафы по статьям КоАП РФ за нарушение правил судоходства",
      "Штрафы за загрязнение водных объектов",
      "Взыскания за несоблюдение сроков подъёма",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Уголовная ответственность",
    items: [
      "При гибели людей — по статьям о причинении смерти по неосторожности",
      "При значительном экологическом ущербе — по экологическим статьям УК РФ",
      "При умышленном уничтожении чужого имущества",
    ],
  },
];

const whoIsResponsible = [
  {
    title: "Судовладелец",
    description: "Основное ответственное лицо. Несёт ответственность независимо от причины затопления, если не докажет форс-мажор.",
  },
  {
    title: "Арендатор (фрахтователь)",
    description: "Может нести ответственность по условиям договора фрахтования, особенно при бербоут-чартере.",
  },
  {
    title: "Капитан судна",
    description: "Персональная ответственность при нарушении правил судовождения, повлёкших затопление.",
  },
  {
    title: "Третьи лица",
    description: "Виновники столкновения или иного происшествия могут нести солидарную ответственность.",
  },
];

export default function OtvetstvennostZaZatonuvsheImuschestvo() {
  return (
    <Layout pageClass="page-article">
      <SEOHead
        title="Ответственность за затонувшее имущество — законодательство РФ"
        description="Кто несёт ответственность за затонувшее судно: КТМ, КВВТ, Приказ Минтранса 176. Виды ответственности судовладельца, штрафы, сроки подъёма. Консультация юриста."
        keywords="ответственность за затонувшее судно, КТМ затонувшее имущество, КВВТ подъём судна, штраф за затонувшее судно, обязанность поднять судно"
        canonical="/articles/otvetstvennost-za-zatonuvshee-imuschestvo"
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-primary/5 to-background hero relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Правовые вопросы
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Ответственность за затонувшее имущество: что говорит закон
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Разбираем правовые аспекты ответственности за затонувшее судно: кто обязан организовать подъём, 
                какие санкции предусмотрены за бездействие, и как минимизировать правовые риски.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={insuranceImg} alt="Юридические документы и ответственность" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Law Sources */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Нормативно-правовая база
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {lawSources.map((source, index) => (
              <AnimatedSection key={source.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <source.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{source.title}</h3>
                  <p className="text-muted-foreground text-sm">{source.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who is Responsible */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Кто несёт ответственность за затонувшее судно
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-6">
              {whoIsResponsible.map((person, index) => (
                <AnimatedSection key={person.title} delay={index * 0.1}>
                  <div className="bg-card border border-border rounded-xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <Building2 className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{person.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{person.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Types of Responsibility */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Виды ответственности
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {responsibilityTypes.map((type, index) => (
              <AnimatedSection key={type.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">{type.title}</h3>
                  <ul className="space-y-2">
                    {type.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
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

      {/* Deadlines */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Сроки исполнения обязанности по подъёму
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Морские акватории (КТМ РФ)</h3>
                  <p className="text-muted-foreground">
                    Срок устанавливается капитаном порта. При неисполнении в установленный срок — 
                    принудительный подъём за счёт судовладельца.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Внутренние водные пути (КВВТ РФ)</h3>
                  <p className="text-muted-foreground">
                    Администрация бассейна ВВП устанавливает срок подъёма. При угрозе безопасности 
                    судоходства — немедленные меры. Стандартный срок — от 30 до 90 дней.
                  </p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">
                      <strong>Важно:</strong> Просрочка сроков подъёма влечёт увеличение штрафов, 
                      а также право государственных органов выполнить подъём принудительно 
                      с последующим взысканием всех затрат с судовладельца.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Страхование ответственности
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      P&I страхование (Protection & Indemnity)
                    </h3>
                    <p className="text-muted-foreground">
                      Покрывает ответственность судовладельца за удаление затонувшего судна
                    </p>
                  </div>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Страхование P&I через клубы взаимного страхования — наиболее распространённый 
                    способ защиты от финансовых рисков, связанных с затоплением судна.
                  </p>
                  <p>
                    <strong className="text-foreground">Покрываемые расходы:</strong> затраты на подъём судна, 
                    удаление обломков, очистку акватории от загрязнений, возмещение убытков третьим лицам.
                  </p>
                  <p>
                    <strong className="text-foreground">Рекомендация:</strong> проверьте условия вашего 
                    страхового полиса на предмет покрытия расходов по судоподъёму до наступления страхового случая.
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
            <img src={sunkenShipImg} alt="Затонувшее судно" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
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
                Нужна консультация по судоподъёму?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Мы поможем разобраться в правовых вопросах и выполним все работы 
                в соответствии с требованиями законодательства.
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
