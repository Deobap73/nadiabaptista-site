// src/app/api/upload/route.ts

import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary/cloudinaryServer';
import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '@/app/api/admin/shared/requireAdminApi';

export const runtime = 'nodejs';

type UploadContext =
  | 'home'
  | 'about'
  | 'blog'
  | 'blog_article'
  | 'contact'
  | 'portfolio'
  | 'studies';

type SequenceKind =
  | 'post_cover'
  | 'academic_project_image'
  | 'diploma_image'
  | 'achievement_image'
  | 'conference_image'
  | 'practical_experience_image'
  | 'avatar_image';

function getBaseFolder(): string {
  const hyphenChar = String.fromCharCode(45);
  return `NadiaBaptista${hyphenChar}site`;
}

function resolveFolder(context: UploadContext): string {
  const base = getBaseFolder();

  if (context === 'home') return `${base}/home`;
  if (context === 'about') return `${base}/about`;
  if (context === 'blog') return `${base}/blog`;
  if (context === 'blog_article') return `${base}/blog/Articles`;
  if (context === 'contact') return `${base}/contact`;
  if (context === 'portfolio') return `${base}/portfolio`;

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

const SEQUENCE_PREFIX: Record<SequenceKind, string> = {
  post_cover: 'Post',
  academic_project_image: 'Project',
  diploma_image: 'Diploma',
  achievement_image: 'Achievement',
  conference_image: 'Conference',
  practical_experience_image: 'Experience',
  avatar_image: 'Avatar',
};

function isAllowedSequenceKind(value: string): value is SequenceKind {
  return Boolean((SEQUENCE_PREFIX as Record<string, string | undefined>)[value]);
}

function makeUniquePublicId(): string {
  const suffix = randomUUID();
  const now = Date.now();
  return `img_${now}_${suffix}`;
}

type JsonOk = {
  ok: true;
  url: string;
  publicId: string;
  context: UploadContext;
  folder: string;
  displayName: string | null;
};

type JsonFail = {
  ok: false;
  error: string;
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file');
    const contextRaw = String(formData.get('context') || 'blog');
    const sequenceKindRaw = String(formData.get('sequenceKind') || '').trim();

    if (!file || !(file instanceof File)) {
      return NextResponse.json<JsonFail>({ ok: false, error: 'Missing file' }, { status: 400 });
    }

    const context = isAllowedContext(contextRaw) ? contextRaw : 'blog';
    const folder = resolveFolder(context);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let publicIdBase = '';
    let displayName = '';

    if (sequenceKindRaw) {
      if (!isAllowedSequenceKind(sequenceKindRaw)) {
        return NextResponse.json<JsonFail>(
          { ok: false, error: 'Invalid sequenceKind' },
          { status: 400 }
        );
      }

      const isAdmin = await isAdminRequest();
      if (!isAdmin) {
        return NextResponse.json<JsonFail>({ ok: false, error: 'Unauthorized' }, { status: 401 });
      }

      const ticket = await prisma.uploadTicket.create({
        data: { kind: sequenceKindRaw },
        select: { id: true },
      });

      const prefix = SEQUENCE_PREFIX[sequenceKindRaw];
      const name = `${prefix}_${ticket.id}`;

      publicIdBase = name;
      displayName = name;
    } else {
      publicIdBase = makeUniquePublicId();
      displayName = '';
    }

    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'image',
            public_id: publicIdBase,
            display_name: displayName || undefined,

            overwrite: false,
            use_filename: false,
            unique_filename: false,
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

    return NextResponse.json<JsonOk>({
      ok: true,
      url: result.secure_url,
      publicId: result.public_id,
      context,
      folder,
      displayName: displayName || null,
    });
  } catch {
    return NextResponse.json<JsonFail>({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
