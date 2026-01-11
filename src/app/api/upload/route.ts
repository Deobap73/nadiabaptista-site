// src/app/api/upload/route.ts

import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary/cloudinaryServer';
import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

type UploadContext =
  | 'home'
  | 'about'
  | 'blog'
  | 'blog_article'
  | 'contact'
  | 'portfolio'
  | 'studies';

function getBaseFolder(): string {
  const hyphenChar = String.fromCharCode(45);
  return `NadiaBaptista${hyphenChar}site`;
}

function resolveFolder(context: UploadContext): string {
  const base = getBaseFolder();

  if (context === 'home') return `${base}/home`;
  if (context === 'about') return `${base}/about`;
  if (context === 'blog') return `${base}/blog`;

  // Ajuste para bater certo com a pasta que queres no Cloudinary
  if (context === 'blog_article') return `${base}/blog/Articles`;

  if (context === 'contact') return `${base}/contact`;
  if (context === 'portfolio') return `${base}/portfolio`;

  // Mantém consistência
  return `${base}/studies`;
}

function isAllowedContext(value: string): value is UploadContext {
  return (
    value === 'home' ||
    value === 'about' ||
    value === 'blog' ||
    value === 'blog_article' ||
    value === 'contact' ||
    value === 'portfolio' ||
    value === 'studies'
  );
}

function makeUniquePublicId(): string {
  try {
    return `img_${randomUUID()}`;
  } catch {
    return `img_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file');
    const contextRaw = String(formData.get('context') || 'blog');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'Missing file' }, { status: 400 });
    }

    const context = isAllowedContext(contextRaw) ? contextRaw : 'blog';
    const folder = resolveFolder(context);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const publicId = makeUniquePublicId();

    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'image',

            // nomes únicos e sem overwrite acidental
            public_id: publicId,
            overwrite: false,

            // garante comportamento consistente
            use_filename: false,
            unique_filename: true,
          },
          (error: UploadApiErrorResponse | undefined, uploaded: UploadApiResponse | undefined) => {
            if (error || !uploaded) {
              reject(error || new Error('Upload failed'));
              return;
            }
            resolve({ secure_url: uploaded.secure_url, public_id: uploaded.public_id });
          }
        );

        uploadStream.end(buffer);
      }
    );

    return NextResponse.json({
      ok: true,
      url: result.secure_url,
      publicId: result.public_id,
      context,
      folder,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
