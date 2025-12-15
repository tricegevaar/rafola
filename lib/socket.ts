import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

class SocketClient {
  private socket: Socket | null = null

  connect(token: string) {
    if (this.socket?.connected) return this.socket

    this.socket = io(SOCKET_URL, {
      auth: { token },
      autoConnect: true,
    })

    this.socket.on('connect', () => {
      console.log('Socket connected')
    })

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  joinGroup(groupId: string) {
    this.socket?.emit('join:group', groupId)
  }

  leaveGroup(groupId: string) {
    this.socket?.emit('leave:group', groupId)
  }

  sendMessage(data: { content: string; recipientId?: string; groupId?: string }) {
    this.socket?.emit('message:send', data)
  }

  onNewMessage(callback: (message: any) => void) {
    this.socket?.on('message:new', callback)
  }

  onMessageSent(callback: (message: any) => void) {
    this.socket?.on('message:sent', callback)
  }

  startTyping(data: { recipientId?: string; groupId?: string }) {
    this.socket?.emit('typing:start', data)
  }

  stopTyping(data: { recipientId?: string; groupId?: string }) {
    this.socket?.emit('typing:stop', data)
  }

  onTyping(callback: (data: { userId: string }) => void) {
    this.socket?.on('typing:user', callback)
  }

  onTypingStop(callback: (data: { userId: string }) => void) {
    this.socket?.on('typing:stop', callback)
  }

  getSocket() {
    return this.socket
  }
}

export const socketClient = new SocketClient()
