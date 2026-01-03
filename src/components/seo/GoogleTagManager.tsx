// src/components/seo/GoogleTagManager.tsx

import Script from 'next/script';

type Props = {
  gtmId: string;
};

export default function GoogleTagManager({ gtmId }: Props) {
  const id = (gtmId || '').trim();
  if (!id) return null;

  return (
    <>
      <Script
        id='gtmScript'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${id}');
          `,
        }}
      />
    </>
  );
}
