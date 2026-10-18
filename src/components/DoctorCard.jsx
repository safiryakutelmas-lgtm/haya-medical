import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function DoctorCard({ doctor }) {
  const t = useTranslations('DoctorCard');

  return (
    <div
      key={doctor.id}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)] overflow-hidden"
    >
      <div>
        {/* 1. ÜST GÖRSEL ALANI */}
        <div className="-mx-6 -mt-6 mb-2 h-[260px] w-[calc(100%+3rem)] relative overflow-hidden bg-white">
          {doctor.imageUrl ? (
            <>
              {/* Fotoğrafı object-cover ile tam yerleştir, üstte sabit tut */}
              <Image
                src={doctor.imageUrl}
                alt={`${doctor.name} photo`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {/* Sadece en alt kısımdaki fade efekti */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-slate-400">
              <svg className="w-16 h-16 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              {/* Anonim ikon için de alt perdeyi koru */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
            </div>
          )}

          {/* Sağ Üst: Kurumsal Deneyim Rozeti */}
          {doctor.yearsOfExperience && (
            <div className="absolute top-4 right-4 z-20">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow-md backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {doctor.yearsOfExperience} {t('yearsExp')}
              </span>
            </div>
          )}
        </div>

        {/* İsim & Unvan (Görselin hemen bittiği çizginin altına hizalı) */}
        <div className="relative z-20 -mt-2">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 line-clamp-1">
            {doctor.name}
          </h3>
          <p className="text-xs font-semibold text-teal-700 mt-1 line-clamp-1 tracking-wide">
            {doctor.title || t('medicalDegree')}
          </p>
        </div>

        {/* Uzmanlık Alanları (Metrik barı kaldırıldığı için hemen ismin altına geldi) */}
        <div className="mt-5">
          <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            {t('areasOfExpertise')}
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
              <span className="text-xs text-slate-400 italic font-normal">{t('generalPractice')}</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. EĞİTİM BİLGİSİ */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <span className="truncate font-medium text-slate-700">
            {doctor.education || t('medicalDegree')}
          </span>
        </div>
      </div>
    </div>
  );
}