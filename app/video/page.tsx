'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import { Video, Users } from 'lucide-react'
import Link from 'next/link'

export default function VideoPage() {
  const [roomUrl, setRoomUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const createRoom = async () => {
    setLoading(true)
    try {
      const data = await api.createVideoRoom()
      setRoomUrl(data.roomUrl)
    } catch (error) {
      console.error('Failed to create room')
    } finally {
      setLoading(false)
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
        <h1 className="text-3xl font-bold mb-8">Video Support Sessions</h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <Video className="w-16 h-16 mx-auto text-purple-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Start a Video Session</h2>
            <p className="text-gray-600 mb-6">
              Connect face-to-face with your support group or buddy in a safe, private video room.
            </p>

            {!roomUrl ? (
              <button
                onClick={createRoom}
                disabled={loading}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
              >
                {loading ? 'Creating Room...' : 'Create Video Room'}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-semibold mb-2">Room Created!</p>
                  <p className="text-sm text-gray-600 mb-4">Share this link with your group:</p>
                  <input
                    type="text"
                    value={roomUrl}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                  />
                </div>
                <a
                  href={roomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Join Room
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Video Session Guidelines
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Be respectful and supportive of all participants</li>
              <li>• You can turn off your camera if you prefer privacy</li>
              <li>• Keep conversations confidential</li>
              <li>• Report any inappropriate behavior to moderators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
