'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Users, MessageCircle, Calendar, Award, CheckCircle, ArrowLeft } from 'lucide-react'

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    availability: '',
    experience: '',
    motivation: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send to your backend
    console.log('Volunteer application:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your volunteer application has been received. We'll review it and get back to you within 3-5 business days.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                HealTogether
              </span>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition font-medium">
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>Make a Difference</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Volunteer With Us
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our team of compassionate volunteers and help create a supportive community 
            for those on their healing journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Volunteer Roles */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Volunteer Roles</h3>
              <div className="space-y-4">
                <RoleCard
                  icon={<MessageCircle />}
                  title="Peer Supporter"
                  description="Provide emotional support through messaging"
                />
                <RoleCard
                  icon={<Users />}
                  title="Community Moderator"
                  description="Help maintain safe, supportive spaces"
                />
                <RoleCard
                  icon={<Calendar />}
                  title="Event Coordinator"
                  description="Organize support group sessions"
                />
                <RoleCard
                  icon={<Award />}
                  title="Content Creator"
                  description="Develop mental health resources"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Why Volunteer?</h3>
              <ul className="space-y-2 text-sm text-green-50">
                <li>• Make a real impact in people's lives</li>
                <li>• Flexible time commitment</li>
                <li>• Training and support provided</li>
                <li>• Join a caring community</li>
                <li>• Gain valuable experience</li>
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Volunteer Application</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Preferred Role *</label>
                  <select
                    required
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
                  >
                    <option value="">Select a role</option>
                    <option value="peer-supporter">Peer Supporter</option>
                    <option value="moderator">Community Moderator</option>
                    <option value="coordinator">Event Coordinator</option>
                    <option value="content">Content Creator</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Availability *</label>
                  <select
                    required
                    value={formData.availability}
                    onChange={e => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
                  >
                    <option value="">Select availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="evenings">Evenings</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Relevant Experience (Optional)
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition resize-none"
                    placeholder="Tell us about any relevant experience..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Why do you want to volunteer? *
                  </label>
                  <textarea
                    required
                    value={formData.motivation}
                    onChange={e => setFormData({ ...formData, motivation: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition resize-none"
                    placeholder="Share your motivation for volunteering..."
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> All volunteers undergo a screening process and receive training 
                    before starting. We'll contact you within 3-5 business days.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RoleCard({ icon, title, description }: any) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  )
}
