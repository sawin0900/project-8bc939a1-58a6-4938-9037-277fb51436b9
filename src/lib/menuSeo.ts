export const MENU_PAGE_KEYS = [
  'home',
  'services',
  'dismantling',
  'stages',
  'documentation',
  'projects',
  'emergency',
  'news',
  'articles',
  'faq',
  'contacts',
] as const;

export type MenuPageKey = (typeof MENU_PAGE_KEYS)[number];

const BRAND_SUFFIX = ' | Центр Притяжения';

const sanitize = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const truncateTo160 = (value: string) => {
  if (value.length <= 160) return value;
  return `${value.slice(0, 157).trimEnd()}...`;
};

const enforceDescriptionLength = (value: string, pageName: string) => {
  let prepared = sanitize(value);
  if (!prepared) {
    prepared = `${pageName} — услуги компании «Центр Притяжения»: судоподъём, водолазные и аварийные работы в Приморском крае. Консультация и сопровождение проекта под ключ.`;
  }

  if (prepared.length < 140) {
    prepared = `${prepared} Центр Притяжения выполняет работы по нормативам РФ и обеспечивает полный цикл сопровождения проекта.`;
  }

  return truncateTo160(prepared);
};

export function resolveMenuSeo(params: {
  pageName: string;
  manualTitle?: string | null;
  manualDescription?: string | null;
  fallbackDescription?: string;
  fallbackText?: string;
}) {
  const {
    pageName,
    manualTitle,
    manualDescription,
    fallbackDescription,
    fallbackText,
  } = params;

  const title = sanitize(manualTitle || '') || `${pageName}${BRAND_SUFFIX}`;
  const sourceForDescription =
    sanitize(manualDescription || '') ||
    sanitize(fallbackDescription || '') ||
    sanitize(fallbackText || '') ||
    pageName;

  const description = enforceDescriptionLength(sourceForDescription, pageName);

  return {
    title,
    description,
  };
}
