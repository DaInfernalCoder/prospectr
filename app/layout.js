import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
import config from "@/config";
import "./globals.css";
import Script from "next/script";

const font = Inter({ subsets: ["latin"] });

export const viewport = {
  // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        {config.domainName && <PlausibleProvider domain={config.domainName} />}
        {/* Trackdesk tracker begin */}
        <script async src="//cdn.trackdesk.com/tracking.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
              trackdesk('leadsprospectr', 'click');
            `,
          }}
        />
        {/* Trackdesk tracker end */}
      </head>
      <body data-theme={config.colors.theme} suppressHydrationWarning>
        {/* Trackdesk tracker script */}
        <Script src="//cdn.trackdesk.com/tracking.js" strategy="afterInteractive" />
        
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <ClientLayout>
          {children}
          {/* <SpeedInsights /> */}
          {/* <Analytices /> */}
        </ClientLayout>
      </body>
    </html>
  );
}
