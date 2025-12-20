// src/components/ui/BackButton.tsx

'use client';

import { useRouter } from 'next/navigation';

type BackButtonProps = {
  label?: string;
};

export default function BackButton({ label = 'Voltar atrás' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button type='button' className='back_button' onClick={() => router.back()} aria-label={label}>
      ← {label}
    </button>
  );
}
