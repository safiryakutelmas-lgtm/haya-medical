import { sql } from '@/lib/neondb';

export async function getAllDoctors() {
  return await sql`
    SELECT
      id,
      clinic_id AS "clinicId",
      name,
      title,
      image_url AS "imageUrl",
      bio,
      specialties,
      medihair_cases AS "medihairCases",
      years_of_experience AS "yearsOfExperience",
      hair_transplants_count AS "hairTransplantsCount",
      education,
      medical_societies AS "medicalSocieties",
      created_at AS "createdAt"
    FROM doctors
    ORDER BY years_of_experience DESC, medihair_cases DESC
  `;
}

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
      medihair_cases AS "medihairCases",
      years_of_experience AS "yearsOfExperience",
      hair_transplants_count AS "hairTransplantsCount",
      education,
      medical_societies AS "medicalSocieties",
      created_at AS "createdAt"
    FROM doctors
    WHERE id = ${id}
    LIMIT 1
  `;

  return doctor || null;
}

export async function getCasesByClinicId(clinicId) {
  return await sql`
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
}

export async function getCasesByDoctorId(doctorId) {
  return await sql`
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
}
