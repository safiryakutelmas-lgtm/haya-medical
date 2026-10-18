import { NextResponse } from 'next/server';
import { getAllCases, createCase, updateCase, deleteCase } from '@/services/caseService';

export async function GET() {
  try {
    const cases = await getAllCases();
    return NextResponse.json(cases);
  } catch (error) {
    return NextResponse.json({ error: 'Vakalar çekilemedi' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.clinicId) {
      return NextResponse.json({ error: 'Klinik seçimi zorunludur.' }, { status: 400 });
    }

    const newCase = await createCase(body);
    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

