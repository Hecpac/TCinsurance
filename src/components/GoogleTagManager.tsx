import Script from "next/script";

interface GoogleTagManagerProps {
  gtmId?: string;
}

function isEnabled(gtmId?: string) {
  return Boolean(gtmId && gtmId !== "GTM-XXXXXXX");
}

interface GoogleAnalyticsProps {
  ga4Id?: string;
}

interface MetaPixelProps {
  pixelId?: string;
}

function isGa4Enabled(ga4Id?: string) {
  return Boolean(ga4Id && ga4Id !== "G-XXXXXXXXXX");
}

function isMetaPixelEnabled(pixelId?: string) {
  return Boolean(pixelId && pixelId !== "000000000000000");
}

export function GoogleTagManagerHead({ gtmId }: GoogleTagManagerProps) {
  if (!isEnabled(gtmId)) return null;

  const script = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;

  return <Script id="gtm-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: script }} />;
}

export function GoogleTagManagerNoScript({ gtmId }: GoogleTagManagerProps) {
  if (!isEnabled(gtmId)) return null;

  return (
    <noscript>
      <iframe
        title="google-tag-manager"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

export function GoogleAnalyticsHead({ ga4Id }: GoogleAnalyticsProps) {
  if (!isGa4Enabled(ga4Id)) return null;

  const script = `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    window.gtag('config', '${ga4Id}', { send_page_view: true, anonymize_ip: true });
  `;

  return (
    <>
      <Script id="ga4-lib" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
      <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}

export function MetaPixelHead({ pixelId }: MetaPixelProps) {
  if (!isMetaPixelEnabled(pixelId)) return null;

  const script = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;

  return <Script id="meta-pixel-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: script }} />;
}

export function MetaPixelNoScript({ pixelId }: MetaPixelProps) {
  if (!isMetaPixelEnabled(pixelId)) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
