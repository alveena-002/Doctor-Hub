import Sidebar from '../../components/Sidebar'

const apts = [
  { id: 1, patient: 'Ali Hassan', date: '2025-06-05', time: '10:00 AM', disease: 'Fever', status: 'confirmed' },
  { id: 2, patient: 'Sara Khan', date: '2025-06-05', time: '11:00 AM', disease: 'Migraine', status: 'confirmed' },
  { id: 3, patient: 'Bilal Ahmed', date: '2025-06-06', time: '9:00 AM', disease: 'Hypertension', status: 'pending' },
  { id: 4, patient: 'Fatima Noor', date: '2025-06-07', time: '3:00 PM', disease: 'Skin Allergy', status: 'confirmed' },
  { id: 5, patient: 'Hamid Javed', date: '2025-05-30', time: '4:00 PM', disease: 'Flu', status: 'completed' },
]
const statusBadge = { confirmed: 'badge-green', pending: 'badge-amber', completed: 'badge-blue' }

export function DoctorAppointments() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar"><div className="topbar-title"><h2>Appointments</h2><p>All your scheduled patient visits</p></div></div>
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Patient</th><th>Date</th><th>Time</th><th>Complaint</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {apts.map(a => (
                  <tr key={a.id}>
                    <td><strong>{a.patient}</strong></td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td>{a.disease}</td>
                    <td><span className={`badge ${statusBadge[a.status]}`}>{a.status}</span></td>
                    <td>
                      {a.status !== 'completed' && <button className="btn btn-sm btn-primary">Start</button>}
                      {a.status === 'completed' && <span className="badge badge-blue">Done</span>}
                    </td>
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

const patients = [
  { id: 1, name: 'Ali Hassan', age: 28, blood: 'B+', lastVisit: '2025-05-28', visits: 4, condition: 'Stable' },
  { id: 2, name: 'Sara Khan', age: 35, blood: 'A+', lastVisit: '2025-05-20', visits: 8, condition: 'Follow-up needed' },
  { id: 3, name: 'Bilal Ahmed', age: 42, blood: 'O+', lastVisit: '2025-04-15', visits: 2, condition: 'Stable' },
  { id: 4, name: 'Fatima Noor', age: 22, blood: 'AB-', lastVisit: '2025-03-10', visits: 3, condition: 'Resolved' },
]

export function DoctorPatients() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar"><div className="topbar-title"><h2>My Patients</h2><p>Patient history and records</p></div></div>
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Patient</th><th>Age</th><th>Blood Group</th><th>Total Visits</th><th>Last Visit</th><th>Condition</th></tr></thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.age} yrs</td>
                    <td><span className="badge badge-purple">{p.blood}</span></td>
                    <td>{p.visits}</td>
                    <td>{p.lastVisit}</td>
                    <td><span className={`badge ${p.condition === 'Stable' ? 'badge-green' : p.condition === 'Resolved' ? 'badge-blue' : 'badge-amber'}`}>{p.condition}</span></td>
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

const slots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function DoctorSchedule() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar"><div className="topbar-title"><h2>My Schedule</h2><p>Manage your availability</p></div></div>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {days.map(day => (
              <div key={day}>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--teal-600)', marginBottom: 8 }}>{day}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {slots.slice(0, 4).map((slot, i) => (
                    <div key={slot} style={{ padding: '6px 10px', borderRadius: 7, fontSize: 12, fontWeight: 500, background: i % 2 === 0 ? 'var(--teal-50)' : 'var(--gray-50)', color: i % 2 === 0 ? 'var(--teal-600)' : 'var(--gray-600)', border: '1px solid var(--border)' }}>
                      {slot} {i % 2 === 0 ? '✓' : ''}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DoctorAppointments
