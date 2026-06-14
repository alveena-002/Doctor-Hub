const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Payment = require('../models/Payment')
const Appointment = require('../models/Appointment')
const { protect, authorize } = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/payments/'),
  filename: (req, file, cb) => cb(null, `pay_${Date.now()}${path.extname(file.originalname)}`)
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

// POST /api/payments - patient uploads screenshot
router.post('/', protect, authorize('patient'), upload.single('screenshot'), async (req, res) => {
  try {
    const { appointmentId, amount } = req.body
    const appointment = await Appointment.findById(appointmentId)
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' })
    if (String(appointment.patient) !== String(req.user._id))
      return res.status(403).json({ success: false, message: 'Not your appointment' })

    const payment = await Payment.create({
      appointment: appointmentId,
      patient: req.user._id,
      doctor: appointment.doctor,
      amount,
      screenshot: req.file ? req.file.path : null,
      status: 'pending'
    })
    res.status(201).json({ success: true, payment })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// GET /api/payments - assistant sees pending
router.get('/', protect, authorize('assistant', 'admin', 'superadmin'), async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name specialty')
      .populate('appointment')
      .sort('-createdAt')
    res.json({ success: true, payments })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// PUT /api/payments/:id/verify - assistant verifies
router.put('/:id/verify', protect, authorize('assistant', 'admin', 'superadmin'), async (req, res) => {
  try {
    const { action, reason } = req.body // action: 'verify' | 'reject'
    const payment = await Payment.findById(req.params.id)
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' })

    payment.status = action === 'verify' ? 'verified' : 'rejected'
    payment.verifiedBy = req.user._id
    payment.verifiedAt = new Date()
    if (reason) payment.rejectionReason = reason
    await payment.save()

    // Update appointment status
    if (action === 'verify') {
      await Appointment.findByIdAndUpdate(payment.appointment, { status: 'confirmed', paymentStatus: 'verified' })
    }

    res.json({ success: true, payment })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
