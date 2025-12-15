'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { socketClient } from '@/lib/socket'
import { useAuthStore } from '@/store/useAuthStore'
import { Send, Heart, MessageCircle } from 'lucide-react'

export default function CommunityDetailPage() {
  const params = useParams()
  const groupId = params.id as string
  const user = useAuthStore(state => state.user)

  const [posts, setPosts] = useState<any[]>([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
    socketClient.joinGroup(groupId)

    socketClient.onNewMessage((message) => {
      if (message.groupId === groupId) {
        loadPosts()
      }
    })

    return () => {
      socketClient.leaveGroup(groupId)
    }
  }, [groupId])

  const loadPosts = async () => {
    try {
      const data = await api.getGroupPosts(groupId)
      setPosts(data)
    } catch (error) {
      console.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return

    try {
      await api.createPost(groupId, newPost)
      setNewPost('')
      loadPosts()
    } catch (error) {
      console.error('Failed to create post')
    }
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/communities" className="text-blue-600 hover:underline">← Back to Communities</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Create Post */}
        <form onSubmit={handleSubmitPost} className="bg-white p-6 rounded-xl shadow-md mb-6">
          <textarea
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Share your thoughts with the community..."
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Post
          </button>
        </form>

        {/* Posts Feed */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No posts yet. Be the first to share!
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    {post.author.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">
                      {post.author.isAnonymous ? 'Anonymous' : post.author.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{post.content}</p>

                <div className="flex items-center gap-4 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-red-500 transition">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments?.length || 0} Comments</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
