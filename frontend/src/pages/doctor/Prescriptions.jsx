import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'

const initPrescriptions = [
  { id: 1, patient: 'Ali Hassan', date: '2025-05-28', diagnosis: 'Seasonal Flu', medicines: 'Paracetamol 500mg TDS, ORS fluids', notes: 'Rest 3 days, avoid cold.' },
  { id: 2, patient: 'Sara Khan', date: '2025-05-20', diagnosis: 'Migraine', medicines: 'Sumatriptan 50mg PRN, Vitamin B2 200mg OD', notes: 'Avoid screen time, follow up in 4 weeks.' },
]

export default function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState(initPrescriptions)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ patient: '', diagnosis: '', medicines: '', notes: '' })

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const newP = { id: Date.now(), ...form, date: new Date().toISOString().split('T')[0] }
    setPrescriptions(p => [newP, ...p])
    setShowModal(false)
    setForm({ patient: '', diagnosis: '', medicines: '', notes: '' })
    toast.success('Prescription added!')
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>Prescriptions</h2>
            <p>Issue and manage patient prescriptions</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={15} /> New Prescription</button>
        </div>

        <div className="alert alert-warning">
          🔒 Prescriptions are <strong>permanent records</strong>. Once issued, they cannot be edited or deleted.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {prescriptions.map(p => (
            <div key={p.id} className="card card-sm">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.patient}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{p.date}</div>
                </div>
                <span className="badge badge-green">Issued</span>
              </div>
              <div style={{ background: 'var(--blue-50)', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--blue-600)', marginBottom: 4 }}>DIAGNOSIS</div>
                <div style={{ fontSize: 13 }}>{p.diagnosis}</div>
              </div>
              <div style={{ background: 'var(--teal-50)', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--teal-600)', marginBottom: 4 }}>💊 MEDICINES</div>
                <div style={{ fontSize: 13 }}>{p.medicines}</div>
              </div>
              {p.notes && <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📝 {p.notes}</div>}
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">New Prescription</div>
                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              </div>
              <form onSubmit={submit}>
                <div className="form-group">
                  <label className="form-label">Patient Name</label>
                  <input className="form-input" name="patient" value={form.patient} onChange={handle} placeholder="Patient name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Diagnosis</label>
                  <input className="form-input" name="diagnosis" value={form.diagnosis} onChange={handle} placeholder="e.g. Seasonal Flu" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Medicines</label>
                  <textarea className="form-textarea" name="medicines" value={form.medicines} onChange={handle} placeholder="Medicine name, dosage, frequency..." required />
                </div>
                <div className="form-group">
                  <label className="form-label">Doctor Notes</label>
                  <textarea className="form-textarea" name="notes" value={form.notes} onChange={handle} placeholder="Additional instructions..." />
                </div>
                <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Issue Prescription</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
