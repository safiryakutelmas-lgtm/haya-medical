'use client';

import { useState } from 'react';
import ImageUploader from '@/components/form-component-util/ImageUploader';
import {
  countryOptions, defaultCity, defaultCountry, languageOptions,
  METHOD_OPTIONS, SPECIALTY_OPTIONS, years
} from '@/util/form';
import { uploadImageToCloudinary, parseApiResponse } from '@/util/apiHelpers';

export default function ClinicManager({ clinics, setClinics, status }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // --- EKLEME FORMU STATE'LERİ ---
  const [addForm, setAddForm] = useState(getInitialAddForm());
  const [addSelectedLanguage, setAddSelectedLanguage] = useState('');
  const [addSelectedSpecialty, setAddSelectedSpecialty] = useState('');
  const [addSelectedMethod, setAddSelectedMethod] = useState('');
  const [addClinicImageFile, setAddClinicImageFile] = useState(null);

  // --- DÜZENLEME FORMU STATE'LERİ ---
  const [editClinicImageFile, setEditClinicImageFile] = useState(null);
  const [editSelectedLanguage, setEditSelectedLanguage] = useState('');
  const [editSelectedSpecialty, setEditSelectedSpecialty] = useState('');
  const [editSelectedMethod, setEditSelectedMethod] = useState('');

  function getInitialAddForm() {
    return {
      name: '', city: defaultCity, country: defaultCountry, foundedYear: '',
      languages: [], specialties: [], hasVideoConsultation: false, isVerified: false,
      imageUrl: '', methods: [], hairTransplantsCount: '', priceLabel: '', location: '', mapIframe: ''
    };
  }

  // --- LİSTE GÜNCELLEME YARDIMCILARI ---
  const addToList = (formObj, setFormFn, listKey, value, setValueFn) => {
    if (!value || (formObj[listKey] || []).includes(value)) return;
    setFormFn({ ...formObj, [listKey]: [...(formObj[listKey] || []), value] });
    setValueFn('');
  };

  const removeFromList = (formObj, setFormFn, listKey, value) => {
    setFormFn({ ...formObj, [listKey]: (formObj[listKey] || []).filter(item => item !== value) });
  };

  // Düzenleme Modalını Açarken Eski Verileri Doldurma
  function openEditModal(clinic) {
    setEditingClinic({
      ...clinic,
      languages: clinic.languages || [],
      specialties: clinic.specialties || [],
      methods: clinic.methods || [],
      mapIframe: clinic.mapIframe || '',
      foundedYear: clinic.foundedYear ? String(clinic.foundedYear) : '',
      hairTransplantsCount: clinic.hairTransplantsCount ? String(clinic.hairTransplantsCount) : '',
    });
    setEditClinicImageFile(null);
    setMessage(null);
  }

  // --- SİLME İŞLEMİ ---
  async function handleDelete(id) {
    if (!window.confirm('Bu kliniği silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/clinics?id=${id}`, { method: 'DELETE' });
      await parseApiResponse(res);
      setClinics(prev => prev.filter(c => c.id !== id)); // Listeyi anında yeniler
      setMessage({ type: 'success', text: 'Klinik başarıyla silindi.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  }

  // --- EKLEME İŞLEMİ ---
  async function handleAddSubmit(e) {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      const uploadedImageUrl = addClinicImageFile ? await uploadImageToCloudinary(addClinicImageFile, 'clinics', 'haya-medical-clinic') : addForm.imageUrl || null;
      
      const payload = {
        ...addForm,
        foundedYear: addForm.foundedYear ? Number(addForm.foundedYear) : null,
        languages: addForm.languages.length ? addForm.languages : null,
        specialties: addForm.specialties.length ? addForm.specialties : null,
        methods: addForm.methods.length ? addForm.methods : null,
        hairTransplantsCount: addForm.hairTransplantsCount ? Number(addForm.hairTransplantsCount) : 0,
        imageUrl: uploadedImageUrl,
        score: null, reviewCount: 0
      };

      const res = await fetch('/api/clinics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await parseApiResponse(res);
      
      setClinics(prev => [data, ...prev]); // Yeni ekleneni listenin en üstüne koyar
      setMessage({ type: 'success', text: 'Klinik başarıyla eklendi!' });
      setIsAddModalOpen(false);
      setAddForm(getInitialAddForm());
      setAddClinicImageFile(null);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  }

  // --- GÜNCELLEME İŞLEMİ ---
  async function handleEditSubmit(e) {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      const uploadedImageUrl = editClinicImageFile ? await uploadImageToCloudinary(editClinicImageFile, 'clinics', 'haya-medical-clinic') : editingClinic.imageUrl;

      const payload = {
        ...editingClinic,
        foundedYear: editingClinic.foundedYear ? Number(editingClinic.foundedYear) : null,
        languages: editingClinic.languages?.length ? editingClinic.languages : null,
        specialties: editingClinic.specialties?.length ? editingClinic.specialties : null,
        methods: editingClinic.methods?.length ? editingClinic.methods : null,
        hairTransplantsCount: editingClinic.hairTransplantsCount ? Number(editingClinic.hairTransplantsCount) : 0,
        imageUrl: uploadedImageUrl || null,
      };

      const res = await fetch(`/api/clinics?id=${editingClinic.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const updatedData = await parseApiResponse(res);
      
      setClinics(prev => prev.map(c => (c.id === updatedData.id ? updatedData : c))); // Tablodaki o satırı anında günceller
      setEditingClinic(null);
      setMessage({ type: 'success', text: 'Klinik başarıyla güncellendi.' });
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Klinik Yönetimi</h2>
          <p className="text-xs text-slate-500 mt-1">Sistemdeki tüm klinikleri inceleyin, güncelleyin veya silin.</p>
        </div>
        <button onClick={() => { setIsAddModalOpen(true); setMessage(null); }} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition">
          + Yeni Klinik Ekle
        </button>
      </div>

      {message && <div className={`mb-4 p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>{message.text}</div>}

      {/* KLİNİK LİSTESİ TABLOSU */}
      {status === 'loading' ? <p className="py-8 text-center text-sm text-slate-500">Yükleniyor...</p> : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 font-semibold text-slate-900 border-b border-slate-200">
              <tr>
                <th className="p-3">ID</th><th className="p-3">Klinik Adı</th><th className="p-3">Konum</th><th className="p-3">Ekim Sayısı</th><th className="p-3 text-right">Eylemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {clinics.map(clinic => (
                <tr key={clinic.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-medium text-slate-400">#{clinic.id}</td>
                  <td className="p-3 font-semibold text-slate-900">{clinic.name}</td>
                  <td className="p-3">{clinic.city || ''}, {clinic.country || ''}</td>
                  <td className="p-3">{clinic.hairTransplantsCount || 0}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => openEditModal(clinic)} className="rounded-md border border-slate-300 bg-white px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-100">Düzenle</button>
                    <button onClick={() => handleDelete(clinic.id)} className="rounded-md bg-rose-50 border border-rose-200 px-2.5 py-1 font-medium text-rose-600 hover:bg-rose-100">Sil</button>
                  </td>
                </tr>
              ))}
              {clinics.length === 0 && <tr><td colSpan="5" className="p-6 text-center text-slate-500">Henüz klinik yok.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* ===================== YENİ KLİNİK EKLEME MODALI ===================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Yeni Klinik Ekle</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Klinik Adı</label>
                <input required value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} className="w-full rounded-md border px-3 py-2" placeholder="Örn: Estetik Saç Merkezi" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ülke</label>
                  <select value={addForm.country} onChange={e => { const cities = countryOptions[e.target.value] || []; setAddForm({...addForm, country: e.target.value, city: cities[0] || ''}); }} className="w-full rounded-md border px-3 py-2">
                    {Object.keys(countryOptions).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Şehir</label>
                  <select value={addForm.city} onChange={e => setAddForm({...addForm, city: e.target.value})} className="w-full rounded-md border px-3 py-2">
                    {(countryOptions[addForm.country] || []).map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Kuruluş Yılı</label>
                  <select value={addForm.foundedYear} onChange={e => setAddForm({...addForm, foundedYear: e.target.value})} className="w-full rounded-md border px-3 py-2">
                    <option value="">Yıl Seçin</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Toplam Ekim Sayısı</label>
                  <input type="number" value={addForm.hairTransplantsCount} onChange={e => setAddForm({...addForm, hairTransplantsCount: e.target.value})} className="w-full rounded-md border px-3 py-2" placeholder="Örn: 5000" />
                </div>
              </div>

              {/* Diller */}
              <div>
                <label className="block text-sm font-medium mb-1">Hizmet Verilen Diller</label>
                <div className="flex gap-2">
                  <select value={addSelectedLanguage} onChange={e => setAddSelectedLanguage(e.target.value)} className="w-full rounded-md border px-3 py-2"><option value="">Dil Seçin</option>{languageOptions.map(lng => <option key={lng} value={lng}>{lng}</option>)}</select>
                  <button type="button" onClick={() => addToList(addForm, setAddForm, 'languages', addSelectedLanguage, setAddSelectedLanguage)} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">Ekle</button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(addForm.languages || []).map(lng => (
                    <span key={lng} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{lng} <button type="button" onClick={() => removeFromList(addForm, setAddForm, 'languages', lng)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">✕</button></span>
                  ))}
                </div>
              </div>

              {/* Uzmanlık Alanları */}
              <div>
                <label className="block text-sm font-medium mb-1">Uzmanlık Alanları</label>
                <div className="flex gap-2">
                  <select value={addSelectedSpecialty} onChange={e => setAddSelectedSpecialty(e.target.value)} className="w-full rounded-md border px-3 py-2"><option value="">Uzmanlık Seçin</option>{SPECIALTY_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}</select>
                  <button type="button" onClick={() => addToList(addForm, setAddForm, 'specialties', addSelectedSpecialty, setAddSelectedSpecialty)} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">Ekle</button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(addForm.specialties || []).map(spec => (
                    <span key={spec} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{spec} <button type="button" onClick={() => removeFromList(addForm, setAddForm, 'specialties', spec)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">✕</button></span>
                  ))}
                </div>
              </div>

              {/* Yöntemler */}
              <div>
                <label className="block text-sm font-medium mb-1">Ekim Yöntemleri</label>
                <div className="flex gap-2">
                  <select value={addSelectedMethod} onChange={e => setAddSelectedMethod(e.target.value)} className="w-full rounded-md border px-3 py-2"><option value="">Yöntem Seçin</option>{METHOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}</select>
                  <button type="button" onClick={() => addToList(addForm, setAddForm, 'methods', addSelectedMethod, setAddSelectedMethod)} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">Ekle</button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(addForm.methods || []).map(method => (
                    <span key={method} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{method} <button type="button" onClick={() => removeFromList(addForm, setAddForm, 'methods', method)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">✕</button></span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fiyat Etiketi / Açıklama</label>
                  <input value={addForm.priceLabel} onChange={e => setAddForm({...addForm, priceLabel: e.target.value})} className="w-full rounded-md border px-3 py-2" placeholder="Örn: 2000$ - 4000$" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Konum / Açık Adres</label>
                  <input value={addForm.location} onChange={e => setAddForm({...addForm, location: e.target.value})} className="w-full rounded-md border px-3 py-2" placeholder="İstanbul, Türkiye" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Harita / Iframe Kodu (Google Maps vb.)</label>
                <textarea rows={3} value={addForm.mapIframe} onChange={e => setAddForm({...addForm, mapIframe: e.target.value})} className="w-full rounded-md border px-3 py-2 font-mono text-xs" placeholder='<iframe src="..."></iframe>' />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Klinik Görseli</label>
                <ImageUploader onFileSelect={setAddClinicImageFile} value={addForm.imageUrl} />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={addForm.hasVideoConsultation} onChange={e => setAddForm({...addForm, hasVideoConsultation: e.target.checked})} className="rounded" />
                  <span className="text-sm font-medium">Görüntülü Görüşme Var</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={addForm.isVerified} onChange={e => setAddForm({...addForm, isVerified: e.target.checked})} className="rounded" />
                  <span className="text-sm font-medium">Onaylı Klinik</span>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">İptal</button>
                <button type="submit" disabled={loading} className="rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60">{loading ? 'Kaydediliyor...' : 'Kliniği Kaydet'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== KLİNİK DÜZENLEME MODALI ===================== */}
      {editingClinic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Kliniği Düzenle #{editingClinic.id}</h3>
              <button onClick={() => setEditingClinic(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Klinik Adı</label>
                <input required value={editingClinic.name} onChange={e => setEditingClinic({...editingClinic, name: e.target.value})} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ülke</label>
                  <select value={editingClinic.country || defaultCountry} onChange={e => { const cities = countryOptions[e.target.value] || []; setEditingClinic({...editingClinic, country: e.target.value, city: cities[0] || ''}); }} className="w-full rounded-md border px-3 py-2">
                    {Object.keys(countryOptions).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Şehir</label>
                  <select value={editingClinic.city || defaultCity} onChange={e => setEditingClinic({...editingClinic, city: e.target.value})} className="w-full rounded-md border px-3 py-2">
                    {(countryOptions[editingClinic.country] || []).map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Kuruluş Yılı</label>
                  <select value={editingClinic.foundedYear} onChange={e => setEditingClinic({...editingClinic, foundedYear: e.target.value})} className="w-full rounded-md border px-3 py-2">
                    <option value="">Yıl Seçin</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Toplam Ekim Sayısı</label>
                  <input type="number" value={editingClinic.hairTransplantsCount} onChange={e => setEditingClinic({...editingClinic, hairTransplantsCount: e.target.value})} className="w-full rounded-md border px-3 py-2" />
                </div>
              </div>

              {/* Diller */}
              <div>
                <label className="block text-sm font-medium mb-1">Hizmet Verilen Diller</label>
                <div className="flex gap-2">
                  <select value={editSelectedLanguage} onChange={e => setEditSelectedLanguage(e.target.value)} className="w-full rounded-md border px-3 py-2"><option value="">Dil Seçin</option>{languageOptions.map(lng => <option key={lng} value={lng}>{lng}</option>)}</select>
                  <button type="button" onClick={() => addToList(editingClinic, setEditingClinic, 'languages', editSelectedLanguage, setEditSelectedLanguage)} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">Ekle</button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(editingClinic.languages || []).map(lng => (
                    <span key={lng} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{lng} <button type="button" onClick={() => removeFromList(editingClinic, setEditingClinic, 'languages', lng)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">✕</button></span>
                  ))}
                </div>
              </div>

              {/* Uzmanlık Alanları */}
              <div>
                <label className="block text-sm font-medium mb-1">Uzmanlık Alanları</label>
                <div className="flex gap-2">
                  <select value={editSelectedSpecialty} onChange={e => setEditSelectedSpecialty(e.target.value)} className="w-full rounded-md border px-3 py-2"><option value="">Uzmanlık Seçin</option>{SPECIALTY_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}</select>
                  <button type="button" onClick={() => addToList(editingClinic, setEditingClinic, 'specialties', editSelectedSpecialty, setEditSelectedSpecialty)} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">Ekle</button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(editingClinic.specialties || []).map(spec => (
                    <span key={spec} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{spec} <button type="button" onClick={() => removeFromList(editingClinic, setEditingClinic, 'specialties', spec)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">✕</button></span>
                  ))}
                </div>
              </div>

              {/* Yöntemler */}
              <div>
                <label className="block text-sm font-medium mb-1">Ekim Yöntemleri</label>
                <div className="flex gap-2">
                  <select value={editSelectedMethod} onChange={e => setEditSelectedMethod(e.target.value)} className="w-full rounded-md border px-3 py-2"><option value="">Yöntem Seçin</option>{METHOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}</select>
                  <button type="button" onClick={() => addToList(editingClinic, setEditingClinic, 'methods', editSelectedMethod, setEditSelectedMethod)} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">Ekle</button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(editingClinic.methods || []).map(method => (
                    <span key={method} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{method} <button type="button" onClick={() => removeFromList(editingClinic, setEditingClinic, 'methods', method)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">✕</button></span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fiyat Etiketi / Açıklama</label>
                  <input value={editingClinic.priceLabel || ''} onChange={e => setEditingClinic({...editingClinic, priceLabel: e.target.value})} className="w-full rounded-md border px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Konum / Açık Adres</label>
                  <input value={editingClinic.location || ''} onChange={e => setEditingClinic({...editingClinic, location: e.target.value})} className="w-full rounded-md border px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Harita / Iframe Kodu</label>
                <textarea rows={3} value={editingClinic.mapIframe || ''} onChange={e => setEditingClinic({...editingClinic, mapIframe: e.target.value})} className="w-full rounded-md border px-3 py-2 font-mono text-xs" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Klinik Görselini Değiştir</label>
                <ImageUploader onFileSelect={setEditClinicImageFile} value={editingClinic.imageUrl} />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={Boolean(editingClinic.hasVideoConsultation)} onChange={e => setEditingClinic({...editingClinic, hasVideoConsultation: e.target.checked})} className="rounded" />
                  <span className="text-sm font-medium">Görüntülü Görüşme Var</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={Boolean(editingClinic.isVerified)} onChange={e => setEditingClinic({...editingClinic, isVerified: e.target.checked})} className="rounded" />
                  <span className="text-sm font-medium">Onaylı Klinik</span>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setEditingClinic(null)} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">İptal</button>
                <button type="submit" disabled={loading} className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60">{loading ? 'Güncelleniyor...' : 'Kayıtları Güncelle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}