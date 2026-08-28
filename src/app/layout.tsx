import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/site";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { IntroLoader } from "@/components/layout/IntroLoader";
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
    default: `${site.name}: Property Advisory in DHA & Bahria Town, Islamabad`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "DHA Islamabad plots",
    "Bahria Town Islamabad property",
    "real estate agent Islamabad",
    "DHA Phase 5 plots for sale",
    "Margalla Orchard installments",
    "Bahria Town villas",
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
    title: `${site.name}: DHA & Bahria Town Property Advisory`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: DHA & Bahria Town Property Advisory`,
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
};

export const viewport: Viewport = {
  themeColor: "#0b1b33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
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
      </body>
    </html>
  );
}
