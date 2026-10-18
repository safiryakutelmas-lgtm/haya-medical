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
  mapIframe: row.mapIframe ?? null, // EKLENDİ
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
      "mapIframe" AS "mapIframe",
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
      "mapIframe" AS "mapIframe",
      created_at AS "createdAt"
    FROM clinics
    WHERE id = ${id}
    LIMIT 1
  `;

  if (!clinic) return null;

  const mapData = clinic.mapIframe || clinic.mapiframe || clinic["mapIframe"] || null;

  return {
    ...normalizeClinic(clinic),
    mapIframe: mapData
  };
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
  mapIframe = null, // EKLENDİ
  score = null,
  reviewCount = 0,
} = {}) {
  const [clinic] = await sql`
    INSERT INTO clinics
      (name, city, country, founded_year, languages, specialties, has_video_consultation, is_verified, image_url, score, review_count, methods, hair_transplants_count, price_label, "Location", "mapIframe")
    VALUES
      (${name}, ${city}, ${country}, ${foundedYear}, ${languages}, ${specialties}, ${hasVideoConsultation}, ${isVerified}, ${imageUrl}, ${score}, ${reviewCount}, ${methods}, ${hairTransplantsCount}, ${priceLabel}, ${location}, ${mapIframe})
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
      "mapIframe" AS "mapIframe",
      created_at AS "createdAt"
  `;

  return clinic ? normalizeClinic(clinic) : null;
}

/** @returns {Promise<Clinic | null>} */
export async function updateClinic(id, data = {}) {
  const {
    name,
    city,
    country,
    foundedYear,
    languages,
    specialties,
    hasVideoConsultation,
    isVerified,
    imageUrl,
    score,
    reviewCount,
    methods,
    hairTransplantsCount,
    priceLabel,
    location,
    mapIframe, // EKLENDİ
  } = data;

  const [clinic] = await sql`
    UPDATE clinics
    SET
      name = COALESCE(${name}, name),
      city = COALESCE(${city}, city),
      country = COALESCE(${country}, country),
      founded_year = COALESCE(${foundedYear}, founded_year),
      languages = COALESCE(${languages}, languages),
      specialties = COALESCE(${specialties}, specialties),
      has_video_consultation = COALESCE(${hasVideoConsultation}, has_video_consultation),
      is_verified = COALESCE(${isVerified}, is_verified),
      image_url = COALESCE(${imageUrl}, image_url),
      score = COALESCE(${score}, score),
      review_count = COALESCE(${reviewCount}, review_count),
      methods = COALESCE(${methods}, methods),
      hair_transplants_count = COALESCE(${hairTransplantsCount}, hair_transplants_count),
      price_label = COALESCE(${priceLabel}, price_label),
      "Location" = COALESCE(${location}, "Location"),
      "mapIframe" = COALESCE(${mapIframe}, "mapIframe")
    WHERE id = ${id}
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
      "mapIframe" AS "mapIframe",
      created_at AS "createdAt"
  `;

  return clinic ? normalizeClinic(clinic) : null;
}

/** @returns {Promise<boolean>} */
export async function deleteClinic(id) {
  const result = await sql`
    DELETE FROM clinics
    WHERE id = ${id}
    RETURNING id
  `;

  return result.length > 0;
}