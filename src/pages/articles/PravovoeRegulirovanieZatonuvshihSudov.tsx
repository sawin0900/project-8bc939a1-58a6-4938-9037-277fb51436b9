import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowLeft, ArrowRight, Scale, FileText, Shield } from "lucide-react";
import docsImg from "@/assets/images/documentation-blueprints.jpg";
import insuranceImg from "@/assets/images/insurance-documents.jpg";

const PravovoeRegulirovanieZatonuvshihSudov = () => {
  return (
    <Layout pageClass="page-article">
      <SEOHead
        title="Правовое регулирование затонувших судов в РФ | Статья"
        description="Анализ законодательной базы: КТМ, КВВТ, ФЗ «О транспортной безопасности», Приказ Минтранса №176. Обязанности судовладельца и ответственность за бездействие."
        keywords="КТМ затонувшее судно, правовое регулирование судоподъём, обязанности судовладельца, Приказ 176"
        canonical="/articles/pravovoe-regulirovanie-zatonuvshih-sudov"
      />
      <section className="section-padding pt-32 hero relative overflow-hidden">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs />
          <AnimatedSection>
            <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" /> Все статьи
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Законодательство</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Правовое регулирование затонувших судов в РФ</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg mb-8">
              <img src={docsImg} alt="Правовое регулирование" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Scale className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Основные нормативные акты</h2>
                    <p>Правовое регулирование затонувшего имущества в России основывается на нескольких ключевых документах: Кодексе торгового мореплавания (КТМ РФ), Кодексе внутреннего водного транспорта (КВВТ РФ) и Приказе Минтранса РФ №176.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Кодекс торгового мореплавания</h2>
              <p>Глава VII КТМ РФ (статьи 107–116) устанавливает обязанности владельца затонувшего имущества. Судовладелец обязан поднять затонувшее судно в срок, установленный капитаном порта, если оно создаёт угрозу судоходству, загрязняет окружающую среду или препятствует использованию водных путей.</p>
              <p>При неисполнении обязанности подъём может быть осуществлён портовыми властями за счёт судовладельца. Расходы взыскиваются в принудительном порядке, включая штрафы и возмещение экологического ущерба.</p>

              <h2 className="text-2xl font-semibold text-foreground">Приказ Минтранса №176</h2>
              <p>Приказ от 2013 года устанавливает детальные требования к проведению подъёмных работ: состав проектной документации, порядок согласований, требования к квалификации исполнителей и оборудованию. Это основной технический нормативный документ, регламентирующий процедуру судоподъёма.</p>

              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                <img src={insuranceImg} alt="Документы и нормативы" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Ответственность за бездействие</h2>
              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Санкции</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Административный штраф до 300 000 рублей по ст. 11.6 КоАП</li>
                      <li>Возмещение экологического ущерба по расчёту Росприроднадзора</li>
                      <li>Принудительный подъём за счёт судовладельца с взысканием всех расходов</li>
                      <li>Уголовная ответственность при значительном экологическом ущербе</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Порядок согласований</h2>
              <p>Перед началом работ необходимо получить разрешения от капитании порта, территориального управления Росморречфлота, Росприроднадзора и МЧС. Каждый орган рассматривает свой аспект: безопасность судоходства, экологические риски, защита населения.</p>

              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <FileText className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Рекомендация</h3>
                    <p>Привлечение специализированной организации с опытом согласований позволяет сократить сроки получения разрешений с 3–6 месяцев до 1–2 месяцев и избежать типичных ошибок в документации.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="mt-12">
            <div className="card-ocean p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Нужна правовая консультация?</h2>
              <p className="text-muted-foreground mb-6">Поможем разобраться в нормативных требованиях и подготовить документы</p>
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

export default PravovoeRegulirovanieZatonuvshihSudov;
