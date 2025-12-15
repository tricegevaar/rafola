'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import AdminLayout from '../layout-admin'
import { api } from '@/lib/api'

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      const data = await api.getResources()
      setResources(data)
    } catch (error) {
      console.error('Error loading resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return
    
    try {
      await api.deleteResource(id)
      alert('Resource deleted successfully!')
      loadResources()
    } catch (error) {
      alert('Failed to delete resource')
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Resources</h2>
            <p className="text-gray-600">Manage mental health resources and guides</p>
          </div>
          <Link
            href="/admin/resources/create"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            Add Resource
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : resources.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
            No resources found
          </div>
        ) : (
          resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                        {resource.category}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-100 rounded-lg transition" 
                    title="View"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </a>
                  <Link 
                    href={`/admin/resources/edit/${resource.id}`}
                    className="p-2 hover:bg-gray-100 rounded-lg transition" 
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(resource.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition" 
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  )
}
