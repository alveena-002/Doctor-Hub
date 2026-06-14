import Sidebar from '../../components/Sidebar'
import { Users, Stethoscope, Calendar, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const recentDoctors = [
  { id: 1, name: 'Dr. Sarah Ahmed', specialty: 'General Physician', type: 'Allopathic', status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Dr. Raza Malik', specialty: 'Homeopath', type: 'Homeopathic', status: 'active', joined: '2024-03-10' },
  { id: 3, name: 'Dr. Nadia Khan', specialty: 'Herbalist', type: 'Herbal', status: 'pending', joined: '2025-05-28' },
  { id: 4, name: 'Dr. Usman Farooq', specialty: 'Cardiologist', type: 'Allopathic', status: 'active', joined: '2023-08-20' },
]

export default function AdminDashboard() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>Admin Dashboard 🛡️</h2>
            <p>System overview and management</p>
          </div>
          <div className="topbar-actions">
            <Link to="/admin/doctors" className="btn btn-primary">+ Add Doctor</Link>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Total Doctors</div><div className="stat-value">24</div><div className="stat-change">↑ 3 this month</div></div>
            <div className="stat-card-icon icon-teal"><Stethoscope size={20} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Total Patients</div><div className="stat-value">1,248</div><div className="stat-change">↑ 87 this month</div></div>
            <div className="stat-card-icon icon-blue"><Users size={20} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Appointments</div><div className="stat-value">342</div><div className="stat-change">This month</div></div>
            <div className="stat-card-icon icon-purple"><Calendar size={20} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Revenue</div><div className="stat-value">Rs. 485K</div><div className="stat-change">↑ 12% vs last month</div></div>
            <div className="stat-card-icon icon-amber"><TrendingUp size={20} /></div>
          </div>
        </div>

        {/* Treatment Type Distribution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="card">
            <div className="section-title" style={{ marginBottom: '1rem' }}>Treatment Types</div>
            {[
              { type: 'Allopathic', count: 14, pct: 58, color: 'var(--blue-400)' },
              { type: 'Homeopathic', count: 6, pct: 25, color: 'var(--teal-400)' },
              { type: 'Herbal', count: 4, pct: 17, color: 'var(--amber-400)' },
            ].map(t => (
              <div key={t.type} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ fontWeight: 500 }}>{t.type}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{t.count} doctors ({t.pct}%)</span>
                </div>
                <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${t.pct}%`, background: t.color, borderRadius: 4, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title" style={{ marginBottom: '1rem' }}>Quick Stats</div>
            {[
              { label: 'Active Users Today', value: '128', icon: '👥' },
              { label: 'Pending Verifications', value: '7', icon: '⏳' },
              { label: 'Avg. Appointments/Day', value: '18', icon: '📅' },
              { label: 'Patient Satisfaction', value: '94%', icon: '⭐' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '0.5px solid var(--border)' }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span style={{ fontSize: 13, flex: 1, color: 'var(--text-secondary)' }}>{s.label}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <div className="section-title">Recent Doctors</div>
            <Link to="/admin/doctors" className="btn btn-secondary btn-sm">Manage All</Link>
          </div>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>Name</th><th>Specialty</th><th>Type</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {recentDoctors.map(d => (
                  <tr key={d.id}>
                    <td><strong>{d.name}</strong></td>
                    <td>{d.specialty}</td>
                    <td><span className={`badge ${d.type === 'Allopathic' ? 'badge-blue' : d.type === 'Homeopathic' ? 'badge-green' : 'badge-amber'}`}>{d.type}</span></td>
                    <td>{d.joined}</td>
                    <td><span className={`badge ${d.status === 'active' ? 'badge-green' : 'badge-amber'}`}>{d.status}</span></td>
                    <td>
                      <button className="btn btn-sm btn-secondary">Edit</button>
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
