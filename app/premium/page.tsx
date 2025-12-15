'use client'

import { Crown, Check, Video, Users, MessageCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'

export default function PremiumPage() {
  const user = useAuthStore(state => state.user)

  const premiumFeatures = [
    { icon: <Video className="w-5 h-5" />, text: 'Unlimited video sessions' },
    { icon: <Users className="w-5 h-5" />, text: 'Priority buddy matching' },
    { icon: <MessageCircle className="w-5 h-5" />, text: 'Advanced messaging features' },
    { icon: <Star className="w-5 h-5" />, text: 'Exclusive premium communities' },
    { icon: <Crown className="w-5 h-5" />, text: 'Ad-free experience' },
    { icon: <Check className="w-5 h-5" />, text: 'Early access to new features' },
  ]

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Upgrade to Premium</h1>
            <p className="text-xl text-gray-600">
              Unlock exclusive features and enhance your healing journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-3xl font-bold mb-6">$0<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Join support communities</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Find buddies</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Basic messaging</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Access resources</span>
                </li>
              </ul>
              {!user?.isPremium && (
                <div className="text-center text-gray-600 font-semibold">Current Plan</div>
              )}
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-xl shadow-lg relative">
              <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-3xl font-bold mb-6">$9.99<span className="text-lg opacity-80">/month</span></div>
              <ul className="space-y-3 mb-6">
                {premiumFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {feature.icon}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                {user?.isPremium ? 'Current Plan' : 'Upgrade Now'}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Why Go Premium?</h3>
            <p className="text-gray-700">
              Premium membership helps us maintain and improve HealTogether while providing you with 
              enhanced features to support your healing journey. Your subscription directly supports 
              our mission to create a safe, supportive community for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
