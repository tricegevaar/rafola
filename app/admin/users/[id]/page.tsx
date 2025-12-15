'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import AdminLayout from '../../layout-admin'
import { api } from '@/lib/api'

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const data = await api.getMe() // In production, fetch by ID
      setUser(data)
    } catch (error) {
      console.error('Error loading user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.updateProfile(user)
      alert('User updated successfully!')
      router.push('/admin/users')
    } catch (error) {
      alert('Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      // await api.deleteUser(params.id)
      alert('User deleted successfully!')
      router.push('/admin/users')
    } catch (error) {
      alert('Failed to delete user')
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h2 className="text-3xl font-bold text-gray-800">Edit User</h2>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
            <input
              type="text"
              value={user?.name || ''}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Healing Tags</label>
            <input
              type="text"
              value={user?.healingTags?.join(', ') || ''}
              onChange={(e) => setUser({ ...user, healingTags: e.target.value.split(',').map((t: string) => t.trim()) })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              placeholder="Comma separated tags"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="anonymous"
              checked={user?.isAnonymous || false}
              onChange={(e) => setUser({ ...user, isAnonymous: e.target.checked })}
              className="w-5 h-5 rounded"
            />
            <label htmlFor="anonymous" className="text-sm font-medium text-gray-700">
              Anonymous Mode
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
