import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getAllClinics, getClinicPricesByClinicId } from '@/services/clinic-test-service';
import { getAllDoctors } from '@/services/doctorService';
import DoctorCard from '@/components/DoctorCard';
import ClinicCard from '@/components/ClinicCard';

// 1. SEO METADATA KISMI
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.Clinics' });

  return {
    title: t('title'),
    description: t('description')
  };
}


export default async function Clinics() {
 
  const t = await getTranslations('ClinicsPage');

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
        

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{t('clinicsTitle')}</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {t('clinicsCount', { count: clinics.length })}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {clinics.map((clinic) => {
              const prices = clinicPricesById[clinic.id] || [];
              const locationText = clinic.location || `${clinic.city || t('unknownCity')}, ${clinic.country || ''}`;

              return (
                <ClinicCard
                  key={clinic.id}
                  clinic={clinic}
                />
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{t('doctorsTitle')}</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {t('doctorsCount', { count: doctors.length })}
            </span>
          </div>

          <div className="grid gap-6 pt-10 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}