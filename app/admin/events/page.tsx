'use client'

import { Calendar, Plus, Users, Clock } from 'lucide-react'
import AdminLayout from '../layout-admin'

export default function AdminEventsPage() {
  const events = [
    { id: 1, title: 'Mindfulness Workshop', date: '2024-12-10', time: '14:00', attendees: 25, status: 'upcoming' },
    { id: 2, title: 'Group Therapy Session', date: '2024-12-12', time: '16:00', attendees: 15, status: 'upcoming' },
    { id: 3, title: 'Recovery Celebration', date: '2024-12-15', time: '18:00', attendees: 40, status: 'upcoming' },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Events</h2>
            <p className="text-gray-600">Manage community events and sessions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition">
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex flex-col items-center justify-center text-white">
                  <div className="text-xs font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                  <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees} registered
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                  Edit
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
