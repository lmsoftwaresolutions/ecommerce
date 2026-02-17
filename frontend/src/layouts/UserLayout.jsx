import React from 'react'
import { useAuth } from '../hooks/useAuth'
import BaseNavbar from '../components/BaseNavbar'
import { Outlet , Link } from "react-router-dom"


// Navbar component with user info and links
function Navbar() {
  const { user, logout } = useAuth()
  
  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const linkStyle =
    "text-sm font-medium text-gray-700 hover:text-black transition"

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">
          <a href="/" className="text-xl font-bold text-gray-900 tracking-tight">
            E-Commerce
          </a>

          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders" >Orders</Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          <span className="text-sm text-gray-600">
            User: <span className="font-semibold text-gray-800">{user?.id}</span>
          </span>

          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  )
}

export function UserLayout({}) {
  return (
    <div className="min-h-screen bg-gray-50">

      <BaseNavbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

    </div>
  )
}
