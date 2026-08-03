
'use client'
import React, { useState } from 'react';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hairLossType: '',
    hadTransplant: null,
    familyHistory: null,
    yearsOfLoss: '',
    fullName: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;

  const handleSelect = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#1b369] flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-2xl bg-[#eef3f7] rounded-xl shadow-2xl overflow-hidden">
        {/* Indirim Rozeti */}
        <div className="absolute top-4 right-4 z-10 bg-[#ff522b] text-white rounded-full w-20 h-20 flex flex-col items-center justify-center text-center p-2 shadow-lg leading-tight font-bold text-xs">
          <span>Save</span>
          <span>up to</span>
          <span className="text-sm font-black">$3,200</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5">
          <div
            className="bg-[#ff522b] h-1.5 transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        <div className="p-8 md:p-12 min-h-[420px] flex flex-col justify-between">
          {!submitted ? (
            <>
              {/* Geri Butonu */}
              <div className="h-8">
                {step > 1 && (
                  <button
                    onClick={handlePrev}
                    className="text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1 text-xl"
                  >
                    ←
                  </button>
                )}
              </div>

              {/* ADIM 1: Dökülme Tipi */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1f2937] text-center mb-8">
                    What does your hair loss look like?
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'type1', label: 'Mild', img: 'https://medihair.com/wp-content/themes/medihare/assets/images/Funnel_Hair_Loss_NW3.svg' },
                      { id: 'type2', label: 'Moderate', img: 'https://medihair.com/wp-content/themes/medihare/assets/images/Funnel_Hair_Loss_NW4.svg' },
                      { id: 'type3', label: 'Severe', img: 'https://medihair.com/wp-content/themes/medihare/assets/images/Funnel_Hair_Loss_NW6.svg' },
                      { id: 'different', label: 'My hair loss is different', textOnly: true }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect('hairLossType', item.id)}
                        className="bg-white hover:border-[#ff522b] border-2 border-transparent rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all h-36"
                      >
                        {item.textOnly ? (
                          <span className="font-semibold text-gray-700 text-sm">{item.label}</span>
                        ) : (
                          <>
                            <img src={item.img} alt={item.label} className="w-16 h-16 object-contain mb-2" />
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ADIM 2: Daha Önce Saç Ekimi */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1f2937] text-center mb-8">
                    Have you ever had a hair transplant?
                  </h2>
                  <div className="flex justify-center gap-6">
                    {[
                      { value: true, label: 'Yes', icon: '✓' },
                      { value: false, label: 'No', icon: '⊘' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect('hadTransplant', item.value)}
                        className="bg-white hover:border-[#ff522b] border-2 border-transparent rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all w-36 h-36"
                      >
                        <span className="text-4xl text-blue-500 mb-2">{item.icon}</span>
                        <span className="font-semibold text-gray-700">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ADIM 3: Aile Öyküsü */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1f2937] text-center mb-8">
                    Do other people in your family suffer from hair loss?
                  </h2>
                  <div className="flex justify-center gap-6">
                    {[
                      { value: true, label: 'Yes', icon: '✓' },
                      { value: false, label: 'No', icon: '⊘' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect('familyHistory', item.value)}
                        className="bg-white hover:border-[#ff522b] border-2 border-transparent rounded-xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all w-36 h-36"
                      >
                        <span className="text-4xl text-blue-500 mb-2">{item.icon}</span>
                        <span className="font-semibold text-gray-700">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ADIM 4: Süre */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1f2937] text-center mb-8">
                    How many years ago did your hair loss begin?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: '<5', label: 'Less than 5' },
                      { id: '5-10', label: '5-10' },
                      { id: '>10', label: 'More than 10' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect('yearsOfLoss', item.id)}
                        className="bg-white hover:border-[#ff522b] border-2 border-transparent rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all h-36"
                      >
                        <span className="text-3xl mb-2">🕒</span>
                        <span className="font-semibold text-gray-700">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ADIM 5: İletişim Formu */}
              {step === 5 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1f2937] text-center mb-2">
                    Get Your Free Consultation
                  </h2>
                  <p className="text-center text-gray-600 text-sm mb-6">
                    Where should we send your custom offers?
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff522b]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff522b]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff522b]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#ff522b] hover:bg-[#e0431f] text-white font-bold py-3.5 rounded-lg shadow-md transition-colors"
                    >
                      Compare Clinics Now
                    </button>
                  </form>
                </div>
              )}

              {/* Alt Bilgi */}
              <div className="pt-6 border-t border-gray-200 mt-6">
                <div className="flex flex-wrap justify-between text-xs text-gray-600 gap-2">
                  <span>✓ 100% free non-binding</span>
                  <span>✓ Up to 3 offers from verified clinics</span>
                  <span>✓ Compare over 570 clinics</span>
                </div>
              </div>
            </>
          ) : (
            /* Başarı Ekranı */
            <div className="text-center my-auto">
              <span className="text-6xl">🎉</span>
              <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">Thank You!</h2>
              <p className="text-gray-600">
                We have received your information. Our team will contact you shortly with the best clinic options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}