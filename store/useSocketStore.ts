import { create } from 'zustand'
import { socketClient } from '@/lib/socket'

interface SocketState {
  isConnected: boolean
  connect: (token: string) => void
  disconnect: () => void
}

export const useSocketStore = create<SocketState>((set) => ({
  isConnected: false,
  connect: (token: string) => {
    socketClient.connect(token)
    set({ isConnected: true })
  },
  disconnect: () => {
    socketClient.disconnect()
    set({ isConnected: false })
  },
}))
