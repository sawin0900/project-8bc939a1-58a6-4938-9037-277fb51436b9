import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, ArrowRight, Newspaper, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { ru } from "date-fns/locale";

const DATE_FILTERS = [
  { label: "Все", value: "all" },
  { label: "Сегодня", value: "today" },
  { label: "Неделя", value: "week" },
  { label: "Месяц", value: "month" },
  { label: "3 месяца", value: "3months" },
] as const;

type DateFilter = typeof DATE_FILTERS[number]["value"];

function getDateRange(filter: DateFilter): { from?: string; to?: string } {
  const now = new Date();
  switch (filter) {
    case "today": {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return { from: start.toISOString() };
    }
    case "week": {
      const start = new Date(now);
      start.setDate(start.getDate() - 7);
      return { from: start.toISOString() };
    }
    case "month": {
      return { from: startOfMonth(now).toISOString(), to: endOfMonth(now).toISOString() };
    }
    case "3months": {
      return { from: subMonths(now, 3).toISOString() };
    }
    default:
      return {};
  }
}

export default function News() {
  const [page, setPage] = useState(0);
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const pageSize = 12;

  const { data, isLoading } = useQuery({
    queryKey: ["news", page, dateFilter],
    queryFn: async () => {
      let query = supabase
        .from("news")
        .select("id, title, slug, description, image_url, created_at", { count: "exact" })
        .eq("published", true)
        .order("created_at", { ascending: false });

      const range = getDateRange(dateFilter);
      if (range.from) query = query.gte("created_at", range.from);
      if (range.to) query = query.lte("created_at", range.to);

      query = query.range(page * pageSize, (page + 1) * pageSize - 1);

      const { data, error, count } = await query;
      if (error) throw error;
      return { items: data || [], count: count || 0 };
    },
  });

  const totalPages = Math.ceil((data?.count || 0) / pageSize);

  const handleFilterChange = (filter: DateFilter) => {
    setDateFilter(filter);
    setPage(0);
  };

  return (
    <Layout pageClass="page-news">
      <SEOHead
        title="Новости морской отрасли | Центр Притяжения"
        description="Актуальные новости судоподъёма, морских перевозок и портовой инфраструктуры."
        keywords="морские новости, судоподъём новости, порт новости, морская отрасль"
        canonical="/news"
      />
      <section className="pt-32 pb-20 hero relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Новости", href: "/news" }]} />
          <AnimatedSection>
            <SectionHeader
              badge="Новости"
              title="Новости морской отрасли"
              description="Актуальные события в сфере судоподъёма и морских работ"
            />
          </AnimatedSection>

          {/* Date filter */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {DATE_FILTERS.map((f) => (
                <Button
                  key={f.value}
                  variant={dateFilter === f.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange(f.value)}
                >
                  {f.label}
                </Button>
              ))}
              {data && (
                <span className="ml-auto text-sm text-muted-foreground">
                  Найдено: {data.count}
                </span>
              )}
            </div>
          </AnimatedSection>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : data?.items.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Новости не найдены</p>
              {dateFilter !== "all" && (
                <Button variant="link" onClick={() => handleFilterChange("all")} className="mt-2">
                  Сбросить фильтр
                </Button>
              )}
            </div>
          ) : (
            <>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.items.map((item) => (
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => {
                    // Show first, last, current and neighbors
                    if (i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1) {
                      return (
                        <Button
                          key={i}
                          variant={page === i ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPage(i)}
                        >
                          {i + 1}
                        </Button>
                      );
                    }
                    if (i === 1 && page > 2) return <span key={i} className="text-muted-foreground">…</span>;
                    if (i === totalPages - 2 && page < totalPages - 3) return <span key={i} className="text-muted-foreground">…</span>;
                    return null;
                  })}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page === totalPages - 1}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
