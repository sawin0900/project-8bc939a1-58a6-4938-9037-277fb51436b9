import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowLeft, ArrowRight, Waves, Shield } from "lucide-react";
import sunkenImg from "@/assets/images/sunken-ship-ecological.jpg";
import portImg from "@/assets/images/vladivostok-port.jpg";

const OchistkaAkvatoriyOtZatonuvshihSudov = () => {
  return (
    <Layout>
      <SEOHead
        title="Очистка акваторий от затонувших судов: программы и опыт | Статья"
        description="Федеральные и муниципальные программы очистки акваторий от затонувших судов. Опыт реализации, финансирование, критерии отбора объектов."
        keywords="очистка акватории, затонувшие суда федеральная программа, подъём брошенных судов, экология акватории"
        canonical="/articles/ochistka-akvatoriy-ot-zatonuvshih-sudov"
      />
      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs />
          <AnimatedSection>
            <Link to="/articles" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" /> Все статьи
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Программы</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Очистка акваторий от затонувших судов</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="aspect-video overflow-hidden rounded-xl shadow-lg mb-8">
              <img src={sunkenImg} alt="Затонувшие суда в акватории" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Масштаб проблемы</h2>
              <p>По данным Росморречфлота, в акваториях Дальневосточного бассейна находится более 800 затонувших и брошенных судов. Многие из них представляют угрозу экологии и судоходству. На территории Приморского края зафиксировано более 200 таких объектов.</p>

              <h2 className="text-2xl font-semibold text-foreground">Федеральные программы</h2>
              <p>С 2020 года в России действует национальный проект «Экология», в рамках которого выделяется финансирование на подъём и утилизацию затонувших судов. Приоритет отдаётся объектам, создающим экологическую угрозу — с остатками топлива, масел и других загрязняющих веществ.</p>

              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Waves className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Критерии отбора объектов</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Наличие нефтепродуктов на борту затонувшего судна</li>
                      <li>Расположение в зонах активного судоходства</li>
                      <li>Близость к водозаборам и рыбохозяйственным объектам</li>
                      <li>Степень разрушения корпуса и динамика ухудшения</li>
                      <li>Влияние на навигационную обстановку</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                <img src={portImg} alt="Порт Владивосток" className="w-full h-full object-cover" />
              </div>

              <h2 className="text-2xl font-semibold text-foreground">Порядок участия в программе</h2>
              <p>Организация-исполнитель должна соответствовать требованиям ФЗ-44, иметь опыт выполнения аналогичных работ, квалифицированных водолазов и необходимую технику. Конкурсные процедуры проводятся через систему государственных закупок.</p>

              <div className="card-ocean p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Наш опыт</h3>
                    <p>Компания имеет успешный опыт участия в программах очистки акваторий Приморского края. За последние 3 года мы выполнили подъём и утилизацию более 15 затонувших объектов в рамках государственных контрактов.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="mt-12">
            <div className="card-ocean p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Хотите участвовать в программе очистки?</h2>
              <p className="text-muted-foreground mb-6">Поможем подготовить документацию и выполнить работы</p>
              <Button size="lg" className="btn-glow" asChild>
                <Link to="/contacts">Связаться с нами <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default OchistkaAkvatoriyOtZatonuvshihSudov;
