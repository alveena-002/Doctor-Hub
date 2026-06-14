import Sidebar from '../../components/Sidebar'
const apts = [
  { id: 1, patient: 'Ali Hassan', doctor: 'Dr. Sarah Ahmed', date: '2025-06-05', time: '10:00 AM', status: 'confirmed' },
  { id: 2, patient: 'Sara Khan', doctor: 'Dr. Raza Malik', date: '2025-06-08', time: '3:00 PM', status: 'confirmed' },
  { id: 3, patient: 'Bilal Ahmed', doctor: 'Dr. Usman Farooq', date: '2025-06-06', time: '9:00 AM', status: 'pending' },
]
export default function AssistantAppointments() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar"><div className="topbar-title"><h2>Appointments</h2><p>All confirmed and pending appointments</p></div></div>
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
              <tbody>
                {apts.map(a => (
                  <tr key={a.id}>
                    <td><strong>{a.patient}</strong></td>
                    <td>{a.doctor}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                    <td><span className={`badge ${a.status === 'confirmed' ? 'badge-green' : 'badge-amber'}`}>{a.status}</span></td>
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
