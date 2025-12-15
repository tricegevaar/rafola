'use client'

import { Heart, Users, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function DonatePage() {
  const [amount, setAmount] = useState('100')
  const [customAmount, setCustomAmount] = useState('')

  const presetAmounts = ['50', '100', '250', '500', '1000']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-purple-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                HealTogether
              </span>
            </Link>
            <Link href="/" className="text-gray-700 hover:text-pink-600 transition font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-medium mb-6">
            <Heart className="w-4 h-4" fill="currentColor" />
            <span>Support Our Mission</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Help Us Heal Together
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your donation helps us provide free mental health support to those who need it most. 
            Every contribution makes a difference.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
            <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
            <div className="text-3xl font-bold text-gray-800 mb-1">10,000+</div>
            <div className="text-gray-600">People Supported</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
            <Heart className="w-12 h-12 mx-auto mb-3 text-pink-600" fill="currentColor" />
            <div className="text-3xl font-bold text-gray-800 mb-1">50,000+</div>
            <div className="text-gray-600">Connections Made</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
            <Shield className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <div className="text-3xl font-bold text-gray-800 mb-1">24/7</div>
            <div className="text-gray-600">Crisis Support</div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Choose Your Donation Amount</h2>
          
          {/* Preset Amounts */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setAmount(preset)
                  setCustomAmount('')
                }}
                className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  amount === preset && !customAmount
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                R{preset}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter custom amount (ZAR)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">R</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setAmount('')
                }}
                placeholder="Enter amount"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-600 focus:ring-2 focus:ring-pink-200 outline-none transition"
              />
            </div>
          </div>

          {/* Donation Impact */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Your Impact</h3>
                <p className="text-sm text-gray-600">
                  {customAmount || amount ? (
                    <>
                      <strong>R{customAmount || amount}</strong> can provide{' '}
                      {parseInt(customAmount || amount) >= 500 ? 'a month of premium support for 2 people' :
                       parseInt(customAmount || amount) >= 250 ? 'crisis support resources for 10 people' :
                       parseInt(customAmount || amount) >= 100 ? 'video sessions for 5 people' :
                       'messaging support for 3 people'}
                    </>
                  ) : (
                    'Select an amount to see your impact'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <button
            disabled={!customAmount && !amount}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Donate R{customAmount || amount || '0'} Now
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Secure payment powered by Stripe • Tax deductible
          </p>
        </div>

        {/* Why Donate */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Your Donation Matters</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Free Access for All</h3>
                <p className="text-gray-600">Help us keep HealTogether free for those who can't afford paid plans</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">24/7 Crisis Support</h3>
                <p className="text-gray-600">Maintain our round-the-clock crisis support infrastructure</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <span className="text-pink-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Community Growth</h3>
                <p className="text-gray-600">Expand our reach to help more people find support and healing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Can't donate right now? You can still help!</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/signup"
              className="px-6 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Join Our Community
            </Link>
            <Link
              href="/volunteer"
              className="px-6 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Volunteer
            </Link>
            <button className="px-6 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition">
              Share Our Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
