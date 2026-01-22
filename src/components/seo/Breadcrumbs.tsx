import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeNames: Record<string, string> = {
  '/': 'Главная',
  '/services': 'Услуги',
  '/services/dismantling-cutting': 'Демонтаж и резка',
  '/stages': 'Этапы работ',
  '/documentation': 'Документация',
  '/projects': 'Проекты',
  '/emergency': 'Аварийные работы',
  '/articles': 'Статьи',
  '/faq': 'FAQ',
  '/contacts': 'Контакты',
};

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from current path if items not provided
  const breadcrumbs: BreadcrumbItem[] = items || (() => {
    const paths = location.pathname.split('/').filter(Boolean);
    const result: BreadcrumbItem[] = [{ name: 'Главная', href: '/' }];
    
    let currentPath = '';
    for (const path of paths) {
      currentPath += `/${path}`;
      const name = routeNames[currentPath] || path;
      result.push({ name, href: currentPath });
    }
    
    return result;
  })();

  if (breadcrumbs.length <= 1) return null;

  // Schema.org JSON-LD for BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://centr-prityazheniya.ru${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav
        aria-label="Хлебные крошки"
        className={`py-4 ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;
            
            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                )}
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {isFirst && <Home className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
