import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden rounded-2xl  w-full mx-auto shadow-2xl">
      {/* Arka Plan Görseli ve Karartma Katmanı */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2070"
          alt="Sağlık Hizmetleri"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Görselin üzerine yumuşak koyu degrade kaplama */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/60 to-transparent" />
      </div>

      {/* Hero İçeriği */}
      <div className="relative z-10 max-w-2xl px-6 py-20 sm:px-12 sm:py-28">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-300 uppercase bg-teal-900/60 rounded-full border border-teal-500/30">
          Güvenilir Sağlık Rehberi
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Sağlığınız İçin En Doğru Uzman Doktoru Bulun
        </h1>
        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
          Uzman doktorlarımızı inceleyin, deneyim ve muayene ücretlerini karşılaştırarak size en uygun randevuyu kolayca planlayın.
        </p>

        {/* Butonlar */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/doctors"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition shadow-lg shadow-teal-500/30 text-center"
          >
            Doktorları İncele
          </Link>
          <a
            href="#about"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium rounded-lg backdrop-blur-sm transition text-center"
          >
            Nasıl Çalışır?
          </a>
        </div>
      </div>
    </div>
  );
}