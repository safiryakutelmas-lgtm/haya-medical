'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');

  // Doktor Kaydetme Fonksiyonu
  const doktorEkle = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('doctors')
      .insert([{ name, experience, price, city }]);

    if (error) {
      alert('Hata oluştu: ' + error.message);
    } else {
      alert('Doktor başarıyla eklendi! 🎉');
      setName('');
      setExperience('');
      setPrice('');
      setCity('');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Paneli - Doktor Ekle</h1>

      <form onSubmit={doktorEkle} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Doktor Adı (Name)</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Dr. Ahmet Yılmaz"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deneyim (Experience)</label>
          <input 
            type="text" 
            value={experience} 
            onChange={(e) => setExperience(e.target.value)} 
            required 
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="10 Yıl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ücret (Price)</label>
          <input 
            type="text" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="1500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Şehir (City)</label>
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            required 
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="İstanbul"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
        >
          Doktoru Veritabanına Kaydet
        </button>
      </form>
    </main>
  );
}