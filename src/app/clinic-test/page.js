import Image from 'next/image';
import { getAllClinics, getClinicPricesByClinicId } from '@/services/clinic-test-service';
import { getAllDoctors } from '@/services/doctorService';
import DoctorCard from '@/components/DoctorCard';
import ClinicCard from '@/components/ClinicCard';

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
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Clinic Dashboard</h1>
          
        </div>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Clinics</h2>
           
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
    <ClinicCard
      key={clinic.id}
      clinic={clinic}
      prices={prices}
      locationText={locationText}
    />
  );
})}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div >
              <h2 className="text-2xl font-semibold text-slate-900">Doctors</h2>

            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {doctors.length} doctors
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
