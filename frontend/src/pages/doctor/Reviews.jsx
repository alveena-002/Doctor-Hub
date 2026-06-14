import { useState } from 'react'
import Sidebar from '../../components/Sidebar'

const reviews = [
  { id:1, patient:'Ali Hassan', date:'2025-05-28', rating:5, comment:'Very professional and caring doctor. Explained everything clearly. Highly recommend!', appointment:'General Checkup' },
  { id:2, patient:'Sara Khan', date:'2025-05-20', rating:5, comment:'Excellent diagnosis. Treatment worked perfectly. Will definitely visit again.', appointment:'Flu Treatment' },
  { id:3, patient:'Bilal Ahmed', date:'2025-05-10', rating:4, comment:'Good doctor. Waited a bit long but consultation was thorough.', appointment:'BP Checkup' },
  { id:4, patient:'Fatima Noor', date:'2025-04-28', rating:5, comment:'Dr. Sarah is amazing! She patiently listened to all my concerns.', appointment:'Diabetes Follow-up' },
  { id:5, patient:'Hamid Javed', date:'2025-04-15', rating:4, comment:'Professional and knowledgeable. Prescribed right medicines.', appointment:'Seasonal Flu' },
]

const Stars = ({ r, size=14 }) => [...Array(5)].map((_,i) => <span key={i} style={{fontSize:size,color:i<r?'#F39C12':'#DDD'}}>★</span>)

export default function DoctorReviews() {
  const avg = (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1)
  const dist = [5,4,3,2,1].map(s=>({ star:s, count:reviews.filter(r=>r.rating===s).length, pct: Math.round(reviews.filter(r=>r.rating===s).length/reviews.length*100) }))

  return (
    <div className="app-layout"><Sidebar/>
      <main className="main-content">
        <div className="topbar"><div className="topbar-title"><h2>My Reviews</h2><p>Patient feedback and ratings</p></div></div>
        <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:'1.5rem',marginBottom:'1.5rem'}}>
          <div className="card" style={{textAlign:'center'}}>
            <div style={{fontSize:56,fontWeight:800,color:'var(--primary)',letterSpacing:-2}}>{avg}</div>
            <div style={{display:'flex',justifyContent:'center',gap:2,margin:'6px 0'}}><Stars r={Math.round(Number(avg))} size={20}/></div>
            <div style={{fontSize:13.5,color:'var(--text-secondary)',marginBottom:'1.25rem'}}>Based on {reviews.length} reviews</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {dist.map(d=>(
                <div key={d.star} style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:12,fontWeight:600,color:'var(--text-secondary)',minWidth:14}}>{d.star}</span>
                  <span style={{color:'#F39C12',fontSize:12}}>★</span>
                  <div className="progress-bar" style={{flex:1}}><div className="progress-fill" style={{width:`${d.pct}%`,background:'#F39C12'}}/></div>
                  <span style={{fontSize:12,color:'var(--text-muted)',minWidth:24}}>{d.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="section-title" style={{marginBottom:'1rem'}}>Patient Reviews</div>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {reviews.map(r=>(
                <div key={r.id} style={{padding:'14px',background:'var(--bg)',borderRadius:12,border:'1px solid var(--border)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:14}}>{r.patient}</div>
                      <div style={{fontSize:12,color:'var(--text-muted)'}}>{r.date} · {r.appointment}</div>
                    </div>
                    <div style={{display:'flex',gap:1}}><Stars r={r.rating}/></div>
                  </div>
                  <p style={{fontSize:13.5,color:'var(--text-secondary)',lineHeight:1.6}}>"{r.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
