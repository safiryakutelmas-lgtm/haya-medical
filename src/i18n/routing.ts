import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'en', 'de'],
  defaultLocale: 'tr',
});

// Dil duyarlı yönlendirme bileşenleri
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);