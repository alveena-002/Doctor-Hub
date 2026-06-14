import Sidebar from '../../components/Sidebar'
const apts = [
  { id:1, patient:'Ali Hassan', doctor:'Dr. Sarah Ahmed', dept:'General', date:'2025-06-05', time:'10:00 AM', status:'confirmed', fee:1500 },
  { id:2, patient:'Sara Khan', doctor:'Dr. Nadia Khan', dept:'Neurology', date:'2025-06-05', time:'11:30 AM', status:'confirmed', fee:3500 },
  { id:3, patient:'Bilal Ahmed', doctor:'Dr. Farhan Baig', dept:'Cardiology', date:'2025-06-06', time:'9:00 AM', status:'pending', fee:3000 },
  { id:4, patient:'Fatima Noor', doctor:'Dr. Sarah Ahmed', dept:'General', date:'2025-06-07', time:'3:00 PM', status:'confirmed', fee:1500 },
]
const sb = { confirmed:'b-green', pending:'b-amber', completed:'b-blue', cancelled:'b-red' }
export default function HospitalAppointments() {
  return (
    <div className="app-layout"><Sidebar/>
      <main className="main-content">
        <div className="topbar"><div className="topbar-title"><h2>All Appointments</h2><p>Hospital-wide appointment overview</p></div></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:'1.5rem'}}>
          {[['Today',4,'si-blue'],['Confirmed',3,'si-green'],['Pending',1,'si-amber'],['Revenue','Rs. 9.5K','si-purple']].map(([l,v,c])=>(
            <div key={l} className="stat-card"><div><div className="stat-label">{l}</div><div className="stat-value" style={{fontSize:22}}>{v}</div></div><div className={`stat-icon ${c}`}><span style={{fontSize:18}}>📅</span></div></div>
          ))}
        </div>
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Patient</th><th>Doctor</th><th>Department</th><th>Date</th><th>Time</th><th>Fee</th><th>Status</th></tr></thead>
              <tbody>
                {apts.map(a=>(
                  <tr key={a.id}>
                    <td><strong>{a.patient}</strong></td>
                    <td>{a.doctor}</td>
                    <td><span className="badge b-teal">{a.dept}</span></td>
                    <td>{a.date}</td><td>{a.time}</td>
                    <td>Rs. {a.fee.toLocaleString()}</td>
                    <td><span className={`badge ${sb[a.status]}`}>{a.status}</span></td>
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
