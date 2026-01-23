/**
 * Утилиты безопасности для защиты от XSS, инъекций и других атак
 */

/**
 * Санитизирует строку, удаляя потенциально опасные символы
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Удаляем < и >
    .replace(/javascript:/gi, '') // Удаляем javascript: протокол
    .replace(/on\w+\s*=/gi, '') // Удаляем обработчики событий (onclick=, onerror= и т.д.)
    .trim();
}

/**
 * Экранирует HTML символы для безопасного отображения
 */
export function escapeHtml(text: string): string {
  if (typeof text !== 'string') return '';
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Валидация и санитизация email
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';
  
  // Удаляем все кроме разрешенных символов для email
  return email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '')
    .substring(0, 255); // Ограничение длины
}

/**
 * Валидация и санитизация телефона
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return '';
  
  // Оставляем только цифры, +, пробелы, скобки и дефисы
  return phone
    .replace(/[^\d+\s()-]/g, '')
    .trim()
    .substring(0, 20); // Ограничение длины
}

/**
 * Валидация пароля на сложность
 */
export interface PasswordStrength {
  isValid: boolean;
  score: number; // 0-4
  feedback: string[];
}

export function validatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (password.length < 8) {
    feedback.push('Пароль должен быть не менее 8 символов');
    return { isValid: false, score: 0, feedback };
  }
  score++;

  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score < 3) {
    feedback.push('Используйте заглавные и строчные буквы, цифры и символы');
  }

  // Проверка на распространенные слабые пароли
  const commonPasswords = [
    'password', '12345678', 'qwerty', 'admin', 'letmein',
    'welcome', 'monkey', '1234567890', 'password123'
  ];
  
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    feedback.push('Пароль слишком простой');
    score = Math.max(0, score - 2);
  }

  return {
    isValid: score >= 3,
    score: Math.min(4, score),
    feedback: feedback.length > 0 ? feedback : []
  };
}

/**
 * Rate Limiter - защита от спама и брутфорса
 */
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  /**
   * Проверяет, не превышен ли лимит запросов
   * @param key - уникальный ключ (email, IP и т.д.)
   * @param maxAttempts - максимальное количество попыток
   * @param windowMs - окно времени в миллисекундах
   */
  checkLimit(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record || now > record.resetTime) {
      // Создаем новую запись
      this.attempts.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return true;
    }

    if (record.count >= maxAttempts) {
      return false; // Лимит превышен
    }

    record.count++;
    return true;
  }

  /**
   * Сбрасывает счетчик для ключа
   */
  reset(key: string): void {
    this.attempts.delete(key);
  }

  /**
   * Очищает устаревшие записи
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.attempts.entries()) {
      if (now > record.resetTime) {
        this.attempts.delete(key);
      }
    }
  }
}

// Глобальные инстансы rate limiter'ов
export const loginRateLimiter = new RateLimiter();
export const formRateLimiter = new RateLimiter();

// Очистка каждые 5 минут
if (typeof window !== 'undefined') {
  setInterval(() => {
    loginRateLimiter.cleanup();
    formRateLimiter.cleanup();
  }, 5 * 60 * 1000);
}

/**
 * Генерирует безопасный токен для CSRF защиты
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback для старых браузеров
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Валидация CSRF токена
 */
export function validateCSRFToken(token: string, storedToken: string | null): boolean {
  if (!token || !storedToken) return false;
  return token === storedToken;
}

/**
 * Санитизирует объект, рекурсивно обрабатывая все строковые значения
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key]) as any;
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    }
  }
  
  return sanitized;
}

/**
 * Проверяет, является ли строка потенциально опасной (XSS)
 */
export function isPotentiallyDangerous(input: string): boolean {
  const dangerousPatterns = [
    /<script/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /data:text\/html/gi,
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
}
