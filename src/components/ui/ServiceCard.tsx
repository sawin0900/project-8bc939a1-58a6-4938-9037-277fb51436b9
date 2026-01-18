import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  const content = (
    <div className="card-ocean p-6 h-full group hover:border-primary/50 transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
      {href && (
        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
          <span>Подробнее</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
}
