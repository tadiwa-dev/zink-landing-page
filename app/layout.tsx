import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zink AI Minutes - Meeting Assistant',
  description: 'The only AI note-taker that handles mixed English & Shona conversations. Available on Windows and Android.',
  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-white text-dark">{children}</body>
    </html>
  )
}
