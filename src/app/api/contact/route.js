import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createLead } from '@/services/leadService';

export async function POST(req) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, phone } = body;

    // Temel doğrulama
    if (!firstName || !lastName || !email || !phone?.number) {
      return NextResponse.json(
        { error: 'Ad, soyad, e-posta ve telefon bilgileri zorunludur.' },
        { status: 400 }
      );
    }

    // 1. Vercel Header'larından IP ve Konum Bilgilerini Çekme
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'Bilinmiyor';

    const country = headersList.get('x-vercel-ip-country') || 'Bilinmiyor';
    const cityHeader = headersList.get('x-vercel-ip-city');
    const city = cityHeader ? decodeURIComponent(cityHeader) : 'Bilinmiyor';

    // 2. Form verisi ile konum bilgilerini birleştiriyoruz
    const enrichedBody = {
      ...body,
      ip,
      country,
      city,
    };

    // Servis katmanına zenginleştirilmiş veriyi gönderiyoruz
    const newLead = await createLead(enrichedBody);

    return NextResponse.json(
      {
        success: true,
        message: 'Lead kaydı başarıyla oluşturuldu.',
        data: newLead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/contact Hatası:', error);
    return NextResponse.json(
      { error: error.message || 'Form kaydedilirken sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}