import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { usePageTracking } from "@/hooks/usePageTracking";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import { I18nProvider, useI18n } from "@/i18n";
import IndexPage from "./pages/Index";
import ServicesPage from "./pages/Services";

const shouldUseSyncRoutes = typeof window === "undefined";
const prerenderable = <T extends React.ComponentType<any>>(loader: () => Promise<{ default: T }>, syncComponent: T) => (
  shouldUseSyncRoutes ? syncComponent : lazy(loader)
);

const Index = prerenderable(() => import("./pages/Index"), IndexPage);
const Services = prerenderable(() => import("./pages/Services"), ServicesPage);
const ServiceLanding = lazy(() => import("./pages/ServiceLanding"));
const WorkStages = lazy(() => import("./pages/WorkStages"));
const Documentation = lazy(() => import("./pages/Documentation"));
const Projects = lazy(() => import("./pages/Projects"));
const Emergency = lazy(() => import("./pages/Emergency"));
const Articles = lazy(() => import("./pages/Articles"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics"));
const DismantlingCutting = lazy(() => import("./pages/DismantlingCutting"));
const NotFound = lazy(() => import("./pages/NotFound"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const ChtoDelatEsliZatonuloSudno = lazy(() => import("./pages/articles/ChtoDelatEsliZatonuloSudno"));
const OtvetstvennostZaZatonuvsheImuschestvo = lazy(() => import("./pages/articles/OtvetstvennostZaZatonuvsheImuschestvo"));
const KakProhodyatSoglasovaniya = lazy(() => import("./pages/articles/KakProhodyatSoglasovaniya"));
const KtoImeetPravoVypolnyatRaboty = lazy(() => import("./pages/articles/KtoImeetPravoVypolnyatRaboty"));
const MetodyPodemaZatonuvshihSudov = lazy(() => import("./pages/articles/MetodyPodemaZatonuvshihSudov"));
const EkologicheskieRiskiZatonuvshihSudov = lazy(() => import("./pages/articles/EkologicheskieRiskiZatonuvshihSudov"));
const StoimostSudopodemnyRabot = lazy(() => import("./pages/articles/StoimostSudopodemnyRabot"));
const VodolaznoeObsledovanieSudov = lazy(() => import("./pages/articles/VodolaznoeObsledovanieSudov"));
const SudopodaemVPrimorye = lazy(() => import("./pages/articles/SudopodaemVPrimorye"));
const UtilizaciyaZatonuvshihSudov = lazy(() => import("./pages/articles/UtilizaciyaZatonuvshihSudov"));
const StrahovanieSudopodemnyRabot = lazy(() => import("./pages/articles/StrahovanieSudopodemnyRabot"));
const PodgotovkaProektaSudopodema = lazy(() => import("./pages/articles/PodgotovkaProektaSudopodema"));
const BezopasnostVodolaznyRabot = lazy(() => import("./pages/articles/BezopasnostVodolaznyRabot"));
const ChtoDelayutSZatonuvshimSudnomPoslePodema = lazy(() => import("./pages/articles/ChtoDelayutSZatonuvshimSudnomPoslePodema"));
const PravovoeRegulirovanieZatonuvshihSudov = lazy(() => import("./pages/articles/PravovoeRegulirovanieZatonuvshihSudov"));
const OborudovanieDlyaSudopodema = lazy(() => import("./pages/articles/OborudovanieDlyaSudopodema"));
const OchistkaAkvatoriyOtZatonuvshihSudov = lazy(() => import("./pages/articles/OchistkaAkvatoriyOtZatonuvshihSudov"));
const ZimnieSudopodemnyyeRaboty = lazy(() => import("./pages/articles/ZimnieSudopodemnyyeRaboty"));
const ObsledovaniePrichalov = lazy(() => import("./pages/articles/ObsledovaniePrichalov"));
const LikvidaciyaRazlivovNefteproduktov = lazy(() => import("./pages/articles/LikvidaciyaRazlivovNefteproduktov"));


function LanguageSEO() {
  const { language } = useI18n();
  const location = useLocation();
  const baseUrl = "https://centr-prityazheniya.ru";
  const normalizedPath = location.pathname !== "/" && location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;

  return (
    <Helmet>
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${normalizedPath}?lang=en`} />
      <link rel="alternate" hrefLang="zh" href={`${baseUrl}${normalizedPath}?lang=zh`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${normalizedPath}?lang=en`} />
      <meta property="og:locale" content={language === "zh" ? "zh_CN" : "en_US"} />
    </Helmet>
  );
}

const queryClient = new QueryClient();

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

function RouteLoading() {
  return (
    <div className="min-h-screen bg-background pt-24 flex items-center justify-center text-muted-foreground">
      Загрузка раздела…
    </div>
  );
}

function AppRoutes() {
  usePageTracking();
  return (
    <>
      <ScrollToTopOnRouteChange />
      <LanguageSEO />
      <Suspense fallback={<RouteLoading />}>
        <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/sudopodem-zatonuvshih-sudov" element={<ServiceLanding slug="sudopodem-zatonuvshih-sudov" />} />
              <Route path="/vodolaznye-raboty" element={<ServiceLanding slug="vodolaznye-raboty" />} />
              <Route path="/proektnaya-dokumentaciya" element={<ServiceLanding slug="proektnaya-dokumentaciya" />} />
              <Route path="/services/dismantling-cutting" element={<DismantlingCutting />} />
              <Route path="/stages" element={<WorkStages />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/chto-delat-esli-zatonulo-sudno" element={<ChtoDelatEsliZatonuloSudno />} />
              <Route path="/articles/otvetstvennost-za-zatonuvshee-imuschestvo" element={<OtvetstvennostZaZatonuvsheImuschestvo />} />
              <Route path="/articles/kak-prohodyat-soglasovaniya" element={<KakProhodyatSoglasovaniya />} />
              <Route path="/articles/kto-imeet-pravo-vypolnyat-raboty" element={<KtoImeetPravoVypolnyatRaboty />} />
              <Route path="/articles/metody-podema-zatonuvshih-sudov" element={<MetodyPodemaZatonuvshihSudov />} />
              <Route path="/articles/ekologicheskie-riski-zatonuvshih-sudov" element={<EkologicheskieRiskiZatonuvshihSudov />} />
              <Route path="/articles/stoimost-sudopodemnyx-rabot" element={<StoimostSudopodemnyRabot />} />
              <Route path="/articles/vodolaznoye-obsledovanie-sudov" element={<VodolaznoeObsledovanieSudov />} />
              <Route path="/articles/sudopodem-v-primorye" element={<SudopodaemVPrimorye />} />
              <Route path="/articles/utilizaciya-zatonuvshih-sudov" element={<UtilizaciyaZatonuvshihSudov />} />
              <Route path="/articles/strahovanie-sudopodemnyx-rabot" element={<StrahovanieSudopodemnyRabot />} />
              <Route path="/articles/podgotovka-proekta-sudopodema" element={<PodgotovkaProektaSudopodema />} />
              <Route path="/articles/bezopasnost-vodolaznyh-rabot" element={<BezopasnostVodolaznyRabot />} />
              <Route path="/articles/chto-delayut-s-sudnom-posle-podema" element={<ChtoDelayutSZatonuvshimSudnomPoslePodema />} />
              <Route path="/articles/pravovoe-regulirovanie-zatonuvshih-sudov" element={<PravovoeRegulirovanieZatonuvshihSudov />} />
              <Route path="/articles/oborudovanie-dlya-sudopodema" element={<OborudovanieDlyaSudopodema />} />
              <Route path="/articles/ochistka-akvatoriy-ot-zatonuvshih-sudov" element={<OchistkaAkvatoriyOtZatonuvshihSudov />} />
              <Route path="/articles/zimnie-sudopodemnye-raboty" element={<ZimnieSudopodemnyyeRaboty />} />
              <Route path="/articles/obsledovanie-prichalov" element={<ObsledovaniePrichalov />} />
              <Route path="/articles/likvidaciya-razlivov-nefteproduktov" element={<LikvidaciyaRazlivovNefteproduktov />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <I18nProvider>
          <BrowserRouter>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </BrowserRouter>
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
