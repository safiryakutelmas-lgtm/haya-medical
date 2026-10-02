import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Sadece dile bağlı rotaları yakala (static dosyaları, api rotalarını es geç)
  matcher: ['/', '/(de|en|tr)/:path*']
};