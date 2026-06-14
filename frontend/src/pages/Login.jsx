import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Sun, Moon, Stethoscope, Building2, User, Shield, Briefcase, ChevronRight, Heart, Activity, Clock, Star, Zap } from 'lucide-react'

const ROLES = [
  { key: 'patient',   label: 'Patient',    icon: User,         color: '#0EA5A0', bg: '#E0F7F6', desc: 'Book appointments & view history' },
  { key: 'doctor',    label: 'Doctor',     icon: Stethoscope,  color: '#3B82F6', bg: '#EFF6FF', desc: 'Manage patients & prescriptions' },
  { key: 'hospital',  label: 'Hospital',   icon: Building2,    color: '#8B5CF6', bg: '#EDE9FE', desc: 'Oversee departments & analytics' },
  { key: 'assistant', label: 'Assistant',  icon: Briefcase,    color: '#F59E0B', bg: '#FEF3C7', desc: 'Handle payments & scheduling' },
  { key: 'admin',     label: 'Admin',      icon: Shield,       color: '#EF4444', bg: '#FEE2E2', desc: 'Manage platform & users' },
]

const FEATURES = [
  { icon: Heart,     text: 'Live vitals monitoring', sub: 'Real-time patient data' },
  { icon: Activity,  text: 'AI-powered diagnostics', sub: 'Smart health insights' },
  { icon: Clock,     text: 'Instant booking',        sub: 'Zero wait, confirmed in seconds' },
  { icon: Star,      text: '5-star verified doctors', sub: '2,400+ specialists listed' },
  { icon: Zap,       text: 'Digital prescriptions',  sub: 'Paperless & secure' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dark, setDark] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [featIdx, setFeatIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setFeatIdx(i => (i + 1) % FEATURES.length), 3000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.name.split(' ')[0]}! 👋`)
      const routes = { patient: '/patient/dashboard', doctor: '/doctor/dashboard', hospital: '/hospital/dashboard', assistant: '/assistant/dashboard', admin: '/admin/dashboard', superadmin: '/superadmin/dashboard' }
      navigate(routes[user.role] || '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally { setLoading(false) }
  }

  const demoLogin = (role) => {
    const demos = { patient: 'patient@demo.com', doctor: 'doctor@demo.com', hospital: 'hospital@demo.com', assistant: 'assistant@demo.com', admin: 'admin@demo.com' }
    setForm({ email: demos[role], password: 'demo1234' })
    setSelectedRole(role)
    toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials loaded!`)
  }

  const feat = FEATURES[featIdx]

  return (
    <div className={`login-v4${dark ? ' dark' : ''}`}>
      {/* ── LEFT PANEL ── */}
      <div className="lv4-left">
        {/* Animated blobs */}
        <div className="lv4-blob lv4-blob1" />
        <div className="lv4-blob lv4-blob2" />
        <div className="lv4-blob lv4-blob3" />

        <div className="lv4-left-content">
          {/* Logo */}
          <div className="lv4-logo">
            <div className="lv4-logo-mark">🏥</div>
            <span>Doctor<b>Hub</b></span>
          </div>

          {/* Headline */}
          <div className="lv4-headline">
            <h1>Pakistan ki <em>smartest</em><br/>healthcare platform</h1>
            <p>Verified doctors, instant booking, aur lifetime medical records — sab ek jagah.</p>
          </div>

          {/* Animated feature ticker */}
          <div className="lv4-ticker">
            <div className="lv4-ticker-icon" key={featIdx}>
              <feat.icon size={20} />
            </div>
            <div className="lv4-ticker-text" key={`t${featIdx}`}>
              <span className="lv4-ticker-main">{feat.text}</span>
              <span className="lv4-ticker-sub">{feat.sub}</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="lv4-stats">
            {[['2,400+','Doctors'],['180+','Hospitals'],['98%','Satisfaction'],['24/7','Support']].map(([n, l]) => (
              <div key={l} className="lv4-stat">
                <span className="lv4-stat-n">{n}</span>
                <span className="lv4-stat-l">{l}</span>
              </div>
            ))}
          </div>

          {/* Role cards — who can login */}
          <div className="lv4-who">
            <div className="lv4-who-label">Kaun login kar sakta hai?</div>
            <div className="lv4-role-cards">
              {ROLES.map(r => (
                <div key={r.key} className={`lv4-role-card${selectedRole === r.key ? ' selected' : ''}`}
                  onClick={() => demoLogin(r.key)}
                  title={`Demo: ${r.label}`}
                  style={{ '--rc': r.color, '--rb': r.bg }}>
                  <div className="lv4-rc-icon"><r.icon size={14}/></div>
                  <div className="lv4-rc-info">
                    <span className="lv4-rc-name">{r.label}</span>
                    <span className="lv4-rc-desc">{r.desc}</span>
                  </div>
                  <ChevronRight size={12} className="lv4-rc-arrow"/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="lv4-right">
        {/* Dark mode toggle */}
        <button className="lv4-theme-toggle" onClick={() => setDark(d => !d)} title="Toggle dark mode">
          {dark ? <Sun size={16}/> : <Moon size={16}/>}
          <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <div className="lv4-form-wrap">
          {/* Selected role badge */}
          {selectedRole && (
            <div className="lv4-role-badge" style={{ '--rc': ROLES.find(r=>r.key===selectedRole)?.color }}>
              {(() => { const R = ROLES.find(r=>r.key===selectedRole); return <><R.icon size={13}/> {R.label} Demo</> })()}
            </div>
          )}

          <h2 className="lv4-form-title">Welcome back 👋</h2>
          <p className="lv4-form-sub">Apne DoctorHub account mein sign in karein</p>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <form onSubmit={submit}>
            <div className="form-group">
              <label className="form-label">Email Address <span>*</span></label>
              <input className="form-input" type="email" name="email" value={form.email}
                onChange={handle} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Password <span>*</span></label>
              <div style={{ position: 'relative' }}>
                <input className="form-input" type={showPass ? 'text' : 'password'} name="password"
                  value={form.password} onChange={handle} placeholder="••••••••" required
                  style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)' }}>
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.1rem', marginTop:'-0.4rem' }}>
              <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'var(--text-2)', cursor:'pointer' }}>
                <input type="checkbox" style={{ accentColor:'var(--teal)' }}/> Remember me
              </label>
              <Link to="/forgot-password" style={{ fontSize:13, color:'var(--primary)', textDecoration:'none', fontWeight:500 }}>Forgot password?</Link>
            </div>

            <button className="btn btn-primary lv4-submit" type="submit" disabled={loading}
              style={{ width:'100%', justifyContent:'center', padding:'12px 20px', fontSize:15 }}>
              {loading ? <span className="loading-spinner"/> : <><span>Sign In</span><ChevronRight size={16}/></>}
            </button>
          </form>

          {/* Quick demo access */}
          <div className="auth-divider">Quick demo access — click to fill</div>
          <div className="lv4-demo-grid">
            {ROLES.map(r => (
              <button key={r.key} onClick={() => demoLogin(r.key)}
                className={`lv4-demo-btn${selectedRole === r.key ? ' active' : ''}`}
                style={{ '--rc': r.color, '--rb': r.bg }}>
                <r.icon size={13}/>
                <span>{r.label}</span>
              </button>
            ))}
          </div>

          <p className="auth-link" style={{ marginTop:'1.25rem' }}>
            New to DoctorHub? <Link to="/register">Create account</Link>
          </p>

          {/* Doctor app badge */}
          <div className="lv4-app-badge">
            <div className="lv4-app-icon">📱</div>
            <div>
              <div className="lv4-app-title">DoctorHub Mobile App</div>
              <div className="lv4-app-sub">Android & iOS pe available</div>
            </div>
            <div className="lv4-app-stores">
              <span>▶ Google Play</span>
              <span>🍎 App Store</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
