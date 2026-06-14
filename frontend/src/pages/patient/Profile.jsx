import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function PatientProfile() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', age: user?.age || '', bloodGroup: user?.bloodGroup || '', address: user?.address || '' })
  const [saving, setSaving] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    updateUser(form)
    toast.success('Profile updated!')
    setSaving(false)
  }

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>My Profile</h2>
            <p>Manage your personal information</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>
          <div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--blue-400)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, margin: '0 auto 14px' }}>{initials}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{user?.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 12px' }}>{user?.email}</div>
              <span className="badge badge-blue">Patient</span>
            </div>
          </div>

          <div className="card">
            <div className="section-title" style={{ marginBottom: '1.25rem' }}>Personal Information</div>
            <form onSubmit={save}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" name="name" value={form.name} onChange={handle} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-input" name="phone" value={form.phone} onChange={handle} placeholder="+92 300..." />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" name="email" value={form.email} onChange={handle} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input className="form-input" type="number" name="age" value={form.age} onChange={handle} placeholder="25" />
                </div>
                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <select className="form-select" name="bloodGroup" value={form.bloodGroup} onChange={handle}>
                    <option value="">Select</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <textarea className="form-textarea" name="address" value={form.address} onChange={handle} placeholder="Your address..." style={{ minHeight: 70 }} />
              </div>
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? <span className="loading-spinner" /> : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
