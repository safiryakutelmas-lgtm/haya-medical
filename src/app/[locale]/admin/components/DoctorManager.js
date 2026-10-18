'use client';

import { useState } from 'react';
import ImageUploader from '@/components/form-component-util/ImageUploader';
import { SPECIALTY_OPTIONS } from '@/util/form';
import { uploadImageToCloudinary, parseApiResponse } from '@/util/apiHelpers';

export default function DoctorManager({ doctors, setDoctors, clinics, status }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // --- EKLEME FORMU STATE'LERİ ---
  const [addForm, setAddForm] = useState(getInitialForm());
  const [addSelectedSpecialty, setAddSelectedSpecialty] = useState('');
  const [addDoctorImageFile, setAddDoctorImageFile] = useState(null);

  // --- DÜZENLEME FORMU STATE'LERİ ---
  const [editSelectedSpecialty, setEditSelectedSpecialty] = useState('');
  const [editDoctorImageFile, setEditDoctorImageFile] = useState(null);

  function getInitialForm() {
    return { clinicId: '', name: '', title: '', imageUrl: '', bio: '', specialties: [], yearsOfExperience: '', education: '' };
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

  function openEditModal(doctor) {
    setEditingDoctor({
      ...doctor,
      specialties: doctor.specialties || [],
      yearsOfExperience: doctor.yearsOfExperience ? String(doctor.yearsOfExperience) : '',
    });
    setEditDoctorImageFile(null);
    setMessage(null);
  }

  // --- SİLME İŞLEMİ ---
  async function handleDelete(id) {
    if (!window.confirm('Bu doktor kaydını silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
      await parseApiResponse(res);
      setDoctors(prev => prev.filter(d => d.id !== id));
      setMessage({ type: 'success', text: 'Doktor başarıyla silindi.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  }

  // --- EKLEME İŞLEMİ ---
  async function handleAddSubmit(e) {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      const uploadedImage = addDoctorImageFile ? await uploadImageToCloudinary(addDoctorImageFile, 'doctors', 'haya-medical-clinic') : addForm.imageUrl || null;
      
      const payload = {
        ...addForm,
        clinicId: addForm.clinicId ? Number(addForm.clinicId) : null,
        yearsOfExperience: addForm.yearsOfExperience ? Number(addForm.yearsOfExperience) : 0,
        specialties: addForm.specialties.length ? addForm.specialties : null,
        imageUrl: uploadedImage
      };

      const res = await fetch('/api/doctors', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await parseApiResponse(res);
      
      setDoctors(prev => [data, ...prev]);
      setMessage({ type: 'success', text: 'Doktor başarıyla eklendi!' });
      setIsAddModalOpen(false);
      setAddForm(getInitialForm());
      setAddDoctorImageFile(null);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  }

  // --- GÜNCELLEME İŞLEMİ ---
  async function handleEditSubmit(e) {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      const uploadedImage = editDoctorImageFile ? await uploadImageToCloudinary(editDoctorImageFile, 'doctors', 'haya-medical-clinic') : editingDoctor.imageUrl;
      
      const payload = {
        ...editingDoctor,
        clinicId: editingDoctor.clinicId ? Number(editingDoctor.clinicId) : null,
        yearsOfExperience: editingDoctor.yearsOfExperience ? Number(editingDoctor.yearsOfExperience) : 0,
        specialties: editingDoctor.specialties?.length ? editingDoctor.specialties : null,
        imageUrl: uploadedImage || null
      };

      const res = await fetch(`/api/doctors/${editingDoctor.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const updatedData = await parseApiResponse(res);
      
      setDoctors(prev => prev.map(d => (d.id === updatedData.id ? updatedData : d)));
      setEditingDoctor(null);
      setMessage({ type: 'success', text: 'Doktor başarıyla güncellendi.' });
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Doktor Yönetimi</h2>
          <p className="text-xs text-slate-500 mt-1">Sistemdeki doktorları listeleyin, ekleyin veya düzenleyin.</p>
        </div>
        <button onClick={() => { setIsAddModalOpen(true); setMessage(null); }} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition">
          + Yeni Doktor Ekle
        </button>
      </div>

      {message && <div className={`mb-4 p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>{message.text}</div>}

      {/* LİSTE TABLOSU */}
      {status === 'loading' ? <p className="text-sm text-slate-500 py-8 text-center">Yükleniyor...</p> : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 font-semibold border-b">
              <tr><th className="p-3">ID</th><th className="p-3">Doktor Adı</th><th className="p-3">Unvan</th><th className="p-3">Klinik ID</th><th className="p-3 text-right">Eylemler</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {doctors.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono">#{doc.id}</td>
                  <td className="p-3 font-semibold text-slate-900">{doc.name}</td>
                  <td className="p-3">{doc.title || '—'}</td>
                  <td className="p-3 font-mono">#{doc.clinicId}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => openEditModal(doc)} className="rounded-md border border-slate-300 bg-white px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-100">Düzenle</button>
                    <button onClick={() => handleDelete(doc.id)} className="rounded-md bg-rose-50 border border-rose-200 px-2.5 py-1 font-medium text-rose-600 hover:bg-rose-100">Sil</button>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && <tr><td colSpan="5" className="p-6 text-center text-slate-500">Henüz doktor yok.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* ===================== DOKTOR EKLEME MODALI ===================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-semibold text-lg text-slate-900">Yeni Doktor Ekle</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Doktor Adı Soyadı</label>
                <input required value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Dr. Ahmet Yılmaz" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Unvan</label>
                  <input value={addForm.title} onChange={e => setAddForm({...addForm, title: e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Saç Ekimi Uzmanı" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ait Olduğu Klinik</label>
                  <select required value={addForm.clinicId} onChange={e => setAddForm({...addForm, clinicId: e.target.value})} className="w-full border rounded-md px-3 py-2">
                    <option value="">Klinik Seçin</option>{clinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deneyim Yılı</label>
                <input type="number" min="0" value={addForm.yearsOfExperience} onChange={e => setAddForm({...addForm, yearsOfExperience: e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Örn: 12" />
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

              <div>
                <label className="block text-sm font-medium mb-1">Eğitim Bilgisi</label>
                <textarea rows={3} value={addForm.education} onChange={e => setAddForm({...addForm, education: e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Tıp fakültesi ve uzmanlık detayları..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Biyografi</label>
                <textarea rows={3} value={addForm.bio} onChange={e => setAddForm({...addForm, bio: e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Doktor hakkında kısa bilgi..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Doktor Fotoğrafı</label>
                <ImageUploader onFileSelect={setAddDoctorImageFile} value={addForm.imageUrl} />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="border border-slate-300 px-4 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">İptal</button>
                <button type="submit" disabled={loading} className="bg-slate-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-slate-800 disabled:opacity-60">{loading ? 'Kaydediliyor...' : 'Doktoru Kaydet'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== DOKTOR DÜZENLEME MODALI ===================== */}
      {editingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-semibold text-lg text-slate-900">Doktoru Düzenle #{editingDoctor.id}</h3>
              <button onClick={() => setEditingDoctor(null)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Doktor Adı Soyadı</label>
                <input required value={editingDoctor.name} onChange={e => setEditingDoctor({...editingDoctor, name: e.target.value})} className="w-full border rounded-md px-3 py-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Unvan</label>
                  <input value={editingDoctor.title || ''} onChange={e => setEditingDoctor({...editingDoctor, title: e.target.value})} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ait Olduğu Klinik</label>
                  <select required value={editingDoctor.clinicId || ''} onChange={e => setEditingDoctor({...editingDoctor, clinicId: e.target.value})} className="w-full border rounded-md px-3 py-2">
                    <option value="">Klinik Seçin</option>{clinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deneyim Yılı</label>
                <input type="number" min="0" value={editingDoctor.yearsOfExperience} onChange={e => setEditingDoctor({...editingDoctor, yearsOfExperience: e.target.value})} className="w-full border rounded-md px-3 py-2" />
              </div>

              {/* Uzmanlık Alanları */}
              <div>
                <label className="block text-sm font-medium mb-1">Uzmanlık Alanları</label>
                <div className="flex gap-2">
                  <select value={editSelectedSpecialty} onChange={e => setEditSelectedSpecialty(e.target.value)} className="w-full rounded-md border px-3 py-2"><option value="">Uzmanlık Seçin</option>{SPECIALTY_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}</select>
                  <button type="button" onClick={() => addToList(editingDoctor, setEditingDoctor, 'specialties', editSelectedSpecialty, setEditSelectedSpecialty)} className="rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200">Ekle</button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(editingDoctor.specialties || []).map(spec => (
                    <span key={spec} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{spec} <button type="button" onClick={() => removeFromList(editingDoctor, setEditingDoctor, 'specialties', spec)} className="ml-1 text-xs text-slate-500 hover:text-slate-700">✕</button></span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Eğitim Bilgisi</label>
                <textarea rows={3} value={editingDoctor.education || ''} onChange={e => setEditingDoctor({...editingDoctor, education: e.target.value})} className="w-full border rounded-md px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Biyografi</label>
                <textarea rows={3} value={editingDoctor.bio || ''} onChange={e => setEditingDoctor({...editingDoctor, bio: e.target.value})} className="w-full border rounded-md px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Fotoğrafı Değiştir</label>
                <ImageUploader onFileSelect={setEditDoctorImageFile} value={editingDoctor.imageUrl} />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingDoctor(null)} className="border border-slate-300 px-4 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">İptal</button>
                <button type="submit" disabled={loading} className="bg-slate-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-slate-800 disabled:opacity-60">{loading ? 'Güncelleniyor...' : 'Kayıtları Güncelle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}