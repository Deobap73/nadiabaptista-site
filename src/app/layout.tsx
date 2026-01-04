// src/app/layout.tsx

import type { ReactNode } from 'react';
import '../styles/globals.scss';
import GoogleTagManager from '@/components/seo/GoogleTagManager';

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  const gtmId = (process.env.NEXT_PUBLIC_GTM_ID || '').trim();

  return (
    <html lang='pt-PT' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GoogleTagManager gtmId={gtmId} />

        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}

        {children}
      </body>
    </html>
  );
}
