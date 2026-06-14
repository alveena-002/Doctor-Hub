import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Search, Star, MapPin, Clock, Filter, Building2 } from 'lucide-react'
import toast from 'react-hot-toast'

const doctors = [
  { id:1, name:'Dr. Sarah Ahmed', spec:'General Physician', type:'Allopathic', hospital:'Shaukat Khanum', city:'Lahore', rating:4.9, exp:'12 yrs', fee:1500, avail:true, emoji:'👩‍⚕️', specialties:['Fever','Diabetes','Flu'], gender:'Female' },
  { id:2, name:'Dr. Raza Malik', spec:'Homeopath', type:'Homeopathic', hospital:'Solo Practice', city:'Karachi', rating:4.7, exp:'8 yrs', fee:800, avail:true, emoji:'👨‍⚕️', specialties:['Allergy','Migraine','Skin'], gender:'Male' },
  { id:3, name:'Dr. Nadia Khan', spec:'Neurologist', type:'Allopathic', hospital:'Aga Khan Hospital', city:'Karachi', rating:4.8, exp:'15 yrs', fee:3500, avail:false, emoji:'👩‍⚕️', specialties:['Neurology','Headache','Epilepsy'], gender:'Female' },
  { id:4, name:'Dr. Usman Farooq', spec:'Cardiologist', type:'Allopathic', hospital:'PIMS Hospital', city:'Islamabad', rating:4.9, exp:'20 yrs', fee:3000, avail:true, emoji:'👨‍⚕️', specialties:['Heart','BP','Cholesterol'], gender:'Male' },
  { id:5, name:'Dr. Ayesha Siddiqui', spec:'Homeopath', type:'Homeopathic', hospital:'Solo Practice', city:'Lahore', rating:4.6, exp:'10 yrs', fee:1000, avail:true, emoji:'👩‍⚕️', specialties:['Anxiety','Depression','Insomnia'], gender:'Female' },
  { id:6, name:'Dr. Tariq Mehmood', spec:'Herbalist', type:'Herbal', hospital:'Hamdard Clinic', city:'Karachi', rating:4.5, exp:'18 yrs', fee:700, avail:true, emoji:'👨‍⚕️', specialties:['Digestive','Weight','Joints'], gender:'Male' },
  { id:7, name:'Dr. Zara Hussain', spec:'Gynecologist', type:'Allopathic', hospital:'Services Hospital', city:'Lahore', rating:4.8, exp:'12 yrs', fee:2500, avail:true, emoji:'👩‍⚕️', specialties:['Gynecology','Pregnancy','Women Health'], gender:'Female' },
  { id:8, name:'Dr. Bilal Chaudhry', spec:'Dermatologist', type:'Allopathic', hospital:'Solo Practice', city:'Faisalabad', rating:4.7, exp:'9 yrs', fee:1800, avail:true, emoji:'👨‍⚕️', specialties:['Skin','Acne','Hair Loss'], gender:'Male' },
]

const typeColors = { Allopathic:'b-blue', Homeopathic:'b-teal', Herbal:'b-amber' }

export default function PatientDoctors() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [city, setCity] = useState('All')
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [bookModal, setBookModal] = useState(false)
  const [payModal, setPayModal] = useState(false)
  const [bookForm, setBookForm] = useState({ date:'', time:'', notes:'' })
  const [booked, setBooked] = useState(false)

  const cities = ['All','Lahore','Karachi','Islamabad','Faisalabad']
  const filtered = doctors.filter(d => {
    const ms = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.spec.toLowerCase().includes(search.toLowerCase()) || d.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const mt = type === 'All' || d.type === type
    const mc = city === 'All' || d.city === city
    return ms && mt && mc
  })

  const Stars = ({ r }) => [...Array(5)].map((_, i) => <span key={i} className={i < Math.floor(r) ? 'star-filled' : 'star-empty'}>★</span>)

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title"><h2>Find Doctors</h2><p>Search from {doctors.length} verified doctors across Pakistan</p></div>
        </div>

        {booked && <div className="alert alert-success">✅ Appointment booked! Waiting for payment verification.</div>}

        <div className="card" style={{marginBottom:'1.5rem',padding:'1rem 1.25rem'}}>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
            <div className="search-bar" style={{flex:1,minWidth:220}}>
              <Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by doctor, specialty, disease..."/>
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {['All','Allopathic','Homeopathic','Herbal'].map(t => (
                <button key={t} onClick={()=>setType(t)} className={`btn btn-sm ${type===t?'btn-primary':'btn-ghost'}`}>{t}</button>
              ))}
            </div>
            <select className="form-select" value={city} onChange={e=>setCity(e.target.value)} style={{width:140,padding:'8px 12px'}}>
              {cities.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{marginBottom:'0.75rem',color:'var(--text-secondary)',fontSize:13.5,fontWeight:500}}>{filtered.length} doctors found</div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:16}}>
          {filtered.map(doc => (
            <div key={doc.id} className="doctor-card">
              <div className="dc-header">
                <div className="dc-avatar" style={{background:'var(--primary-light)'}}>{doc.emoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="dc-name">{doc.name}</div>
                  <div className="dc-spec">{doc.spec}</div>
                  {doc.hospital !== 'Solo Practice' ? (
                    <div className="dc-hosp"><Building2 size={12}/>{doc.hospital}</div>
                  ) : (
                    <div className="dc-hosp" style={{color:'var(--text-muted)'}}>🏠 Solo Practice</div>
                  )}
                </div>
                <span className={`badge ${typeColors[doc.type]}`} style={{fontSize:10.5,alignSelf:'flex-start'}}>{doc.type}</span>
              </div>
              <div className="dc-meta">
                <span><span className="star-filled" style={{fontSize:12}}>★</span> {doc.rating}</span>
                <span><Clock size={12}/>{doc.exp}</span>
                <span><MapPin size={12}/>{doc.city}</span>
                <span style={{color:doc.gender==='Female'?'var(--pink)':'var(--blue)',fontSize:11.5}}>{doc.gender}</span>
              </div>
              <div className="spec-chips">
                {doc.specialties.slice(0,3).map(s => <span key={s} className="spec-chip sc-teal">{s}</span>)}
              </div>
              <div className="dc-footer">
                <div className="dc-fee">Rs. {doc.fee.toLocaleString()} <small>/ visit</small></div>
                <button className={`btn btn-sm ${doc.avail?'btn-primary':'btn-ghost'}`}
                  onClick={()=>{if(doc.avail){setSelectedDoc(doc);setBookModal(true)}}}
                  disabled={!doc.avail}>
                  {doc.avail?'Book Now':'Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {bookModal && selectedDoc && (
          <div className="modal-overlay" onClick={()=>setBookModal(false)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">Book Appointment</div>
                <button className="modal-close" onClick={()=>setBookModal(false)}>×</button>
              </div>
              <div style={{background:'var(--primary-light)',borderRadius:12,padding:'12px 14px',marginBottom:16,display:'flex',gap:12,alignItems:'center'}}>
                <span style={{fontSize:30}}>{selectedDoc.emoji}</span>
                <div>
                  <div style={{fontWeight:700,fontSize:15}}>{selectedDoc.name}</div>
                  <div style={{fontSize:13,color:'var(--primary-dark)'}}>{selectedDoc.spec}</div>
                  {selectedDoc.hospital !== 'Solo Practice' && <div style={{fontSize:12,color:'var(--text-secondary)',display:'flex',alignItems:'center',gap:4,marginTop:2}}><Building2 size={11}/>{selectedDoc.hospital}</div>}
                  <div style={{fontSize:14,fontWeight:700,color:'var(--primary)',marginTop:4}}>Rs. {selectedDoc.fee.toLocaleString()} / visit</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date <span>*</span></label>
                  <input className="form-input" type="date" value={bookForm.date} onChange={e=>setBookForm(f=>({...f,date:e.target.value}))} min={new Date().toISOString().split('T')[0]}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Time Slot <span>*</span></label>
                  <select className="form-select" value={bookForm.time} onChange={e=>setBookForm(f=>({...f,time:e.target.value}))}>
                    <option value="">Select slot</option>
                    {['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Symptoms / Notes</label>
                <textarea className="form-textarea" value={bookForm.notes} onChange={e=>setBookForm(f=>({...f,notes:e.target.value}))} placeholder="Describe your symptoms..."/>
              </div>
              <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px'}} disabled={!bookForm.date||!bookForm.time} onClick={()=>{setBookModal(false);setPayModal(true)}}>
                Proceed to Payment →
              </button>
            </div>
          </div>
        )}

        {payModal && selectedDoc && (
          <div className="modal-overlay" onClick={()=>setPayModal(false)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">Upload Payment</div>
                <button className="modal-close" onClick={()=>setPayModal(false)}>×</button>
              </div>
              <div className="alert alert-info">💳 Send <strong>Rs. {selectedDoc.fee.toLocaleString()}</strong> to <strong>JazzCash: 0300-1234567</strong></div>
              <div className="upload-box" onClick={()=>toast.success('Screenshot selected!')}>
                <div className="upload-icon">📷</div>
                <div className="upload-text">Click to upload payment screenshot</div>
                <div className="upload-sub">JPG, PNG · Max 5MB</div>
              </div>
              <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:16,padding:'12px'}} onClick={()=>{setPayModal(false);setBooked(true);toast.success('Booking submitted! Awaiting verification.')}}>
                Submit Booking ✓
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
