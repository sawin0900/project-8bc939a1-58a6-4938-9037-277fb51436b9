import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Award, Users, FileText, CheckCircle, Shield, AlertTriangle, Ship, Building2 } from "lucide-react";
import divingTeamImg from "@/assets/images/diving-team-equipment.jpg";
import salvageImg from "@/assets/images/salvage-crane-operation.jpg";

const requirements = [
  {
    icon: Award,
    title: "Лицензия на водолазные работы",
    description: "Организация должна иметь свидетельство о соответствии требованиям к техническим средствам и персоналу для выполнения водолазных работ.",
    details: [
      "Регистрация в реестре организаций водолазных работ",
      "Аттестация водолазной станции",
      "Наличие сертифицированного оборудования",
    ],
  },
  {
    icon: Users,
    title: "Квалифицированный персонал",
    description: "В штате должны быть водолазы соответствующей группы специализации, инженеры-проектировщики, специалисты по охране труда.",
    details: [
      "Водолазы 1-3 группы специализации с действующими свидетельствами",
      "Инженеры с опытом разработки проектов подъёма",
      "Аттестованные специалисты по охране труда",
    ],
  },
  {
    icon: Shield,
    title: "Страхование ответственности",
    description: "Обязательное страхование гражданской ответственности за причинение вреда третьим лицам при выполнении работ.",
    details: [
      "Полис страхования ГО подрядчика",
      "Страхование жизни и здоровья водолазов",
      "Страхование оборудования и техники",
    ],
  },
  {
    icon: FileText,
    title: "Опыт и компетенции",
    description: "Подтверждённый опыт выполнения аналогичных работ, положительные заключения экспертиз, рекомендации заказчиков.",
    details: [
      "Портфолио выполненных проектов",
      "Рекомендательные письма заказчиков",
      "Акты сдачи-приёмки работ",
    ],
  },
];

const diverCategories = [
  {
    category: "1 группа",
    depth: "до 20 метров",
    works: "Осмотровые и технические работы на небольших глубинах",
  },
  {
    category: "2 группа",
    depth: "до 45 метров",
    works: "Строительно-монтажные и судоподъёмные работы средней сложности",
  },
  {
    category: "3 группа",
    depth: "до 60 метров",
    works: "Сложные судоподъёмные работы, работы в особых условиях",
  },
];

const warningsSigns = [
  "Отсутствие документов о регистрации и лицензировании",
  "Нежелание предоставить портфолио и рекомендации",
  "Существенно заниженные цены относительно рынка",
  "Отсутствие страхования ответственности",
  "Неготовность заключить официальный договор",
  "Требование полной предоплаты без гарантий",
];

const checklistItems = [
  "Проверьте регистрацию организации в ЕГРЮЛ/ЕГРИП",
  "Запросите свидетельство о соответствии для водолазных работ",
  "Уточните квалификацию и опыт водолазов",
  "Изучите портфолио выполненных проектов",
  "Проверьте наличие страхования ответственности",
  "Запросите рекомендации от предыдущих заказчиков",
  "Убедитесь в готовности работать по официальному договору",
  "Оцените техническую оснащённость организации",
];

export default function KtoImeetPravoVypolnyatRaboty() {
  return (
    <Layout pageClass="page-article">
      <SEOHead
        title="Кто имеет право выполнять судоподъёмные работы — требования к подрядчикам"
        description="Требования к организациям, выполняющим судоподъём: лицензии, квалификация водолазов, страхование. Как проверить подрядчика и избежать мошенников."
        keywords="кто выполняет судоподъём, требования к судоподъёмной организации, лицензия на водолазные работы, квалификация водолазов, выбор подрядчика судоподъём"
        canonical="/articles/kto-imeet-pravo-vypolnyat-raboty"
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-primary/5 to-background hero relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Выбор подрядчика
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Кто имеет право выполнять судоподъёмные работы
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Судоподъёмные работы требуют специальной квалификации, оборудования и разрешений. 
                Разбираем, какие требования предъявляются к организациям, и как выбрать надёжного подрядчика.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={divingTeamImg} alt="Профессиональная водолазная бригада" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Требования к организациям
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Для выполнения судоподъёмных и водолазных работ организация должна соответствовать ряду требований
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {requirements.map((req, index) => (
              <AnimatedSection key={req.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <req.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{req.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{req.description}</p>
                  <ul className="space-y-2">
                    {req.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Diver Categories */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Группы специализации водолазов
              </h2>
              <p className="text-muted-foreground mb-8">
                Водолазы делятся на группы специализации в зависимости от допустимой глубины погружения 
                и сложности выполняемых работ:
              </p>
            </AnimatedSection>
            <div className="space-y-4">
              {diverCategories.map((cat, index) => (
                <AnimatedSection key={cat.category} delay={index * 0.1}>
                  <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 sm:w-1/4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-foreground">{cat.category}</span>
                    </div>
                    <div className="sm:w-1/4">
                      <span className="text-sm text-muted-foreground">Глубина:</span>
                      <p className="font-medium text-foreground">{cat.depth}</p>
                    </div>
                    <div className="sm:w-1/2">
                      <span className="text-sm text-muted-foreground">Виды работ:</span>
                      <p className="text-foreground">{cat.works}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Признаки недобросовестного подрядчика
              </h2>
              <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="w-8 h-8 text-destructive shrink-0" />
                  <p className="text-foreground">
                    Будьте осторожны, если подрядчик демонстрирует следующие признаки:
                  </p>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {warningsSigns.map((sign, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0 mt-2" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Чек-лист проверки подрядчика
              </h2>
              <p className="text-muted-foreground mb-8">
                Перед заключением договора рекомендуем проверить следующие пункты:
              </p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-4">
              {checklistItems.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Почему выбирают «Центр Притяжения»
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Все разрешения</h3>
                      <p className="text-sm text-muted-foreground">Полный пакет документов для выполнения судоподъёмных работ</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Опытная команда</h3>
                      <p className="text-sm text-muted-foreground">Водолазы 1-3 группы с многолетним опытом работ</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Страхование</h3>
                      <p className="text-sm text-muted-foreground">Полное страхование ответственности и персонала</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Работа по договору</h3>
                      <p className="text-sm text-muted-foreground">Официальное оформление с гарантиями качества</p>
                    </div>
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
            <img src={salvageImg} alt="Судоподъёмная операция" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
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
                Готовы обсудить ваш проект?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Свяжитесь с нами для консультации. Мы ответим на все вопросы 
                и подготовим коммерческое предложение.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-glow" asChild>
                  <Link to="/contacts">
                    Получить консультацию
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
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
