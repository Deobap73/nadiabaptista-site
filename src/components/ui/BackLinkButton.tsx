// src/components/ui/BackLinkButton.tsx

import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { getCommonDict, normalizeLang } from '@/lib/i18n';

type Props = {
  href: string;
  lang?: Lang;
  label?: string;
  className?: string;
};

export default function BackLinkButton({ href, lang, label, className }: Props) {
  const safeLang = normalizeLang(lang);
  const dict = getCommonDict(safeLang);

  const finalLabel = (label || '').trim() ? label : dict.back;

  return (
    <Link className={className || 'back_button'} href={href} aria-label={finalLabel}>
      ← {finalLabel}
    </Link>
  );
}
