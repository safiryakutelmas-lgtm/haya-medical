import { sql } from '@/lib/neondb';

/**
 * Tüm vakaları/sonuçları getirir.
 */
export async function getAllCases() {
  try {
    const cases = await sql`
      SELECT 
        c.id,
        c.doctor_id AS "doctorId",
        c.clinic_id AS "clinicId",
        c.method,
        c.country,
        c.min_price AS "minPrice",
        c.max_price AS "maxPrice",
        c.currency,
        c.score::float AS score,
        c.patient_age AS "patientAge",
        c.hair_loss_degree AS "hairLossDegree",
        c.created_at AS "createdAt",
        c.image_url AS "imageUrl",
        cl.name AS "clinicName",
        cl.image_url AS "clinicImageUrl",
        cl.city AS "clinicCity",
        d.name AS "doctorName"
      FROM cases c
      LEFT JOIN clinics cl ON c.clinic_id = cl.id
      LEFT JOIN doctors d ON c.doctor_id = d.id
      ORDER BY c.created_at DESC
    `;
    return cases;
  } catch (error) {
    console.error('getAllCases Hata:', error);
    return [];
  }
}

/**
 * Belirli bir kliniğe ait tüm vakaları/sonuçları getirir.
 */
export async function getCasesByClinicId(clinicId) {
  try {
    const cases = await sql`
      SELECT 
        c.id,
        c.doctor_id AS "doctorId",
        c.clinic_id AS "clinicId",
        c.method,
        c.country,
        c.min_price AS "minPrice",
        c.max_price AS "maxPrice",
        c.currency,
        c.score::float AS score,
        c.patient_age AS "patientAge",
        c.hair_loss_degree AS "hairLossDegree",
        c.created_at AS "createdAt",
        c.image_url AS "imageUrl",
        cl.name AS "clinicName",
        cl.image_url AS "clinicImageUrl",
        cl.city AS "clinicCity",
        d.name AS "doctorName"
      FROM cases c
      LEFT JOIN clinics cl ON c.clinic_id = cl.id
      LEFT JOIN doctors d ON c.doctor_id = d.id
      WHERE c.clinic_id = ${clinicId}
      ORDER BY c.created_at DESC
    `;
    return cases;
  } catch (error) {
    console.error('getCasesByClinicId Hata:', error);
    return [];
  }
}

/**
 * Yeni bir vaka/sonuç kaydeder.
 */
export async function createCase(data) {
  const {
    doctorId,
    clinicId,
    method,
    country,
    minPrice,
    maxPrice,
    currency,
    score,
    patientAge,
    hairLossDegree,
    imageUrl,
  } = data;

  const [insertedCase] = await sql`
    INSERT INTO cases (
      doctor_id,
      clinic_id,
      method,
      country,
      min_price,
      max_price,
      currency,
      score,
      patient_age,
      hair_loss_degree,
      image_url
    ) VALUES (
      ${doctorId || null},
      ${clinicId},
      ${method || null},
      ${country || null},
      ${minPrice || null},
      ${maxPrice || null},
      ${currency || 'TRY'},
      ${score || null},
      ${patientAge || null},
      ${hairLossDegree || null},
      ${imageUrl || null}
    )
    RETURNING 
      id,
      doctor_id AS "doctorId",
      clinic_id AS "clinicId",
      method,
      country,
      min_price AS "minPrice",
      max_price AS "maxPrice",
      currency,
      score,
      patient_age AS "patientAge",
      hair_loss_degree AS "hairLossDegree",
      created_at AS "createdAt",
      image_url AS "imageUrl"
  `;

  return insertedCase;
}
/**
 * Mevcut bir vakayı/sonucu günceller.
 */
export async function updateCase(id, data) {
  const {
    doctorId,
    clinicId,
    method,
    country,
    minPrice,
    maxPrice,
    currency,
    score,
    patientAge,
    hairLossDegree,
    imageUrl,
  } = data;

  try {
    const [updatedCase] = await sql`
      UPDATE cases
      SET
        doctor_id = ${doctorId || null},
        clinic_id = ${clinicId},
        method = ${method || null},
        country = ${country || null},
        min_price = ${minPrice || null},
        max_price = ${maxPrice || null},
        currency = ${currency || 'TRY'},
        score = ${score || null},
        patient_age = ${patientAge || null},
        hair_loss_degree = ${hairLossDegree || null},
        image_url = ${imageUrl || null}
      WHERE id = ${id}
      RETURNING 
        id,
        doctor_id AS "doctorId",
        clinic_id AS "clinicId",
        method,
        country,
        min_price AS "minPrice",
        max_price AS "maxPrice",
        currency,
        score,
        patient_age AS "patientAge",
        hair_loss_degree AS "hairLossDegree",
        created_at AS "createdAt",
        image_url AS "imageUrl"
    `;

    return updatedCase;
  } catch (error) {
    console.error('updateCase Hata:', error);
    throw new Error('Vaka güncellenirken veritabanı hatası oluştu.');
  }
}

/**
 * Belirtilen ID'ye sahip vakayı/sonucu siler.
 */
export async function deleteCase(id) {
  try {
    const [deletedCase] = await sql`
      DELETE FROM cases
      WHERE id = ${id}
      RETURNING id
    `;
    
    // Eğer deletedCase varsa silme başarılıdır, true döner
    return !!deletedCase;
  } catch (error) {
    console.error('deleteCase Hata:', error);
    throw new Error('Vaka silinirken veritabanı hatası oluştu.');
  }
}