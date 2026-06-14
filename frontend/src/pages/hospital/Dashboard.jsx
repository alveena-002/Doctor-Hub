import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { Users, Calendar, Star, TrendingUp, Plus, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { label:'Total Doctors', value:'24', change:'↑ 3 this month', icon:Users, cls:'si-blue' },
  { label:'Appointments Today', value:'38', change:'↑ 5 from yesterday', icon:Calendar, cls:'si-green' },
  { label:'Avg Rating', value:'4.9', change:'Based on 312 reviews', icon:Star, cls:'si-amber' },
  { label:'Revenue (Month)', value:'Rs. 485K', change:'↑ 12% vs last month', icon:TrendingUp, cls:'si-purple' },
]

const doctors = [
  { name:'Dr. Sarah Ahmed', spec:'General Physician', type:'Allopathic', status:'active', patients:148, rating:4.9 },
  { name:'Dr. Nadia Khan', spec:'Neurologist', type:'Allopathic', status:'active', patients:98, rating:4.8 },
  { name:'Dr. Farhan Baig', spec:'Cardiologist', type:'Allopathic', status:'active', patients:76, rating:4.7 },
  { name:'Dr. Zara Hussain', spec:'Gynecologist', type:'Allopathic', status:'on-leave', patients:120, rating:4.8 },
]

const depts = [
  { name:'Cardiology', doctors:4, appointments:12, color:'var(--accent-light)', textColor:'var(--accent)' },
  { name:'Neurology', doctors:3, appointments:8, color:'var(--purple-light)', textColor:'var(--purple)' },
  { name:'General', doctors:8, appointments:18, color:'var(--primary-light)', textColor:'var(--primary)' },
  { name:'Gynecology', doctors:3, appointments:6, color:'var(--pink-light)', textColor:'var(--pink)' },
  { name:'Oncology', doctors:5, appointments:10, color:'var(--blue-light)', textColor:'var(--blue)' },
  { name:'Pediatrics', doctors:3, appointments:9, color:'var(--amber-light)', textColor:'var(--amber)' },
]

export default function HospitalDashboard() {
  const { user } = useAuth()
  return (
    <div className="app-layout">
      <Sidebar/>
      <main className="main-content">
        <div className="hero-banner">
          <h1 className="hero-title">Welcome, <em>{user?.name}</em> 🏥</h1>
          <p className="hero-sub">Manage your hospital, doctors, departments and appointments from one place.</p>
          <div className="hero-chips">
            <span className="hero-chip">✓ Verified Hospital</span>
            <span className="hero-chip">⭐ Premium Listing</span>
            <span className="hero-chip">24 Doctors on Platform</span>
          </div>
        </div>
        <div className="topbar">
          <div className="topbar-title"><h2>Hospital Dashboard</h2><p>Complete overview of your hospital</p></div>
          <div className="topbar-actions">
            <Link to="/hospital/doctors" className="btn btn-primary"><Plus size={15}/>Add Doctor</Link>
          </div>
        </div>
        <div className="stats-grid">
          {stats.map(s=>(
            <div key={s.label} className="stat-card">
              <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div><div className="stat-change">{s.change}</div></div>
              <div className={`stat-icon ${s.cls}`}><s.icon size={20}/></div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginBottom:'1.5rem'}}>
          <div className="card">
            <div className="section-header">
              <div className="section-title">Departments</div>
              <Link to="/hospital/departments" className="btn btn-ghost btn-sm">Manage</Link>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {depts.map(d=>(
                <div key={d.name} style={{background:d.color,borderRadius:10,padding:'10px 12px'}}>
                  <div style={{fontWeight:700,fontSize:13.5,color:d.textColor}}>{d.name}</div>
                  <div style={{fontSize:12,color:'var(--text-secondary)',marginTop:4}}>👨‍⚕️ {d.doctors} doctors · 📅 {d.appointments} today</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="section-header">
              <div className="section-title">Performance</div>
            </div>
            {[{label:'Bed Occupancy',val:72,color:'var(--primary)'},{label:'Patient Satisfaction',val:94,color:'var(--green)'},{label:'Appointments Fulfilled',val:88,color:'var(--blue)'},{label:'Payment Success Rate',val:97,color:'var(--purple)'}].map(p=>(
              <div key={p.label} style={{marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:5}}>
                  <span style={{fontWeight:500}}>{p.label}</span>
                  <span style={{color:p.color,fontWeight:700}}>{p.val}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width:`${p.val}%`,background:p.color}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="section-header">
            <div className="section-title">Our Doctors</div>
            <Link to="/hospital/doctors" className="btn btn-ghost btn-sm">View all</Link>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Doctor</th><th>Specialty</th><th>Type</th><th>Total Patients</th><th>Rating</th><th>Status</th></tr></thead>
              <tbody>
                {doctors.map(d=>(
                  <tr key={d.name}>
                    <td><strong>{d.name}</strong></td>
                    <td>{d.spec}</td>
                    <td><span className="badge b-blue">{d.type}</span></td>
                    <td>{d.patients}</td>
                    <td><span style={{color:'#F39C12',fontWeight:700}}>★ {d.rating}</span></td>
                    <td><span className={`badge ${d.status==='active'?'b-green':'b-amber'}`}>{d.status}</span></td>
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
