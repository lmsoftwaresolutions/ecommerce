import React, { useEffect, useState } from 'react'
// import { UserLayout } from '../layouts/UserLayout'
import { getCart, updateCartItem, removeCartItem } from '../api/cart.api'
import { placeOrder } from '../api/order.api'
import CartItem from '../components/CartItem'

export function Cart() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)

  const fetchCart = async () => {
    try {
      setLoading(true)
      const data = await getCart()
      setItems(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    setUpdating(true)
    try {
      await updateCartItem(cartItemId, quantity)
      await fetchCart()
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to update item')
    } finally {
      setUpdating(false)
    }
  }

  const handleRemove = async (cartItemId) => {
    setUpdating(true)
    try {
      await removeCartItem(cartItemId)
      await fetchCart()
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to remove item')
    } finally {
      setUpdating(false)
    }
  }

  const handlePlaceOrder = async () => {
    setPlacingOrder(true)
    try {
      await placeOrder()
      window.location.href = '/orders'
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to place order')
      setPlacingOrder(false)
    }
  }

  const totalPrice = items
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2)

  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">
        Shopping Cart
      </h2>

      {/* Loading */}
      {loading && (
        <div className="text-sm text-gray-500 animate-pulse">
          Loading cart...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && items.length === 0 && (
        <div className="p-8 text-center bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-gray-600 mb-3">
            Your cart is empty.
          </p>

          <a
            href="/products"
            className="inline-block px-5 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Continue Shopping
          </a>
        </div>
      )}

      {/* Cart Items */}
      {!loading && !error && items.length > 0 && (
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">

          {/* Items List */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Summary Panel */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-fit space-y-4">

            <h3 className="font-semibold text-gray-800 text-lg">
              Order Summary
            </h3>

            <div className="flex justify-between text-gray-600 text-sm">
              <span>Total</span>
              <span className="font-semibold text-gray-900">
                ${totalPrice}
              </span>
            </div>

            <div className="space-y-3 pt-4">

              <button
                disabled={updating}
                className="w-full py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition disabled:opacity-60"
              >
                {updating ? 'Processing...' : 'Update Cart'}
              </button>

              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder || updating}
                className="w-full py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition disabled:opacity-60"
              >
                {placingOrder ? 'Placing Order...' : 'Place Order'}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default Cart
