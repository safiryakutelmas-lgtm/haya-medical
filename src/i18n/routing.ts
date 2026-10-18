import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'en', 'de'],
  defaultLocale: 'tr',
  pathnames: {
    // 1. DHI Saç Ekimi
    '/dhi-sac-ekimi': {
      tr: '/dhi-sac-ekimi',
      en: '/dhi-hair-transplant',
      de: '/dhi-haartransplantation'
    },

    // 2. Erkek Tipi Saç Dökülmesi
    '/erkek-tipi-dokulme': {
      tr: '/erkek-tipi-dokulme',
      en: '/male-pattern-baldness',
      de: '/maennlicher-haarausfall'
    },

    // 3. FUE Saç Ekimi
    '/fue-sac-ekimi': {
      tr: '/fue-sac-ekimi',
      en: '/fue-hair-transplant',
      de: '/fue-haartransplantation'
    },

    // 4. Neden Türkiye
    '/neden-turkiyede-sac-ektirmelisin': {
      tr: '/neden-turkiyede-sac-ektirmelisin',
      en: '/why-get-a-hair-transplant-in-turkey',
      de: '/warum-eine-haartransplantation-in-tuerkei'
    },

    // 5. PRP & Kök Hücre Tedavisi
    '/prp-kok-hucre': {
      tr: '/prp-kok-hucre',
      en: '/prp-and-stem-cell-therapy',
      de: '/prp-und-stammzellentherapie'
    },

    // 6. Saç Dökülmesi Nedenleri
    '/sac-dokulmesi-nedenleri': {
      tr: '/sac-dokulmesi-nedenleri',
      en: '/causes-of-hair-loss',
      de: '/ursachen-von-haarausfall'
    },

    // 7. Saç Ekimi Süreci
    '/sac-ekimi-sureci': {
      tr: '/sac-ekimi-sureci',
      en: '/hair-transplant-process',
      de: '/haartransplantation-ablauf'
    },

    // 8. Sakal ve Bıyık Ekimi
    '/sakal-biyik-ekimi': {
      tr: '/sakal-biyik-ekimi',
      en: '/beard-and-mustache-transplant',
      de: '/bart-und-schnurrbarttransplantation'
    },

    // Platform Genel Sayfaları
    '/clinics': {
      tr: '/klinikler',
      en: '/clinics',
      de: '/kliniken'
    },
     '/doctors': {
      tr: '/Doktorlar',
      en: '/Doctors',
      de: '/Aerzte'
    }
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);