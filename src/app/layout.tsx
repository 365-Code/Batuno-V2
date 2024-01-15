import type { Metadata } from 'next'
import { Inter, Karla, Poppins, Raleway } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ['latin'], weight: ["400"] })
const raleway = Raleway({ subsets: ['latin'], weight: ["500"] })
const karla = Karla({ subsets: ['latin'], weight: ["500"] })

export const metadata: Metadata = {
  title: 'Batuno',
  description: 'Batuno, the chat app, revolutionizes the way we interact and connect with others.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={karla.className}>{children}</body>
    </html>
  )
}
