import { createClinic, getAllClinics, updateClinic, deleteClinic } from '@/services/clinic-test-service';

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

// KLİNİK GÜNCELLEME (PUT) - /api/clinics?id=12 şeklinde çağrılır
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Güncellenecek klinik IDsi belirtilmedi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updated = await updateClinic(Number(id), body);

    return new Response(JSON.stringify(updated), {
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

// KLİNİK SİLME (DELETE) - /api/clinics?id=12 şeklinde çağrılır
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Silinecek klinik IDsi belirtilmedi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await deleteClinic(Number(id));

    return new Response(JSON.stringify({ success: true, id: Number(id) }), {
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