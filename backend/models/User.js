const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['patient', 'doctor', 'hospital', 'assistant', 'admin', 'superadmin'], default: 'patient' },
  phone: { type: String },
  age: { type: Number },
  bloodGroup: { type: String },
  address: { type: String },
  profileImage: { type: String },
  isActive: { type: Boolean, default: true },
  // Doctor-specific
  specialty: { type: String },
  treatmentType: { type: String, enum: ['Allopathic', 'Homeopathic', 'Herbal'] },
  consultationFee: { type: Number },
  experience: { type: String },
  location: { type: String },
  rating: { type: Number, default: 0 },
  diseases: [{ type: String }],
  // Assistant - linked to doctor
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('User', userSchema)
