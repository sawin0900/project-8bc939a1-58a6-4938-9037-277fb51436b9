import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { 
  sanitizeString, 
  sanitizeEmail, 
  sanitizePhone, 
  formRateLimiter,
  isPotentiallyDangerous 
} from "@/lib/security";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Имя должно быть не менее 2 символов" }).max(100),
  phone: z.string().trim().min(6, { message: "Введите корректный номер телефона" }).max(20),
  email: z.string().trim().email({ message: "Введите корректный email" }).max(255).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional(),
});

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Rate limiting - максимум 3 заявки в минуту с одного email
      const rateLimitKey = formData.email.trim() || 'anonymous';
      if (!formRateLimiter.checkLimit(rateLimitKey, 3, 60 * 1000)) {
        toast({
          title: "Слишком много запросов",
          description: "Пожалуйста, подождите минуту перед отправкой следующей заявки",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Проверка на опасный контент
      const allFields = `${formData.name} ${formData.email} ${formData.phone} ${formData.message}`;
      if (isPotentiallyDangerous(allFields)) {
        toast({
          title: "Ошибка",
          description: "Обнаружен недопустимый контент в форме",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Validate form data
      contactSchema.parse(formData);
      
      // Санитизация данных перед отправкой
      const sanitizedData = {
        name: sanitizeString(formData.name.trim()),
        email: sanitizeEmail(formData.email.trim()) || "не указан",
        phone: sanitizePhone(formData.phone.trim()) || null,
        message: sanitizeString(formData.message.trim()) || "Заявка с сайта",
      };
      
      const { error } = await supabase.from("contact_submissions").insert(sanitizedData);

      if (error) {
        throw error;
      }

      // Send Telegram notification
      try {
        await supabase.functions.invoke('send-telegram-notification', {
          body: {
            name: sanitizedData.name,
            phone: sanitizedData.phone,
            email: sanitizedData.email !== "не указан" ? sanitizedData.email : null,
            message: sanitizedData.message !== "Заявка с сайта" ? sanitizedData.message : null,
          },
        });
      } catch (telegramError) {
        console.error('Telegram notification failed:', telegramError);
        // Don't fail the submission if Telegram notification fails
      }

      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить заявку. Попробуйте позже.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
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
          {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
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
          {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
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
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
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
