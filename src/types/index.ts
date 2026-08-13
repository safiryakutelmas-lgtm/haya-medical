export interface Clinic {
  id: number;
  name: string;
  city: string | null;
  country: string | null;
  foundedYear: number | null;
  languages: string[] | null;
  specialties: string[] | null;
  hasVideoConsultation: boolean;
  isVerified: boolean;
  imageUrl: string | null;
  score: number | null;
  reviewCount: number;
  methods: string[] | null;
  hairTransplantsCount: number;
  priceLabel: string | null;
  location: string | null;
  createdAt: string;
}

export interface ClinicPrice {
  id: number;
  clinicId: number;
  method: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  details: string | null;
  createdAt: string;
}

export interface Doctor {
  id: number;
  clinicId: number | null;
  name: string;
  title: string | null;
  imageUrl: string | null;
  bio: string | null;
  specialties: string[] | null;
  cases: number;
  yearsOfExperience: number;
  hairTransplantsCount: number;
  education: string | null;
  medicalSocieties: string[] | null;
  createdAt: string;
}

export interface ClinicCase {
  id: number;
  doctorId: number;
  clinicId: number;
  method: string | null;
  country: string | null;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  currency: string;
  score: number | null;
  patientAge: number | null;
  hairLossDegree: string | null;
  createdAt: string;
}
