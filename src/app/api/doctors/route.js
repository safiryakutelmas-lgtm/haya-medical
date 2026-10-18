import { createDoctor, getAllDoctors } from '@/services/doctorService';

// DOKTORLARI LİSTELEME
export async function GET() {
  try {
    const doctors = await getAllDoctors();
    return new Response(JSON.stringify(doctors), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Doktor Listeleme Hatası:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DOKTOR EKLEME
export async function POST(req) {
  try {
    const body = await req.json();
    const doctor = await createDoctor(body);

    return new Response(JSON.stringify(doctor), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Doktor Ekleme Hatası:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}