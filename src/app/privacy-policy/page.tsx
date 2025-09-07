import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-royal rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <h1 className="text-3xl font-bold text-white">EchoLive Privacy Policy</h1>
          </div>
          <p className="text-gray-400">Last updated: December 2024</p>
        </div>

        <Card className="bg-dark-800/80 border-dark-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Privacy Policy</CardTitle>
            <p className="text-gray-400">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
          </CardHeader>
          
          <CardContent className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="leading-relaxed mb-4">
                We collect information you provide directly to us and information we obtain automatically when you use EchoLive:
              </p>
              
              <h3 className="text-lg font-medium text-primary mb-3">Personal Information:</h3>
              <div className="list-disc list-inside space-y-2 ml-4 mb-4">
                <div>• Username and display name</div>
                <div>• Email address</div>
                <div>• Phone number</div>
                <div>• Full name and date of birth</div>
                <div>• Profile picture and bio</div>
              </div>

              <h3 className="text-lg font-medium text-primary mb-3">Automatically Collected Information:</h3>
              <div className="list-disc list-inside space-y-2 ml-4">
                <div>• Device information and fingerprint</div>
                <div>• IP address and location data</div>
                <div>• Usage patterns and preferences</div>
                <div>• Log files and analytics data</div>
                <div>• Camera and microphone access (during streaming)</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">
                We use the information we collect for various purposes:
              </p>
              <div className="list-disc list-inside space-y-2 ml-4">
                <div>• Provide and maintain the EchoLive platform</div>
                <div>• Process account registration and authentication</div>
                <div>• Enable live streaming and communication features</div>
                <div>• Process virtual currency transactions</div>
                <div>• Detect and prevent security violations</div>
                <div>• Send notifications and platform updates</div>
                <div>• Improve user experience and platform features</div>
                <div>• Comply with legal obligations</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Information Sharing</h2>
              <p className="leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information. We may share information in these situations:
              </p>
              <div className="list-disc list-inside space-y-2 ml-4">
                <div>• <strong>Public Profile Information:</strong> Username, profile picture, and bio are visible to other users</div>
                <div>• <strong>Live Streaming:</strong> Your content is broadcast to viewers when streaming</div>
                <div>• <strong>Service Providers:</strong> Third-party services that help us operate the platform</div>
                <div>• <strong>Legal Requirements:</strong> When required by law or to protect rights and safety</div>
                <div>• <strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Security Measures</h2>
              <p className="leading-relaxed mb-4">
                EchoLive implements comprehensive security measures to protect your information:
              </p>
              
              <h3 className="text-lg font-medium text-primary mb-3">Technical Security:</h3>
              <div className="list-disc list-inside space-y-2 ml-4 mb-4">
                <div>• Argon2ID password hashing</div>
                <div>• End-to-end encryption for sensitive data</div>
                <div>• HTTPS/TLS encryption for data transmission</div>
                <div>• Regular security audits and penetration testing</div>
              </div>

              <h3 className="text-lg font-medium text-primary mb-3">Platform Security:</h3>
              <div className="list-disc list-inside space-y-2 ml-4">
                <div>• Anti-tampering protection against console access</div>
                <div>• Device fingerprinting and session management</div>
                <div>• Account lockout after failed login attempts</div>
                <div>• Real-time security monitoring and alerts</div>
                <div>• Automatic session timeout and logout</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Data Retention</h2>
              <p className="leading-relaxed mb-4">
                We retain your information for as long as necessary to provide services and comply with legal obligations:
              </p>
              <div className="list-disc list-inside space-y-2 ml-4">
                <div>• <strong>Account Data:</strong> Until account deletion or as required by law</div>
                <div>• <strong>Streaming Content:</strong> Live streams are not recorded by default</div>
                <div>• <strong>Transaction Records:</strong> 7 years for financial and tax purposes</div>
                <div>• <strong>Security Logs:</strong> 90 days for security and fraud prevention</div>
                <div>• <strong>Analytics Data:</strong> Anonymized data may be retained indefinitely</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights and Choices</h2>
              <p className="leading-relaxed mb-4">
                You have certain rights regarding your personal information:
              </p>
              <div className="list-disc list-inside space-y-2 ml-4">
                <div>• <strong>Access:</strong> Request access to your personal information</div>
                <div>• <strong>Update:</strong> Modify your profile and account information</div>
                <div>• <strong>Delete:</strong> Request deletion of your account and data</div>
                <div>• <strong>Portability:</strong> Request a copy of your data in a portable format</div>
                <div>• <strong>Opt-out:</strong> Disable notifications and marketing communications</div>
                <div>• <strong>Restrict:</strong> Limit how we process your information</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
              <p className="leading-relaxed mb-4">
                EchoLive uses cookies and similar technologies to enhance your experience:
              </p>
              
              <h3 className="text-lg font-medium text-primary mb-3">Essential Cookies:</h3>
              <div className="list-disc list-inside space-y-2 ml-4 mb-4">
                <div>• Authentication and session management</div>
                <div>• Security and fraud prevention</div>
                <div>• Platform functionality and preferences</div>
              </div>

              <h3 className="text-lg font-medium text-primary mb-3">Analytics Cookies:</h3>
              <div className="list-disc list-inside space-y-2 ml-4">
                <div>• Usage statistics and performance monitoring</div>
                <div>• Feature usage and user behavior analysis</div>
                <div>• Platform optimization and improvement</div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Children's Privacy</h2>
              <p className="leading-relaxed">
                EchoLive is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. 
                If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information 
                from our files.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. International Users</h2>
              <p className="leading-relaxed">
                EchoLive operates globally and may transfer your information to countries outside your residence. We ensure appropriate safeguards 
                are in place to protect your information in accordance with applicable privacy laws, including GDPR, CCPA, and other regional 
                privacy regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Changes to Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on 
                this page and updating the "Last updated" date. You are advised to review this privacy policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Contact Us</h2>
              <p className="leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-dark-700/30 border border-dark-600 rounded-lg p-4">
                <div>• Through the help center in your profile settings</div>
                <div>• Via the platform's support messaging system</div>
                <div>• Through the feedback and support features in the app</div>
              </div>
            </section>

            <div className="border-t border-dark-700 pt-8 text-center">
              <p className="text-gray-400 mb-6">
                By using EchoLive, you acknowledge that you have read and understood this Privacy Policy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white">
                    Back to Home
                  </Button>
                </Link>
                <Link href="/terms-conditions">
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
                    Terms & Conditions
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