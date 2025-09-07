'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [captcha, setCaptcha] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0)

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptcha(result)
    setCaptchaInput('')
  }

  // Check if device is mobile
  const isMobile = (): boolean => {
    if (typeof window === 'undefined') return true
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())
  }

  // Redirect to desktop warning if accessed from desktop
  useEffect(() => {
    if (!isMobile()) {
      router.push('/desktop-warning')
      return
    }
    
    generateCaptcha()
    
    // Check for account lockout
    const lockoutEnd = localStorage.getItem('lockoutEnd')
    if (lockoutEnd) {
      const timeRemaining = parseInt(lockoutEnd) - Date.now()
      if (timeRemaining > 0) {
        setIsLocked(true)
        setLockTimeRemaining(Math.ceil(timeRemaining / 1000))
        
        const countdown = setInterval(() => {
          const remaining = parseInt(lockoutEnd) - Date.now()
          if (remaining <= 0) {
            setIsLocked(false)
            setLockTimeRemaining(0)
            setLoginAttempts(0)
            localStorage.removeItem('lockoutEnd')
            localStorage.removeItem('loginAttempts')
            clearInterval(countdown)
          } else {
            setLockTimeRemaining(Math.ceil(remaining / 1000))
          }
        }, 1000)
        
        return () => clearInterval(countdown)
      }
    }

    // Get stored login attempts
    const attempts = localStorage.getItem('loginAttempts')
    if (attempts) {
      setLoginAttempts(parseInt(attempts))
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLocked) {
      setError(`Account locked. Try again in ${lockTimeRemaining} seconds.`)
      return
    }

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (captchaInput.toLowerCase() !== captcha.toLowerCase()) {
      setError('Invalid CAPTCHA. Please try again.')
      generateCaptcha()
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          deviceFingerprint: generateDeviceFingerprint()
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Login successful - clear attempts
        localStorage.removeItem('loginAttempts')
        localStorage.removeItem('lockoutEnd')
        
        // Store auth tokens
        document.cookie = `auth-token=${data.token}; path=/; secure; samesite=strict`
        document.cookie = `session-id=${data.sessionId}; path=/; secure; samesite=strict`
        
        // Redirect to home
        router.push('/home')
      } else {
        // Login failed
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)
        localStorage.setItem('loginAttempts', newAttempts.toString())
        
        if (newAttempts >= 5) {
          // Lock account for 15 minutes
          const lockoutEnd = Date.now() + (15 * 60 * 1000)
          localStorage.setItem('lockoutEnd', lockoutEnd.toString())
          setIsLocked(true)
          setLockTimeRemaining(15 * 60)
          setError('Too many failed attempts. Account locked for 15 minutes.')
        } else {
          setError(data.message || 'Invalid credentials')
          generateCaptcha()
        }
      }
    } catch (err) {
      setError('Network error. Please try again.')
      generateCaptcha()
    } finally {
      setIsLoading(false)
    }
  }

  const generateDeviceFingerprint = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.textBaseline = 'top'
      ctx.font = '14px Arial'
      ctx.fillText('Device fingerprint', 2, 2)
    }
    
    return btoa(
      navigator.userAgent +
      navigator.language +
      screen.width + 'x' + screen.height +
      new Date().getTimezoneOffset() +
      (canvas.toDataURL() || '')
    ).substring(0, 32)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      {/* Security overlay for desktop users */}
      <div className="w-full max-w-md">
        <Card className="bg-dark-800/80 border-dark-700 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-royal rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">E</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <p className="text-gray-400">Sign in to your EchoLive account</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {isLocked && (
                <Alert className="border-yellow-500/50 bg-yellow-500/10">
                  <AlertDescription className="text-yellow-400">
                    ⚠️ Account locked for security. Time remaining: {Math.floor(lockTimeRemaining / 60)}:{(lockTimeRemaining % 60).toString().padStart(2, '0')}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="username" className="text-gray-300">Username or Email</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-dark-700/50 border-dark-600 text-white focus:border-primary"
                  placeholder="Enter your username or email"
                  disabled={isLocked}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-dark-700/50 border-dark-600 text-white focus:border-primary pr-12"
                    placeholder="Enter your password"
                    disabled={isLocked}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLocked}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Button>
                </div>
              </div>

              {/* CAPTCHA */}
              <div>
                <Label className="text-gray-300">Security Code</Label>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-dark-600 border border-dark-500 rounded px-4 py-2 font-mono text-lg text-white select-none">
                    {captcha}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateCaptcha}
                    className="border-dark-600 text-gray-400 hover:border-primary hover:text-primary"
                    disabled={isLocked}
                  >
                    🔄
                  </Button>
                </div>
                <Input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="bg-dark-700/50 border-dark-600 text-white focus:border-primary"
                  placeholder="Enter the code above"
                  disabled={isLocked}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">
                  Attempts: {loginAttempts}/5
                </div>
                <Link 
                  href="/forgot-password" 
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white shadow-lg"
                disabled={isLoading || isLocked}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Create Account
                </Link>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-dark-700/30 border border-dark-600 rounded-lg">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>🛡️</span>
                <span>Your session is protected by advanced security measures</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}