'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/form-component-util/ImageUploader';
import { defaultCountry, countryOptions, METHOD_OPTIONS } from '@/util/form';
import { uploadImageToCloudinary, parseApiResponse } from '@/util/apiHelpers';

export default function CaseManager({ clinics, doctors, status }) {
  const [casesList, setCasesList] = useState([]);
  const [listStatus, setListStatus] = useState('loading');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Ekleme ve Düzenleme için Görsel Dosya State'leri
  const [addCaseImageFile, setAddCaseImageFile] = useState(null);
  const [editCaseImageFile, setEditCaseImageFile] = useState(null);

  const [addForm, setAddForm] = useState(getInitialForm());

  function getInitialForm() {
    return { clinicId: '', doctorId: '', method: '', patientAge: '', hairLossDegree: '', minPrice: '', maxPrice: '', currency: 'TRY', score: '', country: defaultCountry, imageUrl: '' };
  }

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch('/api/cases');
        if (res.ok) {
          const data = await parseApiResponse(res);
          setCasesList(Array.isArray(data) ? data : data.cases || []);
        }
      } catch (err) {
        console.error('Vakalar çekilemedi', err);
      } finally {
        setListStatus('idle');
      }
    }
    fetchCases();
  }, []);

  function openEditModal(item) {
    setEditingCase({
      ...item,
      patientAge: item.patientAge ? String(item.patientAge) : '',
      score: item.score ? String(item.score) : '',
      minPrice: item.minPrice ? String(item.minPrice) : '',
      maxPrice: item.maxPrice ? String(item.maxPrice) : '',
    });
    setEditCaseImageFile(null);
    setMessage(null);
  }

  async function handleDelete(id) {
    if (!window.confirm('Bu vakayı silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/cases/${id}`, { method: 'DELETE' });
      await parseApiResponse(res);
      setCasesList(prev => prev.filter(c => c.id !== id));
      setMessage({ type: 'success', text: 'Vaka başarıyla silindi.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  }

  async function handleAddSubmit(e) {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      if (!addForm.clinicId) throw new Error('Klinik seçimi zorunludur.');
      const uploadedImageUrl = addCaseImageFile ? await uploadImageToCloudinary(addCaseImageFile, 'cases', 'haya-medical-clinic') : addForm.imageUrl || null;
      
      const payload = {
        ...addForm,
        clinicId: Number(addForm.clinicId),
        doctorId: addForm.doctorId ? Number(addForm.doctorId) : null,
        patientAge: addForm.patientAge ? Number(addForm.patientAge) : null,
        minPrice: addForm.minPrice ? Number(addForm.minPrice) : null,
        maxPrice: addForm.maxPrice ? Number(addForm.maxPrice) : null,
        score: addForm.score ? Number(addForm.score) : null,
        imageUrl: uploadedImageUrl
      };

      const res = await fetch('/api/cases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await parseApiResponse(res);
      
      setCasesList(prev => [data, ...prev]);
      setMessage({ type: 'success', text: 'Vaka başarıyla kaydedildi!' });
      setIsAddModalOpen(false);
      setAddForm(getInitialForm());
      setAddCaseImageFile(null);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      const uploadedImageUrl = editCaseImageFile ? await uploadImageToCloudinary(editCaseImageFile, 'cases', 'haya-medical-clinic') : editingCase.imageUrl;

      const payload = {
        ...editingCase,
        clinicId: Number(editingCase.clinicId),
        doctorId: editingCase.doctorId ? Number(editingCase.doctorId) : null,
        patientAge: editingCase.patientAge ? Number(editingCase.patientAge) : null,
        minPrice: editingCase.minPrice ? Number(editingCase.minPrice) : null,
        maxPrice: editingCase.maxPrice ? Number(editingCase.maxPrice) : null,
        score: editingCase.score ? Number(editingCase.score) : null,
        imageUrl: uploadedImageUrl || null
      };

      const res = await fetch(`/api/cases/${editingCase.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const updatedData = await parseApiResponse(res);
      
      setCasesList(prev => prev.map(c => (c.id === updatedData.id ? updatedData : c)));
      setEditingCase(null);
      setMessage({ type: 'success', text: 'Vaka başarıyla güncellendi.' });
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Vaka / Örnek Yönetimi</h2>
          <p className="text-xs text-slate-500 mt-1">Kliniklerin hasta sonuçlarını listeleyin ve düzenleyin.</p>
        </div>
        <button onClick={() => { setIsAddModalOpen(true); setMessage(null); }} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition">
          + Yeni Vaka Ekle
        </button>
      </div>

      {message && <div className={`mb-4 p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>{message.text}</div>}

      {/* LİSTE TABLOSU */}
      {listStatus === 'loading' ? <p className="text-sm text-slate-500 py-8 text-center">Yükleniyor...</p> : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 font-semibold border-b">
              <tr><th className="p-3">ID</th><th className="p-3">Klinik ID</th><th className="p-3">Yöntem</th><th className="p-3">Ülke / Yaş</th><th className="p-3 text-right">Eylemler</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {casesList.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono">#{item.id}</td>
                  <td className="p-3 font-mono">#{item.clinicId}</td>
                  <td className="p-3 font-semibold text-slate-900">{item.method || '—'}</td>
                  <td className="p-3">{item.country || '—'} / {item.patientAge || '—'}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => openEditModal(item)} className="rounded-md border border-slate-300 bg-white px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-100">Düzenle</button>
                    <button onClick={() => handleDelete(item.id)} className="rounded-md bg-rose-50 border border-rose-200 px-2.5 py-1 font-medium text-rose-600 hover:bg-rose-100">Sil</button>
                  </td>
                </tr>
              ))}
              {casesList.length === 0 && <tr><td colSpan="5" className="p-6 text-center text-slate-500">Henüz vaka eklenmemiş.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* EKLEME MODALI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between border-b border-slate-100 pb-4 mb-4"><h3 className="font-semibold text-lg text-slate-900">Yeni Vaka Ekle</h3><button onClick={() => setIsAddModalOpen(false)} className="text-xl font-bold text-slate-400 hover:text-slate-600">✕</button></div>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Klinik Seçin</label>
                <select required value={addForm.clinicId} onChange={e => setAddForm({...addForm, clinicId: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>{clinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Doktor (Opsiyonel)</label>
                <select value={addForm.doctorId} onChange={e => setAddForm({...addForm, doctorId: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>
                  {doctors.filter(d => !addForm.clinicId || String(d.clinicId) === String(addForm.clinicId)).map(doc => <option key={doc.id} value={doc.id}>{doc.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Uygulanan Yöntem</label>
                <select value={addForm.method} onChange={e => setAddForm({...addForm, method: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>{METHOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Hasta Yaşı</label><input type="number" min="18" max="90" value={addForm.patientAge} onChange={e => setAddForm({...addForm, patientAge: e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Örn: 32" /></div>
                <div><label className="block text-sm font-medium mb-1">Dökülme Derecesi (Norwood)</label><input type="text" value={addForm.hairLossDegree} onChange={e => setAddForm({...addForm, hairLossDegree: e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Örn: Type 3V, NW4" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Hasta Ülkesi</label>
                  <select value={addForm.country} onChange={e => setAddForm({...addForm, country: e.target.value})} className="w-full border rounded-md px-3 py-2">
                    {Object.keys(countryOptions).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Puan (Score 0-5)</label><input type="number" step="0.1" min="0" max="5" value={addForm.score} onChange={e => setAddForm({...addForm, score: e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Örn: 4.8" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium mb-1">Minimum Fiyat</label><input type="number" min="0" value={addForm.minPrice} onChange={e => setAddForm({...addForm, minPrice: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Maksimum Fiyat</label><input type="number" min="0" value={addForm.maxPrice} onChange={e => setAddForm({...addForm, maxPrice: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
                <div>
                  <label className="block text-sm font-medium mb-1">Para Birimi</label>
                  <select value={addForm.currency} onChange={e => setAddForm({...addForm, currency: e.target.value})} className="w-full border rounded-md px-3 py-2">
                    <option value="TRY">TRY (₺)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Görsel (Öncesi/Sonrası)</label>
                <ImageUploader onFileSelect={setAddCaseImageFile} value={addForm.imageUrl} />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="border border-slate-300 px-4 py-2 rounded-md font-medium text-slate-700">İptal</button>
                <button type="submit" disabled={loading} className="bg-slate-900 text-white px-5 py-2 rounded-md font-medium disabled:opacity-60">{loading ? 'Kaydediliyor...' : 'Kaydet'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DÜZENLEME MODALI */}
      {editingCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between border-b border-slate-100 pb-4 mb-4"><h3 className="font-semibold text-lg text-slate-900">Vakayı Düzenle #{editingCase.id}</h3><button onClick={() => setEditingCase(null)} className="text-xl font-bold text-slate-400 hover:text-slate-600">✕</button></div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Klinik Seçin</label>
                <select required value={editingCase.clinicId} onChange={e => setEditingCase({...editingCase, clinicId: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>{clinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Doktor (Opsiyonel)</label>
                <select value={editingCase.doctorId || ''} onChange={e => setEditingCase({...editingCase, doctorId: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>
                  {doctors.filter(d => !editingCase.clinicId || String(d.clinicId) === String(editingCase.clinicId)).map(doc => <option key={doc.id} value={doc.id}>{doc.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Uygulanan Yöntem</label>
                <select value={editingCase.method || ''} onChange={e => setEditingCase({...editingCase, method: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>{METHOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Hasta Yaşı</label><input type="number" min="18" max="90" value={editingCase.patientAge || ''} onChange={e => setEditingCase({...editingCase, patientAge: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Dökülme Derecesi (Norwood)</label><input type="text" value={editingCase.hairLossDegree || ''} onChange={e => setEditingCase({...editingCase, hairLossDegree: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Hasta Ülkesi</label>
                  <select value={editingCase.country || defaultCountry} onChange={e => setEditingCase({...editingCase, country: e.target.value})} className="w-full border rounded-md px-3 py-2">
                    {Object.keys(countryOptions).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Puan (Score 0-5)</label><input type="number" step="0.1" min="0" max="5" value={editingCase.score || ''} onChange={e => setEditingCase({...editingCase, score: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium mb-1">Minimum Fiyat</label><input type="number" min="0" value={editingCase.minPrice || ''} onChange={e => setEditingCase({...editingCase, minPrice: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Maksimum Fiyat</label><input type="number" min="0" value={editingCase.maxPrice || ''} onChange={e => setEditingCase({...editingCase, maxPrice: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
                <div>
                  <label className="block text-sm font-medium mb-1">Para Birimi</label>
                  <select value={editingCase.currency || 'TRY'} onChange={e => setEditingCase({...editingCase, currency: e.target.value})} className="w-full border rounded-md px-3 py-2">
                    <option value="TRY">TRY (₺)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Görsel (Öncesi/Sonrası)</label>
                <ImageUploader onFileSelect={setEditCaseImageFile} value={editingCase.imageUrl} />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingCase(null)} className="border border-slate-300 px-4 py-2 rounded-md font-medium text-slate-700">İptal</button>
                <button type="submit" disabled={loading} className="bg-slate-900 text-white px-5 py-2 rounded-md font-medium disabled:opacity-60">{loading ? 'Güncelleniyor...' : 'Güncelle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}