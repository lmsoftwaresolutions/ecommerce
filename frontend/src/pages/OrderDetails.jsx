import React, { useEffect, useState } from 'react'
import { UserLayout } from '../layouts/UserLayout'
import { getOrderById } from '../api/order.api'

function parseOrderIdFromPath() {
  const parts = window.location.pathname.split('/')
  return parts.length >= 3 ? parts[2] : null
}

export function OrderDetails() {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const id = parseOrderIdFromPath()

    if (!id) {
      setError('Invalid order id')
      setLoading(false)
      return
    }

    let mounted = true

    getOrderById(id)
      .then((data) => mounted && setOrder(data))
      .catch((err) => {
        if (!mounted) return
        setError(err?.response?.data?.detail || err.message || 'Failed to load order')
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return dateString
    }
  }

  const statusStyle =
    order?.status === 'completed'
      ? "bg-green-100 text-green-700"
      : order?.status === 'processing'
      ? "bg-blue-100 text-blue-700"
      : order?.status === 'cancelled'
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700"

  return (
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Loading */}
        {loading && (
          <div className="text-sm text-gray-500 animate-pulse">
            Loading order...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Order Content */}
        {order && (
          <div className="space-y-6">

            {/* Header */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Order #{order.id}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on {formatDate(order.created_at)}
                </p>
              </div>

              <span className={`px-4 py-1.5 text-sm font-semibold rounded-full w-fit ${statusStyle}`}>
                {order.status}
              </span>

            </div>

            {/* Items */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">

              <div className="p-5 border-b border-gray-200 font-semibold text-gray-800">
                Order Items
              </div>

              {order.items.length === 0 && (
                <div className="p-5 text-sm text-gray-500">
                  No items
                </div>
              )}

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-5 border-b last:border-none border-gray-100"
                >
                  <div>
                    <div className="font-medium text-gray-800">
                      {item.product_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} each
                    </div>
                    <div className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Total */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">

              <span className="text-lg font-semibold text-gray-700">
                Total Amount
              </span>

              <span className="text-2xl font-bold text-gray-900">
                ${order.total_amount.toFixed(2)}
              </span>

            </div>

          </div>
        )}

      </div>
  )
}

export default OrderDetails
