const NEWS_TITLE_SUFFIX = ' | Центр Притяжения';
const MIN_DESCRIPTION_LENGTH = 140;
const MAX_DESCRIPTION_LENGTH = 160;

function stripHtml(value: string): string {
  return value
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function trimDescription(text: string): string {
  if (!text) return '';
  if (text.length <= MAX_DESCRIPTION_LENGTH) return text;

  const nearLimit = text.slice(0, MAX_DESCRIPTION_LENGTH + 1);
  const cutByWord = nearLimit.lastIndexOf(' ');
  const hardCut = cutByWord >= MIN_DESCRIPTION_LENGTH ? cutByWord : MAX_DESCRIPTION_LENGTH;
  return `${text.slice(0, hardCut).trim()}…`;
}

function transliterateRu(value: string): string {
  const translitMap: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'cz',
    ч: 'ch', ш: 'sh', щ: 'shh', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  };

  return value
    .toLowerCase()
    .split('')
    .map((char) => translitMap[char] ?? char)
    .join('');
}

export function generateNewsMetaTitle(title: string): string {
  const normalizedTitle = title.trim();
  if (!normalizedTitle) return `Новость${NEWS_TITLE_SUFFIX}`;
  return normalizedTitle.endsWith(NEWS_TITLE_SUFFIX)
    ? normalizedTitle
    : `${normalizedTitle}${NEWS_TITLE_SUFFIX}`;
}

export function generateNewsMetaDescription(params: {
  description?: string | null;
  content?: string | null;
  fallbackTitle?: string;
}): string {
  const sourceText = params.description?.trim() || stripHtml(params.content || '');
  if (sourceText) return trimDescription(sourceText);
  return trimDescription(params.fallbackTitle?.trim() || 'Новости морской отрасли и судоподъёмных работ.');
}

export function generateNewsSlug(title: string): string {
  const base = transliterateRu(title)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  return `${base || 'news'}-${Date.now().toString(36)}`;
}
