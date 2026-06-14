const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const { generateToken, protect } = require('../middleware/auth')

// POST /api/auth/register
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['patient', 'doctor', 'hospital', 'assistant']).withMessage('Invalid role'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg })

  try {
    const { name, email, password, role, phone } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ success: false, message: 'Email already registered' })

    const user = await User.create({ name, email, password, role: role || 'patient', phone })
    const token = generateToken(user._id)

    res.status(201).json({ success: true, token, user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg })

  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' })
    if (!user.isActive) return res.status(401).json({ success: false, message: 'Account is suspended. Contact admin.' })

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password' })

    const token = generateToken(user._id)
    res.json({ success: true, token, user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ success: false, message: 'No account found with this email' })
    // In production: generate reset token, send email
    res.json({ success: true, message: 'Password reset link sent to your email' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json({ success: true, user: req.user })
})

module.exports = router
