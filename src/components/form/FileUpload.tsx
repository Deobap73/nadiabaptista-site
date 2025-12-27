// src/components/form/FileUpload.tsx

'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/lib/cloudinary/uploadClient';
import type { UploadContext } from '@/lib/cloudinary/uploadClient';

type UploadedValue = {
  url: string;
  publicId: string;
};

type Props = {
  label: string;
  context: UploadContext;

  valueUrl?: string;
  disabled?: boolean;

  accept?: string;
  hint?: string;

  onUploaded: (value: UploadedValue) => void;
  onRemove?: () => void;
};

export default function FileUpload({
  label,
  context,
  valueUrl,
  disabled = false,
  accept = 'image/*',
  hint,
  onUploaded,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [status, setStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function handleSelect(file: File) {
    setStatus('uploading');
    setMessage('');

    const result = await uploadImage(file, context);

    if (!result.ok) {
      setStatus('error');
      setMessage('Upload falhou.');
      return;
    }

    setStatus('idle');
    onUploaded({ url: result.url, publicId: result.publicId });

    if (inputRef.current) inputRef.current.value = '';
  }

  function handleRemove() {
    setMessage('');
    setStatus('idle');

    if (inputRef.current) inputRef.current.value = '';
    if (onRemove) onRemove();
  }

  return (
    <div className='file_upload'>
      <div className='file_upload__top'>
        <p className='file_upload__label'>{label}</p>

        <div className='file_upload__actions'>
          {valueUrl && onRemove ? (
            <button
              type='button'
              className='file_upload__remove'
              onClick={handleRemove}
              disabled={disabled || status === 'uploading'}>
              Remover
            </button>
          ) : null}
        </div>
      </div>

      {hint ? <p className='file_upload__hint'>{hint}</p> : null}

      <input
        ref={inputRef}
        className='file_upload__input'
        type='file'
        accept={accept}
        disabled={disabled || status === 'uploading'}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleSelect(f);
        }}
      />

      {status === 'uploading' ? <p className='file_upload__status'>A enviar</p> : null}
      {status === 'error' || message ? <p className='file_upload__error'>{message}</p> : null}

      {valueUrl ? (
        <div className='file_upload__preview'>
          <Image
            src={valueUrl}
            alt=''
            width={960}
            height={540}
            sizes='(min-width: 1024px) 520px, 100vw'
            unoptimized
          />
        </div>
      ) : null}
    </div>
  );
}
