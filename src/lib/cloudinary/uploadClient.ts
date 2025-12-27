// src/lib/cloudinary/uploadClient.ts

export type UploadContext =
  | 'home'
  | 'about'
  | 'blog'
  | 'blog_article'
  | 'contact'
  | 'portfolio'
  | 'studies';

export type UploadResult = {
  ok: boolean;
  url: string;
  publicId: string;
};

export async function uploadImage(file: File, context: UploadContext): Promise<UploadResult> {
  try {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('context', context);

    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const json = (await res.json()) as { ok: boolean; url?: string; publicId?: string };

    if (!res.ok || !json.ok || !json.url || !json.publicId) {
      return { ok: false, url: '', publicId: '' };
    }

    return { ok: true, url: json.url, publicId: json.publicId };
  } catch {
    return { ok: false, url: '', publicId: '' };
  }
}
