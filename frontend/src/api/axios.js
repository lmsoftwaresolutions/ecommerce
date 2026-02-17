import axios from 'axios'
import { getToken, removeToken } from '../utils/token'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle 401: remove token and force logout (frontend reacts to storage/event)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      try {
        removeToken()
      } catch (e) {
        // ignore
      }
      // Notify app and redirect to login
      window.dispatchEvent(new Event('logout'))
      try {
        window.location.href = '/login'
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(error)
  }
)

export default api
