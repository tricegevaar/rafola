'use client'

import { useState, useEffect } from 'react'
import { Users, Lock, Search, Crown } from 'lucide-react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'

export default function CommunitiesPage() {
  const user = useAuthStore(state => state.user)
  const [groups, setGroups] = useState<any[]>([])
  const [myGroups, setMyGroups] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGroups()
  }, [])

  const loadGroups = async () => {
    try {
      const data = await api.getGroups()
      setGroups(data)
      
      // Get user's groups
      const userGroups = data.filter((g: any) => 
        g.members?.some((m: any) => m.userId === user?.id)
      ).map((g: any) => g.id)
      setMyGroups(userGroups)
    } catch (error) {
      console.error('Failed to load groups')
    } finally {
      setLoading(false)
    }
  }

  const handleJoinGroup = async (groupId: string) => {
    try {
      await api.joinGroup(groupId)
      setMyGroups([...myGroups, groupId])
    } catch (error) {
      console.error('Failed to join group')
    }
  }

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Support Communities</h1>
          <Link
            href="/communities/create"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Community
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* My Communities */}
        {myGroups.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">My Communities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.filter(g => myGroups.includes(g.id)).map(group => (
                <GroupCard
                  key={group.id}
                  group={group}
                  isMember={true}
                  onJoin={handleJoinGroup}
                  isPremium={user?.isPremium}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Communities */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            {myGroups.length > 0 ? 'Discover More' : 'All Communities'}
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.filter(g => !myGroups.includes(g.id)).map(group => (
                <GroupCard
                  key={group.id}
                  group={group}
                  isMember={false}
                  onJoin={handleJoinGroup}
                  isPremium={user?.isPremium}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function GroupCard({ group, isMember, onJoin, isPremium }: any) {
  const isPremiumGroup = group.category === 'Premium'
  const canJoin = !isPremiumGroup || isPremium

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <Users className="w-8 h-8 text-blue-600" />
        {group.isPrivate && <Lock className="w-5 h-5 text-gray-400" />}
        {isPremiumGroup && <Crown className="w-5 h-5 text-yellow-500" />}
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
      <p className="text-gray-600 text-sm mb-3">{group.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
          {group.category}
        </span>
        <span className="text-sm text-gray-500">
          {group.memberCount} members
        </span>
      </div>

      {isMember ? (
        <Link
          href={`/communities/${group.id}`}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition block text-center"
        >
          View Community
        </Link>
      ) : (
        <button
          onClick={() => canJoin && onJoin(group.id)}
          disabled={!canJoin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!canJoin ? 'Premium Only' : 'Join Community'}
        </button>
      )}
    </div>
  )
}
