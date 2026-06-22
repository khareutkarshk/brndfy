import { Metadata } from 'next'
import LocationPageTemplate from '../components/LocationPageTemplate'

export const metadata: Metadata = {
    title: 'Best Marketing Agency in India | BRNDFY',
    description: 'BRNDFY is India top-rated youth activation engine and marketing agency. We provide cutting-edge influencer marketing and branding solutions across India.',
    keywords: ['best marketing agency in India', 'top marketing agency India', 'performance marketing agency India'],
    alternates: {
        canonical: 'https://brndfy.com/marketing-agency-india',
    },
}

export default function IndiaPage() {
    const content = `
    <article>
      <p>India is a land of diversity and enormous digital potential. With one of the world's youngest populations, the country is a golden opportunity for brands that know how to connect with the youth. BRNDFY stands as the <strong>best marketing agency in India</strong>, offering a nationwide reach with a local touch.</p>
      
      <h2>Scaling Brands Across the Indian Subcontinent</h2>
      <p>From the metro cities of Mumbai, Bangalore, and Delhi to the emerging Tier 2 and Tier 3 cities, we understand the varied consumer behavior in India. Our youth marketing strategies are built on the foundation of scale and authenticity.</p>

      <h3>Innovative Youth Activation Engine</h3>
      <p>We leverage India's massive social media user base to create viral campaigns. Our influencer marketing network spans across the entire country, allowing brands to launch multi-lingual and multi-cultural campaigns that hit home.</p>

      <h2>Our National Presence</h2>
      <ul>
        <li><strong>Influencer Marketing:</strong> Connecting brands with 10k+ creators across India.</li>
        <li><strong>Campus Outreach:</strong> Presence in over 500+ colleges nationwide.</li>
        <li><strong>Digital Dominance:</strong> Expert SEO and Performance marketing for global Indian brands.</li>
      </ul>
    </article>
  `

    const landmarks = [
        'Taj Mahal, Agra',
        'Gateway of India, Mumbai',
        'Red Fort, Delhi',
        'Hawa Mahal, Jaipur',
        'Qutub Minar, Delhi',
        'Amer Fort, Jaipur',
        'Victoria Memorial, Kolkata'
    ]

    const faqs = [
        {
            question: 'Do you manage campaigns outside of Delhi NCR?',
            answer: 'Yes, BRNDFY is a pan-India agency. We have successfully executed campaigns in Mumbai, Bangalore, Pune, Hyderabad, and many other cities across India.'
        }
    ]

    return (
        <LocationPageTemplate
            locationName="India"
            title="Best Marketing Agency in India | BRNDFY"
            description="India top-rated youth activation engine and marketing agency. Nationwide reach with local expertise."
            keywords={['best marketing agency in India', 'top marketing agency India']}
            h1="India's Leading Marketing Agency for the Next Generation"
            content={content}
            landmarks={landmarks}
            faqs={faqs}
            mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.107085183!2d78.0!3d21.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b391%3A0x28e5136a5227906!2sIndia!5e0!3m2!1sen!2sin!4v1709423000000!5m2!1sen!2sin"
            canonical="/marketing-agency-india"
        />
    )
}
