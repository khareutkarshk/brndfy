import React from "react";
import JsonLd from "./JsonLd";
import FAQ from "./FAQ";
import MagneticButton from "./fx/MagneticButton";
import SplitReveal from "./fx/SplitReveal";
import PageShell from "./page/PageShell";
import PageHero from "./page/PageHero";
import Chapter from "./page/Chapter";

// The article arrives as HTML from each city page; style its tags in place
const ARTICLE = [
  "[&_article>p:first-of-type]:mt-0 [&_article>p:first-of-type]:font-display [&_article>p:first-of-type]:text-[clamp(1.3rem,2vw,1.7rem)] [&_article>p:first-of-type]:font-light [&_article>p:first-of-type]:leading-[1.35] [&_article>p:first-of-type]:text-paper",
  "[&_p]:mt-5 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-mute [&_strong]:font-medium [&_strong]:text-paper",
  "[&_h2]:mt-16 [&_h2]:font-display [&_h2]:text-[clamp(1.6rem,2.6vw,2.3rem)] [&_h2]:font-medium [&_h2]:leading-[1.1] [&_h2]:tracking-[-0.03em] [&_h2]:text-paper",
  "[&_h3]:mt-10 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-medium [&_h3]:tracking-[-0.01em] [&_h3]:text-paper",
  "[&_ul]:mt-6 [&_ul]:grid [&_ul]:gap-3 sm:[&_ul]:grid-cols-2 [&_li]:rounded-[20px] [&_li]:border [&_li]:border-line [&_li]:bg-ink-2 [&_li]:px-5 [&_li]:py-4 [&_li]:leading-relaxed [&_li]:text-mute",
].join(" ");

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
    <PageShell>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      <PageHero
        label={`Marketing agency · ${locationName}`}
        title={h1}
        titleClassName="max-w-[20ch] text-[clamp(2.4rem,5.2vw,4.8rem)]"
        intro={description}
        actions={
          <>
            <MagneticButton href="/contact">Get a free audit</MagneticButton>
            <MagneticButton href="/#work" variant="ghost">
              See our work
            </MagneticButton>
          </>
        }
      />

      <Chapter index="02" label={`Why ${locationName}`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-7 ${ARTICLE}`} dangerouslySetInnerHTML={{ __html: content }} />

          <aside className="flex flex-col gap-3 lg:col-span-5">
            <div className="lg:sticky lg:top-28 flex flex-col gap-3">
              <div className="relative h-80 overflow-hidden rounded-[28px] ring-1 ring-line">
                {/* Invert and rotate the hue so the light map sits on ink */}
                <iframe
                  src={mapEmbedUrl}
                  title={`Map of ${locationName}`}
                  className="size-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.7)]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="relative overflow-hidden rounded-[28px] bg-primary p-8">
                <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
                <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-white/75">Why Brndfy in {locationName}</p>
                <p className="relative mt-6 font-display text-xl font-medium leading-snug tracking-[-0.015em] text-white">
                  We combine local insights with national-scale activation power. From Janpath to Greater Noida, we know how to reach the youth
                  where they are.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Chapter>

      <Chapter
        index="03"
        label="On the ground"
        title={
          <>
            Key landmarks near us <span className="font-semibold">in {locationName}.</span>
          </>
        }
      >
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {landmarks.map((landmark, i) => (
            <li key={landmark} className="flex items-baseline gap-4 rounded-[20px] border border-line bg-ink-2 px-5 py-5">
              <span className="font-mono text-[11px] text-cobalt-hi">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-paper">{landmark}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      <FAQ index="04" items={faqs} />

      <section className="px-4 pb-20 sm:px-10 lg:px-16 lg:pb-28">
        <div className="relative mx-auto flex max-w-[1400px] flex-col gap-10 overflow-hidden rounded-[28px] bg-primary p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-16">
          <div className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-white/10 blur-3xl" />
          <SplitReveal className="relative max-w-[16ch] font-display text-[clamp(2.2rem,5vw,4.6rem)] font-light leading-[1] tracking-[-0.045em] text-white">
            Ready to scale your brand <span className="font-semibold">in {locationName}?</span>
          </SplitReveal>
          <MagneticButton href="/contact" variant="light" className="relative">
            Start your campaign
          </MagneticButton>
        </div>
      </section>
    </PageShell>
  );
};

export default LocationPageTemplate;
