import React from 'react'

export function OrderCard({ order }) {
  const { id, total_amount, status, created_at } = order || {}

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return dateString
    }
  }

  const statusStyle =
    status === 'completed'
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"

  return (
    <a href={`/orders/${id}`} className="block">
      <div className="border border-gray-200 rounded-2xl p-5 transition hover:shadow-md hover:border-gray-300 bg-white">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Left Section */}
          <div>
            <h2 className="font-semibold text-lg text-gray-800 mb-1">
              Order #{id}
            </h2>
            <p className="text-sm text-gray-500">
              {formatDate(created_at)}
            </p>
          </div>

          {/* Right Section */}
          <div className="sm:text-right space-y-2">

            <div className="text-xl font-bold text-gray-900">
              ${(total_amount || 0).toFixed(2)}
            </div>

            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${statusStyle}`}
            >
              {status}
            </span>

          </div>

        </div>

      </div>
    </a>
  )
}

export default OrderCard
