import { createClinic, getAllClinics } from '@/services/clinic-test-service';

export async function GET() {
  try {
    const clinics = await getAllClinics();
    return new Response(JSON.stringify(clinics), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const clinic = await createClinic(body);
    return new Response(JSON.stringify(clinic), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
