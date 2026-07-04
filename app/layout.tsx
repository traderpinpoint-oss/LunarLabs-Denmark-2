import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './theme.css'

const heading = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'LunarLabs — Danish Web Engineering, Built for Velocity',
  description:
    'Danish-engineered websites with transparent, honest pricing. Web design, development and e-commerce, built in-house by a Danish engineering team.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#f4f2ec',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${heading.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
