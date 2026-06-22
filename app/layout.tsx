import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HashScrollHandler from "./components/HashScrollHandler";

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
});

import JsonLd from "./components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://brndfy.com"),
  title: {
    default: "Building Culture. Not Just Campaigns.",
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
  alternates: {
    canonical: "https://brndfy.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BRNDFY",
  url: "https://brndfy.com",
  logo: "https://brndfy.com/brndfy_logo.png",
  sameAs: [
    "https://www.instagram.com/brndfy",
    "https://www.linkedin.com/company/brndfy",
    "https://twitter.com/brndfy",
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
      <body className={`${gotham.variable} font-sans antialiased`}>
        <JsonLd data={organizationSchema} />
        <Header />
        <HashScrollHandler />
        {children}
        <div className="p-3">
          <Footer />
        </div>
      </body>
    </html>
  );
}
