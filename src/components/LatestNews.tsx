import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function LatestNews() {
  const { data: news } = useQuery({
    queryKey: ["latest-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, slug, description, image_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });

  if (!news || news.length === 0) return null;

  return (
    <section className="section-padding bg-ocean-dark">
      <div className="container-custom">
        <AnimatedSection>
          <SectionHeader
            badge="Новости"
            title="Последние новости"
            description="Актуальные события в морской отрасли и судоподъёмных работах"
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 6).map((item) => (
            <StaggerItem key={item.id}>
              <Link to={`/news/${item.slug}`} className="block group h-full">
                <div className="card-ocean overflow-hidden h-full flex flex-col">
                  {item.image_url ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-muted-foreground" />
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

        <AnimatedSection delay={0.3} className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/news">
              Все новости
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
