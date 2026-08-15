import Image from 'next/image';
import Link from 'next/link';
import { getDoctorById, getCasesByDoctorId } from '@/services/doctorService';
import { getClinicById } from '@/services/clinic-test-service';

export const dynamic = 'force-dynamic';

export default async function DoctorDetailPage({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams?.id);
  console.log('doctor-detail page params.id ->', resolvedParams?.id, 'parsed id ->', id);

  if (!id) {
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Doktor bulunamadı</h2>
          <p className="mt-2 text-sm text-slate-600">Geçerli bir doktor kimliği sağlanmadı. Gelen id: <strong>{resolvedParams?.id ?? 'undefined'}</strong></p>
          <div className="mt-4">
            <Link href="/doctors" className="inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white">Doktorlara Dön</Link>
          </div>
        </div>  
      </main>
    );
  }

  const doctor = await getDoctorById(id);
  if (!doctor) {
    console.log('doctor not found for id ->', id);
    return (
      <main className="min-h-screen p-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Doktor bulunamadı</h2>
          <p className="mt-2 text-sm text-slate-600">ID ile eşleşen doktor bulunamadı. Sorgulanan id: <strong>{id}</strong></p>
          <div className="mt-4">
            <Link href="/doctors" className="inline-flex items-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white">Doktorlara Dön</Link>
          </div>
        </div>
      </main>
    );
  }
  console.log('doctor loaded ->', { id: doctor.id, name: doctor.name });

  const cases = await getCasesByDoctorId(id);
  let clinic = null;
  if (doctor.clinicId) {
    clinic = await getClinicById(doctor.clinicId);
    console.log('loaded clinic for doctor ->', doctor.clinicId, clinic?.name);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="relative -mt-10 md:mt-0 md:mr-6 h-36 w-36 flex-shrink-0 rounded-full border-4 border-white bg-slate-100 shadow-lg overflow-hidden">
              {doctor.imageUrl ? (
                <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover" sizes="144px" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">No Photo</div>
              )}
            </div>

              {clinic && (
                <section className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 h-48 relative rounded-xl overflow-hidden bg-slate-100">
                      {clinic.imageUrl ? (
                        <Image src={clinic.imageUrl} alt={clinic.name} fill className="object-cover" sizes="(min-width: 768px) 66vw, 100vw" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">No Photo</div>
                      )}
                    </div>

                    <div className="h-48 relative rounded-xl overflow-hidden bg-slate-100">
                      {clinic.imageUrl ? (
                        <Image src={clinic.imageUrl} alt={`${clinic.name} alt`} fill className="object-cover object-top" sizes="(min-width: 768px) 33vw, 100vw" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">No Photo</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4 border border-slate-200 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{clinic.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">{clinic.location || `${clinic.city || ''}${clinic.country ? `, ${clinic.country}` : ''}`}</p>
                      </div>

                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <span className="text-sm text-slate-500">Puan</span>
                        <span className="text-lg font-bold text-slate-900">{clinic.score ?? '—'}</span>
                        <span className="text-xs text-slate-500">{clinic.reviewCount ? `${clinic.reviewCount} reviews` : ''}</span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                      <div>
                        <strong>Founded:</strong> {clinic.foundedYear ?? '—'}
                      </div>
                      <div>
                        <strong>Languages:</strong> {clinic.languages?.join(', ') || '—'}
                      </div>
                      <div>
                        <strong>Specialties:</strong> {clinic.specialties?.join(', ') || '—'}
                      </div>
                      <div>
                        <strong>Methods:</strong> {clinic.methods?.join(', ') || '—'}
                      </div>
                      <div>
                        <strong>Total Procedures:</strong> {clinic.hairTransplantsCount?.toLocaleString() || '—'}
                      </div>
                      <div>
                        <strong>Price:</strong> {clinic.priceLabel || '—'}
                      </div>
                    </div>
                  </div>
                </section>
              )}

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{doctor.name}</h1>
                  <p className="mt-1 text-sm text-teal-700 font-semibold">{doctor.title || 'Medical Doctor'}</p>
                </div>

                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <span className="text-sm text-slate-500">Deneyim</span>
                  <span className="text-lg font-bold text-slate-900">{doctor.yearsOfExperience} yrs</span>
                </div>
              </div>

              <div className="mt-4 flex gap-3 flex-wrap">
                {doctor.specialties?.slice(0, 6).map((s) => (
                  <span key={s} className="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200">{s}</span>
                ))}
              </div>

              <div className="mt-4 text-sm text-slate-700">
                <h3 className="text-sm font-semibold text-slate-900">Hakkında</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{doctor.bio || 'Bilgi bulunmamaktadır.'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h4 className="text-xs font-bold uppercase text-slate-400">Toplam Vakalar</h4>
            <div className="mt-2 text-xl font-bold text-slate-900">{doctor.cases?.toLocaleString() || 'N/A'}</div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h4 className="text-xs font-bold uppercase text-slate-400">Saç Ekimi Vakaları</h4>
            <div className="mt-2 text-xl font-bold text-slate-900">{doctor.hairTransplantsCount?.toLocaleString() || 'N/A'}</div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
            <h4 className="text-xs font-bold uppercase text-slate-400">Eğitim</h4>
            <div className="mt-2 text-sm text-slate-700">{doctor.education || 'Bilgi yok'}</div>
          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Vakalar & Öncesi / Sonrası</h2>
            <Link href="/doctors" className="text-sm font-medium text-teal-600">Tüm Doktorlar</Link>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.length === 0 && (
              <div className="rounded-2xl bg-white p-6 text-sm text-slate-500 border border-slate-100">Bu doktor için vaka bulunamadı.</div>
            )}

            {cases.map((c) => (
              <div key={c.id} className="rounded-2xl bg-white overflow-hidden border border-slate-200 shadow-sm">
                <div className="relative h-40 w-full bg-slate-100">
                  {c.beforeImageUrl && (
                    <Image src={c.beforeImageUrl} alt={`before-${c.id}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
                  )}
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-slate-900">{c.method || 'Method'}</div>
                  <div className="mt-1 text-xs text-slate-500">{c.country || ''} • {c.patientAge ? `${c.patientAge} yrs` : 'Age N/A'}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
