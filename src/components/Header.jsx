'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },

];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-sm shadow-slate-200' : 'shadow-none'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 bg-transparant">
        <Link href="/" className="flex items-center gap-3" aria-label="Ana Sayfa">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-200">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 15.5V8.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" />
              <path d="M8 20v-4.5h8V20" />
              <path d="M9 11.5h6" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-[0.18em] text-slate-900 uppercase">Medica</span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-slate-500">Hair Clinic</span>
          </span>
        </Link>

        <nav aria-label="Global" className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-teal-600"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/clinic-test"
            className="ml-2 inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Kliniklerimiz

          </Link>
          <Link
            href="/doctors"
            className="ml-2 inline-flex items-center rounded-full bg-blue-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Doktorlarımız

          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-200 hover:text-teal-600 sm:inline-flex"
          >
            Admin
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-panel"
            aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-teal-200 hover:text-teal-600 md:hidden"
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/35 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        id="mobile-menu-panel"
        className={`fixed inset-y-0 right-0 z-50 w-[82vw] max-w-sm transform border-l border-slate-200 bg-white shadow-[0_0_30px_rgba(15,23,42,0.18)] transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col px-4 pb-6 pt-5">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 15.5V8.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" />
                  <path d="M8 20v-4.5h8V20" />
                  <path d="M9 11.5h6" />
                </svg>
              </span>
              <div className="leading-none">
                <div className="text-sm font-black tracking-[0.18em] text-slate-900 uppercase">Medica</div>
                <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-slate-500">Hair Clinic</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Menüyü kapat"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobil menü" className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-teal-600"
              >
                <span>{item.label}</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6">
            <Link
              href="/clinic-test"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700"
            >
              Clinic Test
            </Link>
            <Link
              href="/doctors"
              onClick={() => setIsMenuOpen(false)}
              className="mt-3 flex w-full items-center justify-center rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700"
            >
              Doktorlarımız
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
