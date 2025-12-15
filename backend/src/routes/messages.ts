import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Get conversations
router.get('/conversations', authenticate, async (req: AuthRequest, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.userId },
          { recipientId: req.userId },
        ],
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true },
        },
        recipient: {
          select: { id: true, name: true, avatar: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' })
  }
})

// Get messages with specific user
router.get('/:userId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.userId, recipientId: userId },
          { senderId: userId, recipientId: req.userId },
        ],
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    res.json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

// Send message
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { content, recipientId, groupId } = req.body

    const message = await prisma.message.create({
      data: {
        content,
        senderId: req.userId!,
        recipientId,
        groupId,
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true },
        },
      },
    })

    res.json(message)
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' })
  }
})

export default router
