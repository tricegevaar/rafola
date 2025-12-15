import { Router } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()

// Create video room (Daily.co integration)
router.post('/create-room', authenticate, async (req: AuthRequest, res) => {
  try {
    const { roomName, groupId } = req.body

    // Daily.co API integration
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        name: roomName || `room-${Date.now()}`,
        privacy: 'private',
        properties: {
          max_participants: 10,
          enable_chat: true,
          enable_screenshare: true,
          enable_recording: false,
        },
      }),
    })

    const room = await response.json()

    res.json({
      roomUrl: room.url,
      roomName: room.name,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create video room' })
  }
})

// Get room token
router.post('/room-token', authenticate, async (req: AuthRequest, res) => {
  try {
    const { roomName } = req.body

    const response = await fetch('https://api.daily.co/v1/meeting-tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          room_name: roomName,
          is_owner: false,
        },
      }),
    })

    const data = await response.json()

    res.json({ token: data.token })
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate room token' })
  }
})

export default router
