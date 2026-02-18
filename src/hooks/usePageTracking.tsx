import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function getVisitorId(): string {
  let id = localStorage.getItem('_vid');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('_vid', id);
  }
  return id;
}

function getSessionId(): string {
  let id = sessionStorage.getItem('_sid');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('_sid', id);
  }
  return id;
}

function detectDevice(w: number): string {
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function detectBrowser(ua: string): string {
  if (ua.includes('YaBrowser')) return 'Yandex Browser';
  if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
}

function detectOS(ua: string): string {
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  if (ua.includes('Linux')) return 'Linux';
  return 'Other';
}

export function usePageTracking() {
  const location = useLocation();
  const enterTimeRef = useRef<number>(Date.now());
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const now = Date.now();
    const duration = prevPathRef.current ? Math.round((now - enterTimeRef.current) / 1000) : 0;

    // Send duration update for previous page
    if (prevPathRef.current && duration > 0) {
      sendTrack(prevPathRef.current, duration);
    }

    // Track new page
    enterTimeRef.current = now;
    prevPathRef.current = location.pathname;
    sendTrack(location.pathname, 0);

    // Track exit on unload
    const handleUnload = () => {
      const exitDuration = Math.round((Date.now() - enterTimeRef.current) / 1000);
      if (exitDuration > 0) {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visit`;
        const payload = buildPayload(location.pathname, exitDuration);
        navigator.sendBeacon(url, JSON.stringify(payload));
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [location.pathname]);
}

function buildPayload(path: string, duration: number) {
  const ua = navigator.userAgent;
  return {
    session_id: getSessionId(),
    visitor_id: getVisitorId(),
    page_path: path,
    referrer: document.referrer || null,
    device_type: detectDevice(window.innerWidth),
    browser: detectBrowser(ua),
    os: detectOS(ua),
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    duration_seconds: duration,
  };
}

function sendTrack(path: string, duration: number) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visit`;
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildPayload(path, duration)),
    keepalive: true,
  }).catch(() => {});
}
