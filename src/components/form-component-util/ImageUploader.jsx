'use client';

import { useState } from 'react';

export default function ImageUploader({ onFileSelect, value }) {
  const [previewUrl, setPreviewUrl] = useState(value || null);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (onFileSelect) {
      onFileSelect(file);
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(nextPreviewUrl);
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6">
      {previewUrl ? (
        <div className="relative h-48 w-full overflow-hidden rounded-xl border border-slate-200">
          <img src={previewUrl} alt="Selected file preview" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center text-sm text-slate-500">
          Henüz bir resim seçilmedi
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500"
      />
    </div>
  );
}