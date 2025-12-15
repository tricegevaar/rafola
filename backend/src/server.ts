import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import groupRoutes from './routes/groups'
import messageRoutes from './routes/messages'
import buddyRoutes from './routes/buddies'
import resourceRoutes from './routes/resources'
import videoRoutes from './routes/video'
import adminRoutes from './routes/admin'
import { setupSocketHandlers } from './socket/handlers'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})

// Middleware
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/groups', groupRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/buddies', buddyRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Socket.io setup
setupSocketHandlers(io)

const PORT = process.env.PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 Socket.io ready for connections`)
})
