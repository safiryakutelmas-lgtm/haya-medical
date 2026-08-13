export const countryOptions = {
  USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'],
  UK: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  Germany: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'],
  France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  Spain: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'],
  Italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence'],
  Turkey: [
    'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
    'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
    'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
    'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
    'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
    'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
    'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
    'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
  ],
  Netherlands: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht'],
  Sweden: ['Stockholm', 'Gothenburg', 'Malmö'],
  Norway: ['Oslo', 'Bergen', 'Stavanger'],
  Denmark: ['Copenhagen', 'Aarhus'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
  India: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
  Brazil: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
  Mexico: ['Mexico City', 'Guadalajara', 'Monterrey'],
  Argentina: ['Buenos Aires', 'Cordoba', 'Rosario'],
  UAE: ['Dubai', 'Abu Dhabi'],
  SaudiArabia: ['Riyadh', 'Jeddah', 'Dammam'],
  SouthAfrica: ['Johannesburg', 'Cape Town', 'Durban'],
  Japan: ['Tokyo', 'Osaka', 'Yokohama'],
  'South Korea': ['Seoul', 'Busan', 'Incheon'],
  China: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'],
  Russia: ['Moscow', 'Saint Petersburg', 'Novosibirsk'],
  Poland: ['Warsaw', 'Krakow', 'Wroclaw'],
  Portugal: ['Lisbon', 'Porto'],
  Greece: ['Athens', 'Thessaloniki'],
  Belgium: ['Brussels', 'Antwerp'],
  Switzerland: ['Zurich', 'Geneva'],
  Austria: ['Vienna', 'Salzburg'],
};

export const languageOptions = ['English', 'Turkish', 'Spanish', 'German', 'French', 'Arabic'];

export const SPECIALTY_OPTIONS = [
  'Beard Transplant',
  'Body Hair Transplant',
  'Eyebrow Transplant',
  'Mustache Transplant',
  'Female Hair Transplant',
  'Unshaven Hair Transplant',
  'Afro Hair Transplant',
  'Revision / Repair Transplant',
  'Hairline Reconstruction',
  'Scar & Burn Covering',
  'Scalp Micropigmentation (SMP)',
  'PRP Therapy',
  'Hair Mesotherapy',
  'Stem Cell Therapy',
];

export const METHOD_OPTIONS = [
  'FUE',
  'Sapphire FUE',
  'DHI',
  'FUT',
  'Robotic Hair Transplant',
  'Unshaven FUE',
  'Long Hair FUE',
  'Manual FUE',
  'NeoGraft',
  'Stem Cell Enhanced FUE',
];

export function getYears() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1949 }, (_, i) => 1950 + i).reverse();
}

export const defaultCountry = Object.keys(countryOptions)[0];
export const defaultCity = countryOptions[defaultCountry][0];
export const years = getYears();
