const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { protect, authorize } = require('../middleware/auth')

// GET /api/users - admin
router.get('/', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt')
    res.json({ success: true, users })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/users/:id/status - toggle active/suspended
router.put('/:id/status', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    user.isActive = !user.isActive
    await user.save()
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/users/me - update own profile
router.put('/me', protect, async (req, res) => {
  try {
    const allowed = ['name', 'phone', 'age', 'bloodGroup', 'address']
    const updates = {}
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f] })
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password')
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
