import { getAllClinics, getClinicPricesByClinicId } from '@/services/clinic-test-service';
import { getAllDoctors } from '@/services/doctorService';

export default async function ClinicTestPage() {
  const clinics = await getAllClinics();
  const doctors = await getAllDoctors();
  const priceMap = await Promise.all(
    clinics.slice(0, 6).map(async (clinic) => ({
      clinicId: clinic.id,
      prices: await getClinicPricesByClinicId(clinic.id),
    }))
  );

  const clinicPricesById = priceMap.reduce((acc, item) => {
    acc[item.clinicId] = item.prices;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Clinic test dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">
            Server-rendered clinic, doctor and price data loaded from the shared service layer.
          </p>
        </div>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Clinics</h2>
              <p className="mt-1 text-sm text-slate-600">All clinics returned by the service.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {clinics.length} clinics
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {clinics.map((clinic) => {
              const prices = clinicPricesById[clinic.id] || [];
              return (
                <div
                  key={clinic.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  {clinic.imageUrl ? (
                    <div className="overflow-hidden rounded-3xl bg-slate-100">
                      <img
                        src={clinic.imageUrl}
                        alt={`${clinic.name} photo`}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center rounded-3xl bg-slate-100 text-sm text-slate-500">
                      No image available
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{clinic.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {clinic.city || 'Unknown city'}, {clinic.country || 'Unknown country'}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        clinic.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {clinic.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>

                  <div className="mt-4 text-sm leading-6 text-slate-600">
                    <p>
                      <span className="font-medium text-slate-900">Founded:</span>{' '}
                      {clinic.foundedYear ?? 'N/A'}
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-slate-900">Score:</span>{' '}
                      {clinic.score ?? 'N/A'} / 5
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-slate-900">Reviews:</span>{' '}
                      {clinic.reviewCount}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {clinic.languages?.length ? (
                      clinic.languages.slice(0, 3).map((language) => (
                        <span
                          key={language}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                        >
                          {language}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                        No languages listed
                      </span>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-slate-600">
                    <p className="font-medium text-slate-900">Methods:</p>
                    <p>{clinic.methods?.join(', ') || 'No methods available'}</p>
                  </div>

                  <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Top price details</p>
                    {prices.length > 0 ? (
                      prices.slice(0, 2).map((price) => (
                        <div key={price.id} className="mt-3">
                          <p className="font-medium">{price.method}</p>
                          <p className="text-slate-600">
                            {price.minPrice} - {price.maxPrice} {price.currency}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="mt-2 text-slate-500">No price records available.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Doctors</h2>
              <p className="mt-1 text-sm text-slate-600">All doctors returned by the service.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {doctors.length} doctors
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {doctor.imageUrl ? (
                  <div className="overflow-hidden rounded-3xl bg-slate-100">
                    <img
                      src={doctor.imageUrl}
                      alt={`${doctor.name} photo`}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-3xl bg-slate-100 text-sm text-slate-500">
                    No image available
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{doctor.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{doctor.title || 'Medical doctor'}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {doctor.yearsOfExperience} yrs
                  </span>
                </div>

                <div className="mt-4 text-sm leading-6 text-slate-600">
                  <p>
                    <span className="font-medium text-slate-900">Clinic ID:</span> {doctor.clinicId || 'N/A'}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium text-slate-900">Medihair cases:</span> {doctor.medihairCases}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium text-slate-900">Hair transplants:</span> {doctor.hairTransplantsCount}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {doctor.specialties?.length ? (
                    doctor.specialties.slice(0, 4).map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                      >
                        {specialty}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                      No specialties
                    </span>
                  )}
                </div>

                <div className="mt-4 text-sm text-slate-600">
                  <p className="font-medium text-slate-900">Education</p>
                  <p>{doctor.education || 'Not provided'}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
