import { Metadata } from 'next'
import LocationPageTemplate from '../components/LocationPageTemplate'

export const metadata: Metadata = {
    title: 'Best Marketing Agency in Delhi NCR',
    description: 'Top-rated digital marketing agency in Delhi NCR. Specializing in youth activation, influencer campaigns, and campus branding across New Delhi, Gurgaon, and Noida.',
    keywords: ['best marketing agency in NCR', 'digital marketing agency Delhi NCR', 'social media marketing agency NCR'],
    alternates: {
        canonical: 'https://brndfy.com/marketing-agency-ncr',
    },
}

export default function NCRPage() {
    const content = `
    <article>
      <p>The National Capital Region (NCR) is the economic powerhouse of North India. From the gleaming skyscrapers of Cyber City in Gurgaon to the industrial hubs of Noida, the region is a hotbed of brand activity. As the leading <strong>marketing agency in NCR</strong>, BRNDFY provides the strategic edge brands need to capture the attention of millions.</p>
      
      <h2>Strategizing for the Entire NCR Landscape</h2>
      <p>Marketing in NCR requires a nuanced understanding of different urban centers. Gurgaon demands a corporate, high-end approach, while Noida is great for industrial and tech-focused campaigns. Our digital marketing agency in Delhi NCR excels at creating unified campaigns that resonate across these diverse areas.</p>

      <h3>Influencer Marketing Across Borders</h3>
      <p>With thousands of creators based in Gurgaon and Noida, the influencer landscape here is dense. We identify the right personalities who have a genuine connection with your target demographics in NCR, ensuring maximum reach and engagement.</p>

      <h2>Why NCR Brands Choose BRNDFY</h2>
      <ul>
        <li><strong>Scalable Solutions:</strong> Whether you are targeting local shoppers in Noida or global clients from Gurgaon.</li>
        <li><strong>On-Ground Activations:</strong> We organize events and promotions in major malls and corporate parks across the region.</li>
        <li><strong>Advanced Analytics:</strong> Measuring every campaign for ROI and performance.</li>
      </ul>

      <h2>A Comprehensive Digital Marketing Agency in Delhi NCR</h2>
      <p>Being an NCR-focused agency, we understand the local competition. Our SEO and social media strategies are tailored to put your brand at the forefront of the largest consumer market in India.</p>
    </article>
  `

    const landmarks = [
        'Cyber Hub, Gurgaon',
        'Kingdom of Dreams',
        'DLF Mall of India, Noida',
        'Worlds of Wonder',
        'Ambience Mall, Gurgaon',
        'Noida Sector 18 Market',
        'Greater Noida Expressway',
        'Sultanpur National Park'
    ]

    const faqs = [
        {
            question: 'Which areas in NCR do you serve?',
            answer: 'We serve the entire National Capital Region, including New Delhi, Gurgaon (Gurugram), Noida, Greater Noida, Faridabad, and Ghaziabad.'
        },
        {
            question: 'Do you offer on-ground marketing in Gurgaon and Noida?',
            answer: 'Yes, on-ground youth activation and campus branding are our core strengths. we conduct activations in major corporate parks and colleges across NCR.'
        }
    ]

    return (
        <LocationPageTemplate
            locationName="NCR"
            title="Best Marketing Agency in Delhi NCR | BRNDFY"
            description="Top-rated digital marketing agency in Delhi NCR. Specializing in youth activation, influencer campaigns, and campus branding."
            keywords={['best marketing agency in NCR', 'digital marketing agency Delhi NCR']}
            h1="Dominating the Market with the Best Marketing Agency in NCR"
            content={content}
            landmarks={landmarks}
            faqs={faqs}
            mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.4812258882!2d77.0688975!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204d!2sDelhi+NCR!5e0!3m2!1sen!2sin!4v1709421000000!5m2!1sen!2sin"
            canonical="/marketing-agency-ncr"
        />
    )
}
