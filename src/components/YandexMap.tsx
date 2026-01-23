import { useEffect, useRef } from 'react';

interface YandexMapProps {
  center?: [number, number]; // [широта, долгота]
  zoom?: number;
  className?: string;
  address?: string;
}

export function YandexMap({ 
  center = [43.1155, 131.8855], // Владивосток по умолчанию
  zoom = 13,
  className = '',
  address = 'г. Владивосток'
}: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Загружаем Яндекс.Карты API
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU';
    script.async = true;

    script.onload = () => {
      if (window.ymaps && mapRef.current) {
        window.ymaps.ready(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.destroy();
          }

          mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
            controls: ['zoomControl', 'fullscreenControl']
          });

          // Добавляем метку
          const placemark = new window.ymaps.Placemark(
            center,
            {
              balloonContent: address,
              iconCaption: 'Центр Притяжения'
            },
            {
              preset: 'islands#blueCircleDotIcon',
              iconColor: '#3b82f6'
            }
          );

          mapInstanceRef.current.geoObjects.add(placemark);
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [center, zoom, address]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full rounded-lg overflow-hidden ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
}

// Расширяем Window для TypeScript
declare global {
  interface Window {
    ymaps: any;
  }
}
