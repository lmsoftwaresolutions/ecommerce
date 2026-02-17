import React from 'react'
import { Outlet , Link } from "react-router-dom"

// Navbar
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            E-Commerce
          </a>

          <a
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-black transition"
          >
            Products
          </a>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-black transition">
            Login
          </Link>

          <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-black transition">
            Register
          </Link>
        </div>

      </div>
    </nav>
  )
}

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

    </div>
  )
}
