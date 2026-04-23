import { cn } from "@/lib/utils";

const PHONE_DIGITS = "79247301454";

const messengers = [
  {
    label: "Max",
    href: "https://web.max.ru",
    title: "Мессенджер Max — найдите нас по номеру +7 (924) 730-14-54",
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${PHONE_DIGITS}`,
    title: "Написать в WhatsApp",
  },
] as const;

type MessengerAvailabilityProps = {
  compact?: boolean;
  className?: string;
};

export function MessengerAvailability({ compact, className = "" }: MessengerAvailabilityProps) {
  return (
    <div className={cn(compact && "flex flex-col items-center text-center", className)}>
      <p className={cn("font-medium text-foreground", compact ? "text-xs mb-2" : "text-sm mb-3")}>
        Быстрая связь в мессенджерах
      </p>
      <div className={cn("flex flex-wrap gap-2", compact && "justify-center")}>
        {messengers.map((m) => (
          <a
            key={m.label}
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            title={m.title}
            className="inline-flex items-center rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            {m.label}
          </a>
        ))}
      </div>
      {!compact && (
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
          Свяжитесь с нами по номеру{" "}
          <a href="tel:+79247301454" className="text-primary hover:underline">
            +7 (924) 730-14-54
          </a>{" "}
          через WhatsApp или Max.
        </p>
      )}
    </div>
  );
}
