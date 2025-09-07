'use client'

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          {/* Maintenance Icon */}
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-gold/20 to-yellow-500/20 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-6xl">🔧</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Under Maintenance</h1>
          <p className="text-lg text-gray-300 mb-6">
            EchoLive is currently undergoing scheduled maintenance to improve your streaming experience. 
            We'll be back shortly with enhanced features and performance improvements!
          </p>

          {/* Estimated Time */}
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gold mb-2">Estimated Downtime</h3>
            <p className="text-white text-xl font-mono">2-4 hours</p>
            <p className="text-gray-400 text-sm mt-1">Started at 2:00 AM UTC</p>
          </div>

          {/* What's Being Improved */}
          <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-xl font-semibold text-white mb-4">What we're working on:</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <span className="text-success">✅</span>
                <span>Enhanced security features</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-royal">🔄</span>
                <span>Improved streaming quality and stability</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-primary">⚡</span>
                <span>Faster app loading and responsiveness</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gold">🎯</span>
                <span>New monetization features</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-success">🛡️</span>
                <span>Advanced anti-tampering protection</span>
              </div>
            </div>
          </div>

          {/* Alternative Actions */}
          <div className="bg-dark-700/30 border border-dark-600 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">While you wait:</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <div>📱 Follow us on social media for live updates</div>
              <div>📧 Check your email for maintenance notifications</div>
              <div>⏰ Set a reminder to check back in a few hours</div>
              <div>📖 Review our updated terms and privacy policy</div>
            </div>
          </div>

          {/* Status Updates */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Live Status</h3>
            <div className="flex items-center justify-center space-x-2 text-blue-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
              <span>Systems are being updated...</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Last updated: {new Date().toLocaleTimeString()}</p>
          </div>

          {/* Refresh Button */}
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mb-6"
          >
            Check Again
          </button>

          {/* Emergency Contact */}
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              Experiencing an emergency or urgent issue?
            </p>
            <p className="text-xs text-gray-500">
              Critical support is available during maintenance for security issues only
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
            Thank you for your patience while we make EchoLive even better!
          </p>
        </div>
      </div>
    </div>
  )
}