import type { Metadata } from "next";

// The contact page is a client component, so its metadata lives here
export const metadata: Metadata = {
    title: "Contact: Start an Influencer or Campus Campaign",
    description:
        "Talk to BRNDFY about influencer marketing, campus branding and youth activations. Based in Greater Noida, working with brands across Delhi NCR and India.",
    alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
