import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'

const initDepts = [
  { id:1, name:'Cardiology', head:'Dr. Farhan Baig', doctors:4, beds:40, appointments:12, color:'var(--accent-light)', text:'var(--accent)' },
  { id:2, name:'Neurology', head:'Dr. Nadia Khan', doctors:3, beds:25, appointments:8, color:'var(--purple-light)', text:'var(--purple)' },
  { id:3, name:'General Medicine', head:'Dr. Sarah Ahmed', doctors:8, beds:80, appointments:18, color:'var(--primary-light)', text:'var(--primary)' },
  { id:4, name:'Gynecology', head:'Dr. Zara Hussain', doctors:3, beds:30, appointments:6, color:'var(--pink-light)', text:'var(--pink)' },
  { id:5, name:'Oncology', head:'Dr. Imran Shah', doctors:5, beds:50, appointments:10, color:'var(--blue-light)', text:'var(--blue)' },
  { id:6, name:'Pediatrics', head:'Dr. Amna Rao', doctors:3, beds:35, appointments:9, color:'var(--amber-light)', text:'var(--amber)' },
]

export default function HospitalDepartments() {
  const [depts, setDepts] = useState(initDepts)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name:'', head:'', beds:'' })

  const save = e => {
    e.preventDefault()
    setDepts(d=>[...d,{ id:Date.now(), ...form, doctors:0, appointments:0, color:'var(--primary-light)', text:'var(--primary)' }])
    toast.success('Department added!')
    setShowModal(false)
    setForm({ name:'', head:'', beds:'' })
  }

  return (
    <div className="app-layout"><Sidebar/>
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title"><h2>Departments</h2><p>{depts.length} active departments</p></div>
          <button className="btn btn-primary" onClick={()=>setShowModal(true)}><Plus size={15}/>Add Department</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16}}>
          {depts.map(d=>(
            <div key={d.id} className="card" style={{borderTop:`4px solid ${d.text}`}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                <div style={{width:44,height:44,borderRadius:12,background:d.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🏥</div>
                <div><div style={{fontWeight:700,fontSize:15}}>{d.name}</div><div style={{fontSize:12.5,color:'var(--text-secondary)'}}>Head: {d.head}</div></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
                {[['Doctors',d.doctors,'👨‍⚕️'],[' Beds',d.beds,'🛏️'],['Today',d.appointments,'📅']].map(([l,v,icon])=>(
                  <div key={l} style={{background:'var(--bg)',borderRadius:8,padding:'8px',textAlign:'center'}}>
                    <div style={{fontSize:18}}>{icon}</div>
                    <div style={{fontSize:18,fontWeight:700,color:d.text}}>{v}</div>
                    <div style={{fontSize:11,color:'var(--text-muted)'}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <div className="modal-overlay" onClick={()=>setShowModal(false)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-header"><div className="modal-title">Add Department</div><button className="modal-close" onClick={()=>setShowModal(false)}>×</button></div>
              <form onSubmit={save}>
                <div className="form-group"><label className="form-label">Department Name <span>*</span></label><input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Orthopedics" required/></div>
                <div className="form-group"><label className="form-label">Department Head</label><input className="form-input" value={form.head} onChange={e=>setForm(f=>({...f,head:e.target.value}))} placeholder="Dr. Name"/></div>
                <div className="form-group"><label className="form-label">No. of Beds</label><input className="form-input" type="number" value={form.beds} onChange={e=>setForm(f=>({...f,beds:e.target.value}))} placeholder="30"/></div>
                <button className="btn btn-primary" type="submit" style={{width:'100%',justifyContent:'center'}}>Add Department</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
