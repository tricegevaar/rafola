import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Find potential buddies
router.get('/find', authenticate, async (req: AuthRequest, res) => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { healingTags: true },
    })

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    const currentTags = currentUser.healingTags ? currentUser.healingTags.split(',').filter(Boolean) : []

    const potentialBuddies = await prisma.user.findMany({
      where: {
        id: { not: req.userId },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        healingTags: true,
        isAnonymous: true,
      },
      take: 50,
    })

    // Calculate match score
    const buddiesWithScore = potentialBuddies
      .map(buddy => {
        const buddyTags = buddy.healingTags ? buddy.healingTags.split(',').filter(Boolean) : []
        const commonTags = buddyTags.filter(tag => currentTags.includes(tag))
        const matchScore = currentTags.length > 0 ? (commonTags.length / currentTags.length) * 100 : 0

        return {
          ...buddy,
          healingTags: buddyTags,
          matchScore: Math.round(matchScore),
        }
      })
      .filter(buddy => buddy.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10)

    res.json(buddiesWithScore)
  } catch (error) {
    res.status(500).json({ error: 'Failed to find buddies' })
  }
})

// Send buddy request
router.post('/request', authenticate, async (req: AuthRequest, res) => {
  try {
    const { receiverId } = req.body

    const request = await prisma.buddyRequest.create({
      data: {
        requesterId: req.userId!,
        receiverId,
      },
      include: {
        receiver: {
          select: { id: true, name: true, avatar: true },
        },
      },
    })

    res.json(request)
  } catch (error) {
    res.status(500).json({ error: 'Failed to send buddy request' })
  }
})

// Accept buddy request
router.patch('/request/:requestId/accept', authenticate, async (req: AuthRequest, res) => {
  try {
    const { requestId } = req.params

    const request = await prisma.buddyRequest.update({
      where: { id: requestId },
      data: { status: 'accepted' },
    })

    res.json(request)
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept request' })
  }
})

// Get my buddies
router.get('/my-buddies', authenticate, async (req: AuthRequest, res) => {
  try {
    const requests = await prisma.buddyRequest.findMany({
      where: {
        OR: [
          { requesterId: req.userId },
          { receiverId: req.userId },
        ],
        status: 'accepted',
      },
      include: {
        requester: {
          select: { id: true, name: true, avatar: true, healingTags: true },
        },
        receiver: {
          select: { id: true, name: true, avatar: true, healingTags: true },
        },
      },
    })

    const buddies = requests.map(req => 
      req.requesterId === req.userId ? req.receiver : req.requester
    )

    res.json(buddies)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch buddies' })
  }
})

export default router
