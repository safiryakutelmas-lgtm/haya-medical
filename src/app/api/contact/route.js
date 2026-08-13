import { createHairTransplantLead } from '@/services/hairTransplantLeadService';

export async function POST(req) {
  try {
    const body = await req.json();

    const payload = {
      hairLossType: body.hairLossType ?? null,
      hadTransplant: body.hadTransplant ?? null,
      familyHistory: body.familyHistory ?? null,
      yearsOfLoss: body.yearsOfLoss ?? null,
      ageRange: body.ageRange ?? null,
      currentTreatment: body.currentTreatment ?? null,
      doctorPriority: body.doctorPriority ?? null,
      willingToTravel: body.willingToTravel ?? null,
      country: body.country ?? null,
      zipCode: body.zipCode ?? null,
      title: body.title ?? null,
      firstName: body.firstName ?? null,
      lastName: body.lastName ?? null,
      email: body.email ?? null,
      phone: body.phone ?? null,
      termsAccepted: Boolean(body.termsAccepted),
    };

    const lead = await createHairTransplantLead(payload);

    return new Response(JSON.stringify({ success: true, data: lead }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form insert failed:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
