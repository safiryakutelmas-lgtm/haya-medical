import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import DoctorCard from '@/components/DoctorCard';
import { getClinicById, getClinicPricesByClinicId } from '@/services/clinic-test-service';
import { getAllDoctors } from '@/services/doctorService';

export const dynamic = 'force-dynamic';

// 1. DİNAMİK SEO METADATA KISMI (Sekme başlığında Kliniğin adı yazacak)
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

// 2. SAYFA BİLEŞENİ (SERVER COMPONENT)
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
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        {/* Hero with wide image and 1/3 vertical image */}
        <section className="rounded-3xl bg-white p-0 shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 relative h-64 md:h-80 w-full">
              {clinic.imageUrl ? (
                <Image src={clinic.imageUrl} alt={clinic.name} fill className="object-cover" sizes="(min-width: 768px) 66vw, 100vw" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">{t('noImage')}</div>
              )}
            </div>

            <div className="relative h-64 md:h-80 w-full">
              {clinic.imageUrl ? (
                <Image src={clinic.imageUrl} alt={`${clinic.name} alt`} fill className="object-cover object-top" sizes="(min-width: 768px) 33vw, 100vw" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">{t('noImage')}</div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">{clinic.name}</h1>
            <p className="mt-1 text-sm text-slate-600">
              {clinic.location || `${clinic.city || ''}${clinic.country ? `, ${clinic.country}` : ''}`}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
              <div><strong>{t('founded')}</strong> {clinic.foundedYear ?? '—'}</div>
              <div><strong>{t('languages')}</strong> {clinic.languages?.join(', ') || '—'}</div>
              <div><strong>{t('specialties')}</strong> {clinic.specialties?.join(', ') || '—'}</div>
              <div><strong>{t('methods')}</strong> {clinic.methods?.join(', ') || '—'}</div>
              <div><strong>{t('totalProcedures')}</strong> {clinic.hairTransplantsCount?.toLocaleString() || '—'}</div>
              <div><strong>{t('price')}</strong> {clinic.priceLabel || (prices[0] ? `${prices[0].minPrice} ${prices[0].currency}` : '—')}</div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900">{t('about')}</h3>
              <p className="mt-2 text-sm text-slate-600">{clinic.priceLabel || t('noDetails')}</p>
            </div>
          </div>

          <aside className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{t('score')}</h4>
                <div className="text-lg font-bold text-slate-900">{clinic.score ?? '—'}</div>
              </div>
              <div className="text-sm text-slate-500">
                {clinic.reviewCount ? t('reviews', { count: clinic.reviewCount }) : ''}
              </div>
            </div>

            <div className="mt-4 text-sm text-slate-700">
              <div><strong>{t('address')}</strong> {clinic.location || '—'}</div>
              <div className="mt-2">
                <strong>{t('website')}</strong> {clinic.website ? (<a href={clinic.website} className="text-teal-600">{t('visit')}</a>) : '—'}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">{t('doctorsTitle')}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"> 
            {clinicDoctors.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-sm text-slate-500 border border-slate-100">
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