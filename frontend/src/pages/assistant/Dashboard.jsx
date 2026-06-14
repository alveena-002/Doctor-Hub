import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const initPayments = [
  { id: 1, patient: 'Ali Hassan', doctor: 'Dr. Sarah Ahmed', amount: 1500, date: '2025-06-02', status: 'pending', screenshot: '📷' },
  { id: 2, patient: 'Sara Khan', doctor: 'Dr. Raza Malik', amount: 800, date: '2025-06-02', status: 'pending', screenshot: '📷' },
  { id: 3, patient: 'Bilal Ahmed', doctor: 'Dr. Usman Farooq', amount: 3000, date: '2025-06-01', status: 'verified', screenshot: '📷' },
  { id: 4, patient: 'Fatima Noor', doctor: 'Dr. Nadia Khan', amount: 600, date: '2025-06-01', status: 'rejected', screenshot: '📷' },
]

export default function AssistantDashboard() {
  const { user } = useAuth()
  const [payments, setPayments] = useState(initPayments)

  const pending = payments.filter(p => p.status === 'pending').length
  const verified = payments.filter(p => p.status === 'verified').length

  const verify = (id) => {
    setPayments(p => p.map(pay => pay.id === id ? { ...pay, status: 'verified' } : pay))
    toast.success('Payment verified! Appointment confirmed.')
  }
  const reject = (id) => {
    setPayments(p => p.map(pay => pay.id === id ? { ...pay, status: 'rejected' } : pay))
    toast.error('Payment rejected.')
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>Assistant Dashboard</h2>
            <p>Verify payments and manage appointments</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Pending Verification</div><div className="stat-value">{pending}</div><div className="stat-change">Requires action</div></div>
            <div className="stat-card-icon icon-amber"><Clock size={20} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Verified Today</div><div className="stat-value">{verified}</div><div className="stat-change">Appointments confirmed</div></div>
            <div className="stat-card-icon icon-teal"><CheckCircle size={20} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-info"><div className="stat-label">Total Revenue</div><div className="stat-value">Rs. {payments.filter(p => p.status === 'verified').reduce((s, p) => s + p.amount, 0).toLocaleString()}</div><div className="stat-change">Verified payments</div></div>
            <div className="stat-card-icon icon-blue"><CreditCard size={20} /></div>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <div className="section-title">Payment Verification Queue</div>
            <span className="badge badge-amber">{pending} pending</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>Patient</th><th>Doctor</th><th>Amount</th><th>Date</th><th>Screenshot</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {payments.map(pay => (
                  <tr key={pay.id}>
                    <td><strong>{pay.patient}</strong></td>
                    <td>{pay.doctor}</td>
                    <td>Rs. {pay.amount.toLocaleString()}</td>
                    <td>{pay.date}</td>
                    <td><span style={{ fontSize: 18 }}>{pay.screenshot}</span> <span style={{ fontSize: 12, color: 'var(--teal-600)', cursor: 'pointer' }}>View</span></td>
                    <td>
                      <span className={`badge ${pay.status === 'verified' ? 'badge-green' : pay.status === 'rejected' ? 'badge-red' : 'badge-amber'}`}>
                        {pay.status}
                      </span>
                    </td>
                    <td>
                      {pay.status === 'pending' && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-sm btn-primary" onClick={() => verify(pay.id)}>✓ Verify</button>
                          <button className="btn btn-sm btn-danger" onClick={() => reject(pay.id)}>✗</button>
                        </div>
                      )}
                    </td>
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
