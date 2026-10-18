'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const languages = [
  { code: 'tr', label: 'TR', name: 'Türkçe', flag: 'https://flagcdn.com/w40/tr.png' },
  { code: 'en', label: 'EN', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'de', label: 'DE', name: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  // Dışarı tıklanınca menüyü kapat
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Aktif Dil Butonu */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-2 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-md transition-all hover:border-teal-500 hover:bg-slate-50 active:scale-95"
      >
        <img
          src={currentLang.flag}
          alt={currentLang.name}
          className="h-3.5 w-5 rounded-[2px] object-cover shadow-xs"
        />
        <span>{currentLang.label}</span>
        <svg
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-600' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Açılır Menü (Dropdown) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-xl ring-1 ring-slate-900/5 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                locale === lang.code
                  ? 'bg-teal-50 text-teal-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="h-3.5 w-5 rounded-[2px] object-cover shadow-xs"
              />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}