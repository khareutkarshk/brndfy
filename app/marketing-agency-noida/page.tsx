import { Metadata } from 'next'
import LocationPageTemplate from '../components/LocationPageTemplate'

export const metadata: Metadata = {
    title: 'Influencer Marketing Agency in Noida',
    description: 'BRNDFY is an influencer marketing and youth activation agency next door to Noida, in Greater Noida. Creator campaigns, campus activations and Gen Z marketing for Noida brands.',
    keywords: ['influencer marketing agency in Noida', 'marketing agency in Noida', 'digital marketing agency Noida', 'campus marketing Noida', 'youth marketing agency Noida'],
    alternates: {
        canonical: 'https://brndfy.com/marketing-agency-noida',
    },
}

export default function NoidaPage() {
    const content = `
    <article>
      <p>Noida is where a lot of India's young audience works, studies and scrolls. Startups in Sector 62, media houses in Film City and campuses along the Expressway make it one of the densest Gen Z markets in the country. BRNDFY is an <strong>influencer marketing agency in Noida's backyard</strong>: our office in Greater Noida is a short drive down the Expressway.</p>

      <h2>Influencer marketing for Noida brands</h2>
      <p>We run creator campaigns for finance, ed-tech and consumer brands, from 150+ regional nano creators for Vyapar to a mega creator mix for INDmoney. Noida brands get the same playbook: the right creator tier for the goal, a niche mix that reaches beyond the obvious, and reporting on views, engagement and leads. See our <a href="/influencer-marketing-agency">influencer marketing</a> work.</p>

      <h3>Campus activations in Noida</h3>
      <p>Noida and Greater Noida together hold one of the largest student populations in NCR. We plan sampling drives, canteen integrations and student ambassador programs that put brands directly in students' hands, the same approach behind our <a href="/case-studies#college-activations">college activation case studies</a>.</p>

      <h2>What we do for brands in Noida</h2>
      <ul>
        <li><strong>Influencer Marketing:</strong> Nano to mega creators, chosen by audience, niche and city.</li>
        <li><strong>Campus Branding:</strong> Activations at colleges across Noida and Greater Noida.</li>
        <li><strong>Creator Strategy:</strong> Content direction built around your objective, not trends.</li>
        <li><strong>End-to-end Execution:</strong> Briefs, approvals, agreements, payments and reporting.</li>
      </ul>
    </article>
  `

    const landmarks = [
        'Sector 18',
        'DLF Mall of India',
        'Film City',
        'Sector 62',
        'Amity University',
        'JIIT Noida',
        'Botanical Garden',
        'Noida-Greater Noida Expressway'
    ]

    const faqs = [
        {
            question: 'Are you an influencer marketing agency in Noida?',
            answer: 'Our office is in Greater Noida, right next to Noida, and we work with brands across Noida and the rest of Delhi NCR. Creator campaigns run nationally, so your creators can be anywhere in India.'
        },
        {
            question: 'Can you run campus activations at Noida colleges?',
            answer: 'Yes. We plan sampling drives, canteen integrations and student ambassador programs for campuses across Noida and Greater Noida.'
        },
        {
            question: 'What kind of brands do you work with?',
            answer: 'Mostly finance, fintech and ed-tech brands, plus consumer brands that want Gen Z and student audiences. Past clients include INDmoney, slice, Vyapar, Monster Energy and Nescafe.'
        }
    ]

    return (
        <LocationPageTemplate
            locationName="Noida"
            title="Influencer Marketing Agency in Noida"
            description="Creator campaigns, campus activations and Gen Z marketing for Noida brands, from our office next door in Greater Noida."
            keywords={['influencer marketing agency in Noida', 'marketing agency in Noida']}
            h1="Influencer Marketing Agency for Noida Brands"
            content={content}
            landmarks={landmarks}
            faqs={faqs}
            mapEmbedUrl="https://www.google.com/maps?q=Noida,+Uttar+Pradesh&output=embed"
            canonical="/marketing-agency-noida"
        />
    )
}
