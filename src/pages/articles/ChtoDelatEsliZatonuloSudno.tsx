import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, AlertTriangle, Phone, FileText, Clock, CheckCircle, Ship, Users, Scale } from "lucide-react";
import sunkenShipImg from "@/assets/images/sunken-ship-ecological.jpg";
import emergencyImg from "@/assets/images/emergency-maritime.jpg";

const steps = [
  {
    icon: AlertTriangle,
    title: "Немедленно сообщите об аварии",
    description: "При затоплении судна необходимо незамедлительно уведомить: капитана порта (при затоплении в акватории порта), Росморречфлот, МЧС России, администрацию бассейна внутренних водных путей (при затоплении на ВВП).",
  },
  {
    icon: FileText,
    title: "Зафиксируйте обстоятельства",
    description: "Составьте акт о происшествии с указанием координат затопления, времени, обстоятельств, наличия груза и опасных веществ. Сделайте фото- и видеофиксацию места происшествия.",
  },
  {
    icon: Users,
    title: "Обратитесь к специализированной организации",
    description: "Для подъёма затонувшего судна требуется привлечение организации, имеющей опыт выполнения судоподъёмных работ и необходимое оборудование.",
  },
  {
    icon: Scale,
    title: "Уведомите страховую компанию",
    description: "Если судно застраховано, своевременно уведомите страховщика о страховом случае и предоставьте все необходимые документы.",
  },
];

const requirements = [
  "Проект подъёма судна в соответствии с Приказом Минтранса РФ №176",
  "План производства работ (ППР)",
  "Согласование с администрацией порта или бассейна ВВП",
  "Разрешение от Росприроднадзора (при наличии экологических рисков)",
  "Уведомление МЧС о проведении работ",
  "Страхование ответственности за возможный ущерб",
];

export default function ChtoDelatEsliZatonuloSudno() {
  return (
    <Layout>
      <SEOHead
        title="Что делать если затонуло судно — пошаговая инструкция | Владивосток"
        description="Подробная инструкция: что делать при затоплении судна, кого уведомлять, какие документы готовить. Порядок действий согласно законодательству РФ. Помощь в судоподъёме."
        keywords="затонуло судно что делать, судно затонуло порядок действий, уведомление о затоплении судна, подъём затонувшего судна, Приказ Минтранса 176"
        canonical="/articles/chto-delat-esli-zatonulo-sudno"
      />

      {/* Hero */}
      <section className="section-padding pt-32 bg-gradient-to-b from-destructive/5 to-background">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
                Экстренная ситуация
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Что делать, если затонуло судно: пошаговая инструкция
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Затопление судна — это чрезвычайная ситуация, требующая немедленных и правильных действий. 
                В этой статье разберём порядок действий судовладельца при затоплении судна в акватории 
                Владивостока и Приморского края.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-destructive text-destructive-foreground hover:bg-destructive/90" asChild>
                  <a href="tel:+79247301454">
                    <Phone className="w-5 h-5 mr-2" />
                    Срочный вызов
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contacts">Оставить заявку</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0">
        <div className="container-custom">
          <AnimatedSection>
            <img src={sunkenShipImg} alt="Затонувшее судно у берега" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Первые действия при затоплении судна
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Согласно <strong>Кодексу торгового мореплавания РФ</strong> и <strong>Кодексу внутреннего водного транспорта</strong>, 
                судовладелец несёт ответственность за затонувшее имущество и обязан принять меры по его подъёму 
                или удалению, если оно создаёт угрозу безопасности судоходства или загрязнение окружающей среды.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Время реагирования критически важно: чем раньше начаты работы, тем меньше затраты на подъём 
                и ниже риск экологического ущерба. Затонувшее судно может разрушаться под воздействием 
                течений, что усложняет последующий подъём.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Порядок действий судовладельца
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-primary">Шаг {index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
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
            <img src={emergencyImg} alt="Аварийное реагирование на море" className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Какие документы потребуются для подъёма судна
              </h2>
              <p className="text-muted-foreground mb-8">
                В соответствии с <strong>Приказом Минтранса России №176</strong> для подъёма затонувшего судна 
                на внутренних водных путях требуется комплект разрешительной документации:
              </p>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-4">
              {requirements.map((req, index) => (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{req}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Сроки выполнения судоподъёмных работ
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">От 2 до 8 недель</h3>
                    <p className="text-muted-foreground">
                      Типичные сроки выполнения судоподъёмных работ в зависимости от сложности проекта
                    </p>
                  </div>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Аварийные работы:</strong> выезд в течение 24 часов, 
                    работы начинаются немедленно после прибытия на объект.
                  </p>
                  <p>
                    <strong className="text-foreground">Плановые работы:</strong> включают полный цикл 
                    проектирования, согласований и выполнения работ. Сроки зависят от глубины залегания, 
                    размеров судна, гидрологических условий.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Consequences */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Последствия бездействия
              </h2>
              <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-destructive shrink-0" />
                  <div className="space-y-4 text-foreground">
                    <p>
                      Неисполнение обязанности по подъёму или удалению затонувшего имущества влечёт:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Административную ответственность по КоАП РФ</li>
                      <li>Возмещение убытков третьим лицам (судоходным компаниям, портам)</li>
                      <li>Возмещение экологического ущерба</li>
                      <li>Принудительный подъём за счёт судовладельца государственными органами</li>
                      <li>Уголовную ответственность при тяжких последствиях</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
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
                Нужна помощь с затонувшим судном?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Мы выполняем судоподъёмные работы во Владивостоке и Приморском крае. 
                Полный цикл от обследования до сдачи документации.
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
