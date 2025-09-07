'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function UserTerminatedContent() {
  const searchParams = useSearchParams()
  const reason = searchParams?.get('reason') || 'Terms of Service violation'
  
  // Mock audit logs - in real implementation, these would come from the server
  const auditLogs = [
    {
      timestamp: '2024-12-15 14:32:45',
      action: 'Security Violation Detected',
      details: 'Console tampering attempt',
      severity: 'high'
    },
    {
      timestamp: '2024-12-15 14:30:12',
      action: 'Warning Issued',
      details: 'First security violation warning',
      severity: 'medium'
    },
    {
      timestamp: '2024-12-15 14:28:33',
      action: 'Login Attempt',
      details: 'Successful login from mobile device',
      severity: 'low'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-dark-800/80 border-red-500/30 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🚫</span>
              </div>
            </div>
            
            <CardTitle className="text-3xl font-bold text-red-400 mb-2">Account Terminated</CardTitle>
            <p className="text-gray-400">Your EchoLive account has been permanently terminated</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Reason */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Termination Reason</h3>
              <p className="text-gray-300">{reason}</p>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">What This Means</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span className="text-gray-300">Your account access has been permanently revoked</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span className="text-gray-300">You cannot create new accounts using the same device or information</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span className="text-gray-300">Any virtual currency balance has been forfeited</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-400">❌</span>
                  <span className="text-gray-300">All streaming content and data has been removed</span>
                </div>
              </div>
            </div>

            {/* Audit Logs */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Account Activity Log</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {auditLogs.map((log, index) => (
                  <div key={index} className="bg-dark-700/30 border border-dark-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{log.action}</span>
                      <Badge variant="outline" className={getSeverityColor(log.severity)}>
                        {log.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{log.details}</p>
                    <p className="text-xs text-gray-500">{log.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-dark-700/30 border border-dark-600 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
              <p className="text-gray-300 mb-3">
                If you believe this termination was made in error, you may contact our support team. 
                Please note that account terminations are typically final and appeals are rarely successful.
              </p>
              <p className="text-sm text-gray-400">
                Support responses may take 3-5 business days. Please provide your username and termination details.
              </p>
            </div>

            {/* Actions */}
            <div className="text-center space-y-4">
              <Link href="/">
                <Button 
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                >
                  Return to Homepage
                </Button>
              </Link>
              
              <p className="text-xs text-gray-500">
                Termination ID: TERM-{Date.now().toString().slice(-8)} | 
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Security Notice */}
            <div className="border-t border-dark-700 pt-4">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-yellow-400">
                  <span>⚠️</span>
                  <span>
                    This action was taken to maintain platform security and community safety. 
                    All decisions are logged and monitored for compliance.
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function UserTerminatedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <UserTerminatedContent />
    </Suspense>
  )
}