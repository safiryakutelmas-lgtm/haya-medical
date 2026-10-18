import { updateDoctor, deleteDoctor } from '@/services/doctorService';

// DOKTOR GÜNCELLEME (PUT)
export async function PUT(req, { params }) {
  try {
    // Next.js 15+ uyumlu asenkron params çözme
    const { id } = await params;
    const body = await req.json();
    
    const updatedDoctor = await updateDoctor(id, body);

    if (!updatedDoctor) {
      return new Response(JSON.stringify({ error: 'Güncellenecek doktor bulunamadı' }), { 
        status: 404, headers: { 'Content-Type': 'application/json' } 
      });
    }

    return new Response(JSON.stringify(updatedDoctor), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Doktor Güncelleme Hatası:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DOKTOR SİLME (DELETE)
export async function DELETE(req, { params }) {
  try {
    // Next.js 15+ uyumlu asenkron params çözme
    const { id } = await params;
    
    const deletedId = await deleteDoctor(id);

    if (!deletedId) {
      return new Response(JSON.stringify({ error: 'Silinecek doktor bulunamadı' }), { 
        status: 404, headers: { 'Content-Type': 'application/json' } 
      });
    }

    return new Response(JSON.stringify({ success: true, id: deletedId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Doktor Silme Hatası:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}