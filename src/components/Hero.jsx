import Image from 'next/image';
import Link from 'next/link';
import MultiStepForm from './MultiStepForm';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden w-full min-h-screen shadow-2xl">
      {/* Arka Plan Görseli ve Karartma Katmanı */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://cdn.pixabay.com/photo/2018/07/16/07/34/indian-3541337_1280.jpg"
          alt="Sağlık Hizmetleri"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Görselin üzerine yumuşak koyu degrade kaplama */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/60 to-transparent" />
      </div>

      {/* Hero İçeriği - Mobilde 1 kolon, Büyük Ekranlarda (lg) 2 kolon */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Sol Taraf: Metin İçeriği */}
        <div className="text-center lg:text-left">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-300 uppercase bg-teal-900/60 rounded-full border border-teal-500/30">
            Güvenilir Sağlık Rehberi
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Sağlığınız İçin En Doğru Uzman Doktoru Bulun
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed">
            Uzman doktorlarımızı inceleyin, deneyim ve muayene ücretlerini karşılaştırarak size en uygun randevuyu kolayca planlayın.
          </p>

          {/* Butonlar - Mobilde tam genişlik, Masada esnek */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/doctors"
              className="w-full sm:w-auto px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition shadow-lg shadow-teal-500/30 text-center"
            >
              Doktorları İncele
            </Link>
            <a
              href="#about"
              className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium rounded-lg backdrop-blur-sm transition text-center"
            >
              Nasıl Çalışır?
            </a>
          </div>
        </div>

        {/* Sağ Taraf: MultiStepForm */}
        <div className="w-full flex justify-center">
          <MultiStepForm />
        </div>

      </div>
    </div>
  );
}