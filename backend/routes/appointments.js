const express = require('express')
const router = express.Router()
const Appointment = require('../models/Appointment')
const { protect, authorize } = require('../middleware/auth')

// POST /api/appointments - patient books
router.post('/', protect, authorize('patient'), async (req, res) => {
  try {
    const { doctorId, date, time, symptoms } = req.body
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date, time, symptoms,
      status: 'payment_pending'
    })
    await appointment.populate(['patient', 'doctor'])
    res.status(201).json({ success: true, appointment })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/appointments - role-based
router.get('/', protect, async (req, res) => {
  try {
    let query = {}
    if (req.user.role === 'patient') query.patient = req.user._id
    else if (req.user.role === 'doctor') query.doctor = req.user._id
    // assistant/admin/superadmin see all

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone')
      .populate('doctor', 'name specialty treatmentType consultationFee')
      .sort('-createdAt')

    res.json({ success: true, count: appointments.length, appointments })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/appointments/:id/status - doctor/admin
router.put('/:id/status', protect, authorize('doctor', 'admin', 'superadmin'), async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    ).populate(['patient', 'doctor'])
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' })
    res.json({ success: true, appointment })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
