'use client';

export default function DoctorsClinic() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-base font-semibold uppercase tracking-wide text-teal-600">
            Doktor & Klinik
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uzman doktorlarımız ve kaliteli klinik hizmetleri
          </h2>
          <p className="mt-4 text-gray-600 sm:text-lg">
            Türkiye'nin önde gelen sağlık uzmanları ve modern klinikleriyle hızlıca iletişim kurun.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Acil Servis</h3>
            <p className="mt-3 text-sm text-gray-600">
              7/24 destek veren acil servis çalışanlarımızla hızlı randevu ve yönlendirme sağlayın.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Uzman Doktorlar</h3>
            <p className="mt-3 text-sm text-gray-600">
              Alanında deneyimli doktorlarımızla güvenilir sağlık değerlendirmesi yapın.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Klinik Hizmetleri</h3>
            <p className="mt-3 text-sm text-gray-600">
              Modern klinik altyapısıyla konforlu ve güvenli tedavi süreçleri sunuyoruz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
