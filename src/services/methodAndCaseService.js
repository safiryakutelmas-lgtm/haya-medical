import { sql } from '@/lib/neondb';

/** @typedef {import('@/types').ClinicPrice} ClinicPrice */
/** @typedef {import('@/types').ClinicCase} ClinicCase */

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

const normalizeClinicCase = (row) => ({
  id: Number(row.id),
  doctorId: Number(row.doctorId),
  clinicId: Number(row.clinicId),
  method: row.method ?? null,
  country: row.country ?? null,
  beforeImageUrl: row.beforeImageUrl ?? null,
  afterImageUrl: row.afterImageUrl ?? null,
  minPrice: row.minPrice == null ? null : Number(row.minPrice),
  maxPrice: row.maxPrice == null ? null : Number(row.maxPrice),
  currency: row.currency,
  score: row.score == null ? null : Number(row.score),
  patientAge: row.patientAge == null ? null : Number(row.patientAge),
  hairLossDegree: row.hairLossDegree ?? null,
  createdAt: row.createdAt ?? new Date().toISOString(),
});

/** @returns {Promise<ClinicPrice | null>} */
export async function createClinicPrice({
  clinicId,
  method,
  minPrice,
  maxPrice,
  currency = 'USD',
  details = null,
} = {}) {
  if (!clinicId) {
    throw new Error('clinicId is required');
  }

  if (!method) {
    throw new Error('method is required');
  }

  const [row] = await sql`
    INSERT INTO clinic_prices
      (clinic_id, method, min_price, max_price, currency, details)
    VALUES
      (${Number(clinicId)}, ${method}, ${Number(minPrice)}, ${Number(maxPrice)}, ${currency}, ${details})
    RETURNING
      id,
      clinic_id AS "clinicId",
      method,
      min_price AS "minPrice",
      max_price AS "maxPrice",
      currency,
      details,
      created_at AS "createdAt"
  `;

  return row ? normalizeClinicPrice(row) : null;
}

/** @returns {Promise<ClinicPrice[]>} */
export async function getClinicPricesByClinicId(clinicId) {
  const rows = await sql`
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
    WHERE clinic_id = ${Number(clinicId)}
    ORDER BY min_price ASC
  `;

  return rows.map(normalizeClinicPrice);
}

/** @returns {Promise<ClinicCase | null>} */
export async function createCase({
  doctorId,
  clinicId,
  method = null,
  country = null,
  beforeImageUrl = null,
  afterImageUrl = null,
  minPrice = null,
  maxPrice = null,
  currency = 'USD',
  patientAge = null,
  hairLossDegree = null,
} = {}) {
  if (!doctorId) {
    throw new Error('doctorId is required');
  }

  if (!clinicId) {
    throw new Error('clinicId is required');
  }

  const [row] = await sql`
    INSERT INTO cases
      (doctor_id, clinic_id, method, country, before_image_url, after_image_url, min_price, max_price, currency, patient_age, hair_loss_degree)
    VALUES
      (${Number(doctorId)}, ${Number(clinicId)}, ${method}, ${country}, ${beforeImageUrl}, ${afterImageUrl}, ${minPrice == null ? null : Number(minPrice)}, ${maxPrice == null ? null : Number(maxPrice)}, ${currency}, ${patientAge == null ? null : Number(patientAge)}, ${hairLossDegree})
    RETURNING
      id,
      doctor_id AS "doctorId",
      clinic_id AS "clinicId",
      method,
      country,
      before_image_url AS "beforeImageUrl",
      after_image_url AS "afterImageUrl",
      min_price AS "minPrice",
      max_price AS "maxPrice",
      currency,
      score::float AS score,
      patient_age AS "patientAge",
      hair_loss_degree AS "hairLossDegree",
      created_at AS "createdAt"
  `;

  return row ? normalizeClinicCase(row) : null;
}
