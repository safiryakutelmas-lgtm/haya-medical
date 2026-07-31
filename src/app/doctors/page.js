
import DoctorCard from "@/components/DoctorCard";
import { supabase } from "@/lib/supabase";
export const dynamic = 'force-dynamic';

export default async function DoctorsPage() {

  const { data: doctors, error} = await supabase.from('doctors').select("*");

  if(error){
    console.error('Hata:' , error.message);
  }


  return (
    <main className="p-8 max-w-4xl mx-auto">
      
     

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {doctors?.map((doktor) => (
          <DoctorCard key={doktor.id} doktor={doktor} />
        ))}
      </div>

      
    </main>
  );
}