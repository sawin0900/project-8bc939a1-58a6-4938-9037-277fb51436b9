import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://centr-prityazheniya.ru",
  "https://www.centr-prityazheniya.ru",
  "http://localhost:5173",
]);

function buildCorsHeaders(origin: string | null) {
  const safeOrigin = origin && allowedOrigins.has(origin) ? origin : "https://centr-prityazheniya.ru";
  return {
    "Access-Control-Allow-Origin": safeOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

// Simple in-memory rate limiting (per function instance)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const key = identifier.toLowerCase();
  
  // Clean up old entries
  for (const [k, timestamp] of rateLimitMap.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(k);
    }
  }
  
  const lastRequest = rateLimitMap.get(key);
  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS / MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  rateLimitMap.set(key, now);
  return false;
}

// Input validation schema
function validateInput(data: Record<string, unknown>): { valid: boolean; error?: string } {
  const { name, phone, email, message, latitude, longitude, photoUrl, submissionId } = data;
  
  // Required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'Name is too long (max 100 characters)' };
  }
  
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    return { valid: false, error: 'Phone is required' };
  }
  if (phone.length > 30) {
    return { valid: false, error: 'Phone is too long (max 30 characters)' };
  }
  
  // Email validation
  if (email && typeof email === 'string') {
    if (email.length > 255) {
      return { valid: false, error: 'Email is too long (max 255 characters)' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Invalid email format' };
    }
  }
  
  // Message validation
  if (message && typeof message === 'string' && message.length > 2000) {
    return { valid: false, error: 'Message is too long (max 2000 characters)' };
  }
  
  // Coordinates validation
  if (latitude !== undefined && latitude !== null) {
    if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
      return { valid: false, error: 'Invalid latitude' };
    }
  }
  if (longitude !== undefined && longitude !== null) {
    if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
      return { valid: false, error: 'Invalid longitude' };
    }
  }
  
  // Photo URL validation
  if (photoUrl && typeof photoUrl === 'string') {
    if (photoUrl.length > 2000) {
      return { valid: false, error: 'Photo URL is too long' };
    }
    // Only allow URLs from our Supabase storage
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    if (!supabaseUrl || !photoUrl.startsWith(supabaseUrl)) {
      return { valid: false, error: 'Invalid photo URL' };
    }
  }

  if (submissionId !== undefined && submissionId !== null) {
    if (typeof submissionId !== "string") {
      return { valid: false, error: "Invalid submission ID" };
    }
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(submissionId)) {
      return { valid: false, error: "Invalid submission ID format" };
    }
  }
  
  return { valid: true };
}

serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await req.json();
    const { name, phone, email, message, latitude, longitude, photoUrl, submissionId } = data;

    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting by phone number
    const rateLimitKey = phone || email || 'anonymous';
    if (isRateLimited(rateLimitKey)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait before trying again.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If submissionId is provided, verify it exists in database
    if (submissionId) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      
      const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
      
      const { data: submission, error: fetchError } = await supabaseClient
        .from('contact_submissions')
        .select('id')
        .eq('id', submissionId)
        .single();
      
      if (fetchError || !submission) {
        console.error('Submission not found:', submissionId);
        return new Response(
          JSON.stringify({ error: 'Invalid submission' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!botToken || !chatId) {
      throw new Error('Telegram credentials not configured');
    }

    // Build location string
    let locationText = '📍 *Геолокация:* не указана';
    let locationMapLink = '';
    if (latitude && longitude) {
      locationText = `📍 *Геолокация:* ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
      locationMapLink = `\n🗺 [Открыть на карте](https://yandex.ru/maps/?pt=${longitude},${latitude}&z=15&l=map)`;
    }

    const text = `🔔 *Новая заявка с сайта*

👤 *Имя:* ${escapeMarkdown(name)}
📱 *Телефон:* ${escapeMarkdown(phone)}
📧 *Email:* ${escapeMarkdown(email || 'не указан')}
💬 *Сообщение:* ${escapeMarkdown(message || 'Заявка с сайта')}

${locationText}${locationMapLink}
${photoUrl ? `📷 *Фото:* [Смотреть](${photoUrl})` : '📷 *Фото:* не прикреплено'}

📅 *Дата:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Vladivostok' })}`;

    // Send text message
    const messageResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
          disable_web_page_preview: false,
        }),
      }
    );

    const messageResult = await messageResponse.json();

    if (!messageResult.ok) {
      console.error('Telegram API error:', messageResult);
      throw new Error('Failed to send notification');
    }

    // Send location if available
    if (latitude && longitude) {
      const locationResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendLocation`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            latitude: latitude,
            longitude: longitude,
          }),
        }
      );
      await locationResponse.json(); // Consume response
    }

    // Send photo if available and from valid source
    if (photoUrl) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      // Only send photos from our own storage
      if (photoUrl.startsWith(supabaseUrl)) {
        const photoResponse = await fetch(
          `https://api.telegram.org/bot${botToken}/sendPhoto`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              photo: photoUrl,
              caption: `📷 Фото от ${escapeMarkdown(name)} (${escapeMarkdown(phone)})`,
              parse_mode: 'Markdown',
            }),
          }
        );
        await photoResponse.json(); // Consume response
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    // Don't expose internal error details to client
    console.error('Error sending telegram notification:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send notification' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function escapeMarkdown(text: string): string {
  if (!text) return '';
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}
