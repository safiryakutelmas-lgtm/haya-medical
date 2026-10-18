'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function ResultCard({ item, showClinicInfo = true }) {
  if (!item) return null;

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition hover:shadow-md flex flex-col justify-between">
      <div>
        {/* TEKİL BİRLEŞİK GÖRSEL ALANI (ÖNCESİ & SONRASI) */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-100">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.clinicName || 'Saç Ekimi Sonucu'}
              fill
              // BURASI ÖNEMLİ: object-top ekledik ki resmi üstten hizalasın, alttan kıssın
              className="object-cover object-top transition duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
              Görsel Bulunamadı
            </div>
          )}
        </div>

        {/* ÖNCESİ / SONRASI ETİKET BARI */}
        <div className="flex w-full border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          <div className="flex-1 border-r border-slate-200/60 py-2 text-center">
            Öncesi
          </div>
          <div className="flex-1 py-2 text-center">
            Sonrası
          </div>
        </div>

        {/* BİLGİ SEKSİYONU */}
        <div className="p-5">
          {/* Yöntem Rozeti */}
          {item.method && (
            <div className="mb-3">
              <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 ring-1 ring-teal-500/20">
                ⚡ {item.method}
              </span>
            </div>
          )}

          {/* Detay Özeti (Hasta Yaşı, Ülke) */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
            {item.patientAge && (
              <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Hasta Yaşı</span>
                <strong className="text-slate-900 font-semibold">{item.patientAge} Yaş</strong>
              </div>
            )}
            {item.country && (
              <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">Ülke</span>
                <strong className="text-slate-900 font-semibold">{item.country}</strong>
              </div>
            )}
          </div>

          {/* Doktor Bilgisi */}
          {item.doctorName && (
            <div className="mt-3 text-xs text-slate-600">
              <span className="text-slate-400">Uzman / Doktor: </span>
              <strong className="font-semibold text-slate-800">{item.doctorName}</strong>
            </div>
          )}
        </div>
      </div>

      {/* KLİNİK BAĞLANTISI (YÖNLENDİRME BUTONU) */}
      {showClinicInfo && item.clinicId && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4">
          <Link
            href={`/clinic-detail/${item.clinicId}`}
            className="flex items-center justify-between group/link hover:text-teal-600 transition"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              {item.clinicImageUrl ? (
                <Image
                  src={item.clinicImageUrl}
                  alt={item.clinicName || 'Klinik'}
                  width={32}
                  height={32}
                  className="rounded-full object-cover shrink-0 border border-slate-200"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600 shrink-0">
                  🏥
                </div>
              )}
              <span className="truncate text-xs font-bold text-slate-900 group-hover/link:text-teal-600">
                {item.clinicName || 'Klinik Detayı'}
              </span>
            </div>
            <span className="text-xs font-bold text-teal-600 group-hover/link:translate-x-1 transition-transform">
              İncele ↗
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}