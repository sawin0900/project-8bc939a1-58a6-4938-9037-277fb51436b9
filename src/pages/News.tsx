import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, ArrowRight, Newspaper } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function News() {
  const [page, setPage] = useState(0);
  const pageSize = 12;

  const { data, isLoading } = useQuery({
    queryKey: ["news", page],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from("news")
        .select("id, title, slug, description, image_url, created_at", { count: "exact" })
        .eq("published", true)
        .order("created_at", { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);
      if (error) throw error;
      return { items: data || [], count: count || 0 };
    },
  });

  const totalPages = Math.ceil((data?.count || 0) / pageSize);

  return (
    <Layout>
      <SEOHead
        title="Новости морской отрасли | Центр Притяжения"
        description="Актуальные новости судоподъёма, морских перевозок и портовой инфраструктуры. Следите за последними событиями отрасли."
        keywords="морские новости, судоподъём новости, порт новости, морская отрасль"
        canonical="/news"
      />
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Новости", href: "/news" }]} />
          <AnimatedSection>
            <SectionHeader
              badge="Новости"
              title="Новости морской отрасли"
              description="Актуальные события в сфере судоподъёма и морских работ"
            />
          </AnimatedSection>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : data?.items.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Новости скоро появятся</p>
            </div>
          ) : (
            <>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.items.map((item) => (
                  <StaggerItem key={item.id}>
                    <Link to={`/news/${item.slug}`} className="block group">
                      <div className="card-ocean overflow-hidden h-full flex flex-col">
                        {item.image_url && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(item.created_at), "dd MMMM yyyy", { locale: ru })}
                          </div>
                          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                            {item.description?.slice(0, 150)}
                          </p>
                          <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 font-medium">
                            Читать далее <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      variant={page === i ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(i)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
