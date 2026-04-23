import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="404 — Страница не найдена | Центр Притяжения"
        description="Похоже, вы нашли затонувшую страницу. Вернитесь на главную и продолжите навигацию по сайту."
        canonical="/404"
        noindex
      />
      <main className="min-h-screen bg-muted/30 pt-24 pb-10 px-4 flex items-center justify-center">
        <section className="max-w-2xl w-full rounded-2xl border border-border bg-background p-6 sm:p-10 shadow-xl text-center">
          <img
            src="/images/404-underwater.svg"
            alt="Иллюстрация затонувшей страницы"
            className="mx-auto mb-6 w-full max-w-md"
          />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-foreground mb-2">Похоже, вы нашли затонувшую страницу 😄</p>
          <p className="text-muted-foreground mb-8">
            Такой страницы нет или она была перемещена. Давайте вернёмся в безопасную гавань.
          </p>
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-5 py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Вернуться на главную
          </Link>
        </section>
      </main>
    </>
  );
};

export default NotFound;
