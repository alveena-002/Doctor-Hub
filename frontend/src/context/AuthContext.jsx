import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://doctor-hub-nhjz.vercel.app/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('dh_token')
    const savedUser = localStorage.getItem('dh_user')
    if (token && savedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await axios.post('/auth/login', { email, password })
    localStorage.setItem('dh_token', data.token)
    localStorage.setItem('dh_user', JSON.stringify(data.user))
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    setUser(data.user)
    return data.user
  }

  const register = async (formData) => {
    const { data } = await axios.post('/auth/register', formData)
    localStorage.setItem('dh_token', data.token)
    localStorage.setItem('dh_user', JSON.stringify(data.user))
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('dh_token')
    localStorage.removeItem('dh_user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    localStorage.setItem('dh_user', JSON.stringify(updated))
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
