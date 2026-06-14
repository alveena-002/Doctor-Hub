import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Plus, Search } from 'lucide-react'
import toast from 'react-hot-toast'

const initDoctors = [
  { id:1, name:'Dr. Sarah Ahmed', spec:'General Physician', type:'Allopathic', dept:'General', fee:1500, status:'active', patients:148, rating:4.9, email:'sarah@hospital.com' },
  { id:2, name:'Dr. Nadia Khan', spec:'Neurologist', type:'Allopathic', dept:'Neurology', fee:3500, status:'active', patients:98, rating:4.8, email:'nadia@hospital.com' },
  { id:3, name:'Dr. Farhan Baig', spec:'Cardiologist', type:'Allopathic', dept:'Cardiology', fee:3000, status:'active', patients:76, rating:4.7, email:'farhan@hospital.com' },
  { id:4, name:'Dr. Zara Hussain', spec:'Gynecologist', type:'Allopathic', dept:'Gynecology', fee:2500, status:'on-leave', patients:120, rating:4.8, email:'zara@hospital.com' },
]
const depts = ['General','Cardiology','Neurology','Gynecology','Oncology','Pediatrics','Orthopedics','Dermatology']
const empty = { name:'', email:'', spec:'', type:'Allopathic', dept:'General', fee:'', experience:'' }

export default function HospitalDoctors() {
  const [doctors, setDoctors] = useState(initDoctors)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)

  const filtered = doctors.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.spec.toLowerCase().includes(search.toLowerCase()))
  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const openAdd = () => { setForm(empty); setEditId(null); setShowModal(true) }
  const openEdit = d => { setForm(d); setEditId(d.id); setShowModal(true) }

  const save = e => {
    e.preventDefault()
    if(editId) { setDoctors(d=>d.map(doc=>doc.id===editId?{...doc,...form}:doc)); toast.success('Doctor updated!') }
    else { setDoctors(d=>[...d,{id:Date.now(),...form,status:'active',patients:0,rating:0}]); toast.success('Doctor added to hospital!') }
    setShowModal(false)
  }

  return (
    <div className="app-layout">
      <Sidebar/>
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title"><h2>Our Doctors</h2><p>{doctors.length} doctors in your hospital</p></div>
          <div className="topbar-actions">
            <div className="search-bar"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search doctors..."/></div>
            <button className="btn btn-primary" onClick={openAdd}><Plus size={15}/>Add Doctor</button>
          </div>
        </div>
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Doctor</th><th>Specialty</th><th>Department</th><th>Type</th><th>Fee</th><th>Patients</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(d=>(
                  <tr key={d.id}>
                    <td><div style={{fontWeight:600}}>{d.name}</div><div style={{fontSize:12,color:'var(--text-muted)'}}>{d.email}</div></td>
                    <td>{d.spec}</td>
                    <td><span className="badge b-teal">{d.dept}</span></td>
                    <td><span className={`badge ${d.type==='Allopathic'?'b-blue':d.type==='Homeopathic'?'b-teal':'b-amber'}`}>{d.type}</span></td>
                    <td>Rs. {Number(d.fee).toLocaleString()}</td>
                    <td>{d.patients}</td>
                    <td><span style={{color:'#F39C12',fontWeight:700}}>★ {d.rating||'—'}</span></td>
                    <td><span className={`badge ${d.status==='active'?'b-green':d.status==='on-leave'?'b-amber':'b-gray'}`}>{d.status}</span></td>
                    <td><button className="btn btn-ghost btn-xs" onClick={()=>openEdit(d)}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showModal && (
          <div className="modal-overlay" onClick={()=>setShowModal(false)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">{editId?'Edit Doctor':'Add Doctor to Hospital'}</div>
                <button className="modal-close" onClick={()=>setShowModal(false)}>×</button>
              </div>
              <form onSubmit={save}>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Full Name <span>*</span></label><input className="form-input" name="name" value={form.name} onChange={handle} placeholder="Dr. Name" required/></div>
                  <div className="form-group"><label className="form-label">Email <span>*</span></label><input className="form-input" type="email" name="email" value={form.email} onChange={handle} required/></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Specialty <span>*</span></label><input className="form-input" name="spec" value={form.spec} onChange={handle} placeholder="e.g. Cardiologist" required/></div>
                  <div className="form-group"><label className="form-label">Department</label>
                    <select className="form-select" name="dept" value={form.dept} onChange={handle}>{depts.map(d=><option key={d}>{d}</option>)}</select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Treatment Type</label>
                    <select className="form-select" name="type" value={form.type} onChange={handle}><option>Allopathic</option><option>Homeopathic</option><option>Herbal</option></select>
                  </div>
                  <div className="form-group"><label className="form-label">Consultation Fee (Rs.)</label><input className="form-input" type="number" name="fee" value={form.fee} onChange={handle} placeholder="2000" required/></div>
                </div>
                <div className="form-group"><label className="form-label">Experience</label><input className="form-input" name="experience" value={form.experience} onChange={handle} placeholder="e.g. 10 years"/></div>
                <button className="btn btn-primary" type="submit" style={{width:'100%',justifyContent:'center'}}>{editId?'Save Changes':'Add to Hospital'}</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
