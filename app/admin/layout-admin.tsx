'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Users, MessageCircle, Video, AlertCircle, Settings,
  BarChart3, Shield, Heart, Calendar, FileText, DollarSign, Menu, X
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: <BarChart3 />, label: 'Dashboard', href: '/admin' },
    { icon: <Users />, label: 'Users', href: '/admin/users' },
    { icon: <MessageCircle />, label: 'Communities', href: '/admin/communities' },
    { icon: <Video />, label: 'Sessions', href: '/admin/sessions' },
    { icon: <FileText />, label: 'Resources', href: '/admin/resources' },
    { icon: <DollarSign />, label: 'Donations', href: '/admin/donations' },
    { icon: <AlertCircle />, label: 'Reports', href: '/admin/reports' },
    { icon: <Calendar />, label: 'Events', href: '/admin/events' },
    { icon: <Settings />, label: 'Settings', href: '/admin/settings' },
  ]

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
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg p-2">
              <img
                src="/rafola-logo.svg"
                alt="Rafola Logo"
                className="w-full h-full filter brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Rafola</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:translate-x-1'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
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
        {children}
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
