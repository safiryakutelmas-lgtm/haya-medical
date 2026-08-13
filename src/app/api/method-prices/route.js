import { createClinicPrice } from '@/services/methodAndCaseService';

export async function POST(req) {
  try {
    const body = await req.json();
    const price = await createClinicPrice(body);

    return new Response(JSON.stringify(price), {
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
