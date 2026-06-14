import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { LayoutDashboard, Calendar, Users, FileText, CreditCard, Stethoscope, Search, Clock, Shield, LogOut, User, ClipboardList, Activity, Building2, Star } from 'lucide-react'

const navConfig = {
  patient: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/patient/dashboard' },
    { label: 'Find Doctors', icon: Search, to: '/patient/doctors' },
    { label: 'Hospitals', icon: Building2, to: '/patient/hospitals' },
    { label: 'Appointments', icon: Calendar, to: '/patient/appointments' },
    { label: 'Medical History', icon: FileText, to: '/patient/history' },
    { label: 'My Profile', icon: User, to: '/patient/profile' },
  ],
  doctor: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/doctor/dashboard' },
    { label: 'Appointments', icon: Calendar, to: '/doctor/appointments' },
    { label: 'My Patients', icon: Users, to: '/doctor/patients' },
    { label: 'Prescriptions', icon: ClipboardList, to: '/doctor/prescriptions' },
    { label: 'Schedule', icon: Clock, to: '/doctor/schedule' },
    { label: 'Reviews', icon: Star, to: '/doctor/reviews' },
  ],
  hospital: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/hospital/dashboard' },
    { label: 'Our Doctors', icon: Stethoscope, to: '/hospital/doctors' },
    { label: 'Appointments', icon: Calendar, to: '/hospital/appointments' },
    { label: 'Departments', icon: Building2, to: '/hospital/departments' },
    { label: 'Analytics', icon: Activity, to: '/hospital/analytics' },
  ],
  assistant: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/assistant/dashboard' },
    { label: 'Verify Payments', icon: CreditCard, to: '/assistant/payments', badge: '3' },
    { label: 'Appointments', icon: Calendar, to: '/assistant/appointments' },
  ],
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
    { label: 'Hospitals', icon: Building2, to: '/admin/hospitals' },
    { label: 'Doctors', icon: Stethoscope, to: '/admin/doctors' },
    { label: 'Users', icon: Users, to: '/admin/users' },
  ],
  superadmin: [
    { label: 'System Overview', icon: Activity, to: '/superadmin/dashboard' },
    { label: 'Hospitals', icon: Building2, to: '/admin/hospitals' },
    { label: 'Doctors', icon: Stethoscope, to: '/admin/doctors' },
    { label: 'All Users', icon: Users, to: '/admin/users' },
    { label: 'Admin Panel', icon: Shield, to: '/admin/dashboard' },
  ],
}

const roleColors = { patient: 'av-navy', doctor: 'av-teal', hospital: 'av-amber', assistant: 'av-amber', admin: 'av-purple', superadmin: 'av-amber' }
const roleLabels = { patient: 'Patient', doctor: 'Doctor', hospital: 'Hospital', assistant: 'Assistant', admin: 'Admin', superadmin: 'Super Admin' }

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); toast.success('Logged out!'); navigate('/login') }
  const navItems = navConfig[user?.role] || []
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() || 'U'

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">🏥</div>
        <div className="logo-text">Doctor<span>Hub</span></div>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-group-label">Main Menu</div>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <item.icon size={17} />
            {item.label}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user" onClick={handleLogout} title="Click to logout">
          <div className={`user-avatar ${roleColors[user?.role]}`}>{initials}</div>
          <div>
            <div className="sidebar-user-name">{user?.name || 'User'}</div>
            <div className="sidebar-user-role">{roleLabels[user?.role] || user?.role}</div>
          </div>
          <LogOut size={14} style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }} />
        </div>
      </div>
    </aside>
  )
}
