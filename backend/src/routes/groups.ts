import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Get all groups
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const groups = await prisma.group.findMany({
      include: {
        _count: {
          select: { members: true },
        },
      },
    })

    res.json(groups.map(group => ({
      ...group,
      memberCount: group._count.members,
    })))
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' })
  }
})

// Create group
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { name, description, category, isPrivate } = req.body

    const group = await prisma.group.create({
      data: {
        name,
        description,
        category,
        isPrivate: isPrivate || false,
        members: {
          create: {
            userId: req.userId!,
            role: 'admin',
          },
        },
      },
    })

    res.json(group)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' })
  }
})

// Join group
router.post('/:groupId/join', authenticate, async (req: AuthRequest, res) => {
  try {
    const { groupId } = req.params

    const membership = await prisma.groupMember.create({
      data: {
        userId: req.userId!,
        groupId,
      },
    })

    res.json(membership)
  } catch (error) {
    res.status(500).json({ error: 'Failed to join group' })
  }
})

// Get group posts
router.get('/:groupId/posts', authenticate, async (req: AuthRequest, res) => {
  try {
    const { groupId } = req.params

    const posts = await prisma.post.findMany({
      where: { groupId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            isAnonymous: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
})

// Create post
router.post('/:groupId/posts', authenticate, async (req: AuthRequest, res) => {
  try {
    const { groupId } = req.params
    const { content } = req.body

    const post = await prisma.post.create({
      data: {
        content,
        authorId: req.userId!,
        groupId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' })
  }
})

// Update group
router.patch('/:groupId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { groupId } = req.params
    const { name, description, category, isPrivate } = req.body

    const group = await prisma.group.update({
      where: { id: groupId },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(category && { category }),
        ...(isPrivate !== undefined && { isPrivate }),
      },
    })

    res.json(group)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update group' })
  }
})

// Delete group
router.delete('/:groupId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { groupId } = req.params

    await prisma.group.delete({
      where: { id: groupId },
    })

    res.json({ message: 'Group deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group' })
  }
})

export default router
