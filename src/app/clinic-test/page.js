import Image from 'next/image';
import { getAllClinics, getClinicPricesByClinicId } from '@/services/clinic-test-service';
import { getAllDoctors } from '@/services/doctorService';



// ... geri kalan sayfa kodlarınız
export default async function ClinicTestPage() {
  const clinics = await getAllClinics();
  const doctors = await getAllDoctors();
  const priceMap = await Promise.all(
    clinics.slice(0, 6).map(async (clinic) => ({
      clinicId: clinic.id,
      prices: await getClinicPricesByClinicId(clinic.id),
    }))
  );

  const clinicPricesById = priceMap.reduce((acc, item) => {
    acc[item.clinicId] = item.prices;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Clinic test dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">
            Server-rendered clinic, doctor and price data loaded from the shared service layer.
          </p>
        </div>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Clinics</h2>
              <p className="mt-1 text-sm text-slate-600">All clinics returned by the service.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {clinics.length}  clinics
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {clinics.map((clinic) => {
  const prices = clinicPricesById[clinic.id] || [];
  const locationText = clinic.location || `${clinic.city || 'Unknown city'}, ${clinic.country || ''}`;

  return (
    <div
      key={clinic.id}
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
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-150 hover:bg-slate-800 active:scale-[0.99]">
            <span>View Clinic Profile</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
})}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Doctors</h2>
              <p className="mt-1 text-sm text-slate-600">All doctors returned by the service.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {doctors.length} doctors
            </span>
          </div>

          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3 pt-6">
  {doctors.map((doctor) => (
    <div
      key={doctor.id}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 pt-0 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
    >
      <div>
        {/* 1. ÜST ALAN: BÜYÜTÜLMÜŞ TAŞAN PROFİL FOTOĞRAFI VE ROZET */}
        <div className="flex items-start justify-between gap-3">
          {/* Sol Üst Köşeden Dışarı Taşan BÜYÜK Profil Fotoğrafı (112px x 112px) */}
          <div className="relative -mt-10 -ml-2 h-28 w-28 shrink-0 rounded-full border-[5px] border-white bg-slate-100 shadow-lg ring-1 ring-slate-900/5">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              {doctor.imageUrl ? (
                <Image
                  src={doctor.imageUrl}
                  alt={`${doctor.name} photo`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="112px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-xs font-medium text-slate-400 text-center p-1">
                  No Photo
                </div>
              )}
            </div>
          </div>

          {/* Sağ Üst: Kurumsal Deneyim Rozeti */}
          {doctor.yearsOfExperience && (
            <div className="pt-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {doctor.yearsOfExperience} Yrs Exp.
              </span>
            </div>
          )}
        </div>

        {/* İsim & Unvan */}
        <div className="mt-4">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 line-clamp-1">
            {doctor.name}
          </h3>
          <p className="text-xs font-semibold text-teal-700 mt-0.5 line-clamp-1 tracking-wide">
            {doctor.title || 'Medical Doctor'}
          </p>
        </div>

        {/* 2. PREMIUM METRİK BARI (İnce Separatörlü Düzen) */}
        <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 py-3 px-4 text-xs">
          <div className="flex-1">
            <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Total Cases</span>
            <span className="mt-0.5 font-bold text-slate-900 text-sm tracking-tight">
              {doctor.cases ? doctor.cases.toLocaleString() : 'N/A'}
            </span>
          </div>

          <div className="h-7 w-[1px] bg-slate-200/80 mx-3" />

          <div className="flex-1">
            <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Hair Transplants</span>
            <span className="mt-0.5 font-bold text-slate-900 text-sm tracking-tight">
              {doctor.hairTransplantsCount ? `${doctor.hairTransplantsCount.toLocaleString()}+` : 'N/A'}
            </span>
          </div>
        </div>

        {/* Uzmanlık Alanları (Minimalist Kurumsal Rozetler) */}
        <div className="mt-5">
          <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Areas of Expertise
          </span>
          <div className="flex flex-wrap gap-1.5">
            {doctor.specialties?.length ? (
              doctor.specialties.slice(0, 3).map((specialty) => (
                <span
                  key={specialty}
                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  {specialty}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic font-normal">General Practice</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. EĞİTİM VE ETKİLEŞİMLİ PROFIL BUTONU */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        {/* Eğitim Bilgisi */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <span className="truncate font-medium text-slate-700">
            {doctor.education || 'Medical Degree'}
          </span>
        </div>

        {/* Kurumsal Profil Butonu */}
        <button className="group/btn w-full inline-flex items-center justify-between rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-teal-700 active:scale-[0.99]">
          <span className="tracking-wide">View Doctor Profile</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 transition-transform duration-200 group-hover/btn:translate-x-1">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  ))}
</div>
        </section>
      </div>
    </main>
  );
}
