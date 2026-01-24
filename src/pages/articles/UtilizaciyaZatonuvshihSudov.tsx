import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Phone, Recycle, Scissors, Truck, FileText, Ship, CheckCircle, AlertTriangle } from "lucide-react";

const stages = [
  {
    icon: FileText,
    title: "Подготовка документации",
    description: "Оформление акта на списание судна, получение разрешений на утилизацию, согласование с экологическими службами.",
    duration: "3-10 дней",
  },
  {
    icon: Scissors,
    title: "Демонтаж оборудования",
    description: "Снятие судового оборудования, механизмов, электроники. Часть оборудования может быть продана или использована повторно.",
    duration: "5-15 дней",
  },
  {
    icon: Recycle,
    title: "Резка корпуса",
    description: "Разделка металлоконструкций на транспортабельные фрагменты. Применяется газовая или плазменная резка.",
    duration: "10-30 дней",
  },
  {
    icon: Truck,
    title: "Вывоз и переработка",
    description: "Транспортировка металлолома на перерабатывающие предприятия. Утилизация опасных отходов.",
    duration: "5-10 дней",
  },
];

const materials = [
  {
    name: "Чёрный металл",
    description: "Корпус судна, надстройки, палубное оборудование — сдаётся на металлолом.",
    recyclable: true,
  },
  {
    name: "Цветные металлы",
    description: "Бронза, латунь, алюминий из арматуры, винтов, обшивки — имеют высокую стоимость.",
    recyclable: true,
  },
  {
    name: "Нефтепродукты",
    description: "Топливо, масла, смазки — откачиваются и утилизируются специализированными организациями.",
    recyclable: false,
  },
  {
    name: "Изоляционные материалы",
    description: "Асбест, стекловата — относятся к опасным отходам, требуют специальной утилизации.",
    recyclable: false,
  },
  {
    name: "Электроника и приборы",
    description: "Навигационное оборудование, связь — может быть продано или утилизировано.",
    recyclable: true,
  },
];

const advantages = [
  "Комплексный подход: подъём + утилизация от одного подрядчика",
  "Собственное оборудование для резки металла",
  "Лицензии на обращение с отходами",
  "Документальное оформление всех этапов",
  "Возврат части стоимости за счёт сдачи металла",
  "Соблюдение экологических требований",
];

export default function UtilizaciyaZatonuvshihSudov() {
  return (
    <Layout>
      <SEOHead
        title="Утилизация затонувших судов — полный цикл работ | Владивосток"
        description="Утилизация затонувших судов в Приморском крае: подъём, демонтаж, резка, переработка. Документальное оформление, экологические требования."
        keywords="утилизация затонувшего судна, разделка судна на металлолом, демонтаж судна, переработка судов Владивосток"
        canonical="/articles/utilizaciya-zatonuvshih-sudov"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Утилизация
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Утилизация затонувших судов: от подъёма до переработки
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Когда восстановление судна нецелесообразно, оптимальным решением становится утилизация. 
                Разберём полный цикл работ по демонтажу и переработке затонувших судов.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stages */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Этапы утилизации судна
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stages.map((stage, index) => (
              <AnimatedSection key={stage.title} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <stage.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">Этап {index + 1}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{stage.description}</p>
                  <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                    Срок: {stage.duration}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Что получается при утилизации
            </h2>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto space-y-4">
            {materials.map((material, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    material.recyclable ? 'bg-green-500/10' : 'bg-amber-500/10'
                  }`}>
                    {material.recyclable ? (
                      <Recycle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{material.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        material.recyclable ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'
                      }`}>
                        {material.recyclable ? 'Переработка' : 'Спец. утилизация'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{material.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Преимущества комплексного подхода
              </h2>
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

      {/* CTA */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <Ship className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Заказать утилизацию судна
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Выполняем полный цикл работ: от подъёма до сдачи металла. Возможен частичный 
                возврат средств за счёт реализации материалов.
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
