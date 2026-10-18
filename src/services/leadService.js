import { sql } from '@/lib/neondb';

// Telegram Bildirim Fonksiyonu (IP ve Şehir Eklenmiş Hali)
async function sendTelegramNotification(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('Telegram BOT_TOKEN veya CHAT_ID bulunamadı, bildirim atlanıyor.');
    return;
  }

  // İngilizce gelen form değerlerini akıcı Türkçe karşılıklarına çeviren sözlükler
  const hairLossMap = {
    mild: 'Hafif Dökülme',
    moderate: 'Orta Düzey Dökülme',
    advanced: 'İleri Düzey Dökülme',
    different: 'Farklı / Diğer',
  };

  const yearsMap = {
    '<5': '5 Yıldan Kısa Süre Önce',
    '5-10': '5 - 10 Yıl Önce',
    '>10': '10 Yıldan Uzun Süre Önce',
  };

  const priorityMap = {
    price: 'Fiyat Avantajı',
    experience: 'Doktor / Cerrah Deneyimi',
    reviews: 'Hasta Yorumları ve Puanları',
  };

  const countryMap = {
    UK: 'İngiltere (UK)',
    USA: 'ABD (USA)',
    EUROPE: 'Avrupa',
    OTHER: 'Diğer Ülkeler',
  };

  const text = `🚨 *YENİ SAÇ EKİMİ DANIŞMANLIK TALEBİ*
--------------------------------
👤 *Ad Soyad:* ${lead.title || ''} ${lead.firstName} ${lead.lastName}
📧 *E-posta:* ${lead.email}
📞 *Telefon:* +${lead.phoneCountryCode || ''} ${lead.phoneNumber}
🌍 *Yaşadığı Ülke (Form):* ${countryMap[lead.country] || lead.country || 'Belirtilmedi'}



📉 *Saç Dökülme Durumu:* ${hairLossMap[lead.hairLossType] || lead.hairLossType || 'Belirtilmedi'}
🎂 *Yaş Aralığı:* ${lead.ageRange || 'Belirtilmedi'}
⏳ *Dökülme Başlangıcı:* ${yearsMap[lead.yearsOfLoss] || lead.yearsOfLoss || 'Belirtilmedi'}
💉 *Daha Önce Saç Ekimi Yaptırdı mı?:* ${lead.hadTransplant ? 'Evet' : 'Hayır'}
🧬 *Ailede Saç Dökülme Öyküsü Var mı?:* ${lead.familyHistory ? 'Evet' : 'Hayır'}
💊 *Mevcut Tedavi (Finasteride/Minoxidil):* ${lead.currentTreatment ? 'Evet' : 'Hayır'}
⭐ *Klinik/Doktor Seçimindeki Önceliği:* ${priorityMap[lead.doctorPriority] || lead.doctorPriority || 'Belirtilmedi'}
✈️ *Yurtdışında Saç Ekimi İçin Seyahat Edebilir mi?:* ${lead.willingToTravel ? 'Evet' : 'Hayır'}
📅 *Talep Tarihi:* ${new Date().toLocaleString('tr-TR')}

📍 *Bağlantı & Konum Bilgileri:*
🌐 *IP Adresi:* \`${lead.ip || 'Bilinmiyor'}\`
🏙️ *Şehir / Ülke (Vercel):* ${lead.city || 'Bilinmiyor'} / ${lead.countryHeader || 'Bilinmiyor'}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });
  } catch (err) {
    console.error('Telegram bildirimi gönderilirken hata oluştu:', err);
  }
}

// Servis Fonksiyonu: Yeni Lead Oluşturma (IP ve Şehir Destekli)
export async function createLead(data) {
  const {
    hairLossType,
    hadTransplant,
    familyHistory,
    yearsOfLoss,
    ageRange,
    currentTreatment,
    doctorPriority,
    willingToTravel,
    country,
    title,
    firstName,
    lastName,
    email,
    phone,
    termsAccepted,
    ip,
    city,
  } = data;

  const phoneCountryCode = phone?.countryCode || '';
  const phoneNumber = phone?.number || '';

  try {
    const [insertedLead] = await sql`
      INSERT INTO hair_transplant_leads (
        hair_loss_type,
        had_transplant,
        family_history,
        years_of_loss,
        age_range,
        current_treatment,
        doctor_priority,
        willing_to_travel,
        country,
        title,
        first_name,
        last_name,
        email,
        phone_country_code,
        phone_number,
        terms_accepted,
        ip,
        city
      ) VALUES (
        ${hairLossType || null},
        ${hadTransplant ?? null},
        ${familyHistory ?? null},
        ${yearsOfLoss || null},
        ${ageRange || null},
        ${currentTreatment ?? null},
        ${doctorPriority || null},
        ${willingToTravel ?? null},
        ${country || null},
        ${title || null},
        ${firstName},
        ${lastName},
        ${email},
        ${phoneCountryCode || null},
        ${phoneNumber},
        ${termsAccepted ?? true},
        ${ip || null},
        ${city || null}
      )
      RETURNING id, created_at AS "createdAt"
    `;

    // Telegram bildirimini IP ve Şehir bilgileriyle tetikle
    await sendTelegramNotification({
      ...data,
      phoneCountryCode,
      phoneNumber,
      countryHeader: data.country || 'Belirtilmedi',
    });

    return insertedLead;
  } catch (error) {
    console.error('createLead Servis Hatası:', error);
    throw error;
  }
}