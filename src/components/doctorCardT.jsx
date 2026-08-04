import React from 'react';

export default function DoctorCardT({ doctor }) {
  // Eğer dışarıdan veri gelmezse kullanılacak varsayılan test verisi
  const data = doctor || {
    name: "Dr. C. Chrissostomou",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1160",
    rating: "4.7",
    reviews: 9,
    location: "Frankfurt am Main",
    features: [
      { type: "check", text: "+10 Jahre Erfahrung" },
      { type: "check", text: "+2.000 OPs" },
      { type: "info", text: "OP in Heidelberg" }
    ]
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6">
      
      {/* 1. SOL KISIM: Doktor Görseli */}
      <div className="w-full md:w-1/3 lg:w-3/12 h-56 md:h-auto relative">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* 2. ORTA KISIM: İsim, Puan ve Konum */}
      <div className="w-full md:w-5/12 lg:w-6/12 p-5 flex flex-col justify-between">
        <div>
          {/* İsim ve Mavi Tik */}
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {data.name}
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
            </svg>
          </h3>

          {/* Header ile aynı teal renkli puan rozeti */}
          <div className="inline-flex items-center bg-teal-600 text-white text-sm font-semibold px-3 py-1 rounded mt-2">
            {data.rating} / 5 <span className="mx-2 font-normal">|</span> {data.reviews} Bewertungen
          </div>
        </div>

        {/* Konum / Şehir */}
        <div className="mt-6 text-gray-500 text-sm flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {data.location}
        </div>
      </div>

      {/* 3. SAĞ KISIM: Özellikler ve Buton */}
      <div className="w-full md:w-4/12 lg:w-3/12 p-5 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-between">
        
        {/* Özellikler Listesi */}
        <ul className="space-y-2 mb-6 md:mb-0">
          {data.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              {feature.type === 'check' ? (
                // Header ile aynı teal check ikonu
                <svg className="w-5 h-5 text-teal-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              ) : (
                // Gri İnfo İkonu
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
              )}
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        {/* Header ile aynı teal detay butonu */}
        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded transition-colors flex items-center justify-center gap-2">
          Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

    </div>
  );
}