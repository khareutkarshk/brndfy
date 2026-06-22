import { Metadata } from 'next'
import LocationPageTemplate from '../components/LocationPageTemplate'

export const metadata: Metadata = {
    title: 'Best Marketing Agency in Greater Noida | BRNDFY',
    description: 'Looking for a digital marketing agency in Greater Noida? We specialize in reaching the student population and industrial sectors of Greater Noida through specialized branding.',
    keywords: ['best marketing agency in Greater Noida', 'SEO agency Greater Noida', 'campus branding Greater Noida'],
    alternates: {
        canonical: 'https://brndfy.com/marketing-agency-greater-noida',
    },
}

export default function GreaterNoidaPage() {
    const content = `
    <article>
      <p>Greater Noida is rapidly emerging as an educational and industrial hub. With a massive influx of students and young professionals, the potential for brand growth is astronomical. As the <strong>best marketing agency in Greater Noida</strong>, BRNDFY is at the forefront of this development.</p>
      
      <h2>Tapping into the Student Hub of Greater Noida</h2>
      <p>Knowledge Park is the heart of Greater Noida's educational ecosystem. Our campus branding and youth activation strategies are specifically designed to tap into this concentrated demographic. We help brands become part of the student lifestyle through immersive experiences.</p>

      <h3>Industrial and Tech Marketing</h3>
      <p>Beyond education, Greater Noida is home to some of the largest tech companies and manufacturing units. Our digital marketing solutions help these B2B and B2C entities establish a strong digital presence and reach their target markets effectively.</p>

      <h2>Our Success Metrics in Greater Noida</h2>
      <ul>
        <li><strong>Campus Dominance:</strong> High penetration in major universities and colleges.</li>
        <li><strong>Local SEO:</strong> Helping Greater Noida businesses dominate local search results.</li>
        <li><strong>Event Management:</strong> Successful activations at expo centers and local parks.</li>
      </ul>
    </article>
  `

    const landmarks = [
        'India Expo Mart',
        'Buddh International Circuit',
        'Grand Venice Mall',
        'Knowledge Park',
        'Pari Chowk',
        'City Park',
        'Galgotias University',
        'Sharda University'
    ]

    const faqs = [
        {
            question: 'How do you target students in Greater Noida?',
            answer: 'We have strong networks in Knowledge Park and various universities. Our campus ambassador programs and on-ground activations are designed to create direct engagement with students.'
        }
    ]

    return (
        <LocationPageTemplate
            locationName="Greater Noida"
            title="Best Marketing Agency in Greater Noida | BRNDFY"
            description="Looking for a digital marketing agency in Greater Noida? We specialize in reaching the student population and industrial sectors."
            keywords={['best marketing agency in Greater Noida', 'SEO agency Greater Noida']}
            h1="The Top Marketing Agency in Greater Noida for Modern Brands"
            content={content}
            landmarks={landmarks}
            faqs={faqs}
            mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112196.81977717015!2d77.4243673!3d28.466760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1d051f33f0d%3A0x633e08f5d023a1a9!2sGreater+Noida!5e0!3m2!1sen!2sin!4v1709422000000!5m2!1sen!2sin"
            canonical="/marketing-agency-greater-noida"
        />
    )
}
