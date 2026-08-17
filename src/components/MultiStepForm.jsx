'use client';

import { useState } from 'react';

const hairLossOptions = [
  { id: 'mild', label: 'Mild' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'different', label: 'Different' },
];

const yesNoOptions = [
  { value: true, label: 'Yes', icon: '✓' },
  { value: false, label: 'No', icon: '✕' },
];

const ageRangeOptions = [
  { id: '18-29', label: '18-29' },
  { id: '30-39', label: '30-39' },
  { id: '40-49', label: '40-49' },
  { id: '50+', label: '50+' },
];

const doctorCriteriaOptions = [
  { id: 'price', label: 'Price' },
  { id: 'experience', label: 'Surgeon experience' },
  { id: 'reviews', label: 'Patient reviews' },
];

const countryOptions = [
  { id: 'UK', label: 'UK' },
  { id: 'USA', label: 'USA' },
  { id: 'EUROPE', label: 'Europe' },
  { id: 'OTHER', label: 'Other' },
];

const initialFormData = {
  hairLossType: '',
  hadTransplant: null,
  familyHistory: null,
  yearsOfLoss: '',
  ageRange: '',
  currentTreatment: null,
  doctorPriority: '',
  willingToTravel: null,
  country: '',
  zipCode: '',
  title: 'Mr',
  firstName: '',
  lastName: '',
  email: '',
  phone: {
    countryCode: '',
    number: '',
  },
  termsAccepted: true,
};

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setStep(1);
    setSubmitted(false);
  };

  const totalSteps = 11;

  const handleSelect = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      hairLossType: formData.hairLossType,
      hadTransplant: formData.hadTransplant,
      familyHistory: formData.familyHistory,
      yearsOfLoss: formData.yearsOfLoss,
      ageRange: formData.ageRange,
      currentTreatment: formData.currentTreatment,
      doctorPriority: formData.doctorPriority,
      willingToTravel: formData.willingToTravel,
      country: formData.country,
      zipCode: formData.zipCode,
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: {
        countryCode: formData.phone.countryCode,
        number: formData.phone.number,
      },
      termsAccepted: formData.termsAccepted,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to submit form');
      }

      console.log('Doctor finder payload:', JSON.stringify(payload, null, 2));
      console.log('Insert result:', result);
      setSubmitted(true);
    } catch (error) {
      console.error('Submit failed:', error);
      alert(error.message || 'Form submission failed.');
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-2 sm:p-4 font-sans text-slate-900">
      {/* Sabit Boyutlu Ana Kart (Ölçeklendirildi ve sabitlendi) */}
      <div className="relative flex h-[500px] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] backdrop-blur-md sm:h-[500px]">
        
        {/* Rozet */}
        <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50/90 px-3 py-1 text-[11px] font-semibold text-emerald-800 shadow-sm backdrop-blur-sm sm:right-5 sm:top-5 sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span>Save up to <strong className="font-bold text-emerald-900">$3,150</strong></span>
        </div>

        {/* İlerleme Çubuğu */}
        <div className="relative h-1.5 w-full shrink-0 bg-slate-100">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-slate-900 via-indigo-900 to-teal-600 shadow-[0_0_12px_rgba(13,148,136,0.3)] transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* İçerik Alanı */}
        <div className="flex h-full flex-col justify-between p-5 sm:p-8 md:p-10">
          {!submitted ? (
            <>
              {/* Geri Butonu Yeri (Sabit Yükseklikte) */}
              <div className="h-6 shrink-0">
                {step > 1 && (
                  <button
                    onClick={handlePrev}
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-500 transition hover:text-slate-900"
                    aria-label="Go back"
                  >
                    <span className="transition-transform group-hover:-translate-x-1">←</span> Back
                  </button>
                )}
              </div>

              {/* Form Adımları (Kaydırma Destekli Esnek Ortalanmış Alan) */}
              <div className="my-auto flex min-h-0 flex-1 flex-col justify-center overflow-y-auto py-2">
                {step === 1 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 1 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      What does your hair loss look like?
                    </h2>

                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      {hairLossOptions.map((item) => {
                        const isSelected = formData.hairLossType === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('hairLossType', item.id)}
                            className={`flex min-h-[56px] items-center justify-center rounded-2xl border px-3 py-2.5 text-center text-xs font-bold tracking-wide transition-all duration-200 sm:h-20 sm:text-sm ${
                              isSelected
                                ? 'border-teal-600 bg-teal-50/50 text-teal-950 shadow-sm ring-2 ring-teal-600/20'
                                : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 2 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      Have you ever had a hair transplant?
                    </h2>

                    <div className="flex justify-center gap-4">
                      {yesNoOptions.map((item) => {
                        const isSelected = formData.hadTransplant === item.value;

                        return (
                          <button
                            key={String(item.value)}
                            type="button"
                            onClick={() => handleSelect('hadTransplant', item.value)}
                            className={`flex h-24 w-24 flex-col items-center justify-center rounded-2xl border p-3 transition-all duration-200 sm:h-28 sm:w-28 sm:p-4 ${
                              isSelected
                                ? 'border-teal-600 bg-teal-50/50 shadow-sm ring-2 ring-teal-600/20'
                                : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md'
                            }`}
                          >
                            <span className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold sm:h-10 sm:w-10 sm:text-base ${isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                              {item.icon}
                            </span>
                            <span className={`text-xs font-bold tracking-wide ${isSelected ? 'text-teal-950' : 'text-slate-700'}`}>
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 3 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      Do other people in your family suffer from hair loss?
                    </h2>

                    <div className="flex justify-center gap-4">
                      {yesNoOptions.map((item) => (
                        <button
                          key={String(item.value)}
                          type="button"
                          onClick={() => handleSelect('familyHistory', item.value)}
                          className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md sm:h-28 sm:w-28 sm:p-4"
                        >
                          <span className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 sm:h-10 sm:w-10 sm:text-base">
                            {item.icon}
                          </span>
                          <span className="text-xs font-bold tracking-wide text-slate-700">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 4 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      How many years ago did your hair loss begin?
                    </h2>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                      {[
                        { id: '<5', label: 'Less than 5 years' },
                        { id: '5-10', label: '5 - 10 years' },
                        { id: '>10', label: 'More than 10 years' },
                      ].map((item) => {
                        const isSelected = formData.yearsOfLoss === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('yearsOfLoss', item.id)}
                            className={`flex min-h-[50px] items-center justify-center rounded-2xl border px-4 py-2.5 text-center text-xs font-bold tracking-wide transition-all duration-200 sm:h-20 sm:text-sm ${
                              isSelected
                                ? 'border-teal-600 bg-teal-50/50 text-teal-950 shadow-sm ring-2 ring-teal-600/20'
                                : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 5 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      How old are you?
                    </h2>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {ageRangeOptions.map((item) => {
                        const isSelected = formData.ageRange === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('ageRange', item.id)}
                            className={`flex min-h-[50px] items-center justify-center rounded-2xl border px-3 py-2.5 text-center text-xs font-bold tracking-wide transition-all duration-200 sm:h-20 sm:text-sm ${
                              isSelected
                                ? 'border-teal-600 bg-teal-50/50 text-teal-950 shadow-sm ring-2 ring-teal-600/20'
                                : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 6 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      Are you currently treating your hair loss with finasteride or minoxidil?
                    </h2>

                    <div className="flex justify-center gap-4">
                      {yesNoOptions.map((item) => (
                        <button
                          key={String(item.value)}
                          type="button"
                          onClick={() => handleSelect('currentTreatment', item.value)}
                          className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md sm:h-28 sm:w-28 sm:p-4"
                        >
                          <span className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 sm:h-10 sm:w-10 sm:text-base">
                            {item.icon}
                          </span>
                          <span className="text-xs font-bold tracking-wide text-slate-700">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 7 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      What is the most important criterion for you when choosing a doctor?
                    </h2>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                      {doctorCriteriaOptions.map((item) => {
                        const isSelected = formData.doctorPriority === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('doctorPriority', item.id)}
                            className={`flex min-h-[50px] items-center justify-center rounded-2xl border px-4 py-2.5 text-center text-xs font-bold tracking-wide transition-all duration-200 sm:h-20 sm:text-sm ${
                              isSelected
                                ? 'border-teal-600 bg-teal-50/50 text-teal-950 shadow-sm ring-2 ring-teal-600/20'
                                : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 8 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 8 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      Would you be willing to go abroad?
                    </h2>

                    <div className="flex justify-center gap-4">
                      {yesNoOptions.map((item) => (
                        <button
                          key={String(item.value)}
                          type="button"
                          onClick={() => handleSelect('willingToTravel', item.value)}
                          className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md sm:h-28 sm:w-28 sm:p-4"
                        >
                          <span className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 sm:h-10 sm:w-10 sm:text-base">
                            {item.icon}
                          </span>
                          <span className="text-xs font-bold tracking-wide text-slate-700">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 9 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 9 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      In which country do you live?
                    </h2>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {countryOptions.map((item) => {
                        const isSelected = formData.country === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('country', item.id)}
                            className={`flex min-h-[50px] items-center justify-center rounded-2xl border px-3 py-2.5 text-center text-xs font-bold tracking-wide transition-all duration-200 sm:h-20 sm:text-sm ${
                              isSelected
                                ? 'border-teal-600 bg-teal-50/50 text-teal-950 shadow-sm ring-2 ring-teal-600/20'
                                : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 10 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 10 of 11
                    </p>
                    <h2 className="mb-5 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      Please enter your zip code
                    </h2>

                    <div className="mx-auto w-full max-w-sm space-y-3">
                      <input
                        type="text"
                        placeholder="Zip code"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setStep(11)}
                        className="w-full rounded-2xl bg-slate-900 py-3 text-xs font-bold tracking-wide text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 hover:shadow-xl sm:py-3.5 sm:text-sm"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 11 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700 sm:text-[11px]">
                      Step 11 of 11
                    </p>
                    <h2 className="mb-4 text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      Tell us about yourself
                    </h2>

                    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm space-y-2.5">
                      <select
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 sm:text-sm"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                      </select>

                      <div className="grid grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          placeholder="First name"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 sm:text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Last name"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 sm:text-sm"
                        />
                      </div>

                      <input
                        type="email"
                        placeholder="Email address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 sm:text-sm"
                      />

                      <div className="grid grid-cols-[80px_1fr] gap-2.5">
                        <input
                          type="text"
                          placeholder="Code"
                          value={formData.phone.countryCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: { ...formData.phone, countryCode: e.target.value },
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 sm:text-sm"
                        />
                        <input
                          type="tel"
                          placeholder="Phone number"
                          required
                          value={formData.phone.number}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: { ...formData.phone, number: e.target.value },
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 sm:text-sm"
                        />
                      </div>

                      <label className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-2.5 text-[10px] text-slate-600 transition hover:bg-slate-50 sm:text-xs">
                        <input
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                          className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />
                        <span>I agree to the terms and consent to being contacted regarding my consultation.</span>
                      </label>

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 py-3 text-xs font-bold tracking-wider text-white shadow-lg shadow-slate-950/10 transition hover:brightness-110 hover:shadow-xl sm:py-3.5 sm:text-sm"
                      >
                        FIND MY DOCTOR
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Kurumsal Güven Sinyalleri */}
              <div className="mt-2 shrink-0 border-t border-slate-100 pt-3">
                <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-semibold tracking-wide text-slate-500 sm:text-[11px]">
                  <span className="inline-flex items-center gap-1"><strong className="text-teal-600">✓</strong> Verified Clinics</span>
                  <span className="inline-flex items-center gap-1"><strong className="text-teal-600">✓</strong> Tailored Recommendations</span>
                </div>
              </div>
            </>
          ) : (
            <div className="my-auto text-center animate-fadeIn">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl sm:h-16 sm:w-16 sm:text-3xl">🎉</div>
              <h2 className="mb-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">Thank you!</h2>
              <p className="mx-auto max-w-xs text-xs leading-relaxed text-slate-600 sm:max-w-md sm:text-sm">
                Your information has been received. We will match you with the most suitable doctors and clinics based on your answers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}