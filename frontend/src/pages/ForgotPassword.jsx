import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/auth/forgot-password', { email })
      setSent(true)
      toast.success('Reset email sent!')
    } catch {
      toast.error('Email not found')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-logo">
            <div className="auth-logo-icon">🏥</div>
            <h1>Doctor Hub</h1>
          </div>
          <h2 className="auth-headline">Reset your <em>password</em></h2>
          <p className="auth-subtext">We'll send a secure reset link to your registered email address.</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-box">
          <h2 className="auth-form-title">Forgot password?</h2>
          <p className="auth-form-sub">Enter your email and we'll send a reset link</p>
          {sent ? (
            <div className="alert alert-success">
              ✅ Reset link sent to <strong>{email}</strong>. Please check your inbox.
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? <span className="loading-spinner" /> : 'Send Reset Link'}
              </button>
            </form>
          )}
          <p className="auth-link"><Link to="/login">← Back to sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
