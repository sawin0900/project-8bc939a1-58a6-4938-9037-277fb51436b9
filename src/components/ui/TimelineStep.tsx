interface TimelineStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export function TimelineStep({ number, title, description, isLast }: TimelineStepProps) {
  return (
    <div className="relative flex gap-6">
      {/* Line */}
      {!isLast && (
        <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-2rem)] bg-border" />
      )}
      
      {/* Number */}
      <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">
        {number}
      </div>
      
      {/* Content */}
      <div className="pb-8">
        <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
