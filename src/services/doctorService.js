import { sql } from '@/lib/neondb';

/** @typedef {import('@/types').Doctor} Doctor */
/** @typedef {import('@/types').ClinicCase} ClinicCase */

const normalizeDoctor = (row) => ({
  id: Number(row.id),
  clinicId: row.clinicId ?? null,
  name: row.name,
  title: row.title ?? null,
  imageUrl: row.imageUrl ?? null,
  bio: row.bio ?? null,
  specialties: Array.isArray(row.specialties) ? row.specialties : row.specialties ? [row.specialties] : null,
  cases: Number(row.cases ?? 0),
  yearsOfExperience: Number(row.yearsOfExperience ?? 0),
  hairTransplantsCount: Number(row.hairTransplantsCount ?? 0),
  education: row.education ?? null,
  medicalSocieties: Array.isArray(row.medicalSocieties) ? row.medicalSocieties : row.medicalSocieties ? [row.medicalSocieties] : null,
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

/** @returns {Promise<Doctor | null>} */
export async function createDoctor({
  clinicId = null,
  name,
  title = null,
  imageUrl = null,
  bio = null,
  specialties = null,
  cases = 0,
  yearsOfExperience = 0,
  hairTransplantsCount = 0,
  education = null,
  medicalSocieties = null,
} = {}) {
  const [doctor] = await sql`
    INSERT INTO doctors
      (clinic_id, name, title, image_url, bio, specialties, cases, years_of_experience, hair_transplants_count, education, medical_societies)
    VALUES
      (${clinicId}, ${name}, ${title}, ${imageUrl}, ${bio}, ${specialties}, ${cases}, ${yearsOfExperience}, ${hairTransplantsCount}, ${education}, ${medicalSocieties})
    RETURNING
      id,
      clinic_id AS "clinicId",
      name,
      title,
      image_url AS "imageUrl",
      bio,
      specialties,
      cases,
      years_of_experience AS "yearsOfExperience",
      hair_transplants_count AS "hairTransplantsCount",
      education,
      medical_societies AS "medicalSocieties",
      created_at AS "createdAt"
  `;

  return doctor ? normalizeDoctor(doctor) : null;
}

/** @returns {Promise<Doctor[]>} */
export async function getAllDoctors() {
  const doctors = await sql`
    SELECT
      id,
      clinic_id AS "clinicId",
      name,
      title,
      image_url AS "imageUrl",
      bio,
      specialties,
      cases,
      years_of_experience AS "yearsOfExperience",
      hair_transplants_count AS "hairTransplantsCount",
      education,
      medical_societies AS "medicalSocieties",
      created_at AS "createdAt"
    FROM doctors
    ORDER BY years_of_experience DESC, cases DESC
  `;

  return doctors.map(normalizeDoctor);
}

/** @returns {Promise<Doctor | null>} */
export async function getDoctorById(id) {
  const [doctor] = await sql`
    SELECT
      id,
      clinic_id AS "clinicId",
      name,
      title,
      image_url AS "imageUrl",
      bio,
      specialties,
      cases,
      years_of_experience AS "yearsOfExperience",
      hair_transplants_count AS "hairTransplantsCount",
      education,
      medical_societies AS "medicalSocieties",
      created_at AS "createdAt"
    FROM doctors
    WHERE id = ${id}
    LIMIT 1
  `;

  return doctor ? normalizeDoctor(doctor) : null;
}

/** @returns {Promise<ClinicCase[]>} */
export async function getCasesByClinicId(clinicId) {
  const cases = await sql`
    SELECT
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
    FROM cases
    WHERE clinic_id = ${clinicId}
    ORDER BY created_at DESC
  `;

  return cases.map(normalizeClinicCase);
}

/** @returns {Promise<ClinicCase[]>} */
export async function getCasesByDoctorId(doctorId) {
  const cases = await sql`
    SELECT
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
    FROM cases
    WHERE doctor_id = ${doctorId}
    ORDER BY created_at DESC
  `;

  return cases.map(normalizeClinicCase);
}
