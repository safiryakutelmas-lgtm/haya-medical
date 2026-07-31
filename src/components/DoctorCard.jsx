import Link from 'next/link';

export default function DoctorCard({ doktor }) {
  const {
    name = "Doktor Adı",
    experience = 0,
    price = 0,
    city = "Belirtilmemiş",
  } = doktor || {};

  return (
    <Link href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100 border border-gray-100 bg-white hover:shadow-md transition">
      <img
        alt={name}
        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1160"
        className="h-56 w-full rounded-md object-cover"
      />

      <div className="mt-3">
        <dl>
          <div>
            <dt className="sr-only">Price</dt>
            <dd className="text-sm font-semibold text-teal-600">₺ {price}</dd>
          </div>

          <div>
            <dt className="sr-only">Name</dt>
            <dd className="font-bold text-lg text-gray-900 mt-0.5">{name}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-8 text-xs border-t pt-3">
          {/* Şehir Bilgisi */}
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              aria-hidden="true"
              className="size-4 text-teal-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Şehir</p>
              <p className="font-medium text-gray-800">{city}</p>
            </div>
          </div>

          {/* Deneyim Bilgisi */}
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              aria-hidden="true"
              className="size-4 text-teal-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Deneyim</p>
              <p className="font-medium text-gray-800">{experience} Yıl</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}