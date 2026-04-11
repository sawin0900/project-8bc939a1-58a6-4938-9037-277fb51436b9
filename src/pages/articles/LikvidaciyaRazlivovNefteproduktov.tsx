import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowLeft, ArrowRight, Droplets, AlertTriangle } from "lucide-react";
import oilSpillImg from "@/assets/images/oil-spill-containment.jpg";
import sunkenImg from "@/assets/images/sunken-ship-ecological.jpg";

const LikvidaciyaRazlivovNefteproduktov = () => {
  return (
    <Layout pageClass="page-article">
      <SEOHead
        title="Ликвидация разливов нефтепродуктов при судоподъёме | Статья"
        description="Методы локализации и сбора нефтепродуктов при судоподъёмных работах: боновые заграждения, сорбенты, нефтесборщики. Экологические требования и документация."
        keywords="разлив нефтепродуктов судоподъём, боновые заграждения, ликвидация разлива, экология судоподъём"
        canonical="/articles/likvidaciya-razlivov-nefteproduktov"
      />
      <section className="section-padding pt-32 hero relative overflow-hidden">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs />
          <AnimatedSection>
            <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" /> Все статьи
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Экология</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ликвидация разливов нефтепродуктов при судоподъёме</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg mb-8">
              <img src={oilSpillImg} alt="Ликвидация разлива нефтепродуктов" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Риски разливов при судоподъёме</h2>
              <p>Большинство затонувших судов содержат остатки топлива, смазочных масел и других нефтепродуктов. При подъёме нарушается герметичность танков и трубопроводов, что создаёт риск загрязнения акватории. Предотвращение и ликвидация разливов — обязательный этап любой судоподъёмной операции.</p>

              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Этапы реагирования</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Предварительная откачка</strong> — до начала подъёма откачиваются доступные нефтепродукты</li>
                      <li><strong>Установка боновых заграждений</strong> — вокруг объекта создаётся защитный периметр</li>
                      <li><strong>Мониторинг</strong> — постоянное наблюдение за состоянием водной поверхности</li>
                      <li><strong>Сбор</strong> — нефтесборщиками и сорбентами собираются попавшие в воду нефтепродукты</li>
                      <li><strong>Утилизация</strong> — собранные отходы передаются лицензированным организациям</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Оборудование для ликвидации</h2>
              <p>Применяются надувные и жёсткие боновые заграждения длиной от 100 до 500 м, скиммеры (нефтесборщики) различных типов, сорбирующие материалы и диспергенты. Выбор оборудования зависит от объёма возможного разлива, погодных условий и характеристик акватории.</p>

              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                <img src={sunkenImg} alt="Экологические риски затонувших судов" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Документация</h2>
              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Droplets className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Обязательные документы</h3>
                    <p>План ликвидации аварийных разливов нефти (ЛАРН) разрабатывается до начала работ и согласовывается с Росприроднадзором. После завершения работ составляются акты выполненных природоохранных мероприятий и отчёт о состоянии акватории.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="mt-12">
            <div className="card-ocean p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Нужна помощь с экологической безопасностью?</h2>
              <p className="text-muted-foreground mb-6">Разработаем план ЛАРН и обеспечим экологическое сопровождение работ</p>
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

export default LikvidaciyaRazlivovNefteproduktov;
