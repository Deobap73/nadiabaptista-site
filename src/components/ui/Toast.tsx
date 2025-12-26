// src/components/ui/Toast.tsx

'use client';

import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  durationMs?: number;
};

export default function Toast({ isOpen, message, onClose, durationMs = 1800 }: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const t = window.setTimeout(() => onClose(), durationMs);
    return () => window.clearTimeout(t);
  }, [isOpen, onClose, durationMs]);

  if (!isOpen) return null;

  return (
    <div className='ui_toast' role='status' aria-live='polite'>
      <div className='ui_toast__card'>{message}</div>
    </div>
  );
}
