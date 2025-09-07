'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function UserSuspendedContent() {
  const searchParams = useSearchParams()
  const reason = searchParams?.get('reason') || 'Community Guidelines violation'
  const duration = searchParams?.get('duration') || '24'
  const [timeRemaining, setTimeRemaining] = useState(parseInt(duration) * 3600) // Convert hours to seconds
  
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev > 0 ? prev - 1 : 0)
      }, 1000)
      
      return () => clearInterval(timer)
    }
    return undefined
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`
    } else {
      return `${remainingSeconds}s`
    }
  }

  // Mock recent violations
  const recentViolations = [
    {
      date: '2024-12-15',
      type: 'Inappropriate Content',
      action: 'Content Removed',
      severity: 'medium'
    },
    {
      date: '2024-12-14',
      type: 'Spam Activity',
      action: 'Warning Issued',
      severity: 'low'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-dark-800/80 border-yellow-500/30 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">⏰</span>
              </div>
            </div>
            
            <CardTitle className="text-3xl font-bold text-yellow-400 mb-2">Account Suspended</CardTitle>
            <p className="text-gray-400">Your EchoLive account is temporarily suspended</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Countdown Timer */}
            {timeRemaining > 0 ? (
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6 mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Time Remaining</h3>
                  <div className="text-4xl font-bold text-yellow-400 font-mono">
                    {formatTime(timeRemaining)}
                  </div>
                  <p className="text-gray-400 mt-2">Until account restoration</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-gradient-to-r from-success/20 to-green-500/20 rounded-xl p-6 mb-4">
                  <h3 className="text-lg font-semibold text-success mb-2">Suspension Expired</h3>
                  <p className="text-gray-300">Your account access has been restored. You may now log in again.</p>
                  <Link href="/login" className="mt-4 inline-block">
                    <Button className="bg-gradient-to-r from-success to-green-500 hover:from-success/90 hover:to-green-500/90 text-white">
                      Return to Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Suspension Details */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Suspension Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Reason:</span>
                  <span className="text-white">{reason}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Started:</span>
                  <span className="text-white">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                    Temporarily Suspended
                  </Badge>
                </div>
              </div>
            </div>

            {/* What You Can't Do */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Restricted Activities</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">🚫</span>
                  <span className="text-gray-300">Cannot log into your account</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">🚫</span>
                  <span className="text-gray-300">Cannot create or join live streams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">🚫</span>
                  <span className="text-gray-300">Cannot send messages or interact with content</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">🚫</span>
                  <span className="text-gray-300">Cannot access wallet or make transactions</span>
                </div>
              </div>
            </div>

            {/* Recent Violations */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Recent Account Activity</h3>
              <div className="space-y-3">
                {recentViolations.map((violation, index) => (
                  <div key={index} className="bg-dark-700/30 border border-dark-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{violation.type}</span>
                      <Badge variant="outline" className={getSeverityColor(violation.severity)}>
                        {violation.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{violation.action}</span>
                      <span className="text-xs text-gray-500">{violation.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines Reminder */}
            <div className="bg-dark-700/30 border border-dark-600 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Community Guidelines Reminder</h3>
              <p className="text-gray-300 mb-3">
                To avoid future suspensions, please review and follow our community guidelines:
              </p>
              <div className="text-sm text-gray-400 space-y-1">
                <div>• Respect all users and maintain a positive environment</div>
                <div>• No harassment, bullying, or hate speech</div>
                <div>• Keep content appropriate for all audiences</div>
                <div>• No spam, misleading content, or excessive self-promotion</div>
                <div>• Respect intellectual property and copyright laws</div>
              </div>
            </div>

            {/* Actions */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/terms-conditions">
                  <Button 
                    variant="outline"
                    className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                  >
                    Review Guidelines
                  </Button>
                </Link>
                <Link href="/">
                  <Button 
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-600/10 hover:border-gray-500"
                  >
                    Return Home
                  </Button>
                </Link>
              </div>
              
              <p className="text-xs text-gray-500">
                Suspension ID: SUSP-{Date.now().toString().slice(-8)} | 
                Appeal available after suspension expires
              </p>
            </div>

            {/* Important Notice */}
            <div className="border-t border-dark-700 pt-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-blue-400">
                  <span>ℹ️</span>
                  <span>
                    Repeated violations may result in longer suspensions or permanent account termination. 
                    Please review our community guidelines to prevent future issues.
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

export default function UserSuspendedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <UserSuspendedContent />
    </Suspense>
  )
}