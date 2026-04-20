import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { ReactNode } from 'react'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: {
        default: 'FiveGateway Docs',
        template: '%s – FiveGateway',
    },
    description:
        'FiveGateway documentation — the FiveM server management platform',
    icons: {
        icon: '/logo.svg',
    },
}

const logo = (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 120"
            width="24"
            height="24"
            fill="currentColor"
        >
            <g>
                <rect x="14" y="35" width="12" height="10" rx="3" />
                <rect x="34" y="24" width="12" height="21" rx="3" />
                <rect x="54" y="17" width="12" height="28" rx="3" />
                <rect x="74" y="24" width="12" height="21" rx="3" />
                <rect x="94" y="35" width="12" height="10" rx="3" />
                <rect x="14" y="49" width="12" height="56" rx="3" />
                <rect x="34" y="49" width="12" height="41" rx="3" />
                <rect x="54" y="49" width="12" height="15" rx="3" />
                <rect x="74" y="49" width="12" height="41" rx="3" />
                <rect x="94" y="49" width="12" height="56" rx="3" />
            </g>
        </svg>
        <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>FiveGateway</span>
    </span>
)

const navbar = (
    <Navbar
        logo={logo}
        projectLink="https://discord.gg/BMZszMXPg"
    />
)

const footer = (
    <Footer>
        <span>© {new Date().getFullYear()} FiveGateway</span>
    </Footer>
)

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning className={inter.variable}>
            <Head>
                <meta name="theme-color" content="#6c63ff" />
                <link rel="icon" href="/logo.svg" type="image/svg+xml" />
            </Head>
            <body style={{ fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif' }}>
                <Layout
                    navbar={navbar}
                    pageMap={await getPageMap()}
                    footer={footer}
                    sidebar={{
                        defaultMenuCollapseLevel: 1,
                    }}
                    darkMode
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}
