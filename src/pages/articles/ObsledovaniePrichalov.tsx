import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowLeft, ArrowRight, Building, Camera } from "lucide-react";
import pierImg from "@/assets/images/pier-inspection-divers.jpg";
import diverImg from "@/assets/images/diver-underwater-inspection.jpg";

const ObsledovaniePrichalov = () => {
  return (
    <Layout>
      <SEOHead
        title="Обследование причальных сооружений: методы и нормативы | Статья"
        description="Виды обследований причалов и набережных: водолазное, инструментальное, геодезическое. Нормативная база, периодичность, состав отчётных документов."
        keywords="обследование причалов, водолазное обследование причальных сооружений, техническое состояние причал"
        canonical="/articles/obsledovanie-prichalov"
      />
      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs />
          <AnimatedSection>
            <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" /> Все статьи
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Инфраструктура</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Обследование причальных сооружений</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg mb-8">
              <img src={pierImg} alt="Обследование причала" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Зачем нужно обследование</h2>
              <p>Причальные сооружения — критически важные элементы портовой инфраструктуры. Подводная часть причалов подвержена коррозии, размыву грунтов основания, биообрастанию и механическим повреждениям от судов. Регулярное обследование позволяет выявить дефекты на ранней стадии и предотвратить аварии.</p>

              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Building className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Виды обследований</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Водолазное обследование</strong> — визуальный осмотр подводной части, фото/видеофиксация</li>
                      <li><strong>Инструментальное</strong> — ультразвуковая толщинометрия, измерение коррозионного износа</li>
                      <li><strong>Геодезическое</strong> — определение отклонений от проектного положения</li>
                      <li><strong>Гидрогеологическое</strong> — исследование грунтов основания, размывы</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Нормативная база</h2>
              <p>Обследования проводятся в соответствии с СП 38.13330 «Нагрузки и воздействия на гидротехнические сооружения», ГОСТ Р 54523 и ведомственными нормативами Росморречфлота. Периодичность планового обследования — каждые 5 лет, внеплановое — после штормов, аварий или обнаружения дефектов.</p>

              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                <img src={diverImg} alt="Водолаз обследует конструкцию" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Состав отчётных документов</h2>
              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Camera className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Результаты обследования</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Технический отчёт с описанием выявленных дефектов</li>
                      <li>Дефектовочные ведомости с привязкой к чертежам</li>
                      <li>Фото- и видеоматериалы подводной съёмки</li>
                      <li>Заключение о техническом состоянии и рекомендации</li>
                      <li>Оценка остаточного ресурса конструкций</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="mt-12">
            <div className="card-ocean p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Нужно обследование причала?</h2>
              <p className="text-muted-foreground mb-6">Проведём полное обследование с подготовкой отчётной документации</p>
              <Button size="lg" className="btn-glow" asChild>
                <Link to="/contacts">Заказать обследование <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default ObsledovaniePrichalov;
