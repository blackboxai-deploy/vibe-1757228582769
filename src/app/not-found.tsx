import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          {/* Large 404 */}
          <div className="relative mb-6">
            <h1 className="text-8xl font-bold text-transparent bg-gradient-to-r from-primary via-royal to-gold bg-clip-text">
              404
            </h1>
            <div className="absolute inset-0 text-8xl font-bold text-primary/10 blur-sm">
              404
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-300 mb-6">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best streamers sometimes lose their connection!
          </p>
          
          {/* Animated Icon */}
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-primary/20 to-royal/20 rounded-full flex items-center justify-center animate-pulse-glow">
            <span className="text-4xl">📡</span>
          </div>

          {/* Suggestions */}
          <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-xl font-semibold text-white mb-4">What you can do:</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <span className="text-primary">🏠</span>
                <span>Go back to the homepage and start fresh</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-royal">🔍</span>
                <span>Use the search feature to find what you're looking for</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gold">📱</span>
                <span>Check if you're accessing from a mobile device</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-success">🎮</span>
                <span>Explore live streams and discover new content</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/">
              <Button 
                className="bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Back to Home
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
              >
                Go to Login
              </Button>
            </Link>
          </div>

          {/* Fun Error Message */}
          <div className="bg-gradient-to-r from-primary/10 via-royal/10 to-gold/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-gray-400">
              <span className="text-primary">Error Code:</span> STREAM_NOT_FOUND | 
              <span className="text-royal"> Status:</span> Connection Lost | 
              <span className="text-gold"> Suggestion:</span> Try refreshing your experience
            </p>
          </div>
        </div>

        {/* EchoLive Branding */}
        <div className="border-t border-dark-700 pt-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-royal rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">E</span>
            </div>
            <span className="text-lg font-bold text-white">EchoLive</span>
          </div>
          <p className="text-gray-400 text-sm">
            Even when you're lost, we're here to help you find your way back to the stream.
          </p>
        </div>
      </div>
    </div>
  )
}