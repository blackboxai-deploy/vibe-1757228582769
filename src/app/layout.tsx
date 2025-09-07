import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EchoLive - Live Streaming Platform',
  description: 'Experience the future of live streaming with EchoLive - Connect, Stream, and Engage with your audience in real-time',
  keywords: 'live streaming, video streaming, social media, real-time communication, webrtc',
  authors: [{ name: 'EchoLive Team' }],
  robots: 'noindex, nofollow', // Prevent indexing during development
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        <div id="security-overlay" className="hidden fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-red-500 mb-4">Security Alert</h1>
            <p className="text-gray-300">Unauthorized access detected. This session has been terminated.</p>
          </div>
        </div>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}