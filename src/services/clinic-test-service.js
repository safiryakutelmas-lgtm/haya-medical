import { sql } from '@/lib/neondb';

export async function getAllClinics() {
  return await sql`
    SELECT
      id,
      name,
      city,
      country,
      founded_year AS "foundedYear",
      languages,
      specialties,
      has_video_consultation AS "hasVideoConsultation",
      is_verified AS "isVerified",
      image_url AS "imageUrl",
      score::float AS score,
      review_count AS "reviewCount",
      methods,
      hair_transplants_count AS "hairTransplantsCount",
      price_label AS "priceLabel",
      created_at AS "createdAt"
    FROM clinics
    ORDER BY score DESC NULLS LAST, review_count DESC
  `;
}

export async function getClinicById(id) {
  const [clinic] = await sql`
    SELECT
      id,
      name,
      city,
      country,
      founded_year AS "foundedYear",
      languages,
      specialties,
      has_video_consultation AS "hasVideoConsultation",
      is_verified AS "isVerified",
      image_url AS "imageUrl",
      score::float AS score,
      review_count AS "reviewCount",
      methods,
      hair_transplants_count AS "hairTransplantsCount",
      price_label AS "priceLabel",
      created_at AS "createdAt"
    FROM clinics
    WHERE id = ${id}
    LIMIT 1
  `;

  return clinic || null;
}

export async function getClinicPricesByClinicId(clinicId) {
  return await sql`
    SELECT
      id,
      clinic_id AS "clinicId",
      method,
      min_price AS "minPrice",
      max_price AS "maxPrice",
      currency,
      details,
      created_at AS "createdAt"
    FROM clinic_prices
    WHERE clinic_id = ${clinicId}
    ORDER BY min_price ASC
  `;
}
