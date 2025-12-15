'use client'

import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import AdminLayout from '../layout-admin'

export default function AdminReportsPage() {
  const reports = [
    { id: 1, type: 'Inappropriate Content', reporter: 'User #1234', reported: 'Post in Grief Support', status: 'pending', date: '2024-12-03' },
    { id: 2, type: 'Spam', reporter: 'User #5678', reported: 'Message from User #9012', status: 'resolved', date: '2024-12-02' },
    { id: 3, type: 'Harassment', reporter: 'User #3456', reported: 'Comment in Recovery Group', status: 'pending', date: '2024-12-01' },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Content Reports</h2>
        <p className="text-gray-600">Review and moderate reported content</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <div className="text-2xl font-bold text-gray-800">
              {reports.filter(r => r.status === 'pending').length}
            </div>
          </div>
          <div className="text-sm text-gray-600">Pending Reports</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="text-2xl font-bold text-gray-800">
              {reports.filter(r => r.status === 'resolved').length}
            </div>
          </div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-8 h-8 text-red-600" />
            <div className="text-2xl font-bold text-gray-800">0</div>
          </div>
          <div className="text-sm text-gray-600">Dismissed</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Reporter</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Reported Content</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{report.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.reporter}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.reported}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      report.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition">
                        Resolve
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition">
                        Dismiss
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
