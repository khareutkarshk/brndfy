import type { Metadata } from "next";
import localFont from "next/font/local";
import { Sora, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HashScrollHandler from "./components/HashScrollHandler";
import SmoothScroll from "./components/fx/SmoothScroll";

const gotham = localFont({
  src: [
    {
      path: "../font/ttf/GothamThin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../font/ttf/GothamThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../font/ttf/GothamXLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../font/ttf/GothamXLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../font/ttf/GothamLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../font/ttf/GothamLightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../font/otf/Gotham-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/otf/Gotham-BookItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../font/ttf/GothamMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/ttf/GothamMediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../font/ttf/GothamBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../font/ttf/GothamBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../font/ttf/GothamBlack.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../font/ttf/GothamBlackItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../font/ttf/GothamUltra.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../font/ttf/GothamUltraItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-gotham",
  display: "swap",
});

// Display face: clean geometric sans whose round bowls echo the B-and-R mark
const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

// Data labels and figures
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

import JsonLd from "./components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://brndfy.com"),
  title: {
    default: "BRNDFY | Influencer Marketing & Youth Marketing Agency in India",
    template: "%s | BRNDFY",
  },
  description:
    "BRNDFY is India's leading youth activation engine and marketing agency, specializing in influencer marketing, campus branding, and immersive on-ground activations in Delhi NCR and beyond.",
  manifest: "/site.webmanifest",
  keywords: [
    "best marketing agency in Delhi NCR",
    "digital marketing agency Delhi",
    "influencer marketing agency India",
    "campus branding India",
    "youth marketing agency",
    "performance marketing agency India",
  ],
  authors: [{ name: "BRNDFY Team" }],
  creator: "BRNDFY",
  publisher: "BRNDFY",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://brndfy.com",
    title: "Best Marketing Agency in Delhi NCR | BRNDFY",
    description:
      "India's Youth Activation Engine. Bridging brands and youth through influencer marketing and immersive activations.",
    siteName: "BRNDFY",
    images: [
      {
        url: "/og-image.png", // Suggested to generate this later
        width: 1200,
        height: 630,
        alt: "BRNDFY - India's Youth Activation Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Marketing Agency in Delhi NCR | BRNDFY",
    description:
      "India's Youth Activation Engine. Bridging brands and youth through influencer marketing and immersive activations.",
    images: ["/og-image.png"],
    creator: "@brndfy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BRNDFY",
  alternateName: "Brndfy",
  url: "https://brndfy.com",
  description:
    "Influencer marketing, campus branding and youth activation agency based in Greater Noida, serving Delhi NCR and brands across India.",
  email: "business@brndfy.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "J-27, Gama-II",
    addressLocality: "Greater Noida",
    postalCode: "201308",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  logo: "https://brndfy.com/brndfy_logo.png",
  sameAs: [
    "https://www.instagram.com/brndfymedia/",
    "https://www.linkedin.com/company/marketmafiaa/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9690752035",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: "en",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to body before hydration */}
      <body suppressHydrationWarning className={`${gotham.variable} ${sora.variable} ${geistMono.variable} font-sans antialiased`}>
        <JsonLd data={organizationSchema} />
        <SmoothScroll />
        <Header />
        <HashScrollHandler />
        {children}
        <div className="p-3">
          <Footer />
        </div>
        {/* z-index scale: header 60, mobile menu 55, grain 70, video lightbox 85, preloader 90 */}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
