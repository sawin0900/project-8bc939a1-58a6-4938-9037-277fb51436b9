import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider } from "react-helmet-async";
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
import DismantlingCutting from "./pages/DismantlingCutting";
import NotFound from "./pages/NotFound";

// Article pages
import ChtoDelatEsliZatonuloSudno from "./pages/articles/ChtoDelatEsliZatonuloSudno";
import OtvetstvennostZaZatonuvsheImuschestvo from "./pages/articles/OtvetstvennostZaZatonuvsheImuschestvo";
import KakProhodyatSoglasovaniya from "./pages/articles/KakProhodyatSoglasovaniya";
import KtoImeetPravoVypolnyatRaboty from "./pages/articles/KtoImeetPravoVypolnyatRaboty";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
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
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
