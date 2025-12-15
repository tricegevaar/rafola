import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Get current user profile
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        isAnonymous: true,
        healingTags: true,
        createdAt: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      ...user,
      healingTags: user.healingTags ? user.healingTags.split(',').filter(Boolean) : [],
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// Update user profile
router.patch('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const { name, avatar, healingTags, isAnonymous } = req.body

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        ...(name && { name }),
        ...(avatar !== undefined && { avatar }),
        ...(healingTags && { healingTags: Array.isArray(healingTags) ? healingTags.join(',') : healingTags }),
        ...(isAnonymous !== undefined && { isAnonymous }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        isAnonymous: true,
        healingTags: true,
      },
    })

    res.json({
      ...user,
      healingTags: user.healingTags ? user.healingTags.split(',').filter(Boolean) : [],
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

export default router
