const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { protect, authorize } = require('../middleware/auth')

// GET /api/doctors - public, search & filter
router.get('/', async (req, res) => {
  try {
    const { search, type, disease, location } = req.query
    const query = { role: 'doctor', isActive: true }

    if (type) query.treatmentType = type
    if (location) query.location = new RegExp(location, 'i')
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { specialty: new RegExp(search, 'i') },
        { diseases: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    if (disease) query.diseases = { $in: [new RegExp(disease, 'i')] }

    const doctors = await User.find(query).select('-password')
    res.json({ success: true, count: doctors.length, doctors })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/doctors/:id
router.get('/:id', async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' }).select('-password')
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' })
    res.json({ success: true, doctor })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/doctors - admin only
router.post('/', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const { name, email, password, specialty, treatmentType, consultationFee, experience, location, diseases } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ success: false, message: 'Email already exists' })

    const doctor = await User.create({
      name, email, password: password || 'Doctor@123',
      role: 'doctor', specialty, treatmentType,
      consultationFee, experience, location, diseases
    })
    res.status(201).json({ success: true, doctor })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/doctors/:id - admin only
router.put('/:id', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const doctor = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password')
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' })
    res.json({ success: true, doctor })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
