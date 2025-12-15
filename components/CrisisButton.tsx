'use client'

import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function CrisisButton() {
  return (
    <Link
      href="/crisis"
      className="fixed bottom-6 right-6 bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center gap-3 z-50 animate-pulse hover:animate-none"
    >
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="text-left">
        <div className="font-bold text-sm">Need Help Now?</div>
        <div className="text-xs text-red-100">24/7 Crisis Support</div>
      </div>
    </Link>
  )
}
