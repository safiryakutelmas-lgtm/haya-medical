'use client';

const partners = [
  { name: 'MediPlus', logo: 'https://medihair.com/wp-content/uploads/2020/12/Medihair_Tsilosani_logo.png' },
  { name: 'NovaCare', logo: 'https://medihair.com/wp-content/uploads/2020/12/Medihair_Kosmed_logo.png' },
  { name: 'Aster', logo: 'https://medihair.com/wp-content/uploads/2020/12/Medihair_Demirsoy_logo.png' },
  { name: 'LumaClinic', logo: 'https://medihair.com/wp-content/uploads/2020/12/Medihair_Sahinoglu_logo.png' },
  { name: 'Bloom', logo: 'https://medihair.com/wp-content/uploads/2020/12/Medihair_Gur_logo.png' },
  { name: 'Horizon', logo: 'https://medihair.com/wp-content/uploads/2020/12/Medihair_proaesthetic_logo.png' },

];

const logoSet = [...partners, ...partners];

export default function PartnerLogoBant() {
  return (
    <section className="w-full ">
      <div className="w-full px-0 py-8 sm:py-1">
        <div className="mx-auto mb-5 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[20px] font-semibold uppercase tracking-[0.26em] text-slate-500">
            Trusted clinics
          </p>
         
        </div>

        <div className="relative w-full overflow-hidden bg-white px-0 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-white to-transparent" />

          <div className="marquee-track flex min-w-max items-center gap-4 px-3 sm:gap-5 sm:px-5">
            {logoSet.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex h-20 w-[180px] shrink-0 items-center justify-center rounded-2xl bg-white px-4 py-3 transition duration-300 hover:shadow-sm sm:w-[220px]"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-full object-contain filter grayscale-0 contrast-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          width: max-content;
          animation: marquee 24s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
