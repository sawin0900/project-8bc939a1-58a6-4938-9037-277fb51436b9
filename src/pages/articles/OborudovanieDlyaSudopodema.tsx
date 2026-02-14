import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowLeft, ArrowRight, Wrench, Anchor } from "lucide-react";
import salvageImg from "@/assets/images/salvage-crane-operation.jpg";
import floatingCraneImg from "@/assets/images/floating-crane-salvage.jpg";

const OborudovanieDlyaSudopodema = () => {
  return (
    <Layout>
      <SEOHead
        title="Оборудование для судоподъёма: плавкраны, понтоны, помпы | Статья"
        description="Обзор специализированной техники для судоподъёмных работ: плавучие краны, мягкие и жёсткие понтоны, насосное оборудование, грузозахватные устройства."
        keywords="оборудование судоподъём, плавкран, понтоны для подъёма, помпы водолазные, грузозахватные устройства"
        canonical="/articles/oborudovanie-dlya-sudopodema"
      />
      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs />
          <AnimatedSection>
            <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" /> Все статьи
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Техника</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Оборудование для судоподъёмных работ</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg mb-8">
              <img src={salvageImg} alt="Оборудование для судоподъёма" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Плавучие краны</h2>
              <p>Плавучие краны — основной инструмент для подъёма затонувших судов большого водоизмещения. Грузоподъёмность современных плавкранов на Дальнем Востоке достигает 100–300 тонн, что позволяет поднимать суда длиной до 50 м одним стропом.</p>
              <p>При работе с крупнотоннажными объектами применяется спаренная работа двух плавкранов с синхронизацией подъёмных операций. Это требует точных расчётов и координации экипажей.</p>

              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Wrench className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Виды подъёмного оборудования</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Плавучие краны</strong> — для прямого подъёма судов до 300 т</li>
                      <li><strong>Мягкие понтоны</strong> — надувные ёмкости для создания подъёмной силы</li>
                      <li><strong>Жёсткие понтоны</strong> — стальные цистерны, многоразовое использование</li>
                      <li><strong>Гидравлические домкраты</strong> — для подъёма с упором на грунт</li>
                      <li><strong>Лебёдки и тали</strong> — вспомогательное оборудование</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Понтонный метод</h2>
              <p>Понтонный метод наиболее распространён для судов среднего водоизмещения (50–500 т). Под корпус затонувшего судна заводятся стропы, к которым крепятся понтоны. При продувке понтонов сжатым воздухом создаётся подъёмная сила, достаточная для отрыва судна от грунта и всплытия.</p>

              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                <img src={floatingCraneImg} alt="Плавучий кран на работах" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Насосное оборудование</h2>
              <p>Мощные погружные и центробежные помпы используются для откачки воды из корпуса судна перед подъёмом и во время операции. Производительность промышленных помп составляет от 100 до 2000 м³/час, что позволяет осушать отсеки крупных судов за несколько часов.</p>

              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Anchor className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Водолазное оборудование</h3>
                    <p>Для подводных работ используются водолазные комплексы с поверхностной подачей воздуха, подводные видеосистемы, инструменты для резки и сварки, грузозахватные приспособления. Глубина работ — до 60 м.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="mt-12">
            <div className="card-ocean p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Нужна техника для подъёма?</h2>
              <p className="text-muted-foreground mb-6">Подберём оптимальное оборудование под ваш проект</p>
              <Button size="lg" className="btn-glow" asChild>
                <Link to="/contacts">Получить консультацию <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default OborudovanieDlyaSudopodema;
