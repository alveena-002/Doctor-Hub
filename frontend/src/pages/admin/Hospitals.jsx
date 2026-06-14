import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Plus, Search } from 'lucide-react'
import toast from 'react-hot-toast'

const initHospitals = [
  { id:1, name:'Shaukat Khanum Hospital', city:'Lahore', type:'Multi-Specialty', doctors:24, status:'active', verified:true, email:'info@shaukatkhanum.org', phone:'042-35945100' },
  { id:2, name:'Aga Khan Hospital', city:'Karachi', type:'Private Hospital', doctors:38, status:'active', verified:true, email:'info@aku.edu', phone:'021-34930051' },
  { id:3, name:'PIMS Hospital', city:'Islamabad', type:'Government', doctors:18, status:'active', verified:true, email:'info@pims.gov.pk', phone:'051-9261170' },
  { id:4, name:'Hamdard Clinic', city:'Karachi', type:'Herbal/Unani', doctors:10, status:'active', verified:true, email:'info@hamdard.pk', phone:'021-32230087' },
  { id:5, name:'New City Hospital', city:'Faisalabad', type:'Private Hospital', doctors:8, status:'pending', verified:false, email:'admin@newcity.pk', phone:'041-8888999' },
]

export default function AdminHospitals() {
  const [hospitals, setHospitals] = useState(initHospitals)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name:'', city:'', type:'Private Hospital', email:'', phone:'' })

  const filtered = hospitals.filter(h => !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase()))

  const verify = id => { setHospitals(h=>h.map(hosp=>hosp.id===id?{...hosp,verified:true,status:'active'}:hosp)); toast.success('Hospital verified!') }
  const toggleStatus = id => setHospitals(h=>h.map(hosp=>hosp.id===id?{...hosp,status:hosp.status==='active'?'suspended':'active'}:hosp))

  const save = e => {
    e.preventDefault()
    setHospitals(h=>[...h,{id:Date.now(),...form,doctors:0,status:'pending',verified:false}])
    toast.success('Hospital added!')
    setShowModal(false)
    setForm({ name:'', city:'', type:'Private Hospital', email:'', phone:'' })
  }

  return (
    <div className="app-layout"><Sidebar/>
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title"><h2>Manage Hospitals</h2><p>{hospitals.length} hospitals registered</p></div>
          <div className="topbar-actions">
            <div className="search-bar"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search hospitals..."/></div>
            <button className="btn btn-primary" onClick={()=>setShowModal(true)}><Plus size={15}/>Add Hospital</button>
          </div>
        </div>
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Hospital</th><th>City</th><th>Type</th><th>Doctors</th><th>Verified</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(h=>(
                  <tr key={h.id}>
                    <td>
                      <div style={{fontWeight:600}}>🏥 {h.name}</div>
                      <div style={{fontSize:12,color:'var(--text-muted)'}}>{h.email}</div>
                    </td>
                    <td>{h.city}</td>
                    <td><span className="badge b-teal">{h.type}</span></td>
                    <td>{h.doctors}</td>
                    <td>
                      {h.verified ? <span className="badge b-green">✓ Verified</span>
                        : <button className="btn btn-xs btn-primary" onClick={()=>verify(h.id)}>Verify</button>}
                    </td>
                    <td><span className={`badge ${h.status==='active'?'b-green':h.status==='pending'?'b-amber':'b-red'}`}>{h.status}</span></td>
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        <button className="btn btn-ghost btn-xs" onClick={()=>toggleStatus(h.id)}>{h.status==='active'?'Suspend':'Activate'}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showModal && (
          <div className="modal-overlay" onClick={()=>setShowModal(false)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-header"><div className="modal-title">Add Hospital</div><button className="modal-close" onClick={()=>setShowModal(false)}>×</button></div>
              <form onSubmit={save}>
                <div className="form-group"><label className="form-label">Hospital Name <span>*</span></label><input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Hospital Name" required/></div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">City <span>*</span></label><input className="form-input" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} placeholder="Lahore" required/></div>
                  <div className="form-group"><label className="form-label">Type</label>
                    <select className="form-select" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
                      {['Private Hospital','Government','Multi-Specialty','Teaching Hospital','Herbal/Unani','Clinic'].map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
                  <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></div>
                </div>
                <button className="btn btn-primary" type="submit" style={{width:'100%',justifyContent:'center'}}>Add Hospital</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
