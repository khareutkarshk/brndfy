import { MetadataRoute } from 'next'
import { CASE_STUDIES } from '@/app/data/caseStudies'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://brndfy.com'

    // Define main pages
    const routes = [
        '',
        '/about',
        '/contact',
        '/case-studies',
        '/influencer-marketing-agency',
        '/marketing-agency-noida',
        '/marketing-agency-delhi',
        '/marketing-agency-ncr',
        '/marketing-agency-greater-noida',
        '/marketing-agency-india',
        ...CASE_STUDIES.map((s) => `/case-studies/${s.slug}`),
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return [...routes]
}
