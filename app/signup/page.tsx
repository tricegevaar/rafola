'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'
import { useSocketStore } from '@/store/useSocketStore'
import { healingCategories } from '@/lib/utils'
import { Heart, Mail, Lock, User, ArrowRight, Check } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAuthStore(state => state.login)
  const connectSocket = useSocketStore(state => state.connect)
  
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get('plan') || 'free')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    healingTags: [] as string[],
    isAnonymous: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.register(formData)
      api.setToken(response.token)
      login(response.user)
      connectSocket(response.token)
      
      if (selectedPlan !== 'free') {
        router.push(`/checkout?plan=${selectedPlan}`)
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      healingTags: prev.healingTags.includes(tag)
        ? prev.healingTags.filter(t => t !== tag)
        : [...prev.healingTags, tag],
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 group">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 p-2">
            <img
              src="/rafola-logo.svg"
              alt="Rafola Logo"
              className="w-full h-full filter brightness-0 invert"
            />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Rafola
          </span>
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                step >= s ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 mx-2 ${step > s ? 'bg-gradient-to-r from-teal-600 to-emerald-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Details */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                  <p className="text-gray-600">Start your healing journey today</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2: Healing Journey */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Healing Journey</h2>
                  <p className="text-gray-600">Select topics that resonate with you</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {healingCategories.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-3 text-sm rounded-xl border-2 transition-all ${
                        formData.healingTags.includes(tag)
                          ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-lg scale-105'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-teal-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl border border-teal-200">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={formData.isAnonymous}
                    onChange={e => setFormData({ ...formData, isAnonymous: e.target.checked })}
                    className="w-5 h-5 rounded accent-teal-600"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">
                    <span className="font-semibold">Join anonymously</span> - Your identity will be protected
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Choose Plan */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Plan</h2>
                  <p className="text-gray-600">You can upgrade anytime</p>
                </div>

                <div className="space-y-4">
                  <PlanOption
                    name="Free"
                    price="R0"
                    features={["Join 2 communities", "Connect with 3 buddies", "Basic messaging"]}
                    selected={selectedPlan === 'free'}
                    onSelect={() => setSelectedPlan('free')}
                  />
                  <PlanOption
                    name="Supporter"
                    price="R300/mo"
                    features={["Unlimited communities", "Unlimited buddies", "Video sessions", "Priority support"]}
                    selected={selectedPlan === 'supporter'}
                    onSelect={() => setSelectedPlan('supporter')}
                    popular
                  />
                  <PlanOption
                    name="Premium"
                    price="R450/mo"
                    features={["Everything in Supporter", "1-on-1 video", "Personal journal", "24/7 priority support"]}
                    selected={selectedPlan === 'premium'}
                    onSelect={() => setSelectedPlan('premium')}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-teal-600 hover:text-teal-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-gray-500">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

function PlanOption({ name, price, features, selected, onSelect, popular }: any) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
        selected
          ? 'border-teal-600 bg-teal-50 shadow-lg scale-105'
          : 'border-gray-200 bg-white hover:border-teal-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            {popular && (
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold text-gray-900">
                Popular
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-teal-600 mt-1">{price}</p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          selected ? 'border-teal-600 bg-teal-600' : 'border-gray-300'
        }`}>
          {selected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
      <ul className="space-y-2">
        {features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </button>
  )
}
