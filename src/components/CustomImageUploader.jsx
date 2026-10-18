"use client";

import { useState, useEffect } from "react";

export default function ImageUploader({ onFileSelect, value = "" }) {
  const [preview, setPreview] = useState(value);

  // Dışarıdan gelen value değişirse (Örn: Düzenleme modu) preview'u güncelle
  useEffect(() => {
    setPreview(value);
  }, [value]);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Sadece önizleme (preview) için tarayıcıda geçici bir URL oluşturuyoruz
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Dosyayı Cloudinary'ye yüklemeden DOĞRUDAN admin sayfasına (onFileSelect) gönderiyoruz
    if (onFileSelect) {
      onFileSelect(file);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="rounded-md border p-1 text-sm w-full bg-slate-50" 
        />
      </div>

      {preview && (
        <div className="mt-3">
          <img 
            src={preview} 
            alt="Önizleme" 
            className="w-32 h-32 object-cover rounded-md border border-slate-200 shadow-sm" 
          />
        </div>
      )}
    </div>
  );s
}