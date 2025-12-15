import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface AuthSocket extends Socket {
  userId?: string
}

export const setupSocketHandlers = (io: Server) => {
  // Authentication middleware
  io.use((socket: AuthSocket, next) => {
    const token = socket.handshake.auth.token
    
    if (!token) {
      return next(new Error('Authentication error'))
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
      socket.userId = decoded.userId
      next()
    } catch (err) {
      next(new Error('Authentication error'))
    }
  })

  io.on('connection', (socket: AuthSocket) => {
    console.log(`User connected: ${socket.userId}`)

    // Join user's personal room
    socket.join(`user:${socket.userId}`)

    // Join group room
    socket.on('join:group', (groupId: string) => {
      socket.join(`group:${groupId}`)
      console.log(`User ${socket.userId} joined group ${groupId}`)
    })

    // Leave group room
    socket.on('leave:group', (groupId: string) => {
      socket.leave(`group:${groupId}`)
    })

    // Send message
    socket.on('message:send', async (data: { content: string; recipientId?: string; groupId?: string }) => {
      try {
        const message = await prisma.message.create({
          data: {
            content: data.content,
            senderId: socket.userId!,
            recipientId: data.recipientId,
            groupId: data.groupId,
          },
          include: {
            sender: {
              select: { id: true, name: true, avatar: true },
            },
          },
        })

        // Send to recipient or group
        if (data.recipientId) {
          io.to(`user:${data.recipientId}`).emit('message:new', message)
        } else if (data.groupId) {
          io.to(`group:${data.groupId}`).emit('message:new', message)
        }

        // Send back to sender
        socket.emit('message:sent', message)
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' })
      }
    })

    // Typing indicator
    socket.on('typing:start', (data: { recipientId?: string; groupId?: string }) => {
      if (data.recipientId) {
        io.to(`user:${data.recipientId}`).emit('typing:user', { userId: socket.userId })
      } else if (data.groupId) {
        socket.to(`group:${data.groupId}`).emit('typing:user', { userId: socket.userId })
      }
    })

    socket.on('typing:stop', (data: { recipientId?: string; groupId?: string }) => {
      if (data.recipientId) {
        io.to(`user:${data.recipientId}`).emit('typing:stop', { userId: socket.userId })
      } else if (data.groupId) {
        socket.to(`group:${data.groupId}`).emit('typing:stop', { userId: socket.userId })
      }
    })

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`)
    })
  })
}
