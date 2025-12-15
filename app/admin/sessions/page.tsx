'use client'

import { Video, Calendar, Users } from 'lucide-react'
import AdminLayout from '../layout-admin'

export default function AdminSessionsPage() {
  const sessions = [
    { id: 1, title: 'Grief Support Session', date: '2024-12-03', time: '14:00', participants: 12, status: 'scheduled' },
    { id: 2, title: 'Recovery Check-in', date: '2024-12-03', time: '16:00', participants: 8, status: 'in-progress' },
    { id: 3, title: 'Mindfulness Session', date: '2024-12-04', time: '10:00', participants: 15, status: 'scheduled' },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Video Sessions</h2>
        <p className="text-gray-600">Manage scheduled and ongoing video support sessions</p>
      </div>

      <div className="grid gap-6">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{session.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {session.date} at {session.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.participants} participants
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                session.status === 'in-progress' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {session.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
