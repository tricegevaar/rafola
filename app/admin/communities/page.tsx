'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, Plus, Edit, Trash2, Eye } from 'lucide-react'
import AdminLayout from '../layout-admin'
import { api } from '@/lib/api'

export default function AdminCommunitiesPage() {
  const [communities, setCommunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCommunities()
  }, [])

  const loadCommunities = async () => {
    try {
      const data = await api.getTopCommunities()
      setCommunities(data)
    } catch (error) {
      console.error('Error loading communities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (id: string) => {
    window.location.href = `/admin/communities/edit/${id}`
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this community?')) return
    
    try {
      await api.deleteGroup(id)
      alert('Community deleted successfully!')
      loadCommunities()
    } catch (error) {
      alert('Failed to delete community')
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Communities</h2>
            <p className="text-gray-600">Manage support communities and groups</p>
          </div>
          <Link
            href="/admin/communities/create"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            Create Community
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Community</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Members</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : communities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No communities found
                  </td>
                </tr>
              ) : (
                communities.map((community) => (
                  <tr key={community.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="font-medium text-gray-800">{community.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{community.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{community.members} members</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/communities`} className="p-2 hover:bg-gray-100 rounded-lg transition" title="View">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </Link>
                        <button 
                          onClick={() => handleEdit(community.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition" 
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(community.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
