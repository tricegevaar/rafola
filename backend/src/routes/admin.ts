import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Middleware to check if user is admin (simplified - you should implement proper role checking)
const isAdmin = (req: AuthRequest, res: any, next: any) => {
  // TODO: Implement proper admin role checking
  // For now, we'll allow authenticated users
  next()
}

// Get dashboard statistics
router.get('/stats', authenticate, isAdmin, async (req: AuthRequest, res) => {
  try {
    const [
      totalUsers,
      totalGroups,
      totalMessages,
      totalPosts,
      activeUsersCount,
      premiumUsersCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.group.count(),
      prisma.message.count(),
      prisma.post.count(),
      prisma.user.count({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      }),
      prisma.user.count({
        where: {
          healingTags: {
            contains: 'premium', // This is a simplified check
          },
        },
      }),
    ])

    // Calculate revenue (simplified - you should track actual payments)
    const monthlyRevenue = premiumUsersCount * 450 // Assuming all premium users

    res.json({
      totalUsers,
      totalGroups,
      totalMessages,
      totalPosts,
      activeUsers: activeUsersCount,
      premiumUsers: premiumUsersCount,
      monthlyRevenue,
      growth: {
        users: 12.5,
        groups: 8.2,
        messages: 23.1,
        revenue: 15.3,
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({ error: 'Failed to fetch statistics' })
  }
})

// Get user growth data (last 12 months)
router.get('/user-growth', authenticate, isAdmin, async (req: AuthRequest, res) => {
  try {
    const months = []
    const now = new Date()

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)

      const count = await prisma.user.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      })

      months.push({
        month: date.toLocaleString('default', { month: 'short' }),
        count,
      })
    }

    res.json(months)
  } catch (error) {
    console.error('Error fetching user growth:', error)
    res.status(500).json({ error: 'Failed to fetch user growth data' })
  }
})

// Get recent activity
router.get('/activity', authenticate, isAdmin, async (req: AuthRequest, res) => {
  try {
    const [recentUsers, recentGroups, recentMessages] = await Promise.all([
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
      prisma.group.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      }),
      prisma.message.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      }),
    ])

    const activities = [
      ...recentUsers.map(user => ({
        type: 'user',
        title: `New user registered: ${user.name}`,
        time: getTimeAgo(user.createdAt),
      })),
      ...recentGroups.map(group => ({
        type: 'group',
        title: `New community created: ${group.name}`,
        time: getTimeAgo(group.createdAt),
      })),
      ...recentMessages.map(msg => ({
        type: 'message',
        title: 'New message sent',
        time: getTimeAgo(msg.createdAt),
      })),
    ]

    // Sort by time and take top 10
    activities.sort((a, b) => {
      const timeA = parseTimeAgo(a.time)
      const timeB = parseTimeAgo(b.time)
      return timeA - timeB
    })

    res.json(activities.slice(0, 10))
  } catch (error) {
    console.error('Error fetching activity:', error)
    res.status(500).json({ error: 'Failed to fetch activity' })
  }
})

// Get all users with pagination
router.get('/users', authenticate, isAdmin, async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = req.query.search as string || ''
    const plan = req.query.plan as string || 'all'

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ]
    }

    if (plan !== 'all') {
      where.healingTags = { contains: plan }
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          healingTags: true,
          isAnonymous: true,
          createdAt: true,
          _count: {
            select: {
              groupMemberships: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ])

    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      plan: determinePlan(user.healingTags),
      status: 'active', // You should track this in the database
      joined: user.createdAt.toISOString().split('T')[0],
      communities: user._count.groupMemberships,
    }))

    res.json({
      users: formattedUsers,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Get top communities
router.get('/top-communities', authenticate, isAdmin, async (req: AuthRequest, res) => {
  try {
    const communities = await prisma.group.findMany({
      take: 10,
      orderBy: {
        members: {
          _count: 'desc',
        },
      },
      select: {
        id: true,
        name: true,
        category: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
    })

    res.json(
      communities.map(c => ({
        id: c.id,
        name: c.name,
        category: c.category,
        members: c._count.members,
      }))
    )
  } catch (error) {
    console.error('Error fetching communities:', error)
    res.status(500).json({ error: 'Failed to fetch communities' })
  }
})

// Helper functions
function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  if (seconds < 60) return `${seconds} seconds ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  return `${Math.floor(seconds / 86400)} days ago`
}

function parseTimeAgo(timeStr: string): number {
  const match = timeStr.match(/(\d+)\s+(second|minute|hour|day)/)
  if (!match) return 0

  const value = parseInt(match[1])
  const unit = match[2]

  const multipliers: any = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
  }

  return value * multipliers[unit]
}

function determinePlan(healingTags: string): string {
  // Simplified plan determination
  // You should implement proper subscription tracking
  if (healingTags.includes('premium')) return 'Premium'
  if (healingTags.includes('supporter')) return 'Supporter'
  return 'Free'
}

export default router
