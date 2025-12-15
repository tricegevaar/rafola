import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Get all resources
router.get('/', authenticate, async (req, res) => {
  try {
    const { category } = req.query

    const resources = await prisma.resource.findMany({
      where: category ? { category: category as string } : {},
      orderBy: { createdAt: 'desc' },
    })

    res.json(resources)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' })
  }
})

// Create resource (admin only - simplified for MVP)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, category, url, type } = req.body

    const resource = await prisma.resource.create({
      data: {
        title,
        description,
        category,
        url,
        type,
      },
    })

    res.json(resource)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource' })
  }
})

// Update resource
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, category, url, type } = req.body

    const resource = await prisma.resource.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(url && { url }),
        ...(type && { type }),
      },
    })

    res.json(resource)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resource' })
  }
})

// Delete resource
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params

    await prisma.resource.delete({
      where: { id },
    })

    res.json({ message: 'Resource deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource' })
  }
})

export default router
