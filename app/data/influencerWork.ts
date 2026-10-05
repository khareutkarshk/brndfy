import type { StaticImageData } from "next/image";

import INDmoney from "@/assets/logos/Influencer-brand-logos/INDmoney.png";
import Slice from "@/assets/logos/Influencer-brand-logos/Slice.png";
import Vyapar from "@/assets/logos/Influencer-brand-logos/Vyapar.png";
import Polaris from "@/assets/logos/Influencer-brand-logos/Polaris.png";
import Newton from "@/assets/logos/Influencer-brand-logos/Newton.png";
import Abhibus from "@/assets/logos/Influencer-brand-logos/Abhibus.png";

// Reel covers (Instagram has no public thumbnail URL)
import RuchikaThumb from "@/assets/Thumbnails/Ruchika Gupta.jpg";
import SmitThumb from "@/assets/Thumbnails/Smit Thakkar.jpg";
import ApoorvThumb from "@/assets/Thumbnails/Apoorv Saxena.jpg";
import GaganThumb from "@/assets/Thumbnails/Gagan Saini.jpg";
import BathBabesThumb from "@/assets/Thumbnails/The Bath Babes.jpg";
import VanshikaThumb from "@/assets/Thumbnails/Vanshika.jpg";
import MoneyMentorsThumb from "@/assets/Thumbnails/Money Mentors.jpg";
import LakshayThumb from "@/assets/Thumbnails/Lakshay Sharma.jpg";
import RohanThumb from "@/assets/Thumbnails/Rohan Mehta.jpg";
import ShadabThumb from "@/assets/Thumbnails/Mohd. Shadab.jpg";

import BathBabesPortrait from "@/assets/Creator portraits/Bath Babes.jpg";
import LakshayPortrait from "@/assets/Creator portraits/Lakshay Sharma.jpg";
import MoneyMentorsPortrait from "@/assets/Creator portraits/Money Mentors.jpg";
import ShadabPortrait from "@/assets/Creator portraits/Mohd. Shadab.jpg";
import VanshikaPortrait from "@/assets/Creator portraits/Vanshika.jpg";
import RohanPortrait from "@/assets/Creator portraits/Rohan Mehta.jpg";
import MarketFeedPortrait from "@/assets/Creator portraits/MarketFeed.jpg";
import SahilPortrait from "@/assets/Creator portraits/Sahil Rana.jpg";
import LovePortrait from "@/assets/Creator portraits/Love Babbar.jpg";
import RajdharmaPortrait from "@/assets/Creator portraits/Archana Tiwari.jpg";
import SmitPortrait from "@/assets/Creator portraits/Smit Thakkar.jpg";
import RuchikaPortrait from "@/assets/Creator portraits/Ruchika Gupta.jpg";
import GaganPortrait from "@/assets/Creator portraits/Gagan Saini.jpg";
import ApoorvPortrait from "@/assets/Creator portraits/Apoorv Saxena.jpg";



export type Platform = "youtube" | "instagram";

export interface Reel {
  creator: string;
  profile: string;
  /** Empty when the video is not live yet */
  url: string;
  views?: string;
  portrait?: StaticImageData;
  /** Cover image; YouTube reels fall back to the video thumbnail */
  thumb?: StaticImageData;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Cohort {
  name: string;
  month: string;
  creators: number;
  views: string;
  engagement: string;
  leads: number;
}

export interface InfluencerCase {
  slug: string;
  brand: string;
  logo: StaticImageData;
  category: string;
  tags: string[];
  tagline: string;
  headline: string;
  brief: string;
  whatWeDid: string;
  stats: Stat[];
  reels: Reel[];
  cohorts?: Cohort[];
}

export const INFLUENCER_CASES: InfluencerCase[] = [
  {
    slug: "indmoney",
    brand: "INDmoney",
    logo: INDmoney,
    category: "US Stock Investing Platform",
    tags: ["Mega Creators Campaign", "Ongoing Campaign"],
    tagline: "Real people. Smarter financial moves.",
    headline: "Making finance more relatable through creator-led content.",
    brief:
      "Communicate INDmoney's key USPs to a mass audience, making global investing simple through fractional investing, ₹500 SIPs, zero platform fees and easy KYC, while keeping the credibility expected of a leading finance brand.",
    whatWeDid:
      "A mega creator campaign across five niches (infotainment, gaming, edutainment, vlogging and finance) while deliberately limiting finance creators. A high-risk call that became the strategy behind four consecutive months of INDmoney campaigns.",
    stats: [
      { value: "30+", label: "Creators activated" },
      { value: "17.5M+", label: "Total views" },
      { value: "5+", label: "Niches tapped" },
    ],
    reels: [
      { creator: "Sahil Rana", profile: "https://www.youtube.com/@SahilXp2", url: "https://www.youtube.com/watch?v=VJav2ydDnzA", portrait: SahilPortrait},
      { creator: "Rajdharma", profile: "https://www.youtube.com/@TheRajdharma", url: "https://youtu.be/hFhZ_SCsfMw", portrait: RajdharmaPortrait},
      { creator: "Love Babbar", profile: "https://www.youtube.com/@LoveBabbar", url: "https://youtu.be/SkOBlVrjGW8", portrait: LovePortrait},
      { creator: "Marketfeed", profile: "https://www.youtube.com/@marketfeedapp", url: "https://youtu.be/42b6uK_UUFU", portrait: MarketFeedPortrait }    ],
  },
  {
    slug: "slice",
    brand: "slice",
    logo: Slice,
    category: "Digital Banking",
    tags: ["Creator-Led Growth", "Gen Z Audience"],
    tagline: "Banking that gets your vibe.",
    headline: "Redefining banking for the next generation.",
    brief:
      "slice wanted five products (UPI Credit Card, Atom, Savings, UPI and Fixed Deposits) in the everyday lives of Gen Z, making banking feel effortless and built around how they spend and save.",
    whatWeDid:
      "We handpicked Gen Z-loved creators across lifestyle, couples, finance and relatable content, reaching young audiences with the intent and spending power to turn slice into an everyday money conversation.",
    stats: [
      { value: "20+", label: "Micro creators" },
      { value: "7M+", label: "Total views" },
      { value: "5.65%", label: "Engagement rate" },
    ],
    reels: [
      { creator: "Ruchika Gupta", profile: "https://www.instagram.com/ruchika.gupta___", url: "https://www.instagram.com/reel/DcGKQkfSYjw/", portrait: RuchikaPortrait, thumb: RuchikaThumb },
      { creator: "Smit Thakkar", profile: "https://www.instagram.com/financebysmit", url: "https://www.instagram.com/reel/DcOY2bBhlPM/", portrait: SmitPortrait, thumb: SmitThumb },
      { creator: "Apoorv Saxena", profile: "https://www.instagram.com/cutieepotatoes", url: "https://www.instagram.com/reel/DclhyIRygtd/", portrait: ApoorvPortrait, thumb: ApoorvThumb },
      { creator: "Gagan Saini", profile: "https://www.instagram.com/03gagan", url: "https://www.instagram.com/p/Dd1cIWKhiTh/", portrait: GaganPortrait, thumb: GaganThumb },
    ],
  },
  {
    slug: "vyapar",
    brand: "Vyapar",
    logo: Vyapar,
    category: "Built for MSMEs",
    tags: ["Regional Nano Creators", "Monthly Partnership"],
    tagline: "150+ creators powering business growth.",
    headline: "Turning creator reach into real business growth.",
    brief:
      "Vyapar wanted to amplify its brand voice while turning creator content into qualified leads. Earlier mega-influencer campaigns had delivered poor ROI, so it needed a sharper way to reach India's MSME owners.",
    whatWeDid:
      "We moved the strategy to regional nano creators whose audiences matched Vyapar's core customers. Four cohorts later, it is an ongoing monthly partnership.",
    stats: [
      { value: "150+", label: "Nano creators" },
      { value: "5.7M+", label: "Total views" },
      { value: "4.85%", label: "Engagement rate" },
      { value: "17K+", label: "Leads generated" },
    ],
    cohorts: [
      { name: "Cohort 1", month: "May", creators: 30, views: "650K+", engagement: "4.15%", leads: 2100 },
      { name: "Cohort 2", month: "June", creators: 35, views: "1.1M+", engagement: "5.29%", leads: 3800 },
      { name: "Cohort 3", month: "July", creators: 45, views: "1.7M+", engagement: "4.89%", leads: 5600 },
      { name: "Cohort 4", month: "August", creators: 50, views: "2.2M+", engagement: "5.15%", leads: 6300 },
    ],
    reels: [
      { creator: "The Bath Babes", profile: "https://www.instagram.com/thebathbabes/", url: "https://www.instagram.com/reel/DZNFNEpTOlW/", portrait: BathBabesPortrait, thumb: BathBabesThumb },
      { creator: "Vanshika", profile: "https://www.instagram.com/chitraabyvanshika", url: "https://www.instagram.com/p/DaNVJCshMzk/", portrait: VanshikaPortrait, thumb: VanshikaThumb },
      { creator: "Money Mentors", profile: "https://www.instagram.com/yourmoneymentors", url: "https://www.instagram.com/reel/DYZ7eddAg_S/", portrait: MoneyMentorsPortrait, thumb: MoneyMentorsThumb },
      { creator: "Lakshay Sharma", profile: "https://www.instagram.com/lakshaysharma_._", url: "https://www.instagram.com/reel/DYMzUxGxRlU/", portrait: LakshayPortrait, thumb: LakshayThumb },
      { creator: "Rohan Mehta", profile: "https://www.instagram.com/growthwithrohan/", url: "https://www.instagram.com/reel/DYRejpniYBV/", portrait: RohanPortrait, thumb: RohanThumb },
      { creator: "Mohd. Shadab", profile: "https://www.instagram.com/shaddy_noor/", url: "https://www.instagram.com/reel/DY61iAXhpQS/", portrait: ShadabPortrait, thumb: ShadabThumb },
    ],
  },
  {
    slug: "polaris",
    brand: "Polaris School of Technology",
    logo: Polaris,
    category: "Ed-Tech School",
    tags: ["Lead Generation", "Blind Marketing"],
    tagline: "Turning curiosity into PSAT leads.",
    headline: "The power of blind marketing.",
    brief:
      "Polaris wanted maximum leads for its PSAT entrance exam during admission season, with enough curiosity and hype to make students actively explore the opportunity.",
    whatWeDid:
      "No tags, no collab posts and not a single mention of Polaris. Curiosity-led content that felt completely organic turned creator videos into high-engagement conversations and a flood of PSAT leads.",
    stats: [
      { value: "40+", label: "Macro & Mega creators" },
      { value: "18M+", label: "Total views" },
      { value: "6.2%", label: "Engagement rate" },
    ],
    reels: [
    ],
  },
  {
    slug: "newton",
    brand: "Newton School of Technology",
    logo: Newton,
    category: "Ed-Tech School",
    tags: ["Lead Generation", "Proof-Led Content"],
    tagline: "Beyond promises. Built on proof.",
    headline: "Real student outcomes, told by creators.",
    brief:
      "Newton wanted to attract ambitious students by showing how its tech-first approach goes beyond conventional engineering education, turning real outcomes into a reason to apply.",
    whatWeDid:
      "We put Newton's proof points up front: GSoC selections, ICPC results, internships and student achievements. Data-driven creator content made the proposition credible and relatable.",
    stats: [
      { value: "20+", label: "Micro creators" },
      { value: "6.5M+", label: "Total views" },
      { value: "5.2%", label: "Engagement rate" },
    ],
    reels: [
    ],
  },
  {
    slug: "abhibus",
    brand: "AbhiBus",
    logo: Abhibus,
    category: "Commute & Travel",
    tags: ["Regional Expansion", "App Downloads"],
    tagline: "Taking AbhiBus South. One creator at a time.",
    headline: "Turning creator reach into travel moves.",
    brief:
      "AbhiBus was expanding across South India and wanted to try influencer marketing. As a new entrant, it needed the right creators and approach within a limited budget.",
    whatWeDid:
      "We handpicked relevant creators and wrote briefs that wove AbhiBus naturally into their content, widening reach across the region, driving app downloads and sharpening brand positioning.",
    stats: [
      { value: "8", label: "Mid & micro creators" },
      { value: "4M+", label: "Total views" },
      { value: "7.12%", label: "Engagement rate" },
    ],
    reels: [
    ],
  },
];

// ─── Media helpers ───────────────────────────────────────────────────────────

export function platformOf(url: string): Platform {
  return /youtu\.?be/.test(url) ? "youtube" : "instagram";
}

export function youtubeId(url: string): string | null {
  const m =
    url.match(/[?&]v=([\w-]{11})/) ||
    url.match(/youtu\.be\/([\w-]{11})/) ||
    url.match(/shorts\/([\w-]{11})/);
  return m ? m[1] : null;
}

export function isVertical(url: string): boolean {
  return platformOf(url) === "instagram" || url.includes("/shorts/");
}

/** Embeddable player URL for the in-page lightbox. */
export function embedUrl(url: string): string | null {
  if (platformOf(url) === "youtube") {
    const id = youtubeId(url);
    return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null;
  }
  const m = url.match(/instagram\.com\/(?:reels?|p)\/([\w-]+)/);
  return m ? `https://www.instagram.com/reel/${m[1]}/embed` : null;
}

export function youtubeThumb(url: string): string | null {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
