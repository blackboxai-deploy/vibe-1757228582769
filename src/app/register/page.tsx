'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  firstName: string
  middleName: string
  lastName: string
  birthDay: string
  gender: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthDay: '',
    gender: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const validateStep1 = (): boolean => {
    const newErrors: Partial<FormData> = {}

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores'
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: Partial<FormData> = {}

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }

    // Name validations
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required'
    }

    // Birthday validation
    if (!formData.birthDay) {
      newErrors.birthDay = 'Birthday is required'
    } else {
      const birthDate = new Date(formData.birthDay)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 13) {
        newErrors.birthDay = 'You must be at least 13 years old'
      }
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep2()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          deviceFingerprint: generateDeviceFingerprint()
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Registration successful
        router.push('/login?registered=true')
      } else {
        // Registration failed
        if (data.errors) {
          setErrors(data.errors)
        } else {
          setErrors({ username: data.message || 'Registration failed' })
        }
        
        // Go back to step 1 if there are account-related errors
        if (data.errors?.username || data.errors?.email) {
          setStep(1)
        }
      }
    } catch (err) {
      setErrors({ username: 'Network error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const generateDeviceFingerprint = (): string => {
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
      <div className="w-full max-w-md">
        <Card className="bg-dark-800/80 border-dark-700 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-royal rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">E</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Join EchoLive</CardTitle>
            <p className="text-gray-400">Create your account and start streaming</p>
            
            {/* Step indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-dark-600 text-gray-400'}`}>
                  1
                </div>
                <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-dark-600'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-dark-600 text-gray-400'}`}>
                  2
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Account Information</h3>
                  <p className="text-sm text-gray-400">Set up your login credentials</p>
                </div>

                <div>
                  <Label htmlFor="username" className="text-gray-300">Username *</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`bg-dark-700/50 border-dark-600 text-white focus:border-primary ${errors.username ? 'border-red-500' : ''}`}
                    placeholder="Choose a unique username"
                    required
                  />
                  {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`bg-dark-700/50 border-dark-600 text-white focus:border-primary ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="your@email.com"
                    required
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-300">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`bg-dark-700/50 border-dark-600 text-white focus:border-primary pr-12 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder="Create a strong password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`bg-dark-700/50 border-dark-600 text-white focus:border-primary pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Confirm your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-primary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white shadow-lg"
                >
                  Continue to Personal Info
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                  <p className="text-sm text-gray-400">Tell us about yourself</p>
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`bg-dark-700/50 border-dark-600 text-white focus:border-primary ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    placeholder="+1234567890"
                    required
                  />
                  {errors.phoneNumber && <p className="text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`bg-dark-700/50 border-dark-600 text-white focus:border-primary ${errors.firstName ? 'border-red-500' : ''}`}
                      placeholder="First name"
                      required
                    />
                    {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`bg-dark-700/50 border-dark-600 text-white focus:border-primary ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Last name"
                      required
                    />
                    {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="middleName" className="text-gray-300">Middle Name</Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className="bg-dark-700/50 border-dark-600 text-white focus:border-primary"
                    placeholder="Middle name (optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="birthDay" className="text-gray-300">Date of Birth *</Label>
                  <Input
                    id="birthDay"
                    name="birthDay"
                    type="date"
                    value={formData.birthDay}
                    onChange={handleInputChange}
                    className={`bg-dark-700/50 border-dark-600 text-white focus:border-primary ${errors.birthDay ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.birthDay && <p className="text-red-400 text-sm mt-1">{errors.birthDay}</p>}
                </div>

                <div>
                  <Label className="text-gray-300">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                    <SelectTrigger className={`bg-dark-700/50 border-dark-600 text-white focus:border-primary ${errors.gender ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-700 border-dark-600">
                      <SelectItem value="male" className="text-white hover:bg-dark-600">Male</SelectItem>
                      <SelectItem value="female" className="text-white hover:bg-dark-600">Female</SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-dark-600">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-dark-600 text-gray-400 hover:border-primary hover:text-primary"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-royal hover:from-primary/90 hover:to-royal/90 text-white shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </form>
            )}

            {step === 1 && (
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-dark-700/30 border border-dark-600 rounded-lg">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>🛡️</span>
                <span>Your data is protected with end-to-end encryption</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}