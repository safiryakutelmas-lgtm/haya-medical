import { sql } from '@/lib/neondb';

/** @typedef {import('@/types').Clinic} Clinic */
/** @typedef {import('@/types').ClinicPrice} ClinicPrice */

const normalizeClinic = (row) => ({
  id: Number(row.id),
  name: row.name,
  city: row.city ?? null,
  country: row.country ?? null,
  foundedYear: row.foundedYear ?? null,
  languages: Array.isArray(row.languages) ? row.languages : row.languages ? [row.languages] : null,
  specialties: Array.isArray(row.specialties) ? row.specialties : row.specialties ? [row.specialties] : null,
  hasVideoConsultation: Boolean(row.hasVideoConsultation),
  isVerified: Boolean(row.isVerified),
  imageUrl: row.imageUrl ?? null,
  score: row.score == null ? null : Number(row.score),
  reviewCount: Number(row.reviewCount ?? 0),
  methods: Array.isArray(row.methods) ? row.methods : row.methods ? [row.methods] : null,
  hairTransplantsCount: Number(row.hairTransplantsCount ?? 0),
  priceLabel: row.priceLabel ?? null,
  location: row.location ?? null,
  createdAt: row.createdAt ?? new Date().toISOString(),
});

const normalizeClinicPrice = (row) => ({
  id: Number(row.id),
  clinicId: Number(row.clinicId),
  method: row.method,
  minPrice: Number(row.minPrice),
  maxPrice: Number(row.maxPrice),
  currency: row.currency,
  details: row.details ?? null,
  createdAt: row.createdAt ?? new Date().toISOString(),
});

/** @returns {Promise<Clinic[]>} */
export async function getAllClinics() {
  const clinics = await sql`
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
      "Location" AS location,
      created_at AS "createdAt"
    FROM clinics
    ORDER BY score DESC NULLS LAST, review_count DESC
  `;

  return clinics.map(normalizeClinic);
}

/** @returns {Promise<Clinic | null>} */
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
      "Location" AS location,
      created_at AS "createdAt"
    FROM clinics
    WHERE id = ${id}
    LIMIT 1
  `;

  return clinic ? normalizeClinic(clinic) : null;
}

/** @returns {Promise<ClinicPrice[]>} */
export async function getClinicPricesByClinicId(clinicId) {
  const prices = await sql`
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

  return prices.map(normalizeClinicPrice);
}

/** @returns {Promise<Clinic | null>} */
export async function createClinic({
  name,
  city = null,
  country = null,
  foundedYear = null,
  languages = null,
  specialties = null,
  hasVideoConsultation = false,
  isVerified = false,
  imageUrl = null,
  methods = null,
  hairTransplantsCount = 0,
  priceLabel = null,
  location = null,
  score = null,
  reviewCount = 0,
} = {}) {
  const [clinic] = await sql`
    INSERT INTO clinics
      (name, city, country, founded_year, languages, specialties, has_video_consultation, is_verified, image_url, score, review_count, methods, hair_transplants_count, price_label, "Location")
    VALUES
      (${name}, ${city}, ${country}, ${foundedYear}, ${languages}, ${specialties}, ${hasVideoConsultation}, ${isVerified}, ${imageUrl}, ${score}, ${reviewCount}, ${methods}, ${hairTransplantsCount}, ${priceLabel}, ${location})
    RETURNING
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
      "Location" AS location,
      created_at AS "createdAt"
  `;

  return clinic ? normalizeClinic(clinic) : null;
}
