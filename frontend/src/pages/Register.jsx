import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const roles = [
  { id: 'patient', icon: '🙋', label: 'Patient' },
  { id: 'doctor', icon: '👨‍⚕️', label: 'Doctor' },
  { id: 'hospital', icon: '🏥', label: 'Hospital' },
  { id: 'assistant', icon: '💼', label: 'Assistant' },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'patient', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault(); setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    setLoading(true)
    try {
      const user = await register({ name: form.name, email: form.email, password: form.password, role: form.role, phone: form.phone })
      toast.success('Account created successfully! 🎉')
      const routes = { patient: '/patient/dashboard', doctor: '/doctor/dashboard', hospital: '/hospital/dashboard', assistant: '/assistant/dashboard' }
      navigate(routes[user.role] || '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-bg-circle" style={{ width: 280, height: 280, top: -70, right: -70 }} />
        <div className="auth-left-bg-circle" style={{ width: 180, height: 180, bottom: -50, left: '20%' }} />
        <div className="auth-left-logo">
          <div className="logo-mark" style={{ width: 46, height: 46, fontSize: 22 }}>🏥</div>
          <span>Doctor<b style={{color:'var(--primary-mid)'}}>Hub</b></span>
        </div>
        <h1 className="auth-headline">Join Pakistan's <em>largest</em> healthcare network</h1>
        <p className="auth-subtext">Whether you're a patient, doctor, or hospital — DoctorHub connects you with the right healthcare experience.</p>
        <div className="auth-features" style={{ marginTop: '2rem' }}>
          {[['🏥','Register as hospital — add all your specialists'],['👨‍⚕️','Individual doctors — build your patient base'],['🙋','Patients — find the right doctor instantly'],['🆓','Free to register, always']].map(([icon, text]) => (
            <div key={text} className="auth-feat"><div className="auth-feat-icon">{icon}</div>{text}</div>
          ))}
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-box">
          <h2 className="auth-form-title">Create account</h2>
          <p className="auth-form-sub">Join DoctorHub for free today</p>
          {error && <div className="alert alert-error">⚠️ {error}</div>}
          <div style={{ marginBottom: '1.1rem' }}>
            <div className="form-label" style={{ marginBottom: 8 }}>I am registering as... <span style={{color:'var(--red)'}}>*</span></div>
            <div className="role-grid">
              {roles.map(r => (
                <div key={r.id} className={`role-opt${form.role === r.id ? ' sel' : ''}`} onClick={() => setForm(f => ({ ...f, role: r.id }))}>
                  <div className="role-opt-icon">{r.icon}</div>
                  <div className="role-opt-label">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={submit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{form.role === 'hospital' ? 'Hospital Name' : 'Full Name'} <span>*</span></label>
                <input className="form-input" name="name" value={form.name} onChange={handle} placeholder={form.role === 'hospital' ? 'Shaukat Khanum Hospital' : 'Ali Hassan'} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" name="phone" value={form.phone} onChange={handle} placeholder="+92 300..." />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address <span>*</span></label>
              <input className="form-input" type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password <span>*</span></label>
                <input className="form-input" type="password" name="password" value={form.password} onChange={handle} placeholder="Min 6 chars" required />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password <span>*</span></label>
                <input className="form-input" type="password" name="confirm" value={form.confirm} onChange={handle} placeholder="Repeat" required />
              </div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 15 }}>
              {loading ? <span className="loading-spinner"/> : 'Create Account →'}
            </button>
          </form>
          <p className="auth-link">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
