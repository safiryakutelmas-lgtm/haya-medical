import Image from 'next/image';
import { getAllClinics, getClinicPricesByClinicId } from '@/services/clinic-test-service';
import { getAllDoctors } from '@/services/doctorService';



// ... geri kalan sayfa kodlarınız
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
              {clinics.length}  clinics
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {clinics.map((clinic) => {
              const prices = clinicPricesById[clinic.id] || [];
              const locationText = clinic.location || `${clinic.city || 'Unknown city'}, ${clinic.country || 'Unknown country'}`;

              return (
                <div
                  key={clinic.id}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  {clinic.imageUrl ? (
                    <div className="overflow-hidden rounded-2xl bg-slate-100">
                      <Image
                        src={clinic.imageUrl}
                        alt={`${clinic.name} photo`}
                        width={800}
                        height={480}
                        className="h-48 w-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-500">
                      No image available
                    </div>
                  )}

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-semibold text-slate-900">{clinic.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{locationText}</p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        clinic.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {clinic.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-600">
                    {clinic.foundedYear && (
                      <span className="rounded-full bg-slate-100 px-2 py-1">Founded {clinic.foundedYear}</span>
                    )}
                    {clinic.hasVideoConsultation && (
                      <span className="rounded-full bg-violet-100 px-2 py-1 text-violet-700">Video consult</span>
                    )}
                    {clinic.score != null && (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700">{clinic.score}/5</span>
                    )}
                  </div>

                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    {clinic.specialties?.length ? (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Specialties</p>
                        <div className="flex flex-wrap gap-2">
                          {clinic.specialties.slice(0, 4).map((specialty) => (
                            <span key={specialty} className="rounded-full bg-sky-50 px-2.5 py-1 text-xs text-sky-700">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {clinic.methods?.length ? (
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Methods</p>
                        <p>{clinic.methods.join(', ')}</p>
                      </div>
                    ) : null}

                    {clinic.priceLabel && (
                      <p>
                        <span className="font-medium text-slate-900">Price label:</span> {clinic.priceLabel}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {clinic.languages?.length ? (
                      clinic.languages.slice(0, 3).map((language) => (
                        <span key={language} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                          {language}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">No languages</span>
                    )}
                  </div>

                  <div className="mt-auto border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Reviews</span>
                      <span className="font-semibold text-slate-900">{clinic.reviewCount}</span>
                    </div>

                    {prices.length > 0 ? (
                      <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                        <p className="font-semibold text-slate-900">Price details</p>
                        {prices.slice(0, 2).map((price) => (
                          <div key={price.id} className="mt-2">
                            <p className="font-medium text-slate-800">{price.method}</p>
                            <p className="text-slate-600">
                              {price.minPrice} - {price.maxPrice} {price.currency}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">No price records available.</div>
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
                    <Image
                      src={doctor.imageUrl}
                      alt={`${doctor.name} photo`}
                      width={800}
                      height={480}
                      className="h-48 w-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <span className="font-medium text-slate-900">Cases:</span> {doctor.cases}
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
