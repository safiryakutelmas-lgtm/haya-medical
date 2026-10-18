export async function parseApiResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  let data = null;

  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    await res.text();
    throw new Error(`Sunucu Hatası (${res.status}): JSON yerine HTML/Metin döndü.`);
  }

  if (!res.ok) {
    throw new Error(data?.error || data?.message || `İşlem başarısız (HTTP ${res.status})`);
  }
  return data;
}

export async function uploadImageToCloudinary(file, folderName, uploadPreset) {
  if (!file) return null;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME tanımlı değil');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folderName);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Resim yükleme başarısız oldu');
  }

  const data = await res.json();
  return data.secure_url;
}