'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LandingPage() {
  const [announcement, setAnnouncement] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate dynamic announcement loading
    const announcements = [
      "🎉 Welcome to EchoLive! Start your streaming journey today",
      "🔥 New multi-video streaming feature now available!",
      "⭐ Earn stars and convert to real rewards",
      "🎮 Join thousands of streamers worldwide",
      "💎 Premium streaming with crystal clear quality"
    ]
    
    const randomAnnouncement = announcements[Math.floor(Math.random() * announcements.length)]
    setAnnouncement(randomAnnouncement)
    setIsLoading(false)
  }, [])

  const features = [
    {
      title: "Live Video Streaming",
      description: "Stream in HD quality with real-time interaction",
      icon: "📹",
      color: "from-primary/20 to-primary/5"
    },
    {
      title: "Multi-Seat Rooms",
      description: "Host up to 5 video or 9 audio participants",
      icon: "👥",
      color: "from-royal/20 to-royal/5"
    },
    {
      title: "Virtual Gifts",
      description: "Earn stars through gifts from your audience",
      icon: "🎁",
      color: "from-gold/20 to-gold/5"
    },
    {
      title: "Agency System",
      description: "Join agencies and grow your streaming career",
      icon: "🏢",
      color: "from-success/20 to-success/5"
    },
    {
      title: "Secure Platform",
      description: "Advanced security with anti-tampering protection",
      icon: "🛡️",
      color: "from-primary/20 to-royal/5"
    },
    {
      title: "Mobile First",
      description: "Optimized experience for mobile streaming",
      icon: "📱",
      color: "from-royal/20 to-success/5"
    }
  ]

  const stats = [
    { label: "Active Streamers", value: "50K+", icon: "🎙️" },
    { label: "Live Rooms", value: "10K+", icon: "📺" },
    { label: "Daily Viewers", value: "500K+", icon: "👁️" },
    { label: "Countries", value: "100+", icon: "🌍" }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-royal rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">EchoLive</h1>
                <p className="text-sm text-gray-400">Stream. Connect. Engage.</p>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button 
                  className="bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Announcement Banner */}
      {announcement && (
        <div className="bg-gradient-to-r from-primary/20 via-royal/20 to-gold/20 border-y border-primary/30">
          <div className="container mx-auto px-4 py-3">
            <div className="text-center">
              <Badge variant="outline" className="border-primary/50 text-primary mb-2">
                Latest Update
              </Badge>
              <p className="text-white font-medium animate-fade-in">{announcement}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-royal/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Future of
              <span className="bg-gradient-to-r from-primary via-royal to-gold bg-clip-text text-transparent"> Live Streaming</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of creators and viewers in the ultimate live streaming experience. 
              Stream in HD, earn real rewards, and build your community.
            </p>
            
            {/* Hero Image */}
            <div className="relative mb-12">
              <div className="bg-gradient-to-r from-primary/20 to-royal/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b673e62b-deb6-4761-9e1f-8f809668bb6b.png" 
                  alt="EchoLive streaming platform interface showing multiple video calls and chat features"
                  className="w-full h-auto rounded-xl shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg"
                >
                  Start Streaming Free
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary px-8 py-4 text-lg"
              >
                Watch Live Streams
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-dark-800/50 to-dark-700/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Powerful Features for
              <span className="text-primary"> Modern Streamers</span>
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to create engaging content and build a thriving community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-dark-800/50 border-dark-700 hover:border-primary/30 transition-all duration-200 group">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-royal/10 to-gold/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Streaming Journey?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who are already earning from their content. 
              It's free to start and takes less than 2 minutes to set up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg animate-pulse-glow"
                >
                  Create Account Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-royal rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-white">E</span>
                </div>
                <span className="text-xl font-bold text-white">EchoLive</span>
              </div>
              <p className="text-gray-400">The ultimate live streaming platform for creators and viewers worldwide.</p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <Link href="/login" className="block text-gray-400 hover:text-primary transition-colors">Login</Link>
                <Link href="/register" className="block text-gray-400 hover:text-primary transition-colors">Register</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/terms-conditions" className="block text-gray-400 hover:text-primary transition-colors">Terms & Conditions</Link>
                <Link href="/privacy-policy" className="block text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Security</h4>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-success">🛡️</span>
                <span>Protected by advanced security</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-dark-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EchoLive. All rights reserved. Secure streaming platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}