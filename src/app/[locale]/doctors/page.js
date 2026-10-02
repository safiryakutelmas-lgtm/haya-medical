
import { getAllDoctors } from '@/services/doctorService';
import DoctorCard from '@/components/DoctorCard';

export const dynamic = 'force-dynamic';

export default async function DoctorsPage() {
  const doctors = await getAllDoctors();

  return (
    <main className="p-8 max-w-4xl mx-auto">


<div className="grid gap-6 pt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {doctors?.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

    </main>
  );
}