import React from "react";
import Image from "next/image";
import JsonLd from "./JsonLd";

interface LocationPageTemplateProps {
  locationName: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  content: string; // HTML or long text
  landmarks: string[];
  faqs: { question: string; answer: string }[];
  mapEmbedUrl: string;
  canonical: string;
}

const LocationPageTemplate: React.FC<LocationPageTemplateProps> = ({
  locationName,
  title,
  description,
  keywords,
  h1,
  content,
  landmarks,
  faqs,
  mapEmbedUrl,
  canonical,
}) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `BRNDFY - Marketing Agency in ${locationName}`,
    image: "https://brndfy.com/logo3d.png",
    "@id": `https://brndfy.com${canonical}`,
    url: `https://brndfy.com${canonical}`,
    telephone: "+91-9690752035",
    address: {
      "@type": "PostalAddress",
      addressLocality: locationName,
      addressRegion: "Delhi NCR",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6139,
      longitude: 77.209,
    },
    servesCrawl: true,
    areaServed: locationName,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-white p-3 rounded-2xl flex flex-col gap-6">
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden min-h-[60vh] flex items-center justify-center bg-secondary text-white p-6 sm:p-12">
        {/* Background pattern or subtle image could go here */}
        <div className="relative z-10 text-center max-w-4xl">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            Top Marketing Agency in {locationName}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
            {h1}
          </h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-primary text-white rounded-md font-bold hover:bg-primary/90 transition-all"
            >
              Get a Free Audit
            </a>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto py-16 px-6 sm:px-12 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 prose prose-lg prose-invert text-secondary">
          <div dangerouslySetInnerHTML={{ __html: content }} />

          <h2 className="text-3xl font-bold mt-12 mb-6">
            Key Landmarks Near Us in {locationName}
          </h2>
          <ul className="list-disc pl-6 grid sm:grid-cols-2 gap-2">
            {landmarks.map((landmark) => (
              <li key={landmark}>{landmark}</li>
            ))}
          </ul>
        </div>

        {/* Sidebar / Map */}
        <div className="flex flex-col gap-8">
          <div className="rounded-2xl overflow-hidden h-80 border-4 border-secondary/5">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="bg-secondary/5 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Why Choose BRNDFY in {locationName}?
            </h3>
            <p className="text-secondary/70">
              We combine local insights with national-scale activation power.
              From Janpath to Greater Noida, we know how to reach the youth
              where they are.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary p-12 rounded-2xl text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/10 pb-6">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 text-center bg-primary text-white rounded-2xl">
        <h2 className="text-3xl sm:text-5xl font-black mb-8">
          Ready to Scale Your Brand in {locationName}?
        </h2>
        <a
          href="/contact"
          className="px-12 py-5 bg-white text-primary rounded-md font-black text-xl hover:scale-105 transition-transform inline-block"
        >
          Start Your Campaign Now
        </a>
      </section>
    </div>
  );
};

export default LocationPageTemplate;
