'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'
import { healingCategories } from '@/lib/utils'
import { Crown, Mail, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const user = useAuthStore(state => state.user)
  const updateProfile = useAuthStore(state => state.updateProfile)
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    healingTags: [] as string[],
    isAnonymous: false,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        bio: user.bio || '',
        location: user.location || '',
        healingTags: user.healingTags,
        isAnonymous: user.isAnonymous,
      })
    }
  }, [user])

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      healingTags: prev.healingTags.includes(tag)
        ? prev.healingTags.filter(t => t !== tag)
        : [...prev.healingTags, tag],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const updated = await api.updateProfile(formData)
      updateProfile(updated)
      setSuccess(true)
    } catch (error) {
      console.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
          {user?.isPremium && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-semibold">Premium</span>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                {user?.name[0]}
              </div>
              <h2 className="text-xl font-bold text-center mb-2">{user?.name}</h2>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
                {user?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(user?.createdAt || '').toLocaleDateString()}</span>
                </div>
              </div>

              {!user?.isPremium && (
                <Link
                  href="/premium"
                  className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  Upgrade to Premium
                </Link>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4">
                Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  placeholder="Tell us about your healing journey..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location (Optional)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Healing Journey</label>
                <div className="grid grid-cols-2 gap-2">
                  {healingCategories.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-2 text-sm rounded-lg border transition ${
                        formData.healingTags.includes(tag)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onChange={e => setFormData({ ...formData, isAnonymous: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="anonymous" className="text-sm">
                  Show as anonymous in communities
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
