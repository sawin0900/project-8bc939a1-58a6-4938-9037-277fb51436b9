import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, Shield, FileText, AlertTriangle, Ship, CheckCircle, Umbrella } from "lucide-react";
import insuranceImg from "@/assets/images/insurance-documents.jpg";
import salvageImg from "@/assets/images/salvage-crane-operation.jpg";

const insuranceTypes = [
  {
    icon: Shield,
    title: "P&I страхование",
    description: "Protection & Indemnity — страхование ответственности судовладельца. Покрывает расходы на подъём затонувшего судна, удаление обломков, экологический ущерб.",
    covers: [
      "Расходы на подъём или удаление судна",
      "Ответственность перед третьими лицами",
      "Экологический ущерб",
      "Расходы на спасательные операции",
    ],
  },
  {
    icon: Umbrella,
    title: "КАСКО судна",
    description: "Страхование корпуса судна от повреждений и гибели. При конструктивной полной гибели выплачивается страховая сумма.",
    covers: [
      "Повреждение или гибель судна",
      "Расходы на спасение",
      "Частичные убытки",
      "Общая авария",
    ],
  },
  {
    icon: FileText,
    title: "Страхование ответственности подрядчика",
    description: "Наша компания имеет полис страхования профессиональной ответственности, что защищает заказчика от возможных убытков.",
    covers: [
      "Ущерб имуществу заказчика",
      "Экологические риски при работах",
      "Повреждение третьих объектов",
      "Расходы на устранение последствий",
    ],
  },
];

const process = [
  {
    step: 1,
    title: "Уведомите страховщика",
    description: "Немедленно сообщите о страховом случае в страховую компанию или P&I клуб. Соблюдайте сроки, указанные в полисе.",
  },
  {
    step: 2,
    title: "Зафиксируйте обстоятельства",
    description: "Составьте морской протест, акт о происшествии, соберите свидетельские показания, фото и видеоматериалы.",
  },
  {
    step: 3,
    title: "Согласуйте действия",
    description: "Все работы по подъёму согласовывайте со страховщиком. Несогласованные расходы могут не быть возмещены.",
  },
  {
    step: 4,
    title: "Выберите подрядчика",
    description: "Страховщик может рекомендовать сюрвейера и подрядчика. Мы имеем опыт работы со страховыми компаниями.",
  },
  {
    step: 5,
    title: "Документируйте расходы",
    description: "Сохраняйте все договоры, акты, счета. Это необходимо для получения страхового возмещения.",
  },
];

const tips = [
  "Проверьте условия полиса до затопления — не все риски могут быть покрыты",
  "Соблюдайте сроки уведомления страховщика — обычно 24-72 часа",
  "Не начинайте работы без согласования — это может стать основанием для отказа",
  "Привлекайте независимого сюрвейера для фиксации ущерба",
  "Сохраняйте всю переписку со страховой компанией",
];

export default function StrahovanieSudopodemnyRabot() {
  return (
    <Layout pageClass="page-article">
      <SEOHead
        title="Страхование судоподъёмных работ — P&I, КАСКО | Владивосток"
        description="Страхование при подъёме затонувших судов: P&I клубы, КАСКО, ответственность подрядчика. Как получить страховое возмещение. Приморский край."
        keywords="страхование судоподъём, P&I страхование судна, страховка затонувшего судна, страховое возмещение подъём судна"
        canonical="/articles/strahovanie-sudopodemnyx-rabot"
      />

      {/* Hero */}
      <section className="section-padding pt-32 hero relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Страхование
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Страхование судоподъёмных работ
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Правильное страхование может покрыть значительную часть расходов на подъём затонувшего 
                судна. Разберём виды страхования и порядок получения возмещения.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0 pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={insuranceImg} alt="Страховые документы" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Insurance Types */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Виды страхования
            </h2>
          </AnimatedSection>
          <div className="space-y-6 max-w-5xl mx-auto">
            {insuranceTypes.map((type, index) => (
              <AnimatedSection key={type.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <type.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{type.title}</h3>
                      <p className="text-muted-foreground mb-4">{type.description}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {type.covers.map((cover, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-foreground">{cover}</span>
                          </div>
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

      {/* Process */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Порядок получения страхового возмещения
            </h2>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto space-y-4">
            {process.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
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
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Важные рекомендации</h3>
                    <ul className="space-y-3">
                      {tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                          {tip}
                        </li>
                      ))}
                    </ul>
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
                Работаем со страховыми компаниями
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Имеем опыт взаимодействия с P&I клубами и страховщиками. Помогаем с оформлением 
                документации для страхового возмещения.
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
