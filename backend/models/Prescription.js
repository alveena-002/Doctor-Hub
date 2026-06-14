const mongoose = require('mongoose')

// PRESCRIPTION — immutable once created
const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  diagnosis: { type: String, required: true },
  medicines: { type: String, required: true },
  instructions: { type: String },
  notes: { type: String },
}, { timestamps: true })

// Prevent updates and deletes
prescriptionSchema.pre(['updateOne', 'findOneAndUpdate'], function () {
  throw new Error('Prescriptions cannot be modified once issued')
})

// MEDICAL HISTORY — append-only
const medicalHistorySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
  diagnosis: { type: String, required: true },
  treatmentType: { type: String },
  summary: { type: String },
  attachments: [{ name: String, path: String }],
}, { timestamps: true })

// Medical history cannot be deleted
medicalHistorySchema.pre(['deleteOne', 'findOneAndDelete', 'deleteMany'], function () {
  throw new Error('Medical history records cannot be deleted')
})

const Prescription = mongoose.model('Prescription', prescriptionSchema)
const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema)

module.exports = { Prescription, MedicalHistory }
