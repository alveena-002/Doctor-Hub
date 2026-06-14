import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Search, MapPin, Star, Clock, Building2, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

const hospitals = [
  { id:1, name:'Shaukat Khanum Hospital', city:'Lahore', type:'Multi-Specialty', rating:4.9, doctors:24, beds:400, timing:'24/7', verified:true, premium:true, emoji:'🏥', specs:['Oncology','Cardiology','General','Surgery'], desc:'Pakistan\'s leading cancer hospital with world-class facilities.' },
  { id:2, name:'Aga Khan Hospital', city:'Karachi', type:'Private Hospital', rating:4.8, doctors:38, beds:700, timing:'24/7', verified:true, premium:true, emoji:'🏨', specs:['Neurology','Gynecology','Herbal','Pediatrics'], desc:'Internationally accredited hospital with comprehensive healthcare.' },
  { id:3, name:'PIMS Hospital', city:'Islamabad', type:'Government', rating:4.3, doctors:18, beds:1200, timing:'24/7', verified:true, premium:false, emoji:'🏦', specs:['Cardiology','Orthopedics','General'], desc:'Federal government hospital providing affordable healthcare.' },
  { id:4, name:'Services Hospital', city:'Lahore', type:'Government', rating:4.2, doctors:32, beds:1500, timing:'24/7', verified:true, premium:false, emoji:'🏛️', specs:['Emergency','Surgery','Internal Medicine'], desc:'One of Lahore\'s largest public hospitals.' },
  { id:5, name:'Hamdard Clinic', city:'Karachi', type:'Herbal/Unani', rating:4.6, doctors:10, beds:50, timing:'9AM-9PM', verified:true, premium:false, emoji:'🌿', specs:['Herbal','Homeopathic','Unani'], desc:'Specialist in traditional and herbal medicine treatments.' },
  { id:6, name:'Riphah International Hospital', city:'Islamabad', type:'Teaching Hospital', rating:4.5, doctors:20, beds:300, timing:'24/7', verified:true, premium:false, emoji:'🎓', specs:['General','Dental','Eye','Pediatrics'], desc:'Modern teaching hospital affiliated with Riphah University.' },
]

export default function PatientHospitals() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('All')
  const [selected, setSelected] = useState(null)

  const cities = ['All','Lahore','Karachi','Islamabad']
  const filtered = hospitals.filter(h => {
    const ms = !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.specs.some(s=>s.toLowerCase().includes(search.toLowerCase()))
    const mc = city==='All' || h.city===city
    return ms && mc
  })

  return (
    <div className="app-layout">
      <Sidebar/>
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title"><h2>Hospitals</h2><p>Browse {hospitals.length} verified hospitals across Pakistan</p></div>
        </div>

        <div className="card" style={{marginBottom:'1.5rem',padding:'1rem 1.25rem'}}>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
            <div className="search-bar" style={{flex:1,minWidth:220}}>
              <Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search hospitals, specialties..."/>
            </div>
            {cities.map(c=>(
              <button key={c} onClick={()=>setCity(c)} className={`btn btn-sm ${city===c?'btn-primary':'btn-ghost'}`}>{c==='All'?'All Cities':c}</button>
            ))}
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16}}>
          {filtered.map(h=>(
            <div key={h.id} className="hospital-card">
              <div className="hc-header">
                <div className="hc-logo" style={{fontSize:26}}>{h.emoji}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
                    <div className="hc-name">{h.name}</div>
                    {h.verified && <span className="badge b-green" style={{fontSize:10}}>✓ Verified</span>}
                    {h.premium && <span className="badge b-purple" style={{fontSize:10}}>⭐ Premium</span>}
                  </div>
                  <div className="hc-loc"><MapPin size={11}/>{h.city} · {h.type}</div>
                </div>
              </div>
              <div className="hc-stats">
                <div className="hc-stat"><Star size={12} style={{color:'#F39C12'}}/>{h.rating}</div>
                <div className="hc-stat"><span>👨‍⚕️</span>{h.doctors} doctors</div>
                <div className="hc-stat"><Clock size={12}/>{h.timing}</div>
                <div className="hc-stat"><Building2 size={12}/>{h.beds} beds</div>
              </div>
              <p style={{fontSize:12.5,color:'var(--text-secondary)',marginBottom:10,lineHeight:1.5}}>{h.desc}</p>
              <div className="spec-chips">
                {h.specs.map(s=><span key={s} className="spec-chip sc-blue">{s}</span>)}
              </div>
              <div style={{display:'flex',gap:8,marginTop:14}}>
                <button className="btn btn-primary btn-sm" style={{flex:1,justifyContent:'center'}} onClick={()=>toast.success(`Viewing doctors at ${h.name}`)}>View Doctors</button>
                <button className="btn btn-ghost btn-sm" onClick={()=>setSelected(h)}>Details <ChevronRight size={13}/></button>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="modal-overlay" onClick={()=>setSelected(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">{selected.emoji} {selected.name}</div>
                <button className="modal-close" onClick={()=>setSelected(null)}>×</button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
                {[['📍 Location',selected.city],['🏥 Type',selected.type],['⭐ Rating',selected.rating+'/5'],['👨‍⚕️ Doctors',selected.doctors+' on staff'],['🛏️ Beds',selected.beds+' beds'],['🕐 Timing',selected.timing]].map(([l,v])=>(
                  <div key={l} style={{background:'var(--bg)',borderRadius:10,padding:'10px 12px'}}>
                    <div style={{fontSize:11.5,color:'var(--text-muted)',marginBottom:2}}>{l}</div>
                    <div style={{fontSize:14,fontWeight:600}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)',marginBottom:6,textTransform:'uppercase',letterSpacing:0.5}}>Specialties</div>
                <div className="spec-chips">{selected.specs.map(s=><span key={s} className="spec-chip sc-teal">{s}</span>)}</div>
              </div>
              <p style={{fontSize:13.5,color:'var(--text-secondary)',lineHeight:1.7,marginBottom:16}}>{selected.desc}</p>
              <button className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={()=>{setSelected(null);toast.success('Viewing doctors...')}}>
                Book with a Doctor Here →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
