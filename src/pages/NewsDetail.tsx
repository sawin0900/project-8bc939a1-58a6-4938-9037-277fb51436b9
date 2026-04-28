import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { generateNewsMetaDescription, generateNewsMetaTitle } from "@/lib/newsSeo";

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: news, isLoading } = useQuery({
    queryKey: ["news-detail", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const computedTitle = news
    ? (news.meta_title?.trim() || generateNewsMetaTitle(news.title))
    : "";
  const computedDescription = news
    ? (news.meta_description?.trim() || generateNewsMetaDescription({
        description: news.description,
        content: news.content,
        fallbackTitle: news.title,
      }))
    : "";

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!news) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center container-custom">
          <h1 className="text-2xl font-bold mb-4">Новость не найдена</h1>
          <Button asChild><Link to="/news">Вернуться к новостям</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageClass="page-news-detail">
      <SEOHead
        title={computedTitle}
        description={computedDescription}
        keywords={(news.keywords || []).join(", ")}
        canonical={`/news/${news.slug}`}
        ogImage={news.image_url || "/images/heroes/news-detail.webp"}
        ogType="article"
      />
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: news.title,
            description: news.description,
            image: news.image_url,
            datePublished: news.created_at,
            dateModified: news.updated_at,
            publisher: {
              "@type": "Organization",
              name: "Центр Притяжения",
            },
          }),
        }}
      />

      <section className="pt-32 pb-20 hero relative overflow-hidden">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs
            items={[
            { name: "Главная", href: "/" },
              { name: "Новости", href: "/news" },
              { name: news.title, href: `/news/${news.slug}` },
            ]}
          />

          <AnimatedSection>
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <Link to="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Все новости
              </Link>
            </Button>

            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              {format(new Date(news.created_at), "dd MMMM yyyy, HH:mm", { locale: ru })}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{news.title}</h1>

            {news.description && (
              <p className="text-lg text-muted-foreground mb-8 border-l-4 border-primary pl-4">
                {news.description}
              </p>
            )}

            {news.image_url && (
              <div className="aspect-video rounded-lg overflow-hidden mb-8">
                <img src={news.image_url} alt={news.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div
              className="prose prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {news.keywords && news.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {news.keywords.map((kw: string, i: number) => (
                  <Badge key={i} variant="secondary">{kw}</Badge>
                ))}
              </div>
            )}

            {news.source_url && (
              <div className="border-t border-border pt-6 text-sm text-muted-foreground">
                <a
                  href={news.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Источник: PortNews.ru
                </a>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
