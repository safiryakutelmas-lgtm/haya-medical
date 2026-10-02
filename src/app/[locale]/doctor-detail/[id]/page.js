import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getDoctorById, getCasesByDoctorId } from '@/services/doctorService';

export const dynamic = 'force-dynamic';



// 1. DİNAMİK SEO METADATA (Güncellenmiş Hali)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;
  const id = Number(resolvedParams?.id || 0);

  // Doğrudan DoctorDetailPage namespace'ini çağırıyoruz
  const t = await getTranslations({ locale, namespace: 'DoctorDetailPage' });

  if (!id) return { title: t('notFoundTitle') };

  const doctor = await getDoctorById(id);
  if (!doctor) return { title: t('notFoundTitle') };

  return {
    title: `${doctor.name} | Medica Hair Clinic`,
    description: doctor.bio || t('noBio')
  };
}

// 2. SAYFA BİLEŞENİ
export default async function DoctorDetailPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;
  const id = Number(resolvedParams?.id || 0);

  const t = await getTranslations('DoctorDetailPage');

  if (!id) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{t('notFoundTitle')}</h2>
          <p className="mt-2 text-sm text-slate-600">{t('invalidIdMsg')}</p>
          <div className="mt-4">
            <Link href="/doctors" className="inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white">
              {t('backToDoctors')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const doctor = await getDoctorById(id);

  if (!doctor) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{t('notFoundTitle')}</h2>
          <p className="mt-2 text-sm text-slate-600">{t('notFoundMsg')}</p>
          <div className="mt-4">
            <Link href="/doctors" className="inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white">
              {t('backToDoctors')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const cases = await getCasesByDoctorId(id);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="relative -mt-10 md:mt-0 md:mr-6 h-36 w-36 flex-shrink-0 rounded-full border-4 border-white bg-slate-100 shadow-lg overflow-hidden">
              {doctor.imageUrl ? (
                <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover" sizes="144px" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">{t('noPhoto')}</div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{doctor.name}</h1>
                  <p className="mt-1 text-sm text-teal-700 font-semibold">{doctor.title || t('defaultTitle')}</p>
                  <div className="mt-2 text-sm text-slate-600">{doctor.city ? `${doctor.city}` : ''}</div>
                </div>

                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <span className="text-sm text-slate-500">{t('experience')}</span>
                  <span className="text-lg font-bold text-slate-900">{doctor.yearsOfExperience} {t('yearsSuffix')}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-3 flex-wrap">
                {doctor.specialties?.slice(0, 6).map((s) => (
                  <span key={s} className="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200">{s}</span>
                ))}
              </div>

              <div className="mt-4 text-sm text-slate-700">
                <h3 className="text-sm font-semibold text-slate-900">{t('about')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{doctor.bio || t('noBio')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h4 className="text-xs font-bold uppercase text-slate-400">{t('totalCases')}</h4>
            <div className="mt-2 text-xl font-bold text-slate-900">{doctor.cases?.toLocaleString() || 'N/A'}</div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h4 className="text-xs font-bold uppercase text-slate-400">{t('hairTransplants')}</h4>
            <div className="mt-2 text-xl font-bold text-slate-900">{doctor.hairTransplantsCount?.toLocaleString() || 'N/A'}</div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h4 className="text-xs font-bold uppercase text-slate-400">{t('education')}</h4>
            <div className="mt-2 text-sm text-slate-700">{doctor.education || t('noEducation')}</div>
          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">{t('casesTitle')}</h2>
            <Link href="/doctors" className="text-sm font-medium text-teal-600">{t('allDoctors')}</Link>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-sm text-slate-500 border border-slate-100">{t('noCases')}</div>
            )}

            {cases.map((c) => (
              <div key={c.id} className="rounded-2xl bg-white overflow-hidden border border-slate-200 shadow-sm">
                <div className="relative h-40 w-full bg-slate-100">
                  {c.beforeImageUrl && (
                    <Image src={c.beforeImageUrl} alt={`before-${c.id}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
                  )}
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-slate-900">{c.method || t('defaultMethod')}</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {c.country || ''} {c.patientAge ? `${c.patientAge} ${t('ageSuffix')}` : t('ageNA')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}