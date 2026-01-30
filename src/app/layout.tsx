import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header' // ADD THIS
import Footer from '@/components/Footer' // ADD THIS

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Etsy Clone - Handmade & Vintage Goods',
  description: 'Discover unique handmade and vintage items from independent sellers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* ADD THIS */}
        <main>{children}</main>
        <Footer /> {/* ADD THIS */}
      </body>
    </html>
  )
}