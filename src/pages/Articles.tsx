import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const articles = [
  {
    title: "Когда требуется проект подъёма судна",
    excerpt: "Разбираем ситуации, в которых законодательство РФ требует обязательной разработки проекта подъёма затонувшего судна. Требования Приказа Минтранса №176 и последствия их нарушения.",
    category: "Нормативы",
    date: "15 января 2024",
    readTime: "5 мин",
  },
  {
    title: "Типовые ошибки при судоподъёме",
    excerpt: "Анализируем распространённые ошибки при организации судоподъёмных работ: недооценка массы объекта, неправильный выбор метода подъёма, пренебрежение экологическими требованиями.",
    category: "Практика",
    date: "10 января 2024",
    readTime: "7 мин",
  },
  {
    title: "Почему документацию не принимают надзорные органы",
    excerpt: "Основные причины отказов в согласовании проектной документации: несоответствие нормативам, неполный комплект документов, ошибки в расчётах. Как избежать типичных проблем.",
    category: "Документация",
    date: "5 января 2024",
    readTime: "6 мин",
  },
  {
    title: "Как избежать штрафов и простоев",
    excerpt: "Практические рекомендации по организации работ в соответствии с требованиями законодательства. Типичные нарушения и их последствия для судовладельцев и подрядчиков.",
    category: "Право",
    date: "28 декабря 2023",
    readTime: "8 мин",
  },
];

const Articles = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Полезные материалы"
              title="Экспертные статьи"
              description="Делимся опытом и разбираем важные вопросы судоподъёма и подготовки документации"
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
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Читать далее</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
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
