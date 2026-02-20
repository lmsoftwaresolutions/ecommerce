import React from 'react'

export function AdminOrderCard({ order, onStatusChange, statusOptions }) {
  const { id, user_id, total_amount, status, created_at } = order || {}

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return dateString
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-4 hover:shadow-md transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left Section */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-800">
            Order #{id}
          </h2>

          <p className="text-sm text-gray-500">
            User ID: <span className="font-medium text-gray-700">{user_id}</span>
          </p>

          <p className="text-sm text-gray-400">
            {formatDate(created_at)}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start md:items-end gap-2">

          <div className="text-2xl font-bold text-gray-900">
            ${(total_amount || 0).toFixed(2)}
          </div>

          <select
            value={status}
            onChange={e => onStatusChange(id, e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

        </div>

      </div>
    </div>
  )
}

export default AdminOrderCard
