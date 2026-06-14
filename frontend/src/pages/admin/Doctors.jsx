import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Plus, Search } from 'lucide-react'
import toast from 'react-hot-toast'

const initDoctors = [
  { id: 1, name: 'Dr. Sarah Ahmed', specialty: 'General Physician', type: 'Allopathic', fee: 1500, location: 'Lahore', status: 'active', experience: '12 years', email: 'sarah@demo.com' },
  { id: 2, name: 'Dr. Raza Malik', specialty: 'Homeopath', type: 'Homeopathic', fee: 800, location: 'Karachi', status: 'active', experience: '8 years', email: 'raza@demo.com' },
  { id: 3, name: 'Dr. Nadia Khan', specialty: 'Herbalist', type: 'Herbal', fee: 600, location: 'Islamabad', status: 'active', experience: '15 years', email: 'nadia@demo.com' },
  { id: 4, name: 'Dr. Usman Farooq', specialty: 'Cardiologist', type: 'Allopathic', fee: 3000, location: 'Lahore', status: 'inactive', experience: '20 years', email: 'usman@demo.com' },
  { id: 5, name: 'Dr. Ayesha Siddiqui', specialty: 'Homeopath', type: 'Homeopathic', fee: 1000, location: 'Lahore', status: 'active', experience: '10 years', email: 'ayesha@demo.com' },
]

const emptyForm = { name: '', specialty: '', type: 'Allopathic', fee: '', location: '', experience: '', email: '' }

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState(initDoctors)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)

  const filtered = doctors.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  )

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true) }
  const openEdit = (doc) => { setForm(doc); setEditId(doc.id); setShowModal(true) }

  const save = (e) => {
    e.preventDefault()
    if (editId) {
      setDoctors(d => d.map(doc => doc.id === editId ? { ...doc, ...form } : doc))
      toast.success('Doctor updated!')
    } else {
      setDoctors(d => [...d, { id: Date.now(), ...form, status: 'active' }])
      toast.success('Doctor added!')
    }
    setShowModal(false)
  }

  const toggleStatus = (id) => {
    setDoctors(d => d.map(doc => doc.id === id ? { ...doc, status: doc.status === 'active' ? 'inactive' : 'active' } : doc))
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>Manage Doctors</h2>
            <p>{doctors.length} doctors registered</p>
          </div>
          <div className="topbar-actions">
            <div className="search-bar">
              <Search size={16} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors..." />
            </div>
            <button className="btn btn-primary" onClick={openAdd}><Plus size={15} /> Add Doctor</button>
          </div>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>Name</th><th>Specialty</th><th>Type</th><th>Fee</th><th>Location</th><th>Experience</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(doc => (
                  <tr key={doc.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{doc.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{doc.email}</div>
                    </td>
                    <td>{doc.specialty}</td>
                    <td><span className={`badge ${doc.type === 'Allopathic' ? 'badge-blue' : doc.type === 'Homeopathic' ? 'badge-green' : 'badge-amber'}`}>{doc.type}</span></td>
                    <td>Rs. {Number(doc.fee).toLocaleString()}</td>
                    <td>{doc.location}</td>
                    <td>{doc.experience}</td>
                    <td>
                      <span className={`badge ${doc.status === 'active' ? 'badge-green' : 'badge-gray'}`} style={{ cursor: 'pointer' }}
                        onClick={() => toggleStatus(doc.id)}>{doc.status}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-sm btn-secondary" onClick={() => openEdit(doc)}>Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">{editId ? 'Edit Doctor' : 'Add New Doctor'}</div>
                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              </div>
              <form onSubmit={save}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" name="name" value={form.name} onChange={handle} placeholder="Dr. Name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" name="email" value={form.email} onChange={handle} placeholder="doctor@email.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Specialty</label>
                    <input className="form-input" name="specialty" value={form.specialty} onChange={handle} placeholder="e.g. Cardiologist" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Treatment Type</label>
                    <select className="form-select" name="type" value={form.type} onChange={handle}>
                      <option>Allopathic</option>
                      <option>Homeopathic</option>
                      <option>Herbal</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Consultation Fee (Rs.)</label>
                    <input className="form-input" type="number" name="fee" value={form.fee} onChange={handle} placeholder="1500" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input className="form-input" name="location" value={form.location} onChange={handle} placeholder="Lahore" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Experience</label>
                  <input className="form-input" name="experience" value={form.experience} onChange={handle} placeholder="e.g. 10 years" />
                </div>
                <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                  {editId ? 'Save Changes' : 'Add Doctor'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
