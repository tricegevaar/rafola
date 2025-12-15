'use client'

import { Users, MessageCircle, Video, BookOpen, Heart, Bell, Search, TrendingUp, Calendar, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import CrisisButton from '@/components/CrisisButton'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      {/* Premium Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 p-2">
                  <Image
                    src="/rafola-logo.svg"
                    alt="Rafola Logo"
                    width={24}
                    height={24}
                    className="w-full h-full filter brightness-0 invert"
                  />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Rafola
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search communities, buddies..."
                  className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500 outline-none w-64"
                />
              </div>
              
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <Link
                href="/donate"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                <Heart className="w-4 h-4" fill="white" />
                Donate
              </Link>

              <Link href="/profile" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                  U
                </div>
                <span className="hidden md:block font-medium text-gray-700">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Welcome back! 👋</h1>
          <p className="text-gray-600 text-lg">Continue your healing journey today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users />} label="Communities" value="3" color="blue" />
          <StatCard icon={<MessageCircle />} label="Buddies" value="5" color="green" />
          <StatCard icon={<TrendingUp />} label="Streak" value="7 days" color="purple" />
          <StatCard icon={<Award />} label="Level" value="Supporter" color="orange" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ActionCard
                  icon={<Users className="w-6 h-6" />}
                  title="Communities"
                  description="Join support groups"
                  href="/communities"
                  gradient="from-blue-500 to-cyan-500"
                />
                <ActionCard
                  icon={<MessageCircle className="w-6 h-6" />}
                  title="Messages"
                  description="Chat with buddies"
                  href="/messages"
                  gradient="from-green-500 to-emerald-500"
                />
                <ActionCard
                  icon={<Video className="w-6 h-6" />}
                  title="Video Sessions"
                  description="Join live support"
                  href="/video"
                  gradient="from-purple-500 to-pink-500"
                />
                <ActionCard
                  icon={<BookOpen className="w-6 h-6" />}
                  title="Resources"
                  description="Helpful guides"
                  href="/resources"
                  gradient="from-orange-500 to-amber-500"
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
              <div className="space-y-4">
                <ActivityItem
                  title="New message from Sarah"
                  time="5 minutes ago"
                  type="message"
                />
                <ActivityItem
                  title="Upcoming: Grief Support Group"
                  time="Today at 3:00 PM"
                  type="event"
                />
                <ActivityItem
                  title="You joined Recovery Warriors"
                  time="2 hours ago"
                  type="community"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upgrade Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-6 h-6" />
                <span className="font-semibold">Upgrade to Premium</span>
              </div>
              <p className="text-sm text-blue-100 mb-4">
                Unlock unlimited communities, priority support, and exclusive features
              </p>
              <Link
                href="/#pricing"
                className="block w-full py-2 rounded-xl bg-white text-blue-600 font-semibold text-center hover:shadow-lg transition"
              >
                View Plans
              </Link>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-800">Upcoming Events</h3>
              </div>
              <div className="space-y-3">
                <EventItem
                  title="Mindfulness Session"
                  time="Today, 3:00 PM"
                  attendees={12}
                />
                <EventItem
                  title="Recovery Check-in"
                  time="Tomorrow, 10:00 AM"
                  attendees={8}
                />
              </div>
              <Link
                href="/events"
                className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all events →
              </Link>
            </div>

            {/* Suggested Buddies */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Suggested Buddies</h3>
              <div className="space-y-3">
                <BuddyItem name="Alex M." match={85} />
                <BuddyItem name="Jordan K." match={78} />
              </div>
              <Link
                href="/buddies"
                className="block mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Find more buddies →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CrisisButton />
    </div>
  )
}

function StatCard({ icon, label, value, color }: any) {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors[color as keyof typeof colors]} flex items-center justify-center text-white mb-2`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}

function ActionCard({ icon, title, description, href, gradient }: any) {
  return (
    <Link
      href={href}
      className="group p-4 rounded-xl bg-gray-50 hover:bg-white border border-gray-200 hover:border-transparent hover:shadow-lg transition-all"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  )
}

function ActivityItem({ title, time, type }: any) {
  const icons = {
    message: <MessageCircle className="w-5 h-5 text-green-600" />,
    event: <Calendar className="w-5 h-5 text-purple-600" />,
    community: <Users className="w-5 h-5 text-blue-600" />,
  }

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
      <div className="mt-0.5">{icons[type as keyof typeof icons]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}

function EventItem({ title, time, attendees }: any) {
  return (
    <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-xs text-gray-600 mt-1">{time}</p>
      <p className="text-xs text-purple-600 mt-1">{attendees} attending</p>
    </div>
  )
}

function BuddyItem({ name, match }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <p className="text-xs text-green-600">{match}% match</p>
        </div>
      </div>
      <button className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
        Connect
      </button>
    </div>
  )
}
