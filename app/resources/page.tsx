'use client'

import { BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const sampleResources = [
  {
    id: '1',
    title: 'Understanding Grief: A Guide',
    category: 'Grief & Loss',
    type: 'guide',
    description: 'Learn about the stages of grief and healthy coping mechanisms',
  },
  {
    id: '2',
    title: 'Mindfulness for Anxiety',
    category: 'Anxiety & Depression',
    type: 'article',
    description: 'Practical mindfulness techniques to manage anxiety',
  },
  {
    id: '3',
    title: 'Recovery Support Resources',
    category: 'Addiction Recovery',
    type: 'guide',
    description: 'Comprehensive guide to addiction recovery support',
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Resources Library</h1>

        <div className="space-y-4">
          {sampleResources.map((resource) => (
            <div key={resource.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <BookOpen className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{resource.title}</h3>
                    <span className="text-sm text-blue-600 font-medium">{resource.category}</span>
                    <p className="text-gray-600 mt-2">{resource.description}</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
