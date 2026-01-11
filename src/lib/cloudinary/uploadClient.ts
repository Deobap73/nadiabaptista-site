// src/lib/cloudinary/uploadClient.ts

export type UploadContext =
  | 'home'
  | 'about'
  | 'blog'
  | 'blog_article'
  | 'contact'
  | 'portfolio'
  | 'studies';

export type SequenceKind =
  | 'post_cover'
  | 'academic_project_image'
  | 'diploma_image'
  | 'achievement_image'
  | 'conference_image'
  | 'practical_experience_image'
  | 'avatar_image';

export type UploadResult = {
  ok: boolean;
  url: string;
  publicId: string;
  displayName?: string;
};

type UploadOptions = {
  sequenceKind?: SequenceKind;
};

export async function uploadImage(
  file: File,
  context: UploadContext,
  options?: UploadOptions
): Promise<UploadResult> {
  try {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('context', context);

    if (options?.sequenceKind) fd.append('sequenceKind', options.sequenceKind);

    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const json = (await res.json()) as {
      ok: boolean;
      url?: string;
      publicId?: string;
      displayName?: string | null;
    };

    if (!res.ok || !json.ok || !json.url || !json.publicId) {
      return { ok: false, url: '', publicId: '' };
    }

    return {
      ok: true,
      url: json.url,
      publicId: json.publicId,
      displayName: json.displayName || '',
    };
  } catch {
    return { ok: false, url: '', publicId: '' };
  }
}
