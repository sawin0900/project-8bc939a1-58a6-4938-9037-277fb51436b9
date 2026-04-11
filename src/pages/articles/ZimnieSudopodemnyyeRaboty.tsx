import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowLeft, ArrowRight, Snowflake, AlertTriangle } from "lucide-react";
import emergencyImg from "@/assets/images/emergency-maritime.jpg";
import portImg from "@/assets/images/vladivostok-port.jpg";

const ZimnieSudopodemnyyeRaboty = () => {
  return (
    <Layout pageClass="page-article">
      <SEOHead
        title="Судоподъёмные работы зимой: особенности и сложности | Статья"
        description="Специфика проведения судоподъёмных и водолазных работ в зимний период: ледовые условия, низкие температуры, техника безопасности, выбор методов подъёма."
        keywords="судоподъём зимой, водолазные работы зимой, подъём судна подо льдом, ледовые условия"
        canonical="/articles/zimnie-sudopodemnye-raboty"
      />
      <section className="section-padding pt-32 hero relative overflow-hidden">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs />
          <AnimatedSection>
            <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" /> Все статьи
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Сезонность</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Судоподъёмные работы в зимний период</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg mb-8">
              <img src={emergencyImg} alt="Зимние судоподъёмные работы" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Климатические условия Приморья</h2>
              <p>Зимний период на Дальнем Востоке характеризуется температурами до –25°C, образованием ледового покрова толщиной до 40–80 см в закрытых бухтах и сложной ветровой обстановкой. Всё это существенно влияет на планирование и выполнение судоподъёмных работ.</p>

              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Snowflake className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Ключевые сложности</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Ледовый покров препятствует доступу плавтехники к объекту</li>
                      <li>Снижена видимость под водой из-за ледяной крошки</li>
                      <li>Риск обморожения у водолазов, сокращённое время погружений</li>
                      <li>Обмерзание оборудования и тросов на поверхности</li>
                      <li>Ограниченное световое время суток (7–8 часов)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Методы работы подо льдом</h2>
              <p>При работах в ледовых условиях применяется вырубка майны — проруби необходимого размера для спуска водолазов и оборудования. Для крупных операций используется ледокольная техника для создания канала подхода плавкрана к объекту.</p>
              <p>Водолазные спуски проводятся в сухих гидрокостюмах с электроподогревом, время нахождения под водой ограничивается 30–45 минутами за один спуск. Обязательно наличие страхующего водолаза и средств обогрева на поверхности.</p>

              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                <img src={portImg} alt="Зимний порт" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Преимущества зимних работ</h2>
              <p>Несмотря на сложности, зимний период имеет и преимущества: ледовый покров может использоваться как естественная рабочая платформа для размещения оборудования, снижается интенсивность судоходства, что упрощает согласования.</p>

              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Требования безопасности</h3>
                    <p>При зимних работах обязательны: утеплённые укрытия для персонала, горячее питание, дополнительные средства спасения, медицинское обеспечение с учётом рисков переохлаждения. Все работы выполняются по специальному ППР для зимних условий.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="mt-12">
            <div className="card-ocean p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Планируете работы в зимний период?</h2>
              <p className="text-muted-foreground mb-6">Поможем спланировать и выполнить работы в любых условиях</p>
              <Button size="lg" className="btn-glow" asChild>
                <Link to="/contacts">Обсудить проект <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default ZimnieSudopodemnyyeRaboty;
