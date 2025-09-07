import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-royal rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <h1 className="text-3xl font-bold text-white">EchoLive Terms & Conditions</h1>
          </div>
          <p className="text-gray-400">Last updated: December 2024</p>
        </div>

        <Card className="bg-dark-800/80 border-dark-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Terms of Service</CardTitle>
            <p className="text-gray-400">Please read these terms carefully before using EchoLive platform.</p>
          </CardHeader>
          
          <CardContent className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using EchoLive ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Use License</h2>
              <p className="leading-relaxed mb-4">
                Permission is granted to temporarily access EchoLive for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the platform materials</li>
                <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>Attempt to decompile or reverse engineer any software contained on the platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Account Registration</h2>
              <p className="leading-relaxed mb-4">
                To access certain features of EchoLive, you must register for an account. When registering, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password and identification</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Be at least 13 years of age</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Live Streaming Guidelines</h2>
              <p className="leading-relaxed mb-4">
                When using EchoLive's streaming features, you must adhere to our community guidelines:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>No explicit, violent, or inappropriate content</li>
                <li>Respect intellectual property rights</li>
                <li>No harassment, bullying, or hate speech</li>
                <li>Comply with local laws and regulations</li>
                <li>No spam or misleading content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Virtual Currency & Monetization</h2>
              <p className="leading-relaxed mb-4">
                EchoLive uses a virtual currency system (coins and stars):
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Coins can be purchased to send gifts to streamers</li>
                <li>Stars are earned by streamers and can be converted to real currency</li>
                <li>All transactions are final and non-refundable unless required by law</li>
                <li>Virtual currency has no monetary value outside the platform</li>
                <li>We reserve the right to modify the virtual currency system</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Security & Privacy</h2>
              <p className="leading-relaxed mb-4">
                EchoLive implements advanced security measures to protect users:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Anti-tampering protection against console access</li>
                <li>Device fingerprinting for security purposes</li>
                <li>Session management and automatic logout</li>
                <li>Account lockout after failed login attempts</li>
                <li>Encryption of sensitive data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Account Suspension & Termination</h2>
              <p className="leading-relaxed mb-4">
                We may suspend or terminate accounts for violations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Suspension:</strong> Temporary restriction with specified duration and reasons</li>
                <li><strong>Termination:</strong> Permanent account closure with audit logs</li>
                <li>Users will be notified of violations and penalties</li>
                <li>Appeals process available for disputed actions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
              <p className="leading-relaxed">
                In no event shall EchoLive or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
                or due to business interruption) arising out of the use or inability to use EchoLive, even if EchoLive or a EchoLive authorized 
                representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Accuracy of Materials</h2>
              <p className="leading-relaxed">
                The materials appearing on EchoLive could include technical, typographical, or photographic errors. EchoLive does not warrant 
                that any of the materials on its website are accurate, complete, or current. EchoLive may make changes to the materials 
                contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Modifications</h2>
              <p className="leading-relaxed">
                EchoLive may revise these terms of service at any time without notice. By using this platform, you are agreeing to be bound 
                by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Contact Information</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us through the platform's support system or 
                help center available in your profile settings.
              </p>
            </section>

            <div className="border-t border-dark-700 pt-8 text-center">
              <p className="text-gray-400 mb-6">
                By continuing to use EchoLive, you acknowledge that you have read, understood, and agree to these terms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white">
                    Back to Home
                  </Button>
                </Link>
                <Link href="/privacy-policy">
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
                    Privacy Policy
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}