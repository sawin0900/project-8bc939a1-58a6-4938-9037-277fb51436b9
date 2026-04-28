import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "../ui/ScrollToTop";
import { cn } from "@/lib/utils";
import { AdSlot } from "@/components/ads/AdSlot";

interface LayoutProps {
  children: ReactNode;
  /** Optional page scope for CSS hero backgrounds, e.g. `page-services` */
  pageClass?: string;
}

export function Layout({ children, pageClass }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-20 container-custom">
        <AdSlot position="top" className="max-w-5xl mx-auto mt-4" />
      </div>
      <main className={cn("flex-1", pageClass)}>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
