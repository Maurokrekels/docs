import nextra from 'nextra'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const withNextra = nextra({
    search: true,
})

export default withNextra({
    output: 'export',
    images: {
        unoptimized: true,
    },
    basePath,
    assetPrefix: basePath || undefined,
})
