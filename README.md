# 🏥 Doctor Hub — Healthcare Consultation Platform
> Final Semester Project | Full-Stack Web Application

---

## 📋 Project Overview

Doctor Hub is a production-style healthcare consultation and patient history management system. Patients can search doctors by disease and treatment type (Allopathic, Homeopathic, Herbal), book appointments, and manage their full medical history securely.

---

## 🚀 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, React Router v6, Vite   |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB with Mongoose ODM         |
| Auth       | JWT (JSON Web Tokens)             |
| Styling    | Custom CSS (DM Sans font)         |
| Security   | bcryptjs password hashing, RBAC   |

---

## 👥 User Roles

| Role        | Access Level                                      |
|-------------|---------------------------------------------------|
| Patient     | Search doctors, book appointments, view history   |
| Doctor      | Manage appointments, issue prescriptions          |
| Assistant   | Verify payments, confirm bookings                 |
| Admin       | Manage doctors and users                          |
| Super Admin | Full system control + monitoring                  |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone / Download the project

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file (already included, update if needed):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/doctorhub
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

Start MongoDB, then seed demo data:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
Server runs at: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 🔑 Demo Credentials

| Role        | Email                   | Password   |
|-------------|-------------------------|------------|
| Patient     | patient@demo.com        | demo1234   |
| Doctor      | doctor@demo.com         | demo1234   |
| Assistant   | assistant@demo.com      | demo1234   |
| Admin       | admin@demo.com          | demo1234   |
| Super Admin | superadmin@demo.com     | demo1234   |

---

## 🗂️ Project Structure

```
doctor-hub/
├── frontend/                   # React App
│   ├── src/
│   │   ├── App.jsx             # Routes & protected routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx # JWT auth + user state
│   │   ├── components/
│   │   │   └── Sidebar.jsx     # Role-based navigation
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── ForgotPassword.jsx
│   │       ├── patient/        # Patient dashboard & pages
│   │       ├── doctor/         # Doctor dashboard & pages
│   │       ├── assistant/      # Assistant dashboard
│   │       ├── admin/          # Admin management
│   │       └── superadmin/     # Super admin control
│   └── index.html
│
└── backend/                    # Node/Express API
    ├── server.js               # App entry point
    ├── seed.js                 # Demo data seeder
    ├── models/
    │   ├── User.js             # Users + doctors
    │   ├── Appointment.js      # Appointments
    │   ├── Prescription.js     # Prescriptions + Medical History
    │   └── Payment.js          # Payment verification
    ├── routes/
    │   ├── auth.js             # Register, Login, Forgot password
    │   ├── doctors.js          # Doctor search & CRUD
    │   ├── appointments.js     # Booking workflow
    │   ├── payments.js         # Payment upload & verify
    │   ├── history.js          # Medical history (append-only)
    │   ├── prescriptions.js    # Prescription management
    │   └── users.js            # User management
    └── middleware/
        └── auth.js             # JWT verify + RBAC
```

---

## 📡 REST API Endpoints

| Method | Endpoint                      | Access           | Description              |
|--------|-------------------------------|------------------|--------------------------|
| POST   | /api/auth/register            | Public           | Register new user        |
| POST   | /api/auth/login               | Public           | Login + get JWT token    |
| POST   | /api/auth/forgot-password     | Public           | Request password reset   |
| GET    | /api/auth/me                  | Authenticated    | Get current user         |
| GET    | /api/doctors                  | Public           | Search & filter doctors  |
| POST   | /api/doctors                  | Admin            | Add new doctor           |
| PUT    | /api/doctors/:id              | Admin            | Update doctor            |
| POST   | /api/appointments             | Patient          | Book appointment         |
| GET    | /api/appointments             | Role-based       | Get appointments         |
| PUT    | /api/appointments/:id/status  | Doctor/Admin     | Update status            |
| POST   | /api/payments                 | Patient          | Upload payment proof     |
| GET    | /api/payments                 | Assistant/Admin  | View pending payments    |
| PUT    | /api/payments/:id/verify      | Assistant/Admin  | Verify or reject payment |
| GET    | /api/history                  | Patient/Doctor   | Get medical history      |
| POST   | /api/history                  | Doctor           | Add history record       |
| GET    | /api/prescriptions            | Patient/Doctor   | Get prescriptions        |
| POST   | /api/prescriptions            | Doctor           | Issue prescription       |
| GET    | /api/users                    | Admin            | List all users           |
| PUT    | /api/users/:id/status         | Admin            | Suspend/activate user    |

---

## 🔐 Security Features

- **JWT Authentication** — Stateless token-based auth
- **bcryptjs** — Password hashing (12 rounds)
- **RBAC** — Role-based middleware on every protected route
- **Express Validator** — Input validation & sanitization
- **Immutable Records** — Prescriptions & medical history cannot be deleted
- **Secure File Upload** — Multer with 5MB limit for payment screenshots

---

## 📊 Marks Distribution

| Module                | Marks |
|-----------------------|-------|
| Architecture Design   | 15    |
| Database Design       | 15    |
| Authentication & RBAC | 10    |
| Workflow Logic        | 15    |
| API & Backend         | 10    |
| Frontend UX           | 10    |
| Analytics & Reports   | 10    |
| Code Quality          | 5     |
| Deployment            | 5     |
| Viva & Presentation   | 5     |
| **Total**             | **100** |

---

## 🔮 Future Enhancements

- AI disease prediction
- Video consultation integration
- WhatsApp notifications (Twilio)
- E-prescription PDF generation
- Mobile app (React Native)

---

## 📝 Conclusion

Doctor Hub demonstrates a complete, production-style healthcare platform with advanced workflow management, RBAC implementation, secure medical record handling, appointment booking with payment verification, and a professional multi-role UI.

---

*Developed as Final Semester Project — Doctor Hub Healthcare Consultation Platform*
