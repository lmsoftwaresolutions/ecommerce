import React, { useEffect, useState } from 'react'
import { UserLayout } from '../layouts/UserLayout'
import { getOrders } from '../api/order.api'
import OrderCard from '../components/OrderCard'

export function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    getOrders()
      .then((data) => {
        if (!mounted) return
        setOrders(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!mounted) return
        setError(err?.response?.data || err.message || 'Failed to load orders')
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          My Orders
        </h2>

        {/* Loading */}
        {loading && (
          <div className="text-sm text-gray-500 animate-pulse">
            Loading orders...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {String(error)}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="p-10 text-center bg-white border border-gray-200 rounded-2xl shadow-sm">
            <p className="text-gray-600 mb-3">
              You have no orders yet.
            </p>

            <a
              href="/products"
              className="inline-block px-5 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Start Shopping
            </a>
          </div>
        )}

        {/* Orders Grid */}
        {!loading && !error && orders.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

      </div>
  )
}

export default Orders
