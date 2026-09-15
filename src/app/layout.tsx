import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/site";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: DHA Islamabad-Rawalpindi Plots, Villas & Property Advisory`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "DHA Islamabad-Rawalpindi plots",
    "DHA Phase 5 plots for sale",
    "DHA Phase 6 plots for sale",
    "real estate agent Islamabad",
    "DHA Islamabad-Rawalpindi villas",
    "DHA Islamabad-Rawalpindi commercial plots",
    "overseas Pakistani property investment",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name}: DHA Islamabad-Rawalpindi Property Advisory`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: DHA Islamabad-Rawalpindi Property Advisory`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "real estate",
  verification: {
    google: "YFU_kFdRU7y9-rhd4modn8hqduDVOIFvj0XQBRLX5MQ",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1b33",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The admin panel and the Sanity Studio are standalone apps — no marketing
  // header, footer, floating buttons or intro splash over them.
  const pathname = (await headers()).get("x-pathname") ?? "";
  const chrome = !(
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/studio")
  );

  return (
    <html lang="en-PK" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {chrome && (
          // Runs during HTML parse, before the page paints: flags <html> so the
          // intro cover is already up on first paint (no flash of the page
          // underneath). The React IntroLoader then takes over and clears it.
          <script
            dangerouslySetInnerHTML={{
              __html:
                "try{var p=location.pathname;if(sessionStorage.getItem('ad-re-intro-shown')!=='1'&&!matchMedia('(prefers-reduced-motion:reduce)').matches&&p.indexOf('/studio')!==0&&p.indexOf('/admin')!==0){document.documentElement.setAttribute('data-intro','')}}catch(e){}",
            }}
          />
        )}
        {chrome ? (
          <>
            <IntroLoader />
            <OrganizationSchema />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
            >
              Skip to content
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <WhatsAppButton />
            <ChatWidget />
          </>
        ) : (
          children
        )}
        <Analytics />
      </body>
    </html>
  );
}
