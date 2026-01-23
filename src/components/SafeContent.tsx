import { ReactNode } from 'react';
import { escapeHtml } from '@/lib/security';

interface SafeContentProps {
  content: string;
  className?: string;
  as?: 'p' | 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Компонент для безопасного отображения пользовательского контента
 * Автоматически экранирует HTML для защиты от XSS
 */
export function SafeContent({ 
  content, 
  className = '', 
  as: Component = 'div' 
}: SafeContentProps) {
  const safeContent = escapeHtml(content);
  
  return <Component className={className} dangerouslySetInnerHTML={{ __html: safeContent }} />;
}

interface SafeTextProps {
  children: string;
  className?: string;
}

/**
 * Простой компонент для безопасного отображения текста
 */
export function SafeText({ children, className = '' }: SafeTextProps) {
  return <span className={className}>{escapeHtml(children)}</span>;
}
