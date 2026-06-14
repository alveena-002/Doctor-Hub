import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'

// Patient
import PatientDashboard from './pages/patient/Dashboard'
import PatientDoctors from './pages/patient/Doctors'
import PatientHospitals from './pages/patient/Hospitals'
import PatientAppointments from './pages/patient/Appointments'
import PatientHistory from './pages/patient/History'
import PatientProfile from './pages/patient/Profile'

// Doctor
import DoctorDashboard from './pages/doctor/Dashboard'
import DoctorAppointments from './pages/doctor/Appointments'
import { DoctorPatients, DoctorSchedule } from './pages/doctor/Appointments'
import DoctorPrescriptions from './pages/doctor/Prescriptions'
import DoctorReviews from './pages/doctor/Reviews'

// Hospital
import HospitalDashboard from './pages/hospital/Dashboard'
import HospitalDoctors from './pages/hospital/Doctors'
import HospitalAppointments from './pages/hospital/Appointments'
import HospitalDepartments from './pages/hospital/Departments'
import HospitalAnalytics from './pages/hospital/Analytics'

// Assistant
import AssistantDashboard from './pages/assistant/Dashboard'
import AssistantAppointments from './pages/assistant/Appointments'

// Admin
import AdminDashboard from './pages/admin/Dashboard'
import AdminDoctors from './pages/admin/Doctors'
import AdminUsers from './pages/admin/Users'
import AdminHospitals from './pages/admin/Hospitals'

// Super Admin
import SuperAdminDashboard from './pages/superadmin/Dashboard'

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spin"/></div>
  if (!user) return <Navigate to="/login" replace/>
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" replace/>
  return children
}

function RoleRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace/>
  const routes = { patient:'/patient/dashboard', doctor:'/doctor/dashboard', hospital:'/hospital/dashboard', assistant:'/assistant/dashboard', admin:'/admin/dashboard', superadmin:'/superadmin/dashboard' }
  return <Navigate to={routes[user.role] || '/login'} replace/>
}

function AppRoutes() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ style:{ fontFamily:'Inter,sans-serif', fontSize:13.5, borderRadius:10, boxShadow:'0 4px 20px rgba(0,0,0,0.12)' }}}/>
      <Routes>
        <Route path="/" element={<RoleRedirect/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>

        {/* Patient */}
        <Route path="/patient/dashboard" element={<ProtectedRoute roles={['patient']}><PatientDashboard/></ProtectedRoute>}/>
        <Route path="/patient/doctors" element={<ProtectedRoute roles={['patient']}><PatientDoctors/></ProtectedRoute>}/>
        <Route path="/patient/hospitals" element={<ProtectedRoute roles={['patient']}><PatientHospitals/></ProtectedRoute>}/>
        <Route path="/patient/appointments" element={<ProtectedRoute roles={['patient']}><PatientAppointments/></ProtectedRoute>}/>
        <Route path="/patient/history" element={<ProtectedRoute roles={['patient']}><PatientHistory/></ProtectedRoute>}/>
        <Route path="/patient/profile" element={<ProtectedRoute roles={['patient']}><PatientProfile/></ProtectedRoute>}/>

        {/* Doctor */}
        <Route path="/doctor/dashboard" element={<ProtectedRoute roles={['doctor']}><DoctorDashboard/></ProtectedRoute>}/>
        <Route path="/doctor/appointments" element={<ProtectedRoute roles={['doctor']}><DoctorAppointments/></ProtectedRoute>}/>
        <Route path="/doctor/patients" element={<ProtectedRoute roles={['doctor']}><DoctorPatients/></ProtectedRoute>}/>
        <Route path="/doctor/prescriptions" element={<ProtectedRoute roles={['doctor']}><DoctorPrescriptions/></ProtectedRoute>}/>
        <Route path="/doctor/schedule" element={<ProtectedRoute roles={['doctor']}><DoctorSchedule/></ProtectedRoute>}/>
        <Route path="/doctor/reviews" element={<ProtectedRoute roles={['doctor']}><DoctorReviews/></ProtectedRoute>}/>

        {/* Hospital */}
        <Route path="/hospital/dashboard" element={<ProtectedRoute roles={['hospital']}><HospitalDashboard/></ProtectedRoute>}/>
        <Route path="/hospital/doctors" element={<ProtectedRoute roles={['hospital']}><HospitalDoctors/></ProtectedRoute>}/>
        <Route path="/hospital/appointments" element={<ProtectedRoute roles={['hospital']}><HospitalAppointments/></ProtectedRoute>}/>
        <Route path="/hospital/departments" element={<ProtectedRoute roles={['hospital']}><HospitalDepartments/></ProtectedRoute>}/>
        <Route path="/hospital/analytics" element={<ProtectedRoute roles={['hospital']}><HospitalAnalytics/></ProtectedRoute>}/>

        {/* Assistant */}
        <Route path="/assistant/dashboard" element={<ProtectedRoute roles={['assistant']}><AssistantDashboard/></ProtectedRoute>}/>
        <Route path="/assistant/payments" element={<ProtectedRoute roles={['assistant']}><AssistantDashboard/></ProtectedRoute>}/>
        <Route path="/assistant/appointments" element={<ProtectedRoute roles={['assistant']}><AssistantAppointments/></ProtectedRoute>}/>

        {/* Admin */}
        <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin','superadmin']}><AdminDashboard/></ProtectedRoute>}/>
        <Route path="/admin/hospitals" element={<ProtectedRoute roles={['admin','superadmin']}><AdminHospitals/></ProtectedRoute>}/>
        <Route path="/admin/doctors" element={<ProtectedRoute roles={['admin','superadmin']}><AdminDoctors/></ProtectedRoute>}/>
        <Route path="/admin/users" element={<ProtectedRoute roles={['admin','superadmin']}><AdminUsers/></ProtectedRoute>}/>

        {/* Super Admin */}
        <Route path="/superadmin/dashboard" element={<ProtectedRoute roles={['superadmin']}><SuperAdminDashboard/></ProtectedRoute>}/>

        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </>
  )
}

export default function App() {
  return <AuthProvider><AppRoutes/></AuthProvider>
}
