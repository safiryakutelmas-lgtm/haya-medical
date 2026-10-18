import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import DoctorCard from '@/components/DoctorCard';
import { getClinicById, getClinicPricesByClinicId } from '@/services/clinic-test-service';
import { getAllDoctors } from '@/services/doctorService';

export const dynamic = 'force-dynamic';

// 1. SEO METADATA
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;
  const id = Number(resolvedParams?.id);
  
  const t = await getTranslations({ locale });

  if (!id) return { title: t('ClinicDetailPage.notFoundTitle') };
  
  const clinic = await getClinicById(id);
  if (!clinic) return { title: t('ClinicDetailPage.notFoundTitle') };

  return {
    title: `${clinic.name} | Medica Hair Clinic`,
    description: clinic.about || t('ClinicDetailPage.noDetails')
  };
}

// 2. SAYFA BİLEŞENİ
export default async function ClinicDetailPage({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams?.id);
  
  const t = await getTranslations('ClinicDetailPage');

  if (!id) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{t('notFoundTitle')}</h2>
          <p className="mt-2 text-sm text-slate-600">{t('invalidIdMsg')}</p>
          <div className="mt-4">
            <Link href="/clinics" className="inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white">
              {t('backToClinics')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const clinic = await getClinicById(id);
  
  if (!clinic) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{t('notFoundTitle')}</h2>
          <p className="mt-2 text-sm text-slate-600">{t('notFoundMsg')}</p>
          <div className="mt-4">
            <Link href="/clinics" className="inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white">
              {t('backToClinics')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const prices = await getClinicPricesByClinicId(id);
  const allDoctors = await getAllDoctors();
  const clinicDoctors = allDoctors.filter((d) => d.clinicId === clinic.id);


  return (

    // BURAYA LOG EKLE:

    <main className="min-h-screen bg-slate-50/60 pb-20 pt-24 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* 1. GEÇİŞLİ VE YUMUŞAK ERİMELİ KAPAK FOTOĞRAFI */}
        <section className="relative h-72 sm:h-96 w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-xs">
          {clinic.imageUrl ? (
            <>
              <Image 
                src={clinic.imageUrl} 
                alt={clinic.name} 
                fill 
                priority
                className="object-cover object-center" 
                sizes="(min-width: 1280px) 1152px, 100vw" 
              />
              
              {/* Alt Tarafı Yumuşakça Sayfa Rengine Eriten Gradient Overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50/90 via-slate-50/40 to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-slate-400">
              {t('noImage')}
            </div>
          )}
        </section>

        {/* 2. BAŞLIK VE ÖZET BİLGİ KARTI */}
        <section className="relative z-10 -mt-10 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              {/* Sol Üst Şehir / Ülke Bilgisi */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 ring-1 ring-teal-500/20">
                📍 {clinic.location || `${clinic.city || ''}${clinic.country ? `, ${clinic.country}` : ''}`}
              </span>
              <h1 className="mt-3 text-2xl font-black text-slate-900 sm:text-4xl">
                {clinic.name}
              </h1>
            </div>

            {/* Sağ Taraf: Puan ve Fiyat Kutusu */}
            <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 border border-slate-100 shrink-0">
              <div className="border-r border-slate-200 pr-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{t('score')}</div>
                <div className="text-xl font-black text-teal-600">{clinic.score ?? '—'} <span className="text-xs font-normal text-slate-400">/ 5.0</span></div>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{t('price')}</div>
                <div className="text-base font-bold text-slate-900">
                  {clinic.priceLabel || (prices[0] ? `${prices[0].minPrice} ${prices[0].currency}` : '—')}
                </div>
              </div>
            </div>
          </div>

          {/* İSTATİSTİK VE YÖNTEMLER BÖLÜMÜ */}
          <div className="mt-6 border-t border-slate-100 pt-6 space-y-4">
            
            {/* Üst Sıra: 3'lü Kompakt Bilgi Kutuları */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-slate-50/80 p-3.5 text-center border border-slate-100">
                <span className="block text-[11px] font-bold text-slate-400 uppercase">{t('founded')}</span>
                <strong className="text-sm font-bold text-slate-900">{clinic.foundedYear ?? '—'}</strong>
              </div>
              <div className="rounded-2xl bg-slate-50/80 p-3.5 text-center border border-slate-100">
                <span className="block text-[11px] font-bold text-slate-400 uppercase">{t('totalProcedures')}</span>
                <strong className="text-sm font-bold text-slate-900">{clinic.hairTransplantsCount?.toLocaleString() || '—'}</strong>
              </div>
              <div className="rounded-2xl bg-slate-50/80 p-3.5 text-center border border-slate-100">
                <span className="block text-[11px] font-bold text-slate-400 uppercase">{t('languages')}</span>
                <strong className="text-sm font-bold text-slate-900 block mt-1">{clinic.languages?.join(', ') || '—'}</strong>
              </div>
            </div>

            {/* Alt Sıra: Tam Genişlik Yatay Yöntemler Kutusu */}
            <div className="rounded-2xl bg-slate-50/80 p-4 border border-slate-100">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{t('methods')} / Uygulanan Yöntemler</span>
              <div className="flex flex-wrap gap-2">
                {clinic.methods && clinic.methods.length > 0 ? (
                  Array.isArray(clinic.methods) ? (
                    clinic.methods.map((method, index) => (
                      <span key={index} className="inline-flex items-center rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-teal-800 border border-teal-100 shadow-2xs">
                        {method}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm font-semibold text-slate-800">{clinic.methods}</span>
                  )
                ) : (
                  <span className="text-sm text-slate-400">—</span>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* 3. DETAYLAR VE SAĞ KOLON (İLETİŞİM & GOOGLE HARİTALAR IFRAME) */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Sol Kolon: Hakkında */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900">{t('about')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {clinic.about || clinic.priceLabel || t('noDetails')}
            </p>

            {clinic.specialties?.length ? (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t('specialties')}</h3>
                <div className="flex flex-wrap gap-2">
                  {clinic.specialties.map((spec, i) => (
                    <span key={i} className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sağ Kolon: Klinik Bilgileri & Google Haritalar Iframe */}
          <aside className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Klinik Bilgileri</h2>
              
              <div className="space-y-4 text-sm text-slate-700">
                
                {/* Google Maps Iframe Alanı */}
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-2">Konum Haritası</span>
                  {clinic.mapIframe ? (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 w-full h-48 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" 
                         dangerouslySetInnerHTML={{ __html: clinic.mapIframe }} />
                  ) : (
                    <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-500 text-center">
                      Harita konumu henüz eklenmedi.
                    </div>
                  )}
                  
                </div>
              </div>
            </div>

            <Link
              href="/iletisim"
              className="mt-8 block w-full rounded-2xl bg-teal-600 px-4 py-3.5 text-center text-xs font-bold text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 transition"
            >
              Ücretsiz Danışmanlık Al
            </Link>
          </aside>
        </section>

        {/* 4. DOKTORLAR SEKSİYONU */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">{t('doctorsTitle')}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3"> 
            {clinicDoctors.length === 0 && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-sm text-slate-500">
                {t('noDoctors')}
              </div>
            )}

            {clinicDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
