'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

const languages = [
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
        {languages.map((lang) => {
          const isActive = locale === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              disabled={isPending}
              onClick={() => handleLanguageChange(lang.code)}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              <span className="mr-1">{lang.flag}</span>
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}