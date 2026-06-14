import Sidebar from '../../components/Sidebar'

const history = [
  { id: 1, date: '2025-05-28', doctor: 'Dr. Nadia Khan', type: 'Herbal', diagnosis: 'Digestive Issues', prescription: 'Triphala powder 1 tsp daily. Avoid spicy food. Drink warm water.', notes: 'Patient reported bloating and irregular digestion. Follow up in 2 weeks.' },
  { id: 2, date: '2025-05-15', doctor: 'Dr. Usman Farooq', type: 'Allopathic', diagnosis: 'Mild Hypertension', prescription: 'Amlodipine 5mg once daily. Low sodium diet. Daily 30 min walk.', notes: 'BP: 140/90. Started on calcium channel blocker. Monitor weekly.' },
  { id: 3, date: '2025-04-20', doctor: 'Dr. Sarah Ahmed', type: 'Allopathic', diagnosis: 'Seasonal Flu', prescription: 'Paracetamol 500mg TDS. ORS fluids. Rest for 3 days.', notes: 'Viral fever with body aches. Advised plenty of fluids.' },
  { id: 4, date: '2025-03-10', doctor: 'Dr. Raza Malik', type: 'Homeopathic', diagnosis: 'Chronic Migraine', prescription: 'Natrum Mur 200C weekly. Avoid screen time before bed.', notes: 'Monthly migraines, stress-induced. Constitutional treatment started.' },
]

export default function PatientHistory() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>Medical History</h2>
            <p>Your complete health records — permanent and secure</p>
          </div>
        </div>

        <div className="alert alert-warning">
          🔒 Medical history is <strong>permanent</strong>. Records cannot be deleted or modified per healthcare regulations.
        </div>

        <div className="timeline">
          {history.map(h => (
            <div key={h.id} className="timeline-item">
              <div className="timeline-dot" style={{ background: h.type === 'Allopathic' ? 'var(--blue-400)' : h.type === 'Homeopathic' ? 'var(--teal-400)' : 'var(--amber-400)' }} />
              <div className="timeline-date">{h.date}</div>
              <div className="timeline-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h4>{h.diagnosis}</h4>
                  <span className={`badge ${h.type === 'Allopathic' ? 'badge-blue' : h.type === 'Homeopathic' ? 'badge-green' : 'badge-amber'}`}>{h.type}</span>
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 8 }}>by {h.doctor}</p>
                <div style={{ background: 'var(--teal-50)', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--teal-600)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>💊 Prescription</div>
                  <p style={{ fontSize: 13 }}>{h.prescription}</p>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📝 {h.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
