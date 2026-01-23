interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({ badge, title, description, centered = true }: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-12`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}
