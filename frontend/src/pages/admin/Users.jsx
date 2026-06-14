import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Search } from 'lucide-react'
import toast from 'react-hot-toast'

const initUsers = [
  { id: 1, name: 'Ali Hassan', email: 'ali@demo.com', role: 'patient', status: 'active', joined: '2025-01-10', phone: '+92-300-1234567' },
  { id: 2, name: 'Sara Khan', email: 'sara@demo.com', role: 'patient', status: 'active', joined: '2025-02-14', phone: '+92-321-9876543' },
  { id: 3, name: 'Dr. Sarah Ahmed', email: 'sarah@demo.com', role: 'doctor', status: 'active', joined: '2024-01-15', phone: '+92-333-1112233' },
  { id: 4, name: 'Kamran Asst', email: 'kamran@demo.com', role: 'assistant', status: 'active', joined: '2024-06-01', phone: '+92-311-5556677' },
  { id: 5, name: 'Admin User', email: 'admin@demo.com', role: 'admin', status: 'active', joined: '2023-12-01', phone: '+92-300-0000001' },
  { id: 6, name: 'Nadia Patient', email: 'nadia@demo.com', role: 'patient', status: 'suspended', joined: '2025-03-20', phone: '+92-345-8889990' },
]

const roleBadge = { patient: 'badge-blue', doctor: 'badge-green', assistant: 'badge-amber', admin: 'badge-purple', superadmin: 'badge-red' }

export default function AdminUsers() {
  const [users, setUsers] = useState(initUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const filtered = users.filter(u => {
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    return matchRole && matchSearch
  })

  const toggleStatus = (id) => {
    setUsers(u => u.map(usr => usr.id === id ? { ...usr, status: usr.status === 'active' ? 'suspended' : 'active' } : usr))
    toast.success('User status updated!')
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-title">
            <h2>Manage Users</h2>
            <p>{users.length} total registered users</p>
          </div>
          <div className="topbar-actions">
            <div className="search-bar">
              <Search size={16} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['all', 'patient', 'doctor', 'assistant', 'admin'].map(r => (
            <button key={r} className={`btn btn-sm ${roleFilter === r ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setRoleFilter(r)} style={{ textTransform: 'capitalize' }}>{r}</button>
          ))}
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{u.email}</td>
                    <td style={{ fontSize: 13 }}>{u.phone}</td>
                    <td><span className={`badge ${roleBadge[u.role] || 'badge-gray'}`}>{u.role}</span></td>
                    <td>{u.joined}</td>
                    <td><span className={`badge ${u.status === 'active' ? 'badge-green' : 'badge-red'}`}>{u.status}</span></td>
                    <td>
                      <button className={`btn btn-sm ${u.status === 'active' ? 'btn-danger' : 'btn-primary'}`}
                        onClick={() => toggleStatus(u.id)}>
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
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
