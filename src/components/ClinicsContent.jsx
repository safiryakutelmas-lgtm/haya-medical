'use client';

import { useState } from 'react';
import ClinicCard from '@/components/ClinicCard';
import MultiStepForm from '@/components/MultiStepForm';

export default function ClinicsContent({ clinics, clinicPricesById, t }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50/50 pb-24 pt-24 text-slate-900">
      
      {/* 1. HERO & FİLTRELEME ALANI */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 border border-slate-200/80 rounded-[2.5rem] p-8 md:p-14 mb-12 shadow-xl shadow-slate-100">
          
          <div className="absolute -top-32 -right-32 w-[450px] h-[450px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-[1.12]">
              Türkiye'nin En İyi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Saç Ekim Kliniklerini</span> Keşfedin
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
              Onaylı kliniklerin güncel fiyat paketlerini, gerçek hasta vaka sonuçlarını ve doktor detaylarını inceleyerek hemen ücretsiz ön görüşme planlayın.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-slate-100/80">
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm shrink-0">✓</div>
                <div className="text-xs font-bold text-slate-700 leading-snug">100% Onaylı Lisanslı Klinikler</div>
              </div>
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold text-sm shrink-0">%</div>
                <div className="text-xs font-bold text-slate-700 leading-snug">Şeffaf Paket Fiyatları</div>
              </div>
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm shrink-0">💬</div>
                <div className="text-xs font-bold text-slate-700 leading-snug">Ücretsiz Canlı Görüşme</div>
              </div>
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-sm shrink-0">★</div>
                <div className="text-xs font-bold text-slate-700 leading-snug">Doğrulanmış Hasta Yorumları</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ANA LİSTELEME */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200/85 shadow-xs">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            Klinik Listesi <span className="text-xs font-semibold text-slate-500 ml-2">({clinics.length} sonuç gösteriliyor)</span>
          </h2>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
            <span className="hidden sm:inline">Sıralama:</span>
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 font-bold text-slate-800 shadow-2xs focus:border-emerald-500 focus:outline-none transition">
              <option>Önerilenler</option>
              <option>En Yüksek Puan</option>
              <option>Fiyata Göre (Önce Düşük)</option>
              <option>Fiyata Göre (Önce Yüksek)</option>
            </select>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {clinics.map((clinic) => {
            const prices = clinicPricesById[clinic.id] || [];
            return (
              <div key={clinic.id} className="transition-all duration-300 hover:-translate-y-1">
                <ClinicCard clinic={clinic} prices={prices} />
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DANIŞMANLIK BANNERI (CTA) */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              Ücretsiz Danışmanlık
            </span>
            <h3 className="mt-4 text-2xl font-black sm:text-3xl text-white tracking-tight">
              Sizce Hangi Klinik İhtiyacınıza En Uygun?
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Saç dökülme tipinizi ve bütçenizi bize iletin; uzman medikal ekibimiz size en doğru 3 klinik seçeneğini ücretsiz olarak iletsin.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 cursor-pointer rounded-2xl bg-emerald-500 px-8 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition hover:scale-105 active:scale-95"
          >
            Sana Uygun Kliniği Bul
          </button>
        </div>
      </section>

      {/* 4. MODAL & MULTISTEP FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="p-2 md:p-6">
              <MultiStepForm />
            </div>
          </div>
        </div>
      )}

    </main>
  );
}