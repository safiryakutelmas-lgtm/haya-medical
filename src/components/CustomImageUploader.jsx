"use client";

import { useState } from "react";

export default function CustomImageUploader({ onUpload, initialUrl = "" }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialUrl || "");
  const [error, setError] = useState(null);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "clinic_images");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }

      const data = await res.json();
      setImageUrl(data.secure_url);
      if (onUpload) onUpload(data.secure_url);
    } catch (err) {
      console.error(err);
      setError(err.message || "Upload error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Upload image</label>
      <div className="flex items-center gap-3">
        <input type="file" accept="image/*" onChange={handleFileChange} className="rounded-md" />
        {loading && <span className="text-sm text-slate-500">Uploading...</span>}
      </div>

      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}

      {imageUrl && (
        <div className="mt-3">
          <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover rounded-md" />
        </div>
      )}
    </div>
  );
}
