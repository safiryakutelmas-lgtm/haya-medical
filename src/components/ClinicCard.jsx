import Link from 'next/link';
import Image from 'next/image';

export default function ClinicCard({ clinic, prices = [], locationText = '' }) {
  const {
  } = clinic || {};

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md max-w-md mx-auto w-full"
    >
      {/* 1. GÖRSEL VE ÜST BADGE ALANI */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        {clinic.imageUrl ? (
          <Image
            src={clinic.imageUrl}
            alt={`${clinic.name} photo`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs font-medium text-slate-400">
            Image not available
          </div>
        )}

        {/* Kurumsal Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

        {/* Sol Üst: Kurumsal Rozet */}
        {clinic.isVerified && (
          <div className="absolute left-3.5 top-3.5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-900/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white shadow-sm backdrop-blur-md uppercase border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Verified Facility
            </span>
          </div>
        )}

        {/* Sağ Üst: Minimalist Puan Kutusu */}
        {clinic.score != null && (
          <div className="absolute right-3.5 top-3.5 flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-xs shadow-sm backdrop-blur-md border border-slate-200/50">
            <span className="text-amber-500 font-bold">★</span>
            <span className="font-bold text-slate-900">{clinic.score}</span>
            <span className="text-[11px] font-normal text-slate-500">({clinic.reviewCount || 0})</span>
          </div>
        )}

        {/* Görsel Üstü Sol Alt: Lokasyon & Kurum Tipi */}
        <div className="absolute bottom-3.5 left-4 right-4 z-10">
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-300 mb-0.5">
                        <span className="truncate">{locationText}</span>
            {clinic.foundedYear && (
              <>
                <span>•</span>
                <span>Est. {clinic.foundedYear}</span>
              </>
            )}
          </div>
          <h3 className="text-lg font-bold tracking-tight text-white line-clamp-1">
            {clinic.name}
          </h3>
        </div>
      </div>

      {/* 2. KURUMSAL İÇERİK VE VERİ ALANI */}
      <div className="flex flex-1 flex-col justify-between p-5 bg-white">
        
        {/* Metotlar & Operasyon Sayısı (İnce Çizgili Kurumsal Grid) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-4 border-b border-slate-100 text-xs">
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Treatment Methods</dt>
            <dd className="mt-1 font-semibold text-slate-800 line-clamp-1">
              {clinic.methods?.length ? clinic.methods.join(', ') : 'FUE, DHI'}
            </dd>
          </div>

          <div className="pl-4 border-l border-slate-100">
            <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Procedures</dt>
            <dd className="mt-1 font-semibold text-slate-800">
              {clinic.hairTransplantsCount > 0 ? `${clinic.hairTransplantsCount.toLocaleString()}+` : 'N/A'}
            </dd>
          </div>
        </div>

        {/* Fiyat Bilgisi Satırı */}
        <div className="py-3.5 flex items-center justify-between text-xs">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Starting From</span>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              {clinic.priceLabel || (prices.length > 0 ? `${prices[0]?.minPrice} ${prices[0]?.currency}` : 'Contact for Price')}
            </span>
          </div>

          {clinic.hasVideoConsultation && (
            <span className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">
              <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Online Consult
            </span>
          )}
        </div>

        {/* Aksiyon Butonu */}
        <div className="pt-2">
          <Link
            href={`/clinic-detail/${clinic.id}`}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-150 hover:bg-slate-800 active:scale-[0.99]"
          >
            <span>View Clinic Profile</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
    
  );
}