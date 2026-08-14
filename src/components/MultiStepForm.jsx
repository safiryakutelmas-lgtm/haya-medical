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
      resetForm();
    } catch (error) {
      console.error('Submit failed:', error);
      alert(error.message || 'Form submission failed.');
    }
  };

  return (
    <div className="flex min-h-[500px] w-full items-center justify-center  p-3 font-sans text-slate-900 md:p-8">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] backdrop-blur-md">
        
        {/* Kurumsal Fırsat Rozeti */}
        <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-sm md:right-6 md:top-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span>Save up to <strong className="font-bold text-emerald-900">$3,150</strong></span>
        </div>

        {/* İlerleme Çubuğu */}
        <div className="relative h-1.5 w-full bg-slate-100">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-slate-900 via-indigo-900 to-teal-600 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(13,148,136,0.3)]"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="flex min-h-[520px] flex-col justify-between p-6 md:min-h-[600px] md:p-12">
          {!submitted ? (
            <>
              {/* Geri Butonu Alanı */}
              <div className="h-8">
                {step > 1 && (
                  <button
                    onClick={handlePrev}
                    className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 transition hover:text-slate-900 md:text-sm"
                    aria-label="Go back"
                  >
                    <span className="transition-transform group-hover:-translate-x-1">←</span> Back
                  </button>
                )}
              </div>

              {/* Form İçeriği */}
              <div className="my-auto flex w-full flex-col justify-center py-4">
                {step === 1 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 1 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-10 md:text-3xl">
                      What does your hair loss look like?
                    </h2>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                      {hairLossOptions.map((item) => {
                        const isSelected = formData.hairLossType === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('hairLossType', item.id)}
                            className={`flex min-h-[76px] items-center justify-center rounded-2xl border px-4 py-3 text-center text-xs font-bold tracking-wide transition-all duration-200 md:h-28 md:text-sm ${
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
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 2 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-10 md:text-3xl">
                      Have you ever had a hair transplant?
                    </h2>

                    <div className="flex justify-center gap-4 md:gap-6">
                      {yesNoOptions.map((item) => {
                        const isSelected = formData.hadTransplant === item.value;

                        return (
                          <button
                            key={String(item.value)}
                            type="button"
                            onClick={() => handleSelect('hadTransplant', item.value)}
                            className={`flex h-32 w-32 flex-col items-center justify-center rounded-2xl border p-4 transition-all duration-200 md:h-40 md:w-40 md:p-6 ${
                              isSelected
                                ? 'border-teal-600 bg-teal-50/50 shadow-sm ring-2 ring-teal-600/20'
                                : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md'
                            }`}
                          >
                            <span className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold md:h-12 md:w-12 md:text-xl ${isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                              {item.icon}
                            </span>
                            <span className={`text-xs font-bold tracking-wide md:text-sm ${isSelected ? 'text-teal-950' : 'text-slate-700'}`}>
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
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 3 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-10 md:text-3xl">
                      Do other people in your family suffer from hair loss?
                    </h2>

                    <div className="flex justify-center gap-4 md:gap-6">
                      {yesNoOptions.map((item) => (
                        <button
                          key={String(item.value)}
                          type="button"
                          onClick={() => handleSelect('familyHistory', item.value)}
                          className="flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md md:h-40 md:w-40 md:p-6"
                        >
                          <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 md:h-12 md:w-12 md:text-xl">
                            {item.icon}
                          </span>
                          <span className="text-xs font-bold tracking-wide text-slate-700 md:text-sm">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 4 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-10 md:text-3xl">
                      How many years ago did your hair loss begin?
                    </h2>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
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
                            className={`flex min-h-[60px] items-center justify-center rounded-2xl border px-5 py-3 text-center text-xs font-bold tracking-wide transition-all duration-200 md:h-24 md:text-sm ${
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
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 5 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-10 md:text-3xl">
                      How old are you?
                    </h2>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                      {ageRangeOptions.map((item) => {
                        const isSelected = formData.ageRange === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('ageRange', item.id)}
                            className={`flex min-h-[60px] items-center justify-center rounded-2xl border px-4 py-3 text-center text-xs font-bold tracking-wide transition-all duration-200 md:h-24 md:text-sm ${
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
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 6 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-10 md:text-3xl">
                      Are you currently treating your hair loss with finasteride or minoxidil?
                    </h2>

                    <div className="flex justify-center gap-4 md:gap-6">
                      {yesNoOptions.map((item) => (
                        <button
                          key={String(item.value)}
                          type="button"
                          onClick={() => handleSelect('currentTreatment', item.value)}
                          className="flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md md:h-40 md:w-40 md:p-6"
                        >
                          <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 md:h-12 md:w-12 md:text-xl">
                            {item.icon}
                          </span>
                          <span className="text-xs font-bold tracking-wide text-slate-700 md:text-sm">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
                      Step 7 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-10 md:text-3xl">
                      What is the most important criterion for you when choosing a doctor?
                    </h2>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                      {doctorCriteriaOptions.map((item) => {
                        const isSelected = formData.doctorPriority === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('doctorPriority', item.id)}
                            className={`flex min-h-[60px] items-center justify-center rounded-2xl border px-5 py-3 text-center text-xs font-bold tracking-wide transition-all duration-200 md:h-24 md:text-sm ${
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
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 8 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-10 md:text-3xl">
                      Would you be willing to go abroad?
                    </h2>

                    <div className="flex justify-center gap-4 md:gap-6">
                      {yesNoOptions.map((item) => (
                        <button
                          key={String(item.value)}
                          type="button"
                          onClick={() => handleSelect('willingToTravel', item.value)}
                          className="flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50/80 hover:shadow-md md:h-40 md:w-40 md:p-6"
                        >
                          <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600 md:h-12 md:w-12 md:text-xl">
                            {item.icon}
                          </span>
                          <span className="text-xs font-bold tracking-wide text-slate-700 md:text-sm">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 9 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 9 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-10 md:text-3xl">
                      In which country do you live?
                    </h2>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                      {countryOptions.map((item) => {
                        const isSelected = formData.country === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('country', item.id)}
                            className={`flex min-h-[60px] items-center justify-center rounded-2xl border px-4 py-3 text-center text-xs font-bold tracking-wide transition-all duration-200 md:h-24 md:text-sm ${
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
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 10 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-8 md:text-3xl">
                      Please enter your zip code
                    </h2>

                    <div className="mx-auto w-full max-w-md space-y-4">
                      <input
                        type="text"
                        placeholder="Zip code"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 md:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setStep(11)}
                        className="w-full rounded-2xl bg-slate-900 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 hover:shadow-xl md:py-4"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 11 && (
                  <div className="flex flex-col justify-center animate-fadeIn">
                    <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-teal-700">
                      Step 11 of 11
                    </p>
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-slate-900 md:mb-8 md:text-3xl">
                      Tell us about yourself
                    </h2>

                    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-3 md:space-y-4">
                      <select
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-medium text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 md:text-sm"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                      </select>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="First name"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 md:text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Last name"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 md:text-sm"
                        />
                      </div>

                      <input
                        type="email"
                        placeholder="Email address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 md:text-sm"
                      />

                      <div className="grid grid-cols-[100px_1fr] gap-3">
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
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 md:text-sm"
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
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 md:text-sm"
                        />
                      </div>

                      <label className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 text-[11px] text-slate-600 transition hover:bg-slate-50 md:text-xs">
                        <input
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                        />
                        <span>I agree to the terms and consent to being contacted regarding my consultation.</span>
                      </label>

                      <button
                        type="submit"
                        className="w-full rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 py-3.5 text-xs font-bold tracking-wider text-white shadow-lg shadow-slate-950/10 transition hover:brightness-110 hover:shadow-xl md:py-4 md:text-sm"
                      >
                        FIND MY DOCTOR
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Kurumsal Güven Sinyalleri */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold tracking-wide text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><strong className="text-teal-600">✓</strong> Verified Clinics</span>
                  <span className="inline-flex items-center gap-1.5"><strong className="text-teal-600">✓</strong> Tailored Recommendations</span>
                  
                </div>
              </div>
            </>
          ) : (
            <div className="my-auto text-center animate-fadeIn">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-3xl">🎉</div>
              <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">Thank you!</h2>
              <p className="mx-auto max-w-md text-xs leading-relaxed text-slate-600 md:text-sm">
                Your information has been received. We will match you with the most suitable doctors and clinics based on your answers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}