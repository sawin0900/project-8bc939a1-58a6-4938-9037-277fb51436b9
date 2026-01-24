import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const articles = [
  {
    slug: "chto-delat-esli-zatonulo-sudno",
    title: "Что делать, если затонуло судно",
    excerpt: "Пошаговая инструкция для судовладельца при затоплении судна: кого уведомлять, какие документы готовить, как организовать подъём в соответствии с законодательством РФ.",
    category: "Экстренные ситуации",
    date: "20 января 2024",
    readTime: "8 мин",
  },
  {
    slug: "otvetstvennost-za-zatonuvshee-imuschestvo",
    title: "Ответственность за затонувшее имущество",
    excerpt: "Разбираем правовые аспекты: КТМ, КВВТ, Приказ Минтранса №176. Кто несёт ответственность, какие санкции предусмотрены, как минимизировать риски.",
    category: "Право",
    date: "18 января 2024",
    readTime: "10 мин",
  },
  {
    slug: "kak-prohodyat-soglasovaniya",
    title: "Как проходят согласования судоподъёма",
    excerpt: "Полный гид по инстанциям: Росморречфлот, МЧС, Росприроднадзор, капитания порта. Сроки, документы, типичные ошибки и как их избежать.",
    category: "Согласования",
    date: "15 января 2024",
    readTime: "7 мин",
  },
  {
    slug: "kto-imeet-pravo-vypolnyat-raboty",
    title: "Кто имеет право выполнять судоподъёмные работы",
    excerpt: "Требования к организациям: лицензии, квалификация водолазов, страхование. Как проверить подрядчика и избежать недобросовестных исполнителей.",
    category: "Выбор подрядчика",
    date: "10 января 2024",
    readTime: "6 мин",
  },
];

const Articles = () => {
  return (
    <Layout>
      <SEOHead
        title="Статьи о судоподъёме — экспертные материалы | Владивосток"
        description="Полезные статьи о судоподъёме: что делать при затоплении судна, ответственность, согласования, выбор подрядчика. Экспертный опыт для судовладельцев Приморского края."
        keywords="статьи судоподъём, затонуло судно что делать, ответственность судовладельца, согласование судоподъёма, выбор подрядчика"
        canonical="/articles"
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <SectionHeader
              badge="Блог"
              title="Экспертные статьи о судоподъёме"
              description="Делимся опытом и разбираем важные вопросы: от первых действий при затоплении до выбора подрядчика"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <StaggerItem key={index}>
                <Link to={`/articles/${article.slug}`}>
                  <article className="card-ocean p-6 hover:border-primary/50 transition-colors group h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <span>Читать статью</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom text-center">
          <AnimatedSection animation="scale">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Остались вопросы?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами — наши эксперты проконсультируют по любым вопросам судоподъёма и документации
            </p>
            <Button size="lg" className="btn-glow" asChild>
              <Link to="/contacts">
                Получить консультацию
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
