import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, message, latitude, longitude, photoUrl } = await req.json();

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
      throw new Error(`Telegram error: ${messageResult.description}`);
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

    // Send photo if available
    if (photoUrl) {
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

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending telegram notification:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function escapeMarkdown(text: string): string {
  if (!text) return '';
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}
