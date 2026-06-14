const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()

const app = express()

// Middleware
app.use(cors({ 
  origin: 'https://doctor-hub-wfbw.vercel.app', 
  credentials: true 
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/doctors', require('./routes/doctors'))
app.use('/api/appointments', require('./routes/appointments'))
app.use('/api/payments', require('./routes/payments'))
app.use('/api/history', require('./routes/history'))
app.use('/api/prescriptions', require('./routes/prescriptions'))
app.use('/api/users', require('./routes/users'))

// Health check
app.get('/api/health', (req, res) => res.json({ 
  status: 'OK', 
  message: 'Doctor Hub API is running' 
}))

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: err.message || 'Server Error' })
})

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err.message))

module.exports = app;
