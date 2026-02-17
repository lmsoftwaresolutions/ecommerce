import React from 'react'
import BaseNavbar from '../components/BaseNavbar'
import { Outlet } from "react-router-dom"
export function AdminLayout({ }) {
  return (
    <div className="min-h-screen bg-gray-50">

      <BaseNavbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

    </div>
  )
}
