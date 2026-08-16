'use client';
import { useEffect, useRef, useState } from 'react';
import ImageUploader from '@/components/form-component-util/ImageUploader';
import {
  countryOptions,
  defaultCity,
  defaultCountry,
  languageOptions,
  METHOD_OPTIONS,
  SPECIALTY_OPTIONS,
  years,
} from '@/util/form';

export default function AdminPage() {

  const [form, setForm] = useState({
    name: '',
    city: defaultCity,
    country: defaultCountry,
    foundedYear: '',
    languages: [],
    specialties: [],
    hasVideoConsultation: false,
    isVerified: false,
    imageUrl: '',
    methods: [],
    hairTransplantsCount: '',
    priceLabel: '',
    location: '',
  });
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const [clinics, setClinics] = useState([]);
  const [doctors,setDoctors] = useState([]);
  const [clinicListStatus, setClinicListStatus] = useState('idle');
  const hasLoadedClinicsRef = useRef(false);
  const hasLoadedDoctorsRef = useRef(false);
  const [clinicImageFile, setClinicImageFile] = useState(null);
  const [casesBeforeImageFile , setBeforeImageFile] = useState(null);
  const [casesAfterImageFile , setAfterImageFile] = useState(null);
  const [doctorForm, setDoctorForm] = useState({
    clinicId: '',
    name: '',
    title: '',
    imageUrl: '',
    bio: '',
    specialties: [],
    yearsOfExperience: '',
    education: '',
    hairTransplantsCount:'',

  });
  const [doctorImageFile, setDoctorImageFile] = useState(null);
  const [selectedDoctorSpecialty, setSelectedDoctorSpecialty] = useState('');
  const [doctorLoading, setDoctorLoading] = useState(false);
  const [methodPriceForm, setMethodPriceForm] = useState({
    clinicId: '',
    method: '',
    minPrice: '',
    maxPrice: '',
    currency: 'USD',
    details: '',
  });
  const [methodPriceLoading, setMethodPriceLoading] = useState(false);
  const [caseLoading, setCaseLoading] = useState(false);
  const [methodClinicId, setMethodClinicId] = useState('');
  const [caseClinicId, setCaseClinicId] = useState('');
  const [caseDoctorId, setCaseDoctorId] = useState('');
  const [caseForm , setCaseForm]= useState({
  doctorId: '',
  clinicId: '',
  method: '',
  country: '',
  beforeImageUrl: '',
  afterImageUrl: '',
  minPrice: '',
  maxPrice: '',
  currency: '',
  score: '',
  patientAge: '',
  hairLossDegree: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('clinic');

  const adminTabs = [
    { id: 'clinic', label: 'Clinic creation', accent: 'bg-teal-100 text-teal-700' },
    { id: 'doctor', label: 'Doctor creation', accent: 'bg-violet-100 text-violet-700' },
    { id: 'method-price', label: 'Method-price creation', accent: 'bg-amber-100 text-amber-700' },
    { id: 'cases', label: 'Cases creation', accent: 'bg-pink-100 text-pink-700' },
  ];

  useEffect(() => {
    if (hasLoadedClinicsRef.current) return;
    hasLoadedClinicsRef.current = true;

    if(hasLoadedDoctorsRef.current) return;
    hasLoadedDoctorsRef.current = true;


    let isMounted = true;
    let isDoctorsMounted = true;

    async function loadClinics() {
      setClinicListStatus('loading');

      try {
        const res = await fetch('/api/clinics');
        if (!res.ok) {
          throw new Error('Failed to fetch clinics');
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : Array.isArray(data.clinics) ? data.clinics : [];

        if (isMounted) {
          setClinics(list);
          setClinicListStatus('success');
        }
      } catch (err) {
        console.error('Failed to fetch clinics', err);
        if (isMounted) {
          setClinicListStatus('error');
        }
      }
    }

    loadClinics();

    async function loadDoctors() {
      
      try {
        const res = await fetch('api/doctors')

        if(!res.ok){
          throw new Error('Failed to fetch doctors');

        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : Array.isArray(data.doctors) ? data.doctors : [];

        if(isDoctorsMounted){
          setDoctors(list);

        }

      } catch (err) {
        console.error("failed to fetch doctors" , err);
        if(isDoctorsMounted){

        }
      }
      
    }

    loadDoctors();


    return () => {
      isMounted = false;
      isDoctorsMounted = false;
    };
  }, []);

  function updateField(key, value) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function onCountryChange(value) {
    const cities = countryOptions[value] || [];
    updateField('country', value);
    updateField('city', cities[0] || '');
  }

  function addSelectedLanguage() {
    if (!selectedLanguage) return;
    if (form.languages.includes(selectedLanguage)) return;
    updateField('languages', [...form.languages, selectedLanguage]);
    setSelectedLanguage('');
  }

  function removeLanguage(lang) {
    updateField('languages', form.languages.filter((l) => l !== lang));
  }

  function addSelectedSpecialty() {
    if (!selectedSpecialty) return;
    if (form.specialties.includes(selectedSpecialty)) return;
    updateField('specialties', [...form.specialties, selectedSpecialty]);
    setSelectedSpecialty('');
  }

  function removeSpecialty(specialty) {
    updateField('specialties', form.specialties.filter((item) => item !== specialty));
  }

  function addSelectedMethod() {
    if (!selectedMethod) return;
    if (form.methods.includes(selectedMethod)) return;

    updateField('methods', [...form.methods, selectedMethod]);
    setSelectedMethod('');
  }

  function removeMethod(method) {
    updateField('methods', form.methods.filter((item) => item !== method));
  }

  function updateDoctorField(key, value) {
    setDoctorForm((current) => ({ ...current, [key]: value }));
  }

  function updateCaseDoctorField(key, value){
    setCaseForm((current)=> ({ ...current, [key]: value}));
  }

  function updateCaseClinicField(key, value){
    setCaseForm((current) => ({...current,[key]:value}));
  }

  function addSelectedDoctorSpecialty() {
    if (!selectedDoctorSpecialty) return;
    if (doctorForm.specialties.includes(selectedDoctorSpecialty)) return;

    setDoctorForm((current) => ({
      ...current,
      specialties: [...current.specialties, selectedDoctorSpecialty],
    }));
    setSelectedDoctorSpecialty('');
  }

  function removeDoctorSpecialty(specialty) {
    setDoctorForm((current) => ({
      ...current,
      specialties: current.specialties.filter((item) => item !== specialty),
    }));
  }

  async function uploadImageToCloudinary(file, folderName, uploadPreset) {
    if (!file) return null;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folderName);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Image upload failed');
    }

    const data = await res.json();
    return data.secure_url;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const uploadedImageUrl = clinicImageFile
        ? await uploadImageToCloudinary(clinicImageFile, 'clinics', 'haya-medical-clinic')
        : form.imageUrl || null;

      const payload = {
        name: form.name,
        city: form.city || null,
        country: form.country || null,
        foundedYear: form.foundedYear ? Number(form.foundedYear) : null,
        languages: form.languages && form.languages.length ? form.languages : null,
        specialties: form.specialties && form.specialties.length ? form.specialties : null,
        hasVideoConsultation: Boolean(form.hasVideoConsultation),
        isVerified: Boolean(form.isVerified),
        imageUrl: uploadedImageUrl,
        score: null,
        reviewCount: 0,
        methods: form.methods && form.methods.length ? form.methods : null,
        hairTransplantsCount: form.hairTransplantsCount ? Number(form.hairTransplantsCount) : 0,
        priceLabel: form.priceLabel || null,
        location: form.location || null,
      };

      const res = await fetch('/api/clinics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Failed to create clinic');
      }

      const data = await res.json();
      setMessage({ type: 'success', text: `Clinic created (id: ${data.id})` });
      setForm({
        name: '',
        city: defaultCity,
        country: defaultCountry,
        foundedYear: '',
        languages: [],
        specialties: [],
        hasVideoConsultation: false,
        isVerified: false,
        imageUrl: '',
        methods: [],
        hairTransplantsCount: '',
        priceLabel: '',
        location: '',
      });
      setClinicImageFile(null);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function onDoctorSubmit(e) {
    e.preventDefault();
    setDoctorLoading(true);
    setMessage(null);

    try {
      const uploadedImageUrl = doctorImageFile
        ? await uploadImageToCloudinary(doctorImageFile, 'doctors', 'haya-medical-doctor')
        : doctorForm.imageUrl || null;

      const payload = {
        clinicId: doctorForm.clinicId ? Number(doctorForm.clinicId) : null,
        name: doctorForm.name,
        title: doctorForm.title || null,
        imageUrl: uploadedImageUrl,
        bio: doctorForm.bio || null,
        specialties: doctorForm.specialties.length ? doctorForm.specialties : null,
        yearsOfExperience: doctorForm.yearsOfExperience ? Number(doctorForm.yearsOfExperience) : 0,
        education: doctorForm.education || null,
        cases: 0,
        hairTransplantsCount: 0,
        medicalSocieties: null,
      };

      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Failed to create doctor');
      }

      const data = await res.json();
      setMessage({ type: 'success', text: `Doctor created (id: ${data.id})` });
      setDoctorForm({
        clinicId: '',
        name: '',
        title: '',
        imageUrl: '',
        bio: '',
        specialties: [],
        yearsOfExperience: '',
        education: '',
      });
      setDoctorImageFile(null);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.message });
    } finally {
      setDoctorLoading(false);
    }
  }

  function updateMethodPriceField(key, value) {
    setMethodPriceForm((current) => ({ ...current, [key]: value }));
  }

  async function onMethodPriceSubmit(e) {
    e.preventDefault();
    setMethodPriceLoading(true);
    setMessage(null);

    try {
      const clinicId = Number(methodPriceForm.clinicId);
      const minPrice = Number(methodPriceForm.minPrice);
      const maxPrice = Number(methodPriceForm.maxPrice);

      if (!clinicId) {
        throw new Error('Please select a clinic before creating a method price.');
      }

      if (!methodPriceForm.method) {
        throw new Error('Please select a method.');
      }

      if (!Number.isFinite(minPrice) || minPrice < 0) {
        throw new Error('Please enter a valid minimum price.');
      }

      if (!Number.isFinite(maxPrice) || maxPrice < 0) {
        throw new Error('Please enter a valid maximum price.');
      }

      if (minPrice > maxPrice) {
        throw new Error('Minimum price cannot be greater than maximum price.');
      }

      const payload = {
        clinicId,
        method: methodPriceForm.method,
        minPrice,
        maxPrice,
        currency: methodPriceForm.currency,
        details: methodPriceForm.details || null,
      };

      const res = await fetch('/api/method-prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Failed to create method price');
      }

      const data = await res.json();
      setMessage({ type: 'success', text: `Method price created (id: ${data.id})` });
      setMethodPriceForm({
        clinicId: '',
        method: '',
        minPrice: '',
        maxPrice: '',
        currency: 'USD',
        details: '',
      });
      setMethodClinicId('');
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.message });
    } finally {
      setMethodPriceLoading(false);
    }
  }

  async function onCaseSubmit(e) {
    e.preventDefault();
    setCaseLoading(true);
    setMessage(null);

    try {
      const uploadedBeforeImageUrl = casesBeforeImageFile
        ? await uploadImageToCloudinary(casesBeforeImageFile, 'cases', 'haya-medical-cases-before')
        : caseForm.beforeImageUrl || null;

         const uploadedAfterImageUrl = casesAfterImageFile
        ? await uploadImageToCloudinary(casesAfterImageFile, 'cases', 'haya-medical-cases-after')
        : caseForm.afterImageUrl|| null;

        const payload = {
  doctorId: caseForm.doctorId ? Number(caseForm.doctorId) : null,
  clinicId: caseForm.clinicId ? Number(caseForm.clinicId) : null,
  method: caseForm.method|| null,
  country: caseForm.country || null,
  beforeImageUrl: uploadedBeforeImageUrl || null,
  afterImageUrl: uploadedAfterImageUrl || null,
  minPrice: caseForm.minPrice || null,
  maxPrice: caseForm.maxPrice || null,
  currency: caseForm.currency,
  score: caseForm.score || null,
  patientAge: caseForm.patientAge || null,
  hairLossDegree: caseForm.hairLossDegree || null,

        };

        const res = await fetch("/api/cases", {
          method:"POST",
           headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json();
        throw new Error(err?.error || 'Failed to create cases');
        }

     // if (!caseForm.clinicId) {
      //  throw new Error('Please select a clinic before creating a case.');
     // }

      setMessage({ type: 'success', text: 'Case form submitted successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message +"ddddd"});
    } finally {
      setCaseLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Admin panel</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create records</h1>
        </div>
      </div>

      {message && (
        <div className={`mb-6 rounded-md p-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Menu</p>
          <nav className="space-y-2">
            {adminTabs.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${isActive ? 'bg-white/10 text-white' : tab.accent}`}>
                    {tab.id === 'clinic' ? 'A' : tab.id === 'doctor' ? 'D' : tab.id === 'method-price' ? 'M' : 'C'}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-6">
          {activeTab === 'clinic' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Clinic creation</h2>
                <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-700">Active</span>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} className="w-full rounded-md border px-3 py-2" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select value={form.country} onChange={(e) => onCountryChange(e.target.value)} className="w-full rounded-md border px-3 py-2">
                      {Object.keys(countryOptions).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <select value={form.city} onChange={(e) => updateField('city', e.target.value)} className="w-full rounded-md border px-3 py-2">
                      {(countryOptions[form.country] || []).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Founded Year</label>
                    <select value={form.foundedYear} onChange={(e) => updateField('foundedYear', e.target.value)} className="w-full rounded-md border px-3 py-2">
                      <option value="">Select year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Hair Transplants Count</label>
                    <input value={form.hairTransplantsCount} onChange={(e) => updateField('hairTransplantsCount', e.target.value)} className="w-full rounded-md border px-3 py-2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Languages</label>
                  <div className="flex gap-2">
                    <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="w-full rounded-md border px-3 py-2">
                      <option value="">Select language</option>
                      {languageOptions.map((lng) => (
                        <option key={lng} value={lng}>
                          {lng}
                        </option>
                      ))}
                    </select>
                    <button type="button" onClick={addSelectedLanguage} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">
                      Add
                    </button>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.languages.length > 0 ? (
                      form.languages.map((lng) => (
                        <span key={lng} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                          {lng}
                          <button type="button" onClick={() => removeLanguage(lng)} className="ml-1  text-xs text-slate-500 hover:text-slate-700">×</button>
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">No languages  selected</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Specialties</label>
                  <div className="flex gap-2">
                    <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} className="w-full rounded-md border px-3 py-2">
                      <option value="">Select specialty</option>
                      {SPECIALTY_OPTIONS.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                    <button type="button" onClick={addSelectedSpecialty} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">
                      Add
                    </button>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.specialties.length > 0 ? (
                      form.specialties.map((specialty) => (
                        <span key={specialty} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                          {specialty}
                          <button type="button" onClick={() => removeSpecialty(specialty)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">×</button>
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">No specialties selected</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Methods</label>
                  <div className="flex gap-2">
                    <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)} className="w-full rounded-md border px-3 py-2">
                      <option value="">Select method</option>
                      {METHOD_OPTIONS.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                    <button type="button" onClick={addSelectedMethod} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">
                      Add
                    </button>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.methods.length > 0 ? (
                      form.methods.map((method) => (
                        <span key={method} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                          {method}
                          <button type="button" onClick={() => removeMethod(method)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">×</button>
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">No methods selected</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price label</label>
                  <input value={form.priceLabel} onChange={(e) => updateField('priceLabel', e.target.value)} className="w-full rounded-md border px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    value={form.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Istanbul, Turkey"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <ImageUploader
                    onFileSelect={(file) => setClinicImageFile(file)}
                    value={form.imageUrl}
                  />
                  {form.imageUrl && (
                    <p className="mt-2 text-sm text-slate-600">Uploaded URL: <span className="break-all">{form.imageUrl}</span></p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={form.hasVideoConsultation} onChange={(e) => updateField('hasVideoConsultation', e.target.checked)} />
                    <span className="text-sm">Has video consultation</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={form.isVerified} onChange={(e) => updateField('isVerified', e.target.checked)} />
                    <span className="text-sm">Verified</span>
                  </label>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={loading} className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 disabled:opacity-60">
                    {loading ? 'Saving...' : 'Create Clinic'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {activeTab === 'doctor' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Doctor creation</h2>
                <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">Active</span>
              </div>

              <form onSubmit={onDoctorSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Doctor name</label>
                  <input
                    required
                    value={doctorForm.name}
                    onChange={(e) => updateDoctorField('name', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Dr. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    value={doctorForm.title}
                    onChange={(e) => updateDoctorField('title', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Hair transplant specialist"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Clinic</label>
                  {clinicListStatus === 'loading' && (
                    <p className="text-sm text-slate-500">Loading clinics...</p>
                  )}

                  {clinicListStatus === 'error' && (
                    <p className="text-sm text-rose-600">Unable to load clinics.</p>
                  )}

                  {clinicListStatus !== 'loading' && clinicListStatus !== 'error' && (
                    <select
                      value={doctorForm.clinicId}
                      onChange={(e) => updateDoctorField('clinicId', e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option value="">Select clinic</option>
                      {clinics.map((clinic) => (
                        <option key={clinic.id} value={clinic.id}>
                          {clinic.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Years of experience</label>
                  <input
                    type="number"
                    min="0"
                    value={doctorForm.yearsOfExperience}
                    onChange={(e) => updateDoctorField('yearsOfExperience', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Specialties</label>
                  <div className="flex gap-2">
                    <select
                      value={selectedDoctorSpecialty}
                      onChange={(e) => setSelectedDoctorSpecialty(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option value="">Select specialty</option>
                      {SPECIALTY_OPTIONS.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                    <button type="button" onClick={addSelectedDoctorSpecialty} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">
                      Add
                    </button>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {doctorForm.specialties.length > 0 ? (
                      doctorForm.specialties.map((specialty) => (
                        <span key={specialty} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                          {specialty}
                          <button type="button" onClick={() => removeDoctorSpecialty(specialty)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">×</button>
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">No specialties selected</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Education</label>
                  <textarea
                    rows={3}
                    value={doctorForm.education}
                    onChange={(e) => updateDoctorField('education', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Medical education details"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    rows={3}
                    value={doctorForm.bio}
                    onChange={(e) => updateDoctorField('bio', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Short doctor biography"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <ImageUploader
                    onFileSelect={(file) => setDoctorImageFile(file)}
                    value={doctorForm.imageUrl}
                  />
                  {doctorForm.imageUrl && (
                    <p className="mt-2 text-sm text-slate-600">Uploaded URL: <span className="break-all">{doctorForm.imageUrl}</span></p>
                  )}
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={doctorLoading} className="inline-flex items-center rounded-md bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 disabled:opacity-60">
                    {doctorLoading ? 'Saving...' : 'Create Doctor'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {activeTab === 'method-price' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Method-price creation</h2>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">Planned</span>
              </div>

              <form onSubmit={onMethodPriceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Clinic</label>
                  {clinicListStatus === 'loading' && (
                    <p className="text-sm text-slate-500">Loading clinics...</p>
                  )}

                  {clinicListStatus === 'error' && (
                    <p className="text-sm text-rose-600">Unable to load clinics.</p>
                  )}

                  {clinicListStatus !== 'loading' && clinicListStatus !== 'error' && (
                    <select
                      value={methodPriceForm.clinicId}
                      onChange={(e) => {
                        updateMethodPriceField('clinicId', e.target.value);
                        setMethodClinicId(e.target.value);
                      }}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option value="">Select clinic</option>
                      {clinics.map((clinic) => (
                        <option key={clinic.id} value={clinic.id}>
                          {clinic.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Method</label>
                  <select
                    value={methodPriceForm.method}
                    onChange={(e) => updateMethodPriceField('method', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="">Select method</option>
                    {METHOD_OPTIONS.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Min price</label>
                    <input
                      type="number"
                      min="0"
                      value={methodPriceForm.minPrice}
                      onChange={(e) => updateMethodPriceField('minPrice', e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="3000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Max price</label>
                    <input
                      type="number"
                      min="0"
                      value={methodPriceForm.maxPrice}
                      onChange={(e) => updateMethodPriceField('maxPrice', e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="5000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <select
                    value={methodPriceForm.currency}
                    onChange={(e) => updateMethodPriceField('currency', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="TRY">TRY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Details</label>
                  <textarea
                    rows={3}
                    value={methodPriceForm.details}
                    onChange={(e) => updateMethodPriceField('details', e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Optional explanation"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={methodPriceLoading} className="inline-flex items-center rounded-md bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 disabled:opacity-60">
                    {methodPriceLoading ? 'Saving...' : 'Create Method Price'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {activeTab === 'cases' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Cases creation</h2>
                <span className="rounded-full bg-pink-100 px-2.5 py-1 text-xs font-medium text-pink-700">Planned</span>
              </div>

              <form onSubmit={onCaseSubmit} className="space-y-4">
                <div>

                   <label className="block text-sm font-medium mb-1">Doctor</label>
                  {clinicListStatus === 'loading' && (
                    <p className="text-sm text-slate-500">Loading doctors...</p>
                  )}

                  {clinicListStatus === 'error' && (
                    <p className="text-sm text-rose-600">Unable to load doctor.</p>
                  )}

                  {clinicListStatus !== 'loading' && clinicListStatus !== 'error' && (
                    
                    <select
                     value={caseForm.doctorId}
                      onChange={(e) => updateCaseDoctorField('doctorId', e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Clinic</label>
                  {clinicListStatus === 'loading' && (
                    <p className="text-sm text-slate-500">Loading clinics...</p>
                  )}

                  {clinicListStatus === 'error' && (
                    <p className="text-sm text-rose-600">Unable to load clinics.</p>
                  )}

                  {clinicListStatus !== 'loading' && clinicListStatus !== 'error' && (
                    <select
                      value={caseForm.clinicId}
                      onChange={(e) => updateCaseClinicField("clinicId" ,e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option value="">Select clinic</option>
                      {clinics.map((clinic) => (
                        <option key={clinic.id} value={clinic.id}>
                          {clinic.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Method</label>
                  <select className="w-full rounded-md border px-3 py-2">
                    <option value="">Select method</option>
                    {METHOD_OPTIONS.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Patient age</label>
                    <input type="number" className="w-full rounded-md border px-3 py-2" placeholder="32" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input className="w-full rounded-md border px-3 py-2" placeholder="Turkey" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Before image</label>
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                    Before image uploader
                    
                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <ImageUploader
                    onFileSelect={(file) => setBeforeImageFile(file)}
                    value={caseForm.beforeImageUrl}
                  />
                  {form.imageUrl && (
                    <p className="mt-2 text-sm text-slate-600">Uploaded URL: <span className="break-all">{form.imageUrl}</span></p>
                  )}
                </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">After image</label>
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                    After image uploader
                    
                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <ImageUploader
                    onFileSelect={(file) => setAfterImageFile(file)}
                    value={caseForm.afterImageUrl}
                  />
                  {form.imageUrl && (
                    <p className="mt-2 text-sm text-slate-600">Uploaded URL: <span className="break-all">{form.imageUrl}</span></p>
                  )}
                </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={caseLoading} className="inline-flex items-center rounded-md bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 disabled:opacity-60">
                    {caseLoading ? 'Saving...' : 'Create Case'}
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}