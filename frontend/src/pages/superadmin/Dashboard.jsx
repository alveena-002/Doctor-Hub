import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { Shield, Users, Stethoscope, Activity, Database, Settings, TrendingUp, AlertTriangle } from 'lucide-react'

const systemStats = [
  { label: 'Total Users', value: '1,302', change: '+89 this month', icon: Users, color: 'icon-blue' },
  { label: 'Total Doctors', value: '24', change: '3 pending approval', icon: Stethoscope, color: 'icon-teal' },
  { label: 'System Uptime', value: '99.9%', change: 'Last 30 days', icon: Activity, color: 'icon-purple' },
  { label: 'Total Revenue', value: 'Rs. 2.4M', change: '↑ 18% this quarter', icon: TrendingUp, color: 'icon-amber' },
]

const systemLogs = [
  { time: '10:32 AM', action: 'New doctor registration: Dr. Farhan Baig', type: 'info' },
  { time: '09:45 AM', action: 'Payment verified for Ali Hassan → Dr. Sarah Ahmed', type: 'success' },
  { time: '09:12 AM', action: 'Failed login attempt: unknown@test.com (3 attempts)', type: 'warning' },
  { time: '08:55 AM', action: 'New patient registered: Zara Malik', type: 'info' },
  { time: '08:30 AM', action: 'System backup completed successfully', type: 'success' },
  { time: '07:15 AM', action: 'Scheduled maintenance completed', type: 'success' },
]

const logColors = { info: 'badge-blue', success: 'badge-green', warning: 'badge-amber', error: 'badge-red' }
const logIcons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' }

export default function SuperAdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>Super Admin Control 🔐</h2>
            <p>Full system access and monitoring</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-red" style={{ fontSize: 12 }}>⚡ Super Admin</span>
          </div>
        </div>

        {/* System Health Banner */}
        <div style={{ background: 'linear-gradient(135deg, var(--teal-800), var(--teal-600))', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>🏥</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Doctor Hub System — Operational</div>
              <div style={{ fontSize: 13, opacity: 0.75 }}>All services running normally · Last checked: just now</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['API', 'DB', 'Auth', 'Payments'].map(s => (
              <span key={s} style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                ✓ {s}
              </span>
            ))}
          </div>
        </div>

        <div className="stats-grid">
          {systemStats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-info">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-change">{s.change}</div>
              </div>
              <div className={`stat-card-icon ${s.color}`}><s.icon size={20} /></div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Quick Controls */}
          <div className="card">
            <div className="section-title" style={{ marginBottom: '1rem' }}>System Controls</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Manage Doctors', icon: '👨‍⚕️', to: '/admin/doctors', color: 'var(--teal-50)', border: 'var(--teal-200)' },
                { label: 'All Users', icon: '👥', to: '/admin/users', color: 'var(--blue-50)', border: 'var(--blue-100)' },
                { label: 'System Logs', icon: '📋', to: '#', color: 'var(--purple-50)', border: '#C9C5F7' },
                { label: 'Settings', icon: '⚙️', to: '#', color: 'var(--gray-50)', border: 'var(--gray-100)' },
                { label: 'Backup DB', icon: '💾', to: '#', color: 'var(--amber-50)', border: '#FAD896' },
                { label: 'Reports', icon: '📊', to: '#', color: 'var(--coral-50)', border: 'var(--coral-100)' },
              ].map(item => (
                <Link key={item.label} to={item.to}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px', borderRadius: 10, background: item.color, border: `1px solid ${item.border}`, textDecoration: 'none', color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, transition: 'transform 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* System Logs */}
          <div className="card">
            <div className="section-title" style={{ marginBottom: '1rem' }}>System Logs</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {systemLogs.map((log, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < systemLogs.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 14 }}>{logIcons[log.type]}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{log.action}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roles Summary */}
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div className="section-title" style={{ marginBottom: '1rem' }}>Role Distribution</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { role: 'Patients', count: 1248, icon: '🙋', badge: 'badge-blue' },
              { role: 'Doctors', count: 24, icon: '👨‍⚕️', badge: 'badge-green' },
              { role: 'Assistants', count: 8, icon: '💼', badge: 'badge-amber' },
              { role: 'Admins', count: 3, icon: '🛡️', badge: 'badge-purple' },
              { role: 'Super Admins', count: 1, icon: '🔐', badge: 'badge-red' },
            ].map(r => (
              <div key={r.role} style={{ flex: '1 1 140px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{r.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{r.count.toLocaleString()}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>{r.role}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
