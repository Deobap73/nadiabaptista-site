import Script from 'next/script';

type Props = {
  gtmId: string;
};

export default function GoogleTagManager({ gtmId }: Props) {
  const id = (gtmId || '').trim();
  if (!id) return null;

  return (
    <>
      {/* Configuração do Consent Mode v2 
        Usamos 'afterInteractive' para evitar o erro de linting, 
        mas como este script aparece primeiro no DOM, ele será executado 
        imediatamente antes do script principal do GTM.
      */}
      <Script
        id='gtm-consent-mode'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'personalization_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `,
        }}
      />

      {/* Script Principal do GTM */}
      <Script
        id='gtm-script'
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
