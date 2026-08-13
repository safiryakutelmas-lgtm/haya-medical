import { sql } from '@/lib/neondb';

export async function createHairTransplantLead({
  hairLossType = null,
  hadTransplant = null,
  familyHistory = null,
  yearsOfLoss = null,
  ageRange = null,
  currentTreatment = null,
  doctorPriority = null,
  willingToTravel = null,
  country = null,
  zipCode = null,
  title = null,
  firstName = null,
  lastName = null,
  email = null,
  phone = null,
  termsAccepted = false,
} = {}) {
  const phoneCountryCode = phone?.countryCode ?? null;
  const phoneNumber = phone?.number ?? null;

  const [lead] = await sql`
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
      zip_code,
      title,
      first_name,
      last_name,
      email,
      phone_country_code,
      phone_number,
      terms_accepted
    )
    VALUES (
      ${hairLossType},
      ${hadTransplant},
      ${familyHistory},
      ${yearsOfLoss},
      ${ageRange},
      ${currentTreatment},
      ${doctorPriority},
      ${willingToTravel},
      ${country},
      ${zipCode},
      ${title},
      ${firstName},
      ${lastName},
      ${email},
      ${phoneCountryCode},
      ${phoneNumber},
      ${termsAccepted}
    )
    RETURNING *
  `;

  return lead;
}
