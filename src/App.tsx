import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import { usePageTracking } from "@/hooks/usePageTracking";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Services from "./pages/Services";
import WorkStages from "./pages/WorkStages";
import Documentation from "./pages/Documentation";
import Projects from "./pages/Projects";
import Emergency from "./pages/Emergency";
import Articles from "./pages/Articles";
import FAQ from "./pages/FAQ";
import Contacts from "./pages/Contacts";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminAnalytics from "./pages/AdminAnalytics";
import DismantlingCutting from "./pages/DismantlingCutting";
import NotFound from "./pages/NotFound";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { I18nProvider, useI18n } from "@/i18n";

// Article pages
import ChtoDelatEsliZatonuloSudno from "./pages/articles/ChtoDelatEsliZatonuloSudno";
import OtvetstvennostZaZatonuvsheImuschestvo from "./pages/articles/OtvetstvennostZaZatonuvsheImuschestvo";
import KakProhodyatSoglasovaniya from "./pages/articles/KakProhodyatSoglasovaniya";
import KtoImeetPravoVypolnyatRaboty from "./pages/articles/KtoImeetPravoVypolnyatRaboty";
import MetodyPodemaZatonuvshihSudov from "./pages/articles/MetodyPodemaZatonuvshihSudov";
import EkologicheskieRiskiZatonuvshihSudov from "./pages/articles/EkologicheskieRiskiZatonuvshihSudov";
import StoimostSudopodemnyRabot from "./pages/articles/StoimostSudopodemnyRabot";
import VodolaznoeObsledovanieSudov from "./pages/articles/VodolaznoeObsledovanieSudov";
import SudopodaemVPrimorye from "./pages/articles/SudopodaemVPrimorye";
import UtilizaciyaZatonuvshihSudov from "./pages/articles/UtilizaciyaZatonuvshihSudov";
import StrahovanieSudopodemnyRabot from "./pages/articles/StrahovanieSudopodemnyRabot";
import PodgotovkaProektaSudopodema from "./pages/articles/PodgotovkaProektaSudopodema";
import BezopasnostVodolaznyRabot from "./pages/articles/BezopasnostVodolaznyRabot";
import ChtoDelayutSZatonuvshimSudnomPoslePodema from "./pages/articles/ChtoDelayutSZatonuvshimSudnomPoslePodema";
import PravovoeRegulirovanieZatonuvshihSudov from "./pages/articles/PravovoeRegulirovanieZatonuvshihSudov";
import OborudovanieDlyaSudopodema from "./pages/articles/OborudovanieDlyaSudopodema";
import OchistkaAkvatoriyOtZatonuvshihSudov from "./pages/articles/OchistkaAkvatoriyOtZatonuvshihSudov";
import ZimnieSudopodemnyyeRaboty from "./pages/articles/ZimnieSudopodemnyyeRaboty";
import ObsledovaniePrichalov from "./pages/articles/ObsledovaniePrichalov";
import LikvidaciyaRazlivovNefteproduktov from "./pages/articles/LikvidaciyaRazlivovNefteproduktov";



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

function AppRoutes() {
  usePageTracking();
  return (
    <>
      <ScrollToTopOnRouteChange />
      <LanguageSEO />
      <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
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
