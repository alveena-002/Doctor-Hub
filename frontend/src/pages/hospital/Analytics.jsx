import Sidebar from '../../components/Sidebar'
export default function HospitalAnalytics() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun']
  const vals = [42,58,51,67,73,80]
  const max = Math.max(...vals)
  return (
    <div className="app-layout"><Sidebar/>
      <main className="main-content">
        <div className="topbar"><div className="topbar-title"><h2>Analytics</h2><p>Hospital performance overview</p></div></div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:'1.5rem'}}>
          {[['Total Revenue','Rs. 2.4M','↑ 18%','si-green'],['Patients Served','1,248','↑ 87','si-blue'],['Avg Rating','4.9/5','312 reviews','si-amber'],['Bed Occupancy','72%','↑ 5%','si-purple']].map(([l,v,c,cls])=>(
            <div key={l} className="stat-card"><div><div className="stat-label">{l}</div><div className="stat-value" style={{fontSize:22}}>{v}</div><div className="stat-change">{c}</div></div><div className={`stat-icon ${cls}`}><span style={{fontSize:20}}>📊</span></div></div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginBottom:'1.5rem'}}>
          <div className="card">
            <div className="section-title" style={{marginBottom:'1.25rem'}}>Monthly Appointments</div>
            <div style={{display:'flex',alignItems:'flex-end',gap:10,height:140}}>
              {vals.map((v,i)=>(
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
                  <div style={{fontSize:11,fontWeight:700,color:'var(--primary)'}}>{v}</div>
                  <div style={{width:'100%',background:'var(--primary)',borderRadius:'4px 4px 0 0',height:`${(v/max)*100}%`,minHeight:8,transition:'height 0.5s'}}/>
                  <div style={{fontSize:11,color:'var(--text-muted)'}}>{months[i]}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="section-title" style={{marginBottom:'1rem'}}>Department Performance</div>
            {[{n:'Cardiology',v:88,c:'var(--accent)'},{n:'Neurology',v:75,c:'var(--purple)'},{n:'General',v:95,c:'var(--primary)'},{n:'Gynecology',v:82,c:'var(--pink)'},{n:'Oncology',v:70,c:'var(--blue)'}].map(p=>(
              <div key={p.n} style={{marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:4}}>
                  <span style={{fontWeight:500}}>{p.n}</span><span style={{color:p.c,fontWeight:700}}>{p.v}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{width:`${p.v}%`,background:p.c}}/></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="section-title" style={{marginBottom:'1rem'}}>Top Performing Doctors</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Doctor</th><th>Specialty</th><th>Patients</th><th>Revenue</th><th>Rating</th><th>Performance</th></tr></thead>
              <tbody>
                {[['Dr. Sarah Ahmed','General',148,'Rs. 222K',4.9,95],['Dr. Nadia Khan','Neurology',98,'Rs. 343K',4.8,88],['Dr. Farhan Baig','Cardiology',76,'Rs. 228K',4.7,82],['Dr. Zara Hussain','Gynecology',120,'Rs. 300K',4.8,90]].map(([n,s,p,r,rt,pf])=>(
                  <tr key={n}>
                    <td><strong>{n}</strong></td><td>{s}</td><td>{p}</td><td>{r}</td>
                    <td><span style={{color:'#F39C12',fontWeight:700}}>★ {rt}</span></td>
                    <td><div style={{display:'flex',alignItems:'center',gap:8}}><div className="progress-bar" style={{flex:1}}><div className="progress-fill" style={{width:`${pf}%`,background:'var(--primary)'}}/></div><span style={{fontSize:12,fontWeight:600,color:'var(--primary)'}}>{pf}%</span></div></td>
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
