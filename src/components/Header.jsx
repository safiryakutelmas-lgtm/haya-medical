'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'transplants' | 'loss' | null
  const [mobileSubmenu, setMobileSubmenu] = useState(null); // 'transplants' | 'loss' | null

  const t = useTranslations('Header');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-lg shadow-teal-950/5'
            : 'bg-gradient-to-r from-white/90 via-slate-50/80 to-teal-50/30 backdrop-blur-md border-b border-slate-200/40'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Sol: Logo */}
          <Link href="/" className="group flex items-center gap-3 shrink-0" aria-label={t('home')}>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-600/30 transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 15.5V8.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" />
                <path d="M8 20v-4.5h8V20" />
                <path d="M9 11.5h6" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base font-black tracking-[0.18em] text-slate-900 uppercase">Medica</span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Hair Clinic</span>
            </span>
          </Link>

          {/* Orta: Masaüstü Modern Dropdown Menüleri ve Neden Türkiye Linki */}
          <nav aria-label={t('navLabel')} className="hidden items-center gap-1.5 lg:flex">
            
            {/* Neden Türkiye? Doğrudan Link (İşaretlediğin Alan) */}
            <Link 
              href="/neden-turkiyede-sac-ektirmelisin" 
              className="rounded-full px-4 py-2 text-sm font-semibold text-teal-700 bg-teal-50/80 ring-1 ring-teal-500/20 transition-all hover:bg-teal-100/80 hover:text-teal-800"
            >
             <span>{t('whyTurkey')}</span>
            </Link>

            {/* 1. Saç Ekimi Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('transplants')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                openDropdown === 'transplants' 
                  ? 'bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-500/20' 
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-teal-700'
              }`}>
                {t('hairTransplants')}
                <svg className={`h-4 w-4 transition-transform duration-300 ${openDropdown === 'transplants' ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown === 'transplants' && (
                <div className="absolute top-full left-0 w-80 pt-3 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="overflow-hidden rounded-3xl bg-white/95 p-2 shadow-2xl shadow-teal-950/10 backdrop-blur-2xl border border-slate-100 ring-1 ring-slate-900/5">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-400/15 blur-2xl pointer-events-none" />
                    
                    <Link href="/fue-sac-ekimi" className="group/item relative flex flex-col rounded-2xl p-3.5 transition-all hover:bg-gradient-to-r hover:from-teal-50/80 hover:to-transparent">
                      <div className="text-sm font-semibold text-slate-900 group-hover/item:text-teal-700 transition-colors">{t('hairTransplantsSub1')}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">Altın standart mikro FUE yöntemi hakkında bilmeniz gerekenler.</div>
                    </Link>
                    <Link href="/dhi-sac-ekimi" className="group/item relative flex flex-col rounded-2xl p-3.5 transition-all hover:bg-gradient-to-r hover:from-teal-50/80 hover:to-transparent">
                      <div className="text-sm font-semibold text-slate-900 group-hover/item:text-teal-700 transition-colors">{t('hairTransplantsSub2')}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">Tıraşsız ve kalem tekniğiyle sıklaştırma operasyonları.</div>
                    </Link>
                    <Link href="/sakal-biyik-ekimi" className="group/item relative flex flex-col rounded-2xl p-3.5 transition-all hover:bg-gradient-to-r hover:from-teal-50/80 hover:to-transparent">
                      <div className="text-sm font-semibold text-slate-900 group-hover/item:text-teal-700 transition-colors">{t('hairTransplantsSub3')}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">Yüz hatlarına uygun doğal kök yerleştirme estetiği.</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Saç Dökülmesi Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('loss')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                openDropdown === 'loss' 
                  ? 'bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-500/20' 
                  : 'text-slate-700 hover:bg-slate-100/80 hover:text-teal-700'
              }`}>
                {t('hairLoss')}
                <svg className={`h-4 w-4 transition-transform duration-300 ${openDropdown === 'loss' ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown === 'loss' && (
                <div className="absolute top-full left-0 w-80 pt-3 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="overflow-hidden rounded-3xl bg-white/95 p-2 shadow-2xl shadow-teal-950/10 backdrop-blur-2xl border border-slate-100 ring-1 ring-slate-900/5">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/15 blur-2xl pointer-events-none" />

                    <Link href="/sac-dokulmesi-nedenleri" className="group/item relative flex flex-col rounded-2xl p-3.5 transition-all hover:bg-gradient-to-r hover:from-teal-50/80 hover:to-transparent">
                      <div className="text-sm font-semibold text-slate-900 group-hover/item:text-teal-700 transition-colors">{t('hairLossSub1')}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">Genetik, stres, vitamin eksiklikleri ve tetikleyiciler.</div>
                    </Link>
                    <Link href="/erkek-tipi-dokulme" className="group/item relative flex flex-col rounded-2xl p-3.5 transition-all hover:bg-gradient-to-r hover:from-teal-50/80 hover:to-transparent">
                      <div className="text-sm font-semibold text-slate-900 group-hover/item:text-teal-700 transition-colors">{t('hairLossSub2')}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">Androgenetik alopesi evreleri ve önlem yolları.</div>
                    </Link>
                    <Link href="/prp-kok-hucre" className="group/item relative flex flex-col rounded-2xl p-3.5 transition-all hover:bg-gradient-to-r hover:from-teal-50/80 hover:to-transparent">
                      <div className="text-sm font-semibold text-slate-900 group-hover/item:text-teal-700 transition-colors">{t('hairLossSub3')}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">Mevcut saçları koruma ve kalitelerini artırma kürleri.</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/results" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100/80 hover:text-teal-700">
              {t('results')}
            </Link>
          </nav>

          {/* Sağ Taraf: Turkuaz Klinik Bul Butonu, Dil Seçici ve Mobil Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/clinics"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/30 transition-all duration-300 hover:bg-teal-700 hover:shadow-teal-600/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t('findClinic')}
            </Link>

            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Mobil Menü Butonu */}
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-md transition hover:border-teal-400 hover:text-teal-700 lg:hidden active:scale-95"
            >
              {isMenuOpen ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* KESİN ÇÖZÜM: Koşullu Render ({isMenuOpen && ...}) - Mobilde DOM'a anında sıfırdan eklenir */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[99] lg:hidden">
          
          {/* Arka Plan Karartma (Fade-in animasyonlu) */}
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Yan Kayar Menü Kutusu (Sağdan kayarak gelme animasyonlu) */}
          <div className="absolute inset-y-0 right-0 w-[85vw] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col px-5 py-6 overflow-y-auto animate-in slide-in-from-right">
            
            {/* Mobil Menü Başlık */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-600/30">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 15.5V8.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" />
                    <path d="M8 20v-4.5h8V20" />
                    <path d="M9 11.5h6" />
                  </svg>
                </span>
                <div className="leading-none">
                  <div className="text-sm font-black tracking-[0.18em] text-slate-900 uppercase">Medica</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-teal-700">Hair Clinic</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition"
                aria-label={t('closeMenu')}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Dil Seçici (Mobil) */}
            <div className="mb-4 rounded-2xl bg-slate-50 p-3 border border-slate-100 flex items-center justify-between shadow-inner">
              <span className="text-xs font-semibold text-slate-500">Language / Dil:</span>
              <LanguageSwitcher />
            </div>

            {/* Mobil Akordeon Navigasyon */}
            <nav aria-label={t('mobileNavLabel')} className="space-y-2">
              
              {/* Neden Türkiye? Linki (Mobil) */}
             
<Link 
  href="/neden-turkiyede-sac-ektirmelisin" 
  onClick={() => setIsMenuOpen(false)} 
  className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-teal-700 bg-teal-50 border border-teal-100 transition"
>
  <div className="flex items-center gap-2.5">
    <span className="text-lg" role="img" aria-label="Türkiye Bayrağı">🇹🇷</span>
   <span>{t('whyTurkey')}</span>
  </div>
  <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
</Link>

              {/* Saç Ekimi Akordeon */}
              <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                <button
                  type="button"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'transplants' ? null : 'transplants')}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-base font-semibold text-slate-800 hover:text-teal-700 transition"
                >
                  <span>{t('hairTransplants')}</span>
                  <svg className={`h-4 w-4 transition-transform duration-300 ${mobileSubmenu === 'transplants' ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {mobileSubmenu === 'transplants' && (
                  <div className="px-3 pb-3 pt-1 space-y-1 border-t border-slate-200/60 bg-white">
                    <Link href="/rehber/fue-teknigi" onClick={() => setIsMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition">
                      • {t('hairTransplantsSub1')}
                    </Link>
                    <Link href="/rehber/dhi-sac-ekimi" onClick={() => setIsMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition">
                      • {t('hairTransplantsSub2')}
                    </Link>
                    <Link href="/rehber/sakal-biyik-ekimi" onClick={() => setIsMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition">
                      • {t('hairTransplantsSub3')}
                    </Link>
                  </div>
                )}
              </div>

              {/* Saç Dökülmesi Akordeon */}
              <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                <button
                  type="button"
                  onClick={() => setMobileSubmenu(mobileSubmenu === 'loss' ? null : 'loss')}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-base font-semibold text-slate-800 hover:text-teal-700 transition"
                >
                  <span>{t('hairLoss')}</span>
                  <svg className={`h-4 w-4 transition-transform duration-300 ${mobileSubmenu === 'loss' ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {mobileSubmenu === 'loss' && (
                  <div className="px-3 pb-3 pt-1 space-y-1 border-t border-slate-200/60 bg-white">
                    <Link href="/rehber/sac-dokulmesi-nedenleri" onClick={() => setIsMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition">
                      • {t('hairLossSub1')}
                    </Link>
                    <Link href="/rehber/erkek-tipi-dokulme" onClick={() => setIsMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition">
                      • {t('hairLossSub2')}
                    </Link>
                    <Link href="/rehber/prp-kok-hucre" onClick={() => setIsMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition">
                      • {t('hairLossSub3')}
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/results" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-slate-800 bg-slate-50 border border-slate-100 hover:text-teal-700 transition">
                <span>{t('results')}</span>
              </Link>
            </nav>

            {/* Alt Turkuaz Buton */}
            <div className="mt-auto pt-6">
              <Link
                href="/clinics"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-4 py-4 text-base font-semibold text-white shadow-xl shadow-teal-600/30 hover:bg-teal-700 transition"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {t('findClinic')}
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}