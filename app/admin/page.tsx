'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Users, MessageCircle, Video, TrendingUp, AlertCircle, Settings,
  BarChart3, Shield, Heart, Calendar, FileText, DollarSign, Menu, X
} from 'lucide-react'
import { api } from '@/lib/api'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [userGrowth, setUserGrowth] = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])
  const [topCommunities, setTopCommunities] = useState<any[]>([])
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
    // Refresh data every 30 seconds
    const interval = setInterval(loadDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsData, growthData, activityData, communitiesData, usersData] = await Promise.all([
        api.getAdminStats(),
        api.getUserGrowth(),
        api.getActivity(),
        api.getTopCommunities(),
        api.getAdminUsers(1, 5),
      ])

      setStats(statsData)
      setUserGrowth(growthData)
      setActivity(activityData)
      setTopCommunities(communitiesData)
      setRecentUsers(usersData.users || [])
      setLoading(false)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">HealTogether</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            <NavItem icon={<BarChart3 />} label="Dashboard" href="/admin" active />
            <NavItem icon={<Users />} label="Users" href="/admin/users" />
            <NavItem icon={<MessageCircle />} label="Communities" href="/admin/communities" />
            <NavItem icon={<Video />} label="Sessions" href="/admin/sessions" />
            <NavItem icon={<FileText />} label="Resources" href="/admin/resources" />
            <NavItem icon={<DollarSign />} label="Donations" href="/admin/donations" />
            <NavItem icon={<AlertCircle />} label="Reports" href="/admin/reports" />
            <NavItem icon={<Calendar />} label="Events" href="/admin/events" />
            <NavItem icon={<Settings />} label="Settings" href="/admin/settings" />
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
            <Shield className="w-4 h-4" />
            <span>Back to App</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Welcome back, Admin. Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="w-8 h-8" />}
            label="Total Users"
            value={stats?.totalUsers?.toLocaleString() || '0'}
            change={`+${stats?.growth?.users || 0}%`}
            positive
            color="blue"
          />
          <StatCard
            icon={<MessageCircle className="w-8 h-8" />}
            label="Active Communities"
            value={stats?.totalGroups?.toString() || '0'}
            change={`+${stats?.growth?.groups || 0}%`}
            positive
            color="green"
          />
          <StatCard
            icon={<Video className="w-8 h-8" />}
            label="Total Messages"
            value={stats?.totalMessages?.toLocaleString() || '0'}
            change={`+${stats?.growth?.messages || 0}%`}
            positive
            color="purple"
          />
          <StatCard
            icon={<DollarSign className="w-8 h-8" />}
            label="Monthly Revenue"
            value={`R${stats?.monthlyRevenue?.toLocaleString() || '0'}`}
            change={`+${stats?.growth?.revenue || 0}%`}
            positive
            color="green"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">User Growth (Last 12 Months)</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {userGrowth.map((data, i) => {
                const maxCount = Math.max(...userGrowth.map(d => d.count), 1)
                const height = (data.count / maxCount) * 100
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg relative group cursor-pointer" 
                    style={{ height: `${Math.max(height, 5)}%` }}
                    title={`${data.month}: ${data.count} users`}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                      {data.count} users
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-600">
              <span>{userGrowth[0]?.month || 'Jan'}</span>
              <span>{userGrowth[userGrowth.length - 1]?.month || 'Dec'}</span>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live updates" />
            </div>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {activity.length > 0 ? (
                activity.map((item, i) => (
                  <ActivityItem
                    key={i}
                    icon={getActivityIcon(item.type)}
                    title={item.title}
                    time={item.time}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-8">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Recent Users</h3>
              <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <UserRow key={user.id} name={user.name} email={user.email} plan={user.plan} />
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-8">No users yet</p>
              )}
            </div>
          </div>

          {/* Top Communities */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Top Communities</h3>
              <Link href="/admin/communities" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {topCommunities.length > 0 ? (
                topCommunities.slice(0, 5).map((community) => (
                  <CommunityRow key={community.id} name={community.name} members={community.members} />
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-8">No communities yet</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function NavItem({ icon, label, href, active }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}

function StatCard({ icon, label, value, change, positive, color }: any) {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color as keyof typeof colors]} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <span className={`text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}

function ActivityItem({ icon, title, time }: any) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}

function UserRow({ name, email, plan }: any) {
  const planColors = {
    Premium: 'bg-purple-100 text-purple-700',
    Supporter: 'bg-blue-100 text-blue-700',
    Free: 'bg-gray-100 text-gray-700',
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${planColors[plan as keyof typeof planColors]}`}>
        {plan}
      </span>
    </div>
  )
}

function CommunityRow({ name, members }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-800">{name}</p>
      </div>
      <span className="text-sm text-gray-600">{members} members</span>
    </div>
  )
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'user':
      return <Users className="w-5 h-5 text-blue-600" />
    case 'group':
      return <MessageCircle className="w-5 h-5 text-green-600" />
    case 'message':
      return <MessageCircle className="w-5 h-5 text-purple-600" />
    default:
      return <AlertCircle className="w-5 h-5 text-gray-600" />
  }
}
