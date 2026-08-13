
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
    <div className="flex min-h-[460px] w-full items-center justify-center bg-transparent p-2 font-sans text-slate-900 md:p-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
        <div className="absolute right-4 top-4 z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0ea5a4] text-center text-[10px] font-black uppercase leading-tight text-white shadow-[0_18px_30px_rgba(14,165,164,0.28)]">
          <span>Save up to</span>
          <span>$3150</span>
        </div>

        <div className="relative h-2 w-full bg-slate-200/80">
          <div className="absolute inset-0 rounded-full bg-slate-200/80" />
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#0f766e] via-[#14b8a6] to-[#38bdf8] transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div className="flex min-h-[420px] flex-col justify-between p-6 md:p-10">
          {!submitted ? (
            <>
              <div className="h-7">
                {step > 1 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-2 text-lg text-slate-500 transition hover:text-slate-800"
                    aria-label="Go back"
                  >
                    ←
                  </button>
                )}
              </div>

              {step === 1 && (
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 1 of 10
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    What does your hair loss look like?
                  </h2>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {hairLossOptions.map((item) => {
                      const isSelected = formData.hairLossType === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect('hairLossType', item.id)}
                          className={`flex h-24 items-center justify-center rounded-2xl border px-4 text-center text-sm font-semibold tracking-[0.04em] shadow-[0_10px_22px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,118,110,0.10)] ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-200'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700'
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
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 2 of 10
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    Have you ever had a hair transplant?
                  </h2>

                  <div className="flex justify-center gap-6">
                    {yesNoOptions.map((item) => {
                      const isSelected = formData.hadTransplant === item.value;

                      return (
                        <button
                          key={String(item.value)}
                          type="button"
                          onClick={() => handleSelect('hadTransplant', item.value)}
                          className={`flex h-36 w-32 flex-col items-center justify-center rounded-2xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,118,110,0.10)] ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-200'
                              : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50'
                          }`}
                        >
                          <span className={`mb-2 text-4xl ${isSelected ? 'text-teal-600' : 'text-teal-600'}`}>
                            {item.icon}
                          </span>
                          <span className={`text-base font-semibold ${isSelected ? 'text-teal-700' : 'text-slate-700'}`}>
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 3 of 10
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    Do other people in your family suffer from hair loss?
                  </h2>

                  <div className="flex justify-center gap-6">
                    {yesNoOptions.map((item) => (
                      <button
                        key={String(item.value)}
                        type="button"
                        onClick={() => handleSelect('familyHistory', item.value)}
                        className="flex h-36 w-32 flex-col items-center justify-center border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
                      >
                        <span className="mb-2 text-4xl text-cyan-600">{item.icon}</span>
                        <span className="text-base font-semibold text-slate-700">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 4 of 10
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    How many years ago did your hair loss begin?
                  </h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                          className={`flex h-20 items-center justify-center rounded-2xl border px-4 text-center text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,118,110,0.10)] ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-200'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700'
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
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 5 of 10
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    How old are you?
                  </h2>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {ageRangeOptions.map((item) => {
                      const isSelected = formData.ageRange === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect('ageRange', item.id)}
                          className={`flex h-20 items-center justify-center rounded-2xl border px-4 text-center text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,118,110,0.10)] ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-200'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700'
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
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 6 of 10
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    Are you currently treating your hair loss with finasteride or minoxidil?
                  </h2>

                  <div className="flex justify-center gap-6">
                    {yesNoOptions.map((item) => (
                      <button
                        key={String(item.value)}
                        type="button"
                        onClick={() => handleSelect('currentTreatment', item.value)}
                        className="flex h-36 w-32 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-[0_16px_30px_rgba(15,118,110,0.10)]"
                      >
                        <span className="mb-2 text-4xl text-teal-600">{item.icon}</span>
                        <span className="text-base font-semibold text-slate-700">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 7 && (
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 7 of 10
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    What is the most important criterion for you when choosing a doctor?
                  </h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {doctorCriteriaOptions.map((item) => {
                      const isSelected = formData.doctorPriority === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect('doctorPriority', item.id)}
                          className={`flex h-20 items-center justify-center rounded-2xl border px-4 text-center text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,118,110,0.10)] ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-200'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700'
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
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 8 of 10
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    Would you be willing to go abroad?
                  </h2>

                  <div className="flex justify-center gap-6">
                    {yesNoOptions.map((item) => (
                      <button
                        key={String(item.value)}
                        type="button"
                        onClick={() => handleSelect('willingToTravel', item.value)}
                        className="flex h-36 w-32 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-[0_16px_30px_rgba(15,118,110,0.10)]"
                      >
                        <span className="mb-2 text-4xl text-teal-600">{item.icon}</span>
                        <span className="text-base font-semibold text-slate-700">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 9 && (
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 9 of 10
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    In which country do you live?
                  </h2>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {countryOptions.map((item) => {
                      const isSelected = formData.country === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect('country', item.id)}
                          className={`flex h-20 items-center justify-center rounded-2xl border px-4 text-center text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,118,110,0.10)] ${
                            isSelected
                              ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-200'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700'
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
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 10 of 11
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    Please enter your zip code
                  </h2>

                  <div className="mx-auto max-w-md space-y-4">
                    <input
                      type="text"
                      placeholder="Zip code"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    />
                    <button
                      type="button"
                      onClick={() => setStep(11)}
                      className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 11 && (
                <div>
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-teal-600">
                    Step 11 of 11
                  </p>
                  <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
                    Tell us about yourself
                  </h2>

                  <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                      </select>

                      <div className="hidden md:block" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        type="text"
                        placeholder="First name"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                      />
                    </div>

                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    />

                    <div className="grid gap-4 md:grid-cols-[120px_1fr]">
                      <input
                        type="text"
                        placeholder="Country code"
                        value={formData.phone.countryCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: { ...formData.phone, countryCode: e.target.value },
                          })
                        }
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
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
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                      />
                    </div>

                    <label className="flex items-start gap-3 border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-inner shadow-slate-200/20">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-500 focus:ring-teal-400"
                      />
                      <span>I agree to the terms and consent to being contacted regarding my consultation.</span>
                    </label>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
                    >
                      Find My Doctor
                    </button>
                  </form>
                </div>
              )}

              <div className="mt-6 border-t border-slate-200 pt-4">
                <div className="flex flex-wrap justify-between gap-2 text-[11px] text-slate-500">
                  
                  <span>✓ Verified clinics</span>
                  <span>✓ Tailored recommendations</span>
                </div>
              </div>
            </>
          ) : (
            <div className="my-auto text-center">
              <div className="mb-4 text-6xl">🎉</div>
              <h2 className="mb-2 text-3xl font-bold text-slate-900">Thank you!</h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Your information has been received. We will match you with the most suitable doctors and clinics based on your answers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
