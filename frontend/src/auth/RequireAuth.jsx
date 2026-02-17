import React from 'react'
import { useAuth } from '../hooks/useAuth'

export function RequireAuth({ children, allowedRoles = null }) {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>Please log in to continue.</p>
        <a href="/login">Go to Login</a>
      </div>
    )
  }

  // Check role if allowedRoles provided
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Forbidden</h2>
        <p>You do not have permission to access this resource.</p>
      </div>
    )
  }

  return children
}
