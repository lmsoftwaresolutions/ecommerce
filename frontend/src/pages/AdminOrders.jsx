import React, { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '../api/admin.order.api'
import AdminOrderCard from '../components/AdminOrderCard'

const STATUS_OPTIONS = ['pending', 'processing', 'completed', 'cancelled']

export function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(false)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const data = await getAllOrders()
      setOrders(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  const handleStatusChange = async (orderId, status) => {
    setUpdating(true)
    try {
      await updateOrderStatus(orderId, status)
      await fetchOrders()
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to update order')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-2xl font-bold text-gray-800">
          Orders Management
        </h2>

        {updating && (
          <span className="text-sm text-gray-500">
            Updating order...
          </span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-gray-500 text-sm animate-pulse">
          Loading orders...
        </div>
      ) : (
        <div className="space-y-4">

          {orders.length === 0 ? (
            <div className="text-gray-500 text-sm">
              No orders found.
            </div>
          ) : (
            orders.map((order) => (
              <AdminOrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                statusOptions={STATUS_OPTIONS}
              />
            ))
          )}

        </div>
      )}

    </div>
  )
}

export default AdminOrders
