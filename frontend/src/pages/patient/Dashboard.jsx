import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { Calendar, FileText, Activity, Clock, Plus, Bell, Search, Star, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Total Appointments', value: '8', change: '↑ 2 this month', icon: Calendar, cls: 'si-blue' },
  { label: 'Medical Records', value: '12', change: 'Lifetime records', icon: FileText, cls: 'si-green' },
  { label: 'Upcoming Visits', value: '2', change: 'Next: Jun 5', icon: Clock, cls: 'si-amber' },
  { label: 'Prescriptions', value: '5', change: 'Active: 2', icon: Activity, cls: 'si-purple' },
]

const appointments = [
  { id: 1, doctor: 'Dr. Sarah Ahmed', hospital: 'Shaukat Khanum', spec: 'General Physician', date: '2025-06-05', time: '10:00 AM', status: 'confirmed', type: 'Allopathic' },
  { id: 2, doctor: 'Dr. Raza Malik', hospital: 'Solo Practice', spec: 'Homeopath', date: '2025-06-08', time: '3:00 PM', status: 'pending', type: 'Homeopathic' },
  { id: 3, doctor: 'Dr. Nadia Khan', hospital: 'Aga Khan', spec: 'Neurologist', date: '2025-05-28', time: '11:00 AM', status: 'completed', type: 'Allopathic' },
]

const quickDoctors = [
  { name: 'Dr. Sarah Ahmed', spec: 'General Physician', rating: 4.9, fee: 1500, avail: true, emoji: '👩‍⚕️', type: 'Allopathic' },
  { name: 'Dr. Raza Malik', spec: 'Homeopath', rating: 4.7, fee: 800, avail: true, emoji: '👨‍⚕️', type: 'Homeopathic' },
  { name: 'Dr. Usman Farooq', spec: 'Cardiologist', rating: 4.9, fee: 3000, avail: false, emoji: '👨‍⚕️', type: 'Allopathic' },
]

const statusBadge = { confirmed: 'b-green', pending: 'b-amber', completed: 'b-blue', cancelled: 'b-red' }

export default function PatientDashboard() {
  const { user } = useAuth()
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="hero-banner">
          <h1 className="hero-title">Good day, <em>{user?.name?.split(' ')[0]}</em> 👋</h1>
          <p className="hero-sub">Your health is in good hands. Here's your health summary.</p>
          <div className="hero-chips">
            <span className="hero-chip">🩺 2 upcoming appointments</span>
            <span className="hero-chip">💊 2 active prescriptions</span>
            <span className="hero-chip">📋 12 health records</span>
          </div>
        </div>

        <div className="topbar">
          <div className="topbar-title"><h2>Patient Dashboard</h2><p>Overview of your healthcare journey</p></div>
          <div className="topbar-actions">
            <div className="notif-bell btn btn-ghost btn-sm"><Bell size={16}/><span className="notif-dot"/></div>
            <Link to="/patient/doctors" className="btn btn-primary"><Plus size={15}/>Book Appointment</Link>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div><div className="stat-change">{s.change}</div></div>
              <div className={`stat-icon ${s.cls}`}><s.icon size={20}/></div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem' }}>
          <div className="card">
            <div className="section-header">
              <div className="section-title">Recent Appointments</div>
              <Link to="/patient/appointments" className="btn btn-ghost btn-sm">View all</Link>
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Doctor</th><th>Hospital</th><th>Type</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {appointments.map(a => (
                    <tr key={a.id}>
                      <td><div style={{fontWeight:600}}>{a.doctor}</div><div style={{fontSize:12,color:'var(--text-muted)'}}>{a.spec}</div></td>
                      <td style={{fontSize:13}}>{a.hospital}</td>
                      <td><span className={`badge ${a.type==='Allopathic'?'b-blue':a.type==='Homeopathic'?'b-teal':'b-amber'}`}>{a.type}</span></td>
                      <td>{a.date} <span style={{color:'var(--text-muted)',fontSize:12}}>{a.time}</span></td>
                      <td><span className={`badge ${statusBadge[a.status]}`}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="section-header">
              <div className="section-title">Top Doctors</div>
              <Link to="/patient/doctors" className="btn btn-ghost btn-sm">See all</Link>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {quickDoctors.map(d => (
                <div key={d.name} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                  <div style={{width:40,height:40,borderRadius:10,background:'var(--primary-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>{d.emoji}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:13.5,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{d.name}</div>
                    <div style={{fontSize:12,color:'var(--text-secondary)'}}>{d.spec}</div>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginTop:2}}>
                      <span style={{fontSize:12,color:'#F39C12',fontWeight:600}}>★ {d.rating}</span>
                      <span style={{fontSize:11.5,color:'var(--text-muted)'}}>Rs. {d.fee.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className={`badge ${d.avail?'b-green':'b-gray'}`} style={{fontSize:10.5}}>{d.avail?'Available':'Busy'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
