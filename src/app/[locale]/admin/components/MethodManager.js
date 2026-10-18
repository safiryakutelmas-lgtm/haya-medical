'use client';

import { useState, useEffect } from 'react';
import { METHOD_OPTIONS } from '@/util/form';
import { parseApiResponse } from '@/util/apiHelpers';

export default function MethodManager({ clinics, status }) {
  const [methodsList, setMethodsList] = useState([]);
  const [listStatus, setListStatus] = useState('loading');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Ekleme Formu
  const [addForm, setAddForm] = useState({
    clinicId: '', method: '', minPrice: '', maxPrice: '', currency: 'TRY', details: ''
  });

  useEffect(() => {
    async function fetchMethods() {
      try {
        const res = await fetch('/api/method-prices');
        if (res.ok) {
          const data = await parseApiResponse(res);
          setMethodsList(Array.isArray(data) ? data : data.methods || []);
        }
      } catch (err) {
        console.error('Yöntemler çekilemedi', err);
      } finally {
        setListStatus('idle');
      }
    }
    fetchMethods();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm('Bu yöntem paketini silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/method-prices/${id}`, { method: 'DELETE' });
      await parseApiResponse(res);
      setMethodsList(prev => prev.filter(m => m.id !== id));
      setMessage({ type: 'success', text: 'Yöntem başarıyla silindi.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  }

  async function handleAddSubmit(e) {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      const payload = { ...addForm, clinicId: Number(addForm.clinicId), minPrice: Number(addForm.minPrice), maxPrice: Number(addForm.maxPrice) };
      if (payload.minPrice > payload.maxPrice) throw new Error('Minimum fiyat, maksimum fiyattan büyük olamaz.');
      
      const res = await fetch('/api/method-prices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await parseApiResponse(res);
      
      setMethodsList(prev => [data, ...prev]);
      setMessage({ type: 'success', text: 'Yöntem başarıyla eklendi!' });
      setIsAddModalOpen(false);
      setAddForm({ clinicId: '', method: '', minPrice: '', maxPrice: '', currency: 'TRY', details: '' });
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    setLoading(true); setMessage(null);
    try {
      const payload = { ...editingMethod, clinicId: Number(editingMethod.clinicId), minPrice: Number(editingMethod.minPrice), maxPrice: Number(editingMethod.maxPrice) };
      if (payload.minPrice > payload.maxPrice) throw new Error('Minimum fiyat, maksimum fiyattan büyük olamaz.');

      const res = await fetch(`/api/method-prices/${editingMethod.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const updatedData = await parseApiResponse(res);
      
      setMethodsList(prev => prev.map(m => (m.id === updatedData.id ? updatedData : m)));
      setEditingMethod(null);
      setMessage({ type: 'success', text: 'Yöntem başarıyla güncellendi.' });
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Yöntem & Fiyat Yönetimi</h2>
          <p className="text-xs text-slate-500 mt-1">Kliniklerin uyguladığı yöntemleri ve fiyat aralıklarını yönetin.</p>
        </div>
        <button onClick={() => { setIsAddModalOpen(true); setMessage(null); }} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition">
          + Yeni Yöntem Ekle
        </button>
      </div>

      {message && <div className={`mb-4 p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>{message.text}</div>}

      {/* LİSTE */}
      {listStatus === 'loading' ? <p className="text-sm text-slate-500 py-8 text-center">Yükleniyor...</p> : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 font-semibold border-b">
              <tr><th className="p-3">ID</th><th className="p-3">Klinik ID</th><th className="p-3">Yöntem</th><th className="p-3">Fiyat Aralığı</th><th className="p-3 text-right">Eylemler</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {methodsList.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono">#{item.id}</td>
                  <td className="p-3 font-mono">#{item.clinicId}</td>
                  <td className="p-3 font-semibold text-slate-900">{item.method}</td>
                  <td className="p-3">{item.minPrice} - {item.maxPrice} {item.currency}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => setEditingMethod(item)} className="rounded-md border border-slate-300 bg-white px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-100">Düzenle</button>
                    <button onClick={() => handleDelete(item.id)} className="rounded-md bg-rose-50 border border-rose-200 px-2.5 py-1 font-medium text-rose-600 hover:bg-rose-100">Sil</button>
                  </td>
                </tr>
              ))}
              {methodsList.length === 0 && <tr><td colSpan="5" className="p-6 text-center text-slate-500">Henüz yöntem eklenmemiş.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* EKLEME MODALI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between border-b border-slate-100 pb-4 mb-4"><h3 className="font-semibold text-lg">Yeni Yöntem & Fiyat Ekle</h3><button onClick={() => setIsAddModalOpen(false)} className="text-xl font-bold text-slate-400 hover:text-slate-600">✕</button></div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Klinik Seçin</label>
                <select required value={addForm.clinicId} onChange={e => setAddForm({...addForm, clinicId: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>{clinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ekim Yöntemi</label>
                <select required value={addForm.method} onChange={e => setAddForm({...addForm, method: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>{METHOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Minimum Fiyat</label><input type="number" required min="0" value={addForm.minPrice} onChange={e => setAddForm({...addForm, minPrice: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Maksimum Fiyat</label><input type="number" required min="0" value={addForm.maxPrice} onChange={e => setAddForm({...addForm, maxPrice: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Para Birimi</label>
                <select value={addForm.currency} onChange={e => setAddForm({...addForm, currency: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="TRY">TRY (₺)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Detaylar / Dahil Olan Hizmetler</label>
                <textarea rows={3} value={addForm.details} onChange={e => setAddForm({...addForm, details: e.target.value})} className="w-full border rounded-md px-3 py-2" placeholder="Paket açıklaması..." />
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
      {editingMethod && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between border-b border-slate-100 pb-4 mb-4"><h3 className="font-semibold text-lg">Yöntemi Düzenle #{editingMethod.id}</h3><button onClick={() => setEditingMethod(null)} className="text-xl font-bold text-slate-400 hover:text-slate-600">✕</button></div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Klinik Seçin</label>
                <select required value={editingMethod.clinicId} onChange={e => setEditingMethod({...editingMethod, clinicId: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>{clinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ekim Yöntemi</label>
                <select required value={editingMethod.method} onChange={e => setEditingMethod({...editingMethod, method: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="">Seçiniz</option>{METHOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Minimum Fiyat</label><input type="number" required min="0" value={editingMethod.minPrice} onChange={e => setEditingMethod({...editingMethod, minPrice: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Maksimum Fiyat</label><input type="number" required min="0" value={editingMethod.maxPrice} onChange={e => setEditingMethod({...editingMethod, maxPrice: e.target.value})} className="w-full border rounded-md px-3 py-2" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Para Birimi</label>
                <select value={editingMethod.currency} onChange={e => setEditingMethod({...editingMethod, currency: e.target.value})} className="w-full border rounded-md px-3 py-2">
                  <option value="TRY">TRY (₺)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Detaylar / Dahil Olan Hizmetler</label>
                <textarea rows={3} value={editingMethod.details || ''} onChange={e => setEditingMethod({...editingMethod, details: e.target.value})} className="w-full border rounded-md px-3 py-2" />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingMethod(null)} className="border border-slate-300 px-4 py-2 rounded-md font-medium text-slate-700">İptal</button>
                <button type="submit" disabled={loading} className="bg-slate-900 text-white px-5 py-2 rounded-md font-medium disabled:opacity-60">{loading ? 'Güncelleniyor...' : 'Güncelle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}