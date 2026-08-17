import Link from 'next/link';
import Image from 'next/image';

export default function DoctorCard({ doctor }) {
  const {
    id,
    clinicId = null,
    name = " ",
    title = " ",
    imageUrl = " ",
    bio = "",
    specialties = [],
    cases = 0,
    yearsOfExperience = 0,
    experience = 0, // Hem experience hem yearsOfExperience desteği
    hairTransplantsCount = 0,
    education = " ",
    medicalSocieties = [],
    city = " ",
    price = 0,
    createdAt = null,
  } = doctor || {};

  return (
    <div
      key={doctor.id}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-10 pt-0 mb-5 m-2 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]"
    >
      <div>
        {/* 1. ÜST ALAN: BÜYÜTÜLMÜŞ TAŞAN PROFİL FOTOĞRAFI VE ROZET */}
        <div className="flex items-start justify-between gap-3">
          {/* Sol Üst Köşeden Dışarı Taşan BÜYÜK Profil Fotoğrafı (112px x 112px) */}
          <div className="relative -mt-12 -ml-14 h-28 w-28 shrink-0 rounded-full border-[5px] border-white bg-slate-100 shadow-lg ring-1 ring-slate-900/5">
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
              {doctor.cases ? doctor.cases.toLocaleString() : 'Default'}
            </span>
          </div>

          <div className="h-7 w-[1px] bg-slate-200/80 mx-3" />

          <div className="flex-1">
            <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Hair Transplants</span>
            <span className="mt-0.5 font-bold text-slate-900 text-sm tracking-tight">
              {doctor.hairTransplantsCount ? `${doctor.hairTransplantsCount.toLocaleString()}+` : 'High'}
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
        <Link
          href={`/doctor-detail?id=${doctor.id}`}
          className="group/btn w-full inline-flex items-center justify-between rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-teal-700 active:scale-[0.99]"
        >
          <span className="tracking-wide">View Doctor Profile</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 transition-transform duration-200 group-hover/btn:translate-x-1">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}