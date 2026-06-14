const express = require('express')
const historyRouter = express.Router()
const prescRouter = express.Router()
const { MedicalHistory, Prescription } = require('../models/Prescription')
const { protect, authorize } = require('../middleware/auth')

// ===== MEDICAL HISTORY =====

// GET /api/history
historyRouter.get('/', protect, async (req, res) => {
  try {
    let query = {}
    if (req.user.role === 'patient') query.patient = req.user._id
    else if (req.user.role === 'doctor') query.doctor = req.user._id

    const history = await MedicalHistory.find(query)
      .populate('patient', 'name age bloodGroup')
      .populate('doctor', 'name specialty treatmentType')
      .populate('prescription')
      .sort('-createdAt')

    res.json({ success: true, history })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/history - doctor adds record
historyRouter.post('/', protect, authorize('doctor'), async (req, res) => {
  try {
    const { patientId, appointmentId, prescriptionId, diagnosis, treatmentType, summary } = req.body
    const record = await MedicalHistory.create({
      patient: patientId,
      doctor: req.user._id,
      appointment: appointmentId,
      prescription: prescriptionId,
      diagnosis, treatmentType, summary
    })
    res.status(201).json({ success: true, record })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== PRESCRIPTIONS =====

// GET /api/prescriptions
prescRouter.get('/', protect, async (req, res) => {
  try {
    let query = {}
    if (req.user.role === 'patient') query.patient = req.user._id
    else if (req.user.role === 'doctor') query.doctor = req.user._id

    const prescriptions = await Prescription.find(query)
      .populate('patient', 'name age')
      .populate('doctor', 'name specialty')
      .sort('-createdAt')

    res.json({ success: true, prescriptions })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// POST /api/prescriptions - doctor issues
prescRouter.post('/', protect, authorize('doctor'), async (req, res) => {
  try {
    const { patientId, appointmentId, diagnosis, medicines, instructions, notes } = req.body
    const prescription = await Prescription.create({
      patient: patientId,
      doctor: req.user._id,
      appointment: appointmentId,
      diagnosis, medicines, instructions, notes
    })
    await prescription.populate(['patient', 'doctor'])
    res.status(201).json({ success: true, prescription })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = historyRouter
module.exports.prescRouter = prescRouter
