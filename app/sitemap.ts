import { readdirSync, statSync } from 'fs'
import type { MetadataRoute } from 'next'
import { join, relative } from 'path'

export const dynamic = 'force-static'

const SITE_URL = 'https://docs.fivegateway.com'
const CONTENT_DIR = join(process.cwd(), 'content')

function collectRoutes(dir: string): string[] {
    const routes: string[] = []

    for (const entry of readdirSync(dir)) {
        const fullPath = join(dir, entry)
        const stats = statSync(fullPath)

        if (stats.isDirectory()) {
            routes.push(...collectRoutes(fullPath))
            continue
        }

        if (!entry.endsWith('.mdx') && !entry.endsWith('.md')) continue
        if (entry === '404.mdx') continue

        const relativePath = relative(CONTENT_DIR, fullPath)
        const withoutExt = relativePath.replace(/\.mdx?$/, '')
        const route = withoutExt === 'index' ? '' : withoutExt.replace(/\/index$/, '')

        routes.push(route)
    }

    return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = collectRoutes(CONTENT_DIR)
    const lastModified = new Date()

    return routes.map((route) => ({
        url: route ? `${SITE_URL}/${route}` : SITE_URL,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }))
}
