import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'

export function BaseNavbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const role = user?.role
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")   // SPA redirect instead of reload
  }

  const linkStyle =
    "text-sm font-medium text-gray-700 hover:text-black transition"

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-6">

          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
            E-Commerce
          </Link>

          <div className="hidden md:flex items-center gap-5">

            <Link to="/products" className={linkStyle}>
              Products
            </Link>

            {role === 'ADMIN' && (
              <>
                <Link to="/admin/products" className={linkStyle}>
                  Admin Products
                </Link>

                <Link to="/admin/orders" className={linkStyle}>
                  Admin Orders
                </Link>
              </>
            )}

            {role !== 'ADMIN' && isAuthenticated && (
              <>
                <Link to="/wishlist" className={linkStyle}>
                  Wishlist
                </Link>

                <Link to="/cart" className={linkStyle}>
                  Cart
                </Link>

                <Link to="/orders" className={linkStyle}>
                  Orders
                </Link>
              </>
            )}
          </div>
        </div>



        {/* Right Section */}
        <div className="flex items-center gap-4">

          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:block">
                User: <span className="font-semibold text-gray-800">{user?.id}</span>
              </span>

              {role !== 'ADMIN' && (
                <Link
                  to="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-black transition"
                >
                  Profile
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkStyle}>
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  )
}

export default BaseNavbar
