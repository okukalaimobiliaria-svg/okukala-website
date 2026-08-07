import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Montserrat, Poppins, Roboto } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { MotionProvider } from '@/components/MotionProvider'
import { TopBar } from '@/components/TopBar'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-montserrat',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Real Estate Platform - Buy, Sell & Rent Properties',
  description: 'Find your dream property or list yours on our comprehensive real estate marketplace. Browse thousands of properties and connect with trusted agents.',
  generator: 'v0.app',
    icons: {
      icon: '/icone.png',
      apple: '/apple-icon.png',
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={`${montserrat.variable} ${poppins.variable} ${roboto.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-white flex min-h-screen flex-col">
        <TopBar />
        <Header />
        <MotionProvider>
          <main className="flex-1">{children}</main>
        </MotionProvider>
        <Footer />
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
