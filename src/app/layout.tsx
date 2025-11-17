// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import '../styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Nádia Baptista Psicóloga no Porto',
  description:
    'Atendimento psicológico no Porto. Consultas presenciais e online com a psicóloga Nádia Baptista, focadas em escuta, empatia e crescimento pessoal.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='pt'>
      <body className={`${inter.variable} ${cormorant.variable}`}>
        <div className='page-shell'>
          <div className='page-shell__inner'>{children}</div>
        </div>
      </body>
    </html>
  );
}
