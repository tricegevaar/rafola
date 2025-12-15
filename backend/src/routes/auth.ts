import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { body, validationResult } from 'express-validator'

const router = Router()
const prisma = new PrismaClient()

// Register
router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { email, password, name, healingTags, isAnonymous } = req.body

      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          healingTags: Array.isArray(healingTags) ? healingTags.join(',') : '',
          isAnonymous: isAnonymous || false,
        },
      })

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          healingTags: user.healingTags ? user.healingTags.split(',').filter(Boolean) : [],
          isAnonymous: user.isAnonymous,
        },
      })
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' })
    }
  }
)

// Login
router.post('/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          healingTags: user.healingTags ? user.healingTags.split(',').filter(Boolean) : [],
          isAnonymous: user.isAnonymous,
          avatar: user.avatar,
        },
      })
    } catch (error) {
      res.status(500).json({ error: 'Login failed' })
    }
  }
)

// Forgot password
router.post('/forgot-password',
  body('email').isEmail(),
  async (req, res) => {
    try {
      const { email } = req.body

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        // Don't reveal if user exists
        return res.json({ message: 'If that email exists, we sent a reset link' })
      }

      // Generate reset token
      const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
      const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken, resetTokenExpiry },
      })

      // In production, send email here
      // For now, just return success
      console.log(`Reset link: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`)

      res.json({ message: 'Password reset email sent' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to process request' })
    }
  }
)

// Reset password
router.post('/reset-password',
  body('token').notEmpty(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    try {
      const { token, password } = req.body

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      })

      if (!user || user.resetToken !== token || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
        return res.status(400).json({ error: 'Invalid or expired reset token' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      })

      res.json({ message: 'Password reset successful' })
    } catch (error) {
      res.status(400).json({ error: 'Invalid or expired token' })
    }
  }
)

// Google OAuth - Initiate
router.get('/google', (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${process.env.BACKEND_URL}/api/auth/google/callback&` +
    `response_type=code&` +
    `scope=profile email`
  
  res.redirect(googleAuthUrl)
})

// Google OAuth - Callback
router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.BACKEND_URL}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    })

    const tokens = await tokenResponse.json()

    // Get user info
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })

    const googleUser = await userInfoResponse.json()

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { googleId: googleUser.id },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.picture,
          password: '',
          healingTags: '',
        },
      })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`)
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`)
  }
})

export default router
