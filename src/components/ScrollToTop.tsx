import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Показываем кнопку после прокрутки на 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Слушаем событие прокрутки
    window.addEventListener('scroll', toggleVisibility);

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Плавная прокрутка
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50',
        'h-12 w-12 rounded-full shadow-lg transition-all duration-300',
        'bg-primary hover:bg-primary/90 text-primary-foreground',
        'hover:scale-110 active:scale-95',
        'btn-glow',
        'border-2 border-primary/20',
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Вернуться наверх"
      title="Вернуться наверх"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
