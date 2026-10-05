import type { StaticImageData } from "next/image";

import SahilRana from "@/assets/Creators Image/Sahil Rana.jpg";
import Prerna from "@/assets/Creators Image/Prerna.jpg";
import LoveBabbar from "@/assets/Creators Image/Love Babbar.jpg";
import SmitThakkar from "@/assets/Creators Image/Smit Thakkar.jpg";
import ArpitSharma from "@/assets/Creators Image/Arpit Sharma.jpg";
import ArchanaTiwari from "@/assets/Creators Image/Archana Tiwari.jpg";
import RohanMehta from "@/assets/Creators Image/Rohan Mehta.jpg";
import GaganSaini from "@/assets/Creators Image/Gagan Saini.jpg";
import AdityaSambyal from "@/assets/Creators Image/Aditya Sambyal.jpg";
import RuchikaGupta from "@/assets/Creators Image/Ruchika Gupta.jpg";


export interface Creator {
  name: string;
  handle: string;
  instagram: string;
  photo: StaticImageData;
  ig?: string;
  yt?: string;
  niches: string[];
}

/** Order follows influencer-creators.txt */
export const CREATORS: Creator[] = [
  { name: "Sahil Rana", handle: "sahilrana", instagram: "https://www.instagram.com/sahilrana/", photo: SahilRana, ig: "3.5M+", yt: "20M+", niches: ["Gaming", "Tech"] },
  { name: "Prerana", handle: "i.preranadas", instagram: "https://www.instagram.com/i.preranadas/", photo: Prerna, ig: "900K+", niches: ["Actor", "Storyteller"] },
  { name: "Love Babbar", handle: "lovebabbar1", instagram: "https://www.instagram.com/lovebabbar1/", photo: LoveBabbar, ig: "151K+", yt: "650K+", niches: ["Edutainment"] },
  { name: "Smit Thakkar", handle: "iam_smitthakkar", instagram: "https://www.instagram.com/iam_smitthakkar/", photo: SmitThakkar, ig: "700K+", niches: ["Finance", "Investing"] },
  { name: "Arpit Sharma", handle: "arpitsharmaiii", instagram: "https://www.instagram.com/arpitsharmaiii/", photo: ArpitSharma, ig: "650K+", yt: "100K+", niches: ["Finance", "Fitness"] },
  { name: "Archana Tiwari", handle: "therajdharma", instagram: "https://www.instagram.com/therajdharma/", photo: ArchanaTiwari, ig: "350K+", yt: "4.5M+", niches: ["Infotainment", "Documentary"] },
  { name: "Rohan Mehta", handle: "growthwithrohan", instagram: "https://www.instagram.com/growthwithrohan/", photo: RohanMehta, ig: "200K+", yt: "50K+", niches: ["Infotainment"] },
  { name: "Gagan Saini", handle: "03gagan", instagram: "https://www.instagram.com/03gagan/", photo: GaganSaini, ig: "50K+", niches: ["Finance", "Fitness", "Growth"] },
  { name: "Aditya Sambyal", handle: "adityasinghsambyal", instagram: "https://www.instagram.com/adityasinghsambyal/", photo: AdityaSambyal, ig: "80K+", yt: "15K+", niches: ["Edutainment"] },
  { name: "Ruchika Gupta", handle: "ruchika.gupta___", instagram: "https://www.instagram.com/ruchika.gupta___/", photo: RuchikaGupta, ig: "150K+", niches: ["Finance", "Investing"] },
];

/** Portrait lookup used by case-study reel tiles that feature a roster creator. */
export const CREATOR_PHOTOS: Record<string, StaticImageData> = Object.fromEntries(
  CREATORS.map((c) => [c.name, c.photo]),
);
CREATOR_PHOTOS["Aditya Singh Sambyal"] = AdityaSambyal;
CREATOR_PHOTOS["Rajdharma"] = ArchanaTiwari;

export interface RisingCreator {
  name: string;
  instagram: string;
  photo: StaticImageData;
  deals: { brand: string; url: string }[];
}

export const RISING_CREATORS: RisingCreator[] = [
  {
    name: "Aditya Singh Sambyal",
    instagram: "https://www.instagram.com/adityasinghsambyal/",
    photo: AdityaSambyal,
    deals: [
      { brand: "Newton School of Technology", url: "https://www.instagram.com/reels/DbA1hQ5zTvx/" },
      { brand: "Lovely Professional University", url: "https://www.instagram.com/reels/DRjNRSGE2Az/" },
      { brand: "NIAT", url: "https://www.instagram.com/reel/DZFk5Z3zHcJ/" },
      { brand: "Polaris School of Technology", url: "https://www.instagram.com/reel/DYuSrFHTOec/" },
      { brand: "JAYPEE Institute", url: "https://www.instagram.com/reel/DWVtLlcE0Nn/" },
      { brand: "Amity University", url: "https://www.instagram.com/reel/DZpUkm9zfKF/" },
      { brand: "Sanskriti University", url: "https://www.instagram.com/reel/DapF0p4zdwC/" },
      { brand: "IIT Mandi", url: "https://www.instagram.com/reel/DXO27VdE8O8/" },
      { brand: "Intellipaat", url: "https://www.instagram.com/reel/DZVPakgTgi7/" },
      { brand: "Aakash Institute", url: "https://www.instagram.com/reel/Dc5ZeR-zUEG/" },
    ],
  },
];
