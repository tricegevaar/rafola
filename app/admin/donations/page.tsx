'use client'

import { DollarSign, TrendingUp, Calendar } from 'lucide-react'
import AdminLayout from '../layout-admin'

export default function AdminDonationsPage() {
  const donations = [
    { id: 1, donor: 'Anonymous', amount: 500, date: '2024-12-03', status: 'completed' },
    { id: 2, donor: 'John Smith', amount: 250, date: '2024-12-02', status: 'completed' },
    { id: 3, donor: 'Sarah Johnson', amount: 1000, date: '2024-12-01', status: 'completed' },
    { id: 4, donor: 'Anonymous', amount: 100, date: '2024-11-30', status: 'completed' },
  ]

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0)

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Donations</h2>
        <p className="text-gray-600">Track and manage donations</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div className="text-2xl font-bold text-gray-800">R{totalDonations.toLocaleString()}</div>
          </div>
          <div className="text-sm text-gray-600">Total Donations</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <div className="text-2xl font-bold text-gray-800">{donations.length}</div>
          </div>
          <div className="text-sm text-gray-600">Total Donors</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-purple-600" />
            <div className="text-2xl font-bold text-gray-800">R{Math.round(totalDonations / donations.length)}</div>
          </div>
          <div className="text-sm text-gray-600">Average Donation</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Donor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{donation.donor}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">R{donation.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{donation.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {donation.status}
                    </span>
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
