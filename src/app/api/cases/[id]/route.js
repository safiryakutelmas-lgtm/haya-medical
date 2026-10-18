import { NextResponse } from 'next/server';
import { updateCase, deleteCase } from '@/services/caseService';

export async function PUT(req, { params }) {
  try {
    // Next.js 15 Kuralı: params artık asenkron, await kullanmak zorundayız
    const { id } = await params; 
    const updateData = await req.json();

    const updatedCase = await updateCase(id, updateData);
    if (!updatedCase) {
      return NextResponse.json({ error: 'Vaka bulunamadı veya güncellenemedi.' }, { status: 404 });
    }

    return NextResponse.json(updatedCase, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    // Next.js 15 Kuralı: params artık asenkron, await kullanmak zorundayız
    const { id } = await params;

    const success = await deleteCase(id);
    if (!success) {
      return NextResponse.json({ error: 'Vaka bulunamadı veya silinemedi.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Vaka başarıyla silindi.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}