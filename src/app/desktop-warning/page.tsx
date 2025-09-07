export default function DesktopWarningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
            <span className="text-6xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Desktop Access Restricted</h1>
          <p className="text-lg text-gray-300 mb-6">
            This page is designed for mobile devices only. Please access EchoLive using your smartphone or tablet for the full experience.
          </p>
          
          <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-primary mb-3">Why Mobile Only?</h2>
            <ul className="text-gray-300 text-left space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-success">📱</span>
                <span>Optimized for touch interaction</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-success">🎥</span>
                <span>Camera and microphone access</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-success">🔔</span>
                <span>Push notifications support</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-success">🛡️</span>
                <span>Enhanced security features</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4">Access EchoLive on your mobile device by visiting:</p>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <code className="text-primary font-mono text-lg">
                {typeof window !== 'undefined' ? window.location.origin : 'echolive.app'}
              </code>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 pt-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-royal rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">E</span>
            </div>
            <span className="text-lg font-bold text-white">EchoLive</span>
          </div>
          <p className="text-gray-400 text-sm">
            The mobile-first live streaming platform
          </p>
        </div>
      </div>
    </div>
  )
}