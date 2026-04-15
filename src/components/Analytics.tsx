"use client";

import Script from "next/script";

/**
 * Компонент аналитики — подключает:
 * 1. Google Tag Manager (GTM)
 * 2. Яндекс Метрика
 * 3. VK Ретаргетинг (Pixel)
 *
 * ID загружаются из .env переменных:
 *   NEXT_PUBLIC_GTM_ID
 *   NEXT_PUBLIC_YANDEX_METRIKA_ID
 *   NEXT_PUBLIC_VK_RETARGETING_ID
 */
// Analytics IDs (вшиты напрямую, т.к. .env не деплоится на Vercel)
const ANALYTICS_IDS = {
  gtmId: 'GTM-N68VT2F4',
  metrikaId: '105514735',
  vkRetargetingId: process.env.NEXT_PUBLIC_VK_RETARGETING_ID || '',
};

export default function Analytics() {
  const gtmId = ANALYTICS_IDS.gtmId;
  const metrikaId = ANALYTICS_IDS.metrikaId;
  const vkRetargetingId = ANALYTICS_IDS.vkRetargetingId;

  return (
    <>
      {/* ===== Google Tag Manager ===== */}
      {gtmId && (
        <>
          {/* GTM Script (head) */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        </>
      )}

      {/* ===== Яндекс Метрика ===== */}
      {metrikaId && (
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${metrikaId}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                trackHash:true
              });
            `,
          }}
        />
      )}

      {/* ===== VK Ретаргетинг (Pixel) ===== */}
      {vkRetargetingId && (
        <Script
          id="vk-retargeting"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){VK.Retargeting.Init("${vkRetargetingId}"),VK.Retargeting.Hit()},document.head.appendChild(t)}();
            `,
          }}
        />
      )}
    </>
  );
}
