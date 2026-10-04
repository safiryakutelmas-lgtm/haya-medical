import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'en', 'de'],
  defaultLocale: 'tr',
  pathnames: {
    // Tüm makale linklerini buraya ekleyeceğiz
    '/dhi-sac-ekimi': {
      tr: '/dhi-sac-ekimi',
      en: '/dhi-hair-transplant',
      de: '/dhi-haartransplantation'
    },
    '/fue-sac-ekimi': {
      tr: '/fue-sac-ekimi',
      en: '/fue-hair-transplant',
      de: '/fue-haartransplantation'
    },
    '/neden-turkiyede-sac-ektirmelisin': {
  tr: '/neden-turkiyede-sac-ektirmelisin',
  en: '/why-get-a-hair-transplant-in-turkey',
  de: '/warum-eine-haartransplantation-in-tuerkei'
    }
  }
  
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);