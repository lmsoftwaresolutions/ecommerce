import React, { createContext, useState, useCallback, useEffect } from 'react'
import { saveToken, getToken, removeToken, decodeToken } from '../utils/token'
import { loginUser } from '../api/auth.api'


export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Restore token on mount
  useEffect(() => {
    const savedToken = getToken()
    if (savedToken) {
      try {
        const payload = decodeToken(savedToken)
        setToken(savedToken)
        setUser({
          id: payload.sub,
          role: payload.role,
        })
        setIsAuthenticated(true)
      } catch (error) {
        // Token invalid, clear it
        removeToken()
        setIsAuthenticated(false)
      }
    }
    setLoading(false)

    // Listen for global logout events (triggered by axios on 401)
    const handleLogoutEvent = () => {
      logout()
    }
    window.addEventListener('logout', handleLogoutEvent)
    return () => window.removeEventListener('logout', handleLogoutEvent)
  }, [])

  // login(credentials): calls backend, stores token and user info
  const login = useCallback(async (credentials) => {
    try {
      const data = await loginUser(credentials)
      const accessToken = data?.access_token || data?.token || null
      if (!accessToken) {
        throw new Error('No access token returned')
      }
      const payload = decodeToken(accessToken)
      saveToken(accessToken)
      setToken(accessToken)
      setUser({
        id: payload.sub,
        role: payload.role,
      })
      setIsAuthenticated(true)
      // Redirect after login based on role
      console.log('Decoded role:', payload.role)
      return {
        user: { id: payload.sub, role: payload.role },
        redirect:
          payload.role === 'ADMIN'
            ? '/admin/products'
            : '/products'
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    removeToken()
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const value = {
    user,
    role: user?.role,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
