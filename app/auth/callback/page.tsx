'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { useSocketStore } from '@/store/useSocketStore'
import { api } from '@/lib/api'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAuthStore(state => state.login)
  const connectSocket = useSocketStore(state => state.connect)

  useEffect(() => {
    const token = searchParams.get('token')

    if (token) {
      api.setToken(token)
      
      // Fetch user data
      api.getMe().then(user => {
        login(user)
        connectSocket(token)
        router.push('/dashboard')
      }).catch(() => {
        router.push('/login?error=auth_failed')
      })
    } else {
      router.push('/login?error=no_token')
    }
  }, [searchParams, login, connectSocket, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  )
}
