// Ülke ve Şehir Seçenekleri (Türkiye ilk sıraya alındı, şehir isimleri Türkçeleştirildi)
export const countryOptions = {
  Türkiye: [
    'İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya',
    'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Çanakkale', 'Çankırı',
    'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun',
    'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
    'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
    'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
    'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
    'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
  ],
  'ABD (Amerika Birleşik Devletleri)': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'],
  İngiltere: ['Londra', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  Almanya: ['Berlin', 'Münih', 'Hamburg', 'Köln', 'Frankfurt'],
  Fransa: ['Paris', 'Marsilya', 'Lyon', 'Toulouse', 'Nice'],
  İspanya: ['Madrid', 'Barselona', 'Valensiya', 'Sevilla', 'Bilbao'],
  İtalya: ['Roma', 'Milano', 'Napoli', 'Torino', 'Floransa'],
  Hollanda: ['Amsterdam', 'Rotterdam', 'Lahey', 'Utrecht'],
  İsveç: ['Stokholm', 'Göteborg', 'Malmö'],
  Norveç: ['Oslo', 'Bergen', 'Stavanger'],
  Danimarka: ['Kopenhag', 'Aarhus'],
  Kanada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
  Avustralya: ['Sidney', 'Melbourne', 'Brisbane', 'Perth'],
  Hindistan: ['Mümbai', 'Yeni Delhi', 'Bangalore', 'Haydarabad', 'Chennai'],
  Brezilya: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
  Meksika: ['Meksiko', 'Guadalajara', 'Monterrey'],
  Arjantin: ['Buenos Aires', 'Córdoba', 'Rosario'],
  'BAE (Birleşik Arap Emirlikleri)': ['Dubai', 'Abu Dabi'],
  'Suudi Arabistan': ['Riyad', 'Cidde', 'Dammam'],
  'Güney Afrika': ['Johannesburg', 'Cape Town', 'Durban'],
  Japonya: ['Tokyo', 'Osaka', 'Yokohama'],
  'Güney Kore': ['Seul', 'Busan', 'Incheon'],
  Çin: ['Pekin', 'Şanghay', 'Guangzhou', 'Shenzhen'],
  Rusya: ['Moskova', 'Sankt-Peterburg', 'Novosibirsk'],
  Polonya: ['Varşova', 'Kraków', 'Wrocław'],
  Portekiz: ['Lizbon', 'Porto'],
  Yunanistan: ['Atina', 'Selanik'],
  Belçika: ['Brüksel', 'Antwerpen'],
  İsviçre: ['Zürih', 'Cenevre'],
  Avusturya: ['Viyana', 'Salzburg'],
};

// Hizmet Verilen Dil Seçenekleri (Saç ekimi turizminde sık tercih edilen diller eklendi)
export const languageOptions = [
  'Türkçe',
  'İngilizce',
  'Almanca',
  'Arapça',
  'İspanyolca',
  'Fransızca',
  'Rusça',
  'İtalyanca',
  'Felemenkçe',
  'İbranice',
];

// Uzmanlık Alanları & Tedavi Seçenekleri (Güncel medikal tedaviler eklendi)
export const SPECIALTY_OPTIONS = [
  'Sakal Ekimi',
  'Bıyık Ekimi',
  'Kaş Ekimi',
  'Favori Ekimi',
  'Vücut Kılı Ekimi (BHT)',
  'Kadınlarda Saç Ekimi',
  'Tıraşsız Saç Ekimi',
  'Afro Tipi Saç Ekimi',
  'Revizyon / Düzeltme Saç Ekimi',
  'Ön Saç Çizgisi Tasarımı',
  'Yara ve Yanık İzi Kapatma',
  'Saç Simülasyonu (SMP)',
  'PRP Tedavisi',
  'Saç Mezoterapisi',
  'Kök Hücre Tedavisi',
  'Eksozom (Exosome) Tedavisi',
  'Saç Lazeri (LLLT)',
];

// Yöntemler ve Teknikler (Sektörde popüler olan güncel teknikler eklendi)
export const METHOD_OPTIONS = [
  'FUE (Foliküler Ünite Ekstraksiyonu)',
  'Safir FUE',
  'DHI (Direct Hair Implantation)',
  'Mikro FUE',
  'Manuel FUE',
  'Tıraşsız FUE',
  'Uzun Saç FUE (Long Hair FUE)',
  'Kök Hücre Destekli FUE',
  'Buz (Ice) FUE',
  'Hibrit Saç Ekimi (DHI + Safir)',
  'Robotik Saç Ekimi',
  'FUT (Klasik Şerit Yöntemi)',
  'NeoGraft',
];

export function getYears() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1949 }, (_, i) => 1950 + i).reverse();
}

export const defaultCountry = Object.keys(countryOptions)[0]; // Varsayılan: Türkiye
export const defaultCity = countryOptions[defaultCountry][0]; // Varsayılan: İstanbul
export const years = getYears();