import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://brndfy.com'

    // Define main pages
    const routes = [
        '',
        '/about',
        '/contact',
        '/case-studies',
        '/marketing-agency-delhi',
        '/marketing-agency-ncr',
        '/marketing-agency-greater-noida',
        '/marketing-agency-india',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return [...routes]
}
