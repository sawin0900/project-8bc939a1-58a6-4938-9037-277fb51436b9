import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";

// ленивые импорты страниц
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const WorkStages = lazy(() => import("./pages/WorkStages"));
const Documentation = lazy(() => import("./pages/Documentation"));
const Projects = lazy(() => import("./pages/Projects"));
const Emergency = lazy(() => import("./pages/Emergency"));
const Articles = lazy(() => import("./pages/Articles"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const DismantlingCutting = lazy(() => import("./pages/DismantlingCutting"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-background text-foreground text-xl">Загрузка...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/dismantling-cutting" element={<DismantlingCutting />} />
                  <Route path="/stages" element={<WorkStages />} />
                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;