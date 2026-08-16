
import { getAllDoctors } from '@/services/doctorService';
import DoctorCard from '@/components/DoctorCard';

export const dynamic = 'force-dynamic';

export default async function DoctorsPage() {
  const doctors = await getAllDoctors();

  return (
   <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8  max-w-7xl px-4 py-10 ">
  <div className="grid gap-6 pt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    {doctors?.map((doctor) => (
      <DoctorCard key={doctor.id} doctor={doctor} />
    ))}
  </div>
</main>
  );
}