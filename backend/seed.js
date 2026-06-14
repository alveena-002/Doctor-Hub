const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')
dotenv.config()

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB')
  await User.deleteMany({})
  console.log('Cleared existing users')

  const users = [
    { name:'Super Admin', email:'superadmin@demo.com', password:'demo1234', role:'superadmin', phone:'+92-300-0000000' },
    { name:'Admin User', email:'admin@demo.com', password:'demo1234', role:'admin', phone:'+92-300-0000001' },
    // Hospital
    { name:'Shaukat Khanum Hospital', email:'hospital@demo.com', password:'demo1234', role:'hospital', phone:'+92-42-35945100', location:'Lahore' },
    // Doctors
    { name:'Dr. Sarah Ahmed', email:'doctor@demo.com', password:'demo1234', role:'doctor', specialty:'General Physician', treatmentType:'Allopathic', consultationFee:1500, experience:'12 years', location:'Lahore', rating:4.9, diseases:['fever','flu','diabetes'] },
    { name:'Dr. Raza Malik', email:'raza@demo.com', password:'demo1234', role:'doctor', specialty:'Homeopath', treatmentType:'Homeopathic', consultationFee:800, experience:'8 years', location:'Karachi', rating:4.7, diseases:['skin','allergy','migraine'] },
    { name:'Dr. Nadia Khan', email:'nadia@demo.com', password:'demo1234', role:'doctor', specialty:'Neurologist', treatmentType:'Allopathic', consultationFee:3500, experience:'15 years', location:'Karachi', rating:4.8, diseases:['neurology','headache','epilepsy'] },
    // Assistant
    { name:'Kamran Assistant', email:'assistant@demo.com', password:'demo1234', role:'assistant', phone:'+92-311-5556677' },
    // Patients
    { name:'Ali Hassan', email:'patient@demo.com', password:'demo1234', role:'patient', phone:'+92-300-1234567', age:28, bloodGroup:'B+' },
    { name:'Sara Khan', email:'sara@demo.com', password:'demo1234', role:'patient', phone:'+92-321-9876543', age:35, bloodGroup:'A+' },
  ]

  for (const u of users) {
    await User.create(u)
    console.log(`✅ Created: ${u.email} (${u.role})`)
  }

  console.log('\n🎉 Seed complete!')
  console.log('Patient:    patient@demo.com   / demo1234')
  console.log('Doctor:     doctor@demo.com    / demo1234')
  console.log('Hospital:   hospital@demo.com  / demo1234')
  console.log('Assistant:  assistant@demo.com / demo1234')
  console.log('Admin:      admin@demo.com     / demo1234')
  console.log('SuperAdmin: superadmin@demo.com/ demo1234')
  await mongoose.disconnect()
}
seedData().catch(err => { console.error(err); process.exit(1) })
