'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function BuddiesPage() {
  const [potentialBuddies, setPotentialBuddies] = useState<any[]>([])
  const [myBuddies, setMyBuddies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [buddies, potential] = await Promise.all([
        api.getMyBuddies(),
        api.findBuddies(),
      ])
      setMyBuddies(buddies)
      setPotentialBuddies(potential)
    } catch (error) {
      console.error('Failed to load buddies')
    } finally {
      setLoading(false)
    }
  }

  const handleSendRequest = async (buddyId: string) => {
    try {
      await api.sendBuddyRequest(buddyId)
      setPotentialBuddies(prev => prev.filter(b => b.id !== buddyId))
    } catch (error) {
      console.error('Failed to send request')
    }
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Find Your Buddy</h1>

        {/* My Buddies */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">My Buddies</h2>
          {myBuddies.length === 0 ? (
            <p className="text-gray-600">You don't have any buddies yet. Find someone below!</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {myBuddies.map(buddy => (
                <div key={buddy.id} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                    {buddy.name[0]}
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">{buddy.name}</h3>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {buddy.healingTags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/messages"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Potential Buddies */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Suggested Buddies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {potentialBuddies.map(buddy => (
              <div key={buddy.id} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center text-2xl">
                    {buddy.name[0]}
                  </div>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                    {buddy.matchScore}% match
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{buddy.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {buddy.healingTags.map((tag: string) => (
                    <span key={tag} className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleSendRequest(buddy.id)}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Send Request
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
