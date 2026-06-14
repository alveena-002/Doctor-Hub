import { useState } from 'react'
import Sidebar from '../../components/Sidebar'

const appointments = [
  { id: 1, doctor: 'Dr. Sarah Ahmed', specialty: 'General Physician', type: 'Allopathic', date: '2025-06-05', time: '10:00 AM', status: 'confirmed', fee: 1500, location: 'Lahore' },
  { id: 2, doctor: 'Dr. Raza Malik', specialty: 'Homeopath', type: 'Homeopathic', date: '2025-06-08', time: '3:00 PM', status: 'pending', fee: 800, location: 'Karachi' },
  { id: 3, doctor: 'Dr. Nadia Khan', specialty: 'Herbalist', type: 'Herbal', date: '2025-05-28', time: '11:00 AM', status: 'completed', fee: 600, location: 'Islamabad' },
  { id: 4, doctor: 'Dr. Usman Farooq', specialty: 'Cardiologist', type: 'Allopathic', date: '2025-05-15', time: '9:00 AM', status: 'completed', fee: 3000, location: 'Lahore' },
  { id: 5, doctor: 'Dr. Ayesha Siddiqui', specialty: 'Homeopath', type: 'Homeopathic', date: '2025-06-10', time: '2:00 PM', status: 'pending', fee: 1000, location: 'Lahore' },
]
const statusBadge = { confirmed: 'badge-green', pending: 'badge-amber', completed: 'badge-blue', cancelled: 'badge-red' }

export default function PatientAppointments() {
  const [tab, setTab] = useState('all')
  const filtered = tab === 'all' ? appointments : appointments.filter(a => a.status === tab)

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>My Appointments</h2>
            <p>Track all your booked appointments</p>
          </div>
        </div>

        <div className="tabs">
          {['all', 'confirmed', 'pending', 'completed'].map(t => (
            <div key={t} className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)} style={{ textTransform: 'capitalize' }}>{t}</div>
          ))}
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>Doctor</th><th>Specialty</th><th>Type</th><th>Date</th><th>Time</th><th>Location</th><th>Fee</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.map(apt => (
                  <tr key={apt.id}>
                    <td><strong>{apt.doctor}</strong></td>
                    <td>{apt.specialty}</td>
                    <td><span className={`badge ${apt.type === 'Allopathic' ? 'badge-blue' : apt.type === 'Homeopathic' ? 'badge-green' : 'badge-amber'}`}>{apt.type}</span></td>
                    <td>{apt.date}</td>
                    <td>{apt.time}</td>
                    <td>{apt.location}</td>
                    <td>Rs. {apt.fee.toLocaleString()}</td>
                    <td><span className={`badge ${statusBadge[apt.status]}`}>{apt.status}</span></td>
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
