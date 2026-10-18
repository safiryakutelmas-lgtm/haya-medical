import { getAllClinics, getClinicPricesByClinicId } from '@/services/clinic-test-service';
import { getTranslations } from 'next-intl/server';
import ClinicsContent from '@/components/ClinicsContent';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.Clinics' });

  return {
    title: t('title') || 'Türkiye Saç Ekimi Kliniklerini Karşılaştırın | Medica',
    description: t('description') || 'En iyi saç ekimi kliniklerini inceleyin, paket fiyatlarını karşılaştırın ve ücretsiz görüşme randevusu alın.',
  };
}

export default async function ClinicsPage() {
  const clinics = await getAllClinics();

  const priceMap = await Promise.all(
    clinics.slice(0, 12).map(async (clinic) => ({
      clinicId: clinic.id,
      prices: await getClinicPricesByClinicId(clinic.id),
    }))
  );

  const clinicPricesById = priceMap.reduce((acc, item) => {
    acc[item.clinicId] = item.prices;
    return acc;
  }, {});

  return <ClinicsContent clinics={clinics} clinicPricesById={clinicPricesById} />;
}