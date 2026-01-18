import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами в ближайшее время",
    });

    setFormData({ name: "", phone: "", email: "", message: "" });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Имя *
          </label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ваше имя"
            className="bg-muted border-border"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Телефон *
          </label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+7 (___) ___-__-__"
            className="bg-muted border-border"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
          className="bg-muted border-border"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Сообщение
        </label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Опишите вашу задачу..."
          rows={4}
          className="bg-muted border-border resize-none"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit" disabled={isLoading} className="flex-1 btn-glow">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Отправка...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Отправить заявку
            </>
          )}
        </Button>
        <Button type="button" variant="outline" asChild>
          <a 
            href="https://t.me/morproekt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Написать в Telegram
          </a>
        </Button>
      </div>
    </form>
  );
}
