import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { Calendar, Users, ClipboardList, Star, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const appointments = [
  { id: 1, patient: 'Ali Hassan', age: 28, disease: 'Fever', date: '2025-06-05', time: '10:00 AM', status: 'confirmed' },
  { id: 2, patient: 'Sara Khan', age: 35, disease: 'Migraine', date: '2025-06-05', time: '11:00 AM', status: 'confirmed' },
  { id: 3, patient: 'Bilal Ahmed', age: 42, disease: 'BP', date: '2025-06-06', time: '9:00 AM', status: 'pending' },
  { id: 4, patient: 'Fatima Noor', age: 22, disease: 'Skin Allergy', date: '2025-06-07', time: '3:00 PM', status: 'confirmed' },
]
const statusBadge = { confirmed: 'badge-green', pending: 'badge-amber', completed: 'badge-blue' }

export default function DoctorDashboard() {
  const { user } = useAuth()
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>Good morning, {user?.name?.split(' ')[0]} 👨‍⚕️</h2>
            <p>You have 4 appointments today</p>
          </div>
          <div className="topbar-actions">
            <Link to="/doctor/prescriptions" className="btn btn-primary"><Plus size={15} /> New Prescription</Link>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Today's Appointments</div><div className="stat-value">4</div><div className="stat-change">↑ 1 from yesterday</div></div>
            <div className="stat-card-icon icon-teal"><Calendar size={20} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Total Patients</div><div className="stat-value">148</div><div className="stat-change">+12 this month</div></div>
            <div className="stat-card-icon icon-blue"><Users size={20} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Prescriptions</div><div className="stat-value">320</div><div className="stat-change">Issued total</div></div>
            <div className="stat-card-icon icon-purple"><ClipboardList size={20} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Rating</div><div className="stat-value">4.9</div><div className="stat-change">Based on 87 reviews</div></div>
            <div className="stat-card-icon icon-amber"><Star size={20} /></div>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <div className="section-title">Upcoming Appointments</div>
            <Link to="/doctor/appointments" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>Patient</th><th>Age</th><th>Disease/Complaint</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {appointments.map(apt => (
                  <tr key={apt.id}>
                    <td><strong>{apt.patient}</strong></td>
                    <td>{apt.age} yrs</td>
                    <td>{apt.disease}</td>
                    <td>{apt.date}</td>
                    <td>{apt.time}</td>
                    <td><span className={`badge ${statusBadge[apt.status]}`}>{apt.status}</span></td>
                    <td><Link to="/doctor/prescriptions" className="btn btn-sm btn-secondary">Prescribe</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
