import { createDoctor, getAllDoctors } from '@/services/doctorService';




export async function GET(){
    try {
        const doctors = await getAllDoctors();
        return new Response(JSON.stringify(doctors), {
            status:200,
            headers:{'Content-Type' : 'application/json'},
        })
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
    const doctor = await createDoctor(body);

    return new Response(JSON.stringify(doctor), {
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
