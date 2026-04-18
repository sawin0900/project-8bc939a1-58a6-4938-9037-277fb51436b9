import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, MapPin, Camera, X, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Имя должно быть не менее 2 символов" }).max(100),
  phone: z.string().trim().min(6, { message: "Введите корректный номер телефона" }).max(20),
  email: z.string().trim().email({ message: "Введите корректный email" }).max(255).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional(),
});

interface LocationData {
  latitude: number;
  longitude: number;
}

export function ContactForm() {
  const formInitTimeRef = useRef<number>(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const requestLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Геолокация не поддерживается вашим браузером");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsGettingLocation(false);
        toast({
          title: "Геолокация получена",
          description: "Ваше местоположение будет отправлено с заявкой",
        });
      },
      (error) => {
        let errorMessage = "Не удалось определить местоположение";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Доступ к геолокации запрещён";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Информация о местоположении недоступна";
            break;
          case error.TIMEOUT:
            errorMessage = "Время ожидания истекло";
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Неподдерживаемый формат",
        description: "Разрешены только JPG, PNG, WEBP, HEIC",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Файл слишком большой",
        description: "Максимальный размер файла — 5 МБ",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `submissions/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('contact-attachments')
      .upload(filePath, file, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      });

    if (uploadError) {
      if (import.meta.env.DEV) {
        console.error('Upload error:', uploadError);
      }
      toast({
        title: 'Не удалось загрузить фото',
        description: import.meta.env.DEV ? uploadError.message : 'Попробуйте другое фото или повторите позже.',
        variant: 'destructive',
      });
      return null;
    }

    // Generate signed URL for immediate use (1 hour expiry)
    const { data: signedData } = await supabase.storage
      .from('contact-attachments')
      .createSignedUrl(filePath, 3600);

    return signedData?.signedUrl || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Honeypot anti-spam check (bots often fill hidden fields)
      if (formData.website.trim()) {
        toast({
          title: "Заявка отправлена",
          description: "Мы свяжемся с вами в ближайшее время",
        });
        setIsLoading(false);
        return;
      }

      // Time-based anti-spam check (very fast submits are likely bots)
      const secondsSinceFormOpen = (Date.now() - formInitTimeRef.current) / 1000;
      if (secondsSinceFormOpen < 3) {
        toast({
          title: "Пожалуйста, проверьте форму",
          description: "Отправка слишком быстрая. Попробуйте ещё раз.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Validate form data
      contactSchema.parse(formData);

      // Upload photo if selected
      let photoUrl: string | null = null;
      if (selectedFile) {
        photoUrl = await uploadPhoto(selectedFile);
        if (!photoUrl) {
          toast({
            title: "Ошибка загрузки фото",
            description: "Заявка будет отправлена без фото",
            variant: "destructive",
          });
        }
      }
      
      const { data: insertedSubmission, error } = await supabase
        .from("contact_submissions")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim() || "не указан",
          phone: formData.phone.trim() || null,
          message: formData.message.trim() || "Заявка с сайта",
          latitude: location?.latitude || null,
          longitude: location?.longitude || null,
          photo_url: photoUrl,
        })
        .select("id")
        .single();

      if (error) {
        throw error;
      }

      // Send Telegram notification with location and photo
      try {
        await supabase.functions.invoke('send-telegram-notification', {
          body: {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim() || null,
            message: formData.message.trim() || null,
            latitude: location?.latitude || null,
            longitude: location?.longitude || null,
            photoUrl: photoUrl,
            submissionId: insertedSubmission?.id || null,
          },
        });
      } catch (telegramError) {
        if (import.meta.env.DEV) {
          console.error('Telegram notification failed:', telegramError);
        }
      }

      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      setFormData({ name: "", phone: "", email: "", message: "", website: "" });
      formInitTimeRef.current = Date.now();
      setLocation(null);
      removeFile();
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
        <Input
          id="website"
          type="text"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
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

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Прикрепить фото
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            onChange={handleFileSelect}
            className="hidden"
            id="photo-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            {selectedFile ? "Изменить фото" : "Выбрать фото"}
          </Button>
          {previewUrl && (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG, WEBP до 5 МБ
        </p>
      </div>

      {/* Geolocation */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Местоположение объекта
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={requestLocation}
            disabled={isGettingLocation || !!location}
            className="flex items-center gap-2"
          >
            {isGettingLocation ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Определение...
              </>
            ) : location ? (
              <>
                 <CheckCircle className="w-4 h-4 text-primary" />
                Геолокация получена
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                Определить местоположение
              </>
            )}
          </Button>
          {location && (
            <button
              type="button"
              onClick={() => setLocation(null)}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Сбросить
            </button>
          )}
        </div>
        {locationError && (
          <p className="text-destructive text-sm mt-1">{locationError}</p>
        )}
        {location && (
          <p className="text-xs text-muted-foreground mt-1">
            📍 {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" required className="mt-1 h-4 w-4" />
          <span>
            Я соглашаюсь с{" "}
            <Link to="/privacy-policy" className="text-primary underline underline-offset-2">
              политикой конфиденциальности
            </Link>
          </span>
        </label>
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
