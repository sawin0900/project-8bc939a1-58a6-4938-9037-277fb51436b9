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
  {
    slug: "metody-podema-zatonuvshih-sudov",
    title: "Методы подъёма затонувших судов",
    excerpt: "Обзор технологий судоподъёма: понтонный, крановый, комбинированный метод, герметизация. Преимущества и ограничения каждого подхода.",
    category: "Технологии",
    date: "8 января 2024",
    readTime: "9 мин",
  },
  {
    slug: "ekologicheskie-riski-zatonuvshih-sudov",
    title: "Экологические риски затонувших судов",
    excerpt: "Угрозы для морских экосистем: разливы нефтепродуктов, гибель фауны, загрязнение дна. Меры предотвращения и законодательство.",
    category: "Экология",
    date: "5 января 2024",
    readTime: "7 мин",
  },
  {
    slug: "stoimost-sudopodemnyx-rabot",
    title: "Из чего складывается стоимость судоподъёма",
    excerpt: "Факторы ценообразования: глубина, размеры судна, удалённость, сроки. Ориентировочные цены на этапы работ и советы по оптимизации затрат.",
    category: "Ценообразование",
    date: "3 января 2024",
    readTime: "6 мин",
  },
  {
    slug: "vodolaznoye-obsledovanie-sudov",
    title: "Водолазное обследование затонувших судов",
    excerpt: "Этапы диагностики: визуальный осмотр, фото/видеофиксация, замеры. Какие документы получаете и зачем нужно обследование.",
    category: "Диагностика",
    date: "1 января 2024",
    readTime: "5 мин",
  },
  {
    slug: "sudopodem-v-primorye",
    title: "Судоподъём в Приморском крае",
    excerpt: "Региональная специфика: порты Владивостока, Находки, Восточного. Климатические условия, течения, ледовый период.",
    category: "Регион",
    date: "28 декабря 2023",
    readTime: "6 мин",
  },
  {
    slug: "utilizaciya-zatonuvshih-sudov",
    title: "Утилизация затонувших судов",
    excerpt: "Полный цикл: от подъёма до переработки. Демонтаж, резка, вывоз металлолома. Документальное оформление и экологические требования.",
    category: "Утилизация",
    date: "25 декабря 2023",
    readTime: "7 мин",
  },
  {
    slug: "strahovanie-sudopodemnyx-rabot",
    title: "Страхование судоподъёмных работ",
    excerpt: "P&I страхование, КАСКО судна, ответственность подрядчика. Как получить страховое возмещение за подъём затонувшего судна.",
    category: "Страхование",
    date: "22 декабря 2023",
    readTime: "8 мин",
  },
  {
    slug: "podgotovka-proekta-sudopodema",
    title: "Подготовка проекта судоподъёма",
    excerpt: "Требования Приказа Минтранса №176: состав проекта, расчётная часть, ППР. Порядок согласования с органами власти.",
    category: "Проектирование",
    date: "20 декабря 2023",
    readTime: "8 мин",
  },
  {
    slug: "bezopasnost-vodolaznyh-rabot",
    title: "Безопасность водолазных работ",
    excerpt: "Требования охраны труда: состав станции, связь, медобеспечение. Риски при погружениях и меры их предотвращения.",
    category: "Безопасность",
    date: "18 декабря 2023",
    readTime: "7 мин",
  },
  {
    slug: "chto-delayut-s-sudnom-posle-podema",
    title: "Что делают с судном после подъёма",
    excerpt: "Варианты дальнейшей судьбы: ремонт, продажа на запчасти, утилизация, создание рифа. Критерии выбора оптимального решения.",
    category: "После подъёма",
    date: "15 декабря 2023",
    readTime: "6 мин",
  },
  {
    slug: "pravovoe-regulirovanie-zatonuvshih-sudov",
    title: "Правовое регулирование затонувших судов в РФ",
    excerpt: "Анализ законодательной базы: КТМ, КВВТ, ФЗ «О транспортной безопасности». Обязанности судовладельца и ответственность за бездействие.",
    category: "Законодательство",
    date: "12 декабря 2023",
    readTime: "9 мин",
  },
  {
    slug: "oborudovanie-dlya-sudopodema",
    title: "Оборудование для судоподъёмных работ",
    excerpt: "Обзор специализированной техники: плавучие краны, мягкие и жёсткие понтоны, насосное оборудование, грузозахватные устройства.",
    category: "Техника",
    date: "10 декабря 2023",
    readTime: "7 мин",
  },
  {
    slug: "ochistka-akvatoriy-ot-zatonuvshih-sudov",
    title: "Очистка акваторий от затонувших судов",
    excerpt: "Федеральные и муниципальные программы очистки акваторий. Опыт реализации, финансирование, критерии отбора объектов для подъёма.",
    category: "Программы",
    date: "8 декабря 2023",
    readTime: "8 мин",
  },
  {
    slug: "zimnie-sudopodemnye-raboty",
    title: "Судоподъёмные работы в зимний период",
    excerpt: "Специфика работ в ледовых условиях: методы подъёма подо льдом, требования безопасности, преимущества зимних операций.",
    category: "Сезонность",
    date: "5 декабря 2023",
    readTime: "6 мин",
  },
  {
    slug: "obsledovanie-prichalov",
    title: "Обследование причальных сооружений",
    excerpt: "Виды обследований причалов и набережных: водолазное, инструментальное, геодезическое. Нормативная база и состав отчётных документов.",
    category: "Инфраструктура",
    date: "3 декабря 2023",
    readTime: "7 мин",
  },
  {
    slug: "likvidaciya-razlivov-nefteproduktov",
    title: "Ликвидация разливов нефтепродуктов при судоподъёме",
    excerpt: "Методы локализации и сбора нефтепродуктов: боновые заграждения, сорбенты, нефтесборщики. Экологические требования и план ЛАРН.",
    category: "Экология",
    date: "1 декабря 2023",
    readTime: "8 мин",
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
