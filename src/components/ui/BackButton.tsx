// src/components/ui/BackButton.tsx

'use client';

import { useRouter } from 'next/navigation';
import type { Lang } from '@/lib/i18n';
import { getCommonDict, normalizeLang } from '@/lib/i18n';

type BackButtonProps = {
  lang?: Lang;
  label?: string;
};

export default function BackButton({ lang, label }: BackButtonProps) {
  const router = useRouter();

  const safeLang = normalizeLang(lang);
  const dict = getCommonDict(safeLang);

  const finalLabel = (label || '').trim() ? label : dict.back;

  return (
    <button
      type='button'
      className='back_button'
      onClick={() => router.back()}
      aria-label={finalLabel}>
      ← {finalLabel}
    </button>
  );
}
