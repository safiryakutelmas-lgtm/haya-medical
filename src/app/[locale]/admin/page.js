'use client';

import { useEffect, useRef, useState } from 'react';
import { parseApiResponse } from '@/util/apiHelpers';

// Alt Bileşenlerimiz (Hepsi tek bir klasörde)
import ClinicManager from './components/ClinicManager';
import DoctorManager from './components/DoctorManager';
import MethodManager from './components/MethodManager';
import CaseManager from './components/CaseManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('clinics');
  
  // Ana Veri State'leri (Sadece Klinik ve Doktorları ana sayfada tutuyoruz, diğerleri kendi içinde çekiyor)
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [status, setStatus] = useState('idle');
  const hasLoaded = useRef(false);

  // 4 Ana Sekmeli Yeni Sade Menümüz
  const adminTabs = [
    { id: 'clinics', label: 'Klinik Yönetimi', accent: 'bg-teal-100 text-teal-700', icon: 'K' },
    { id: 'doctors', label: 'Doktor Yönetimi', accent: 'bg-violet-100 text-violet-700', icon: 'D' },
    { id: 'methods', label: 'Yöntem & Fiyatlar', accent: 'bg-amber-100 text-amber-700', icon: 'Y' },
    { id: 'cases', label: 'Vaka / Örnekler', accent: 'bg-pink-100 text-pink-700', icon: 'V' },
  ];

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    let isMounted = true;

    async function loadData() {
      setStatus('loading');
      try {
        // İki temel veriyi paralel olarak çekiyoruz
        const [clinicsRes, doctorsRes] = await Promise.all([
          fetch('/api/clinics'),
          fetch('/api/doctors').catch(() => null),
        ]);

        if (!clinicsRes.ok) throw new Error('Klinikler yüklenirken hata oluştu');

        const clinicsData = await parseApiResponse(clinicsRes);
        const doctorData = doctorsRes?.ok ? await parseApiResponse(doctorsRes) : [];

        if (isMounted) {
          setClinics(Array.isArray(clinicsData) ? clinicsData : clinicsData.clinics || []);
          setDoctors(Array.isArray(doctorData) ? doctorData : doctorData.doctors || []);
          setStatus('success');
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setStatus('error');
      }
    }
    
    loadData();
    
    return () => { isMounted = false; };
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Yönetici Paneli</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Kayıt & Yönetim İşlemleri</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* SOL MENÜ */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm h-fit">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Menü</p>
          <nav className="space-y-2">
            {adminTabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                    isActive 
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : tab.accent}`}>
                    {tab.icon}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* SAĞ İÇERİK - SADECE AKTİF SEKMEYİ RENDER ET */}
        <div className="space-y-6">
          {activeTab === 'clinics' && (
            <ClinicManager clinics={clinics} setClinics={setClinics} status={status} />
          )}
          
          {activeTab === 'doctors' && (
            <DoctorManager doctors={doctors} setDoctors={setDoctors} clinics={clinics} status={status} />
          )}
          
          {activeTab === 'methods' && (
            <MethodManager clinics={clinics} status={status} />
          )}
          
          {activeTab === 'cases' && (
            <CaseManager clinics={clinics} doctors={doctors} status={status} />
          )}
        </div>
      </div>
    </main>
  );
}