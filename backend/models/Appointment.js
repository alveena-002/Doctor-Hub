const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  symptoms: { type: String },
  status: {
    type: String,
    enum: ['pending', 'payment_pending', 'confirmed', 'completed', 'cancelled'],
    default: 'payment_pending'
  },
  paymentStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  notes: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)
