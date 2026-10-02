import Image from 'next/image';
import ClinicCard from '@/components/ClinicCard';
import { getAllClinics, getClinicPricesByClinicId } from '@/services/clinic-test-service';

export default async function ClinicsComponent() {
  const clinics = await getAllClinics();

  // Tüm klinikler için fiyatları paralel olarak çekiyoruz
  const priceMap = await Promise.all(
    clinics.map(async (clinic) => ({
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
              <h2 className="text-2xl font-semibold text-slate-900">Clinics</h2>
              <p className="mt-1 text-sm text-slate-600">All clinics returned by the service.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {clinics.length} clinics
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {clinics.map((clinic) => {
              const prices = clinicPricesById[clinic.id] || [];
              const locationText = clinic.location || `${clinic.city || 'Unknown city'}${clinic.country ? `, ${clinic.country}` : ''}`;
              
              // Fiyat gösterim mantığını güvenli hale getiriyoruz
              const firstPrice = prices[0];
              const priceDisplay = clinic.priceLabel || 
                (firstPrice?.minPrice ? `${firstPrice.minPrice} ${firstPrice.currency || ''}` : 'Contact for Price');

              return (
                <ClinicCard
                      key={clinic.id}
                      clinic={clinic}
                    />
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}