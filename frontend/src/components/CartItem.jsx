import React from 'react'

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { id, quantity, product } = item

  const price = Number(product.price)
  const itemTotal = (price * quantity).toFixed(2)

  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1)
    }
  }

  const handleRemove = () => {
    onRemove(id)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b border-gray-200">

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">
          ${price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">

        <button
          onClick={handleDecrease}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-lg hover:bg-gray-100 transition"
        >
          −
        </button>

        <span className="min-w-[24px] text-center font-medium text-gray-800">
          {quantity}
        </span>

        <button
          onClick={handleIncrease}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-lg hover:bg-gray-100 transition"
        >
          +
        </button>

      </div>

      {/* Total */}
      <div className="sm:min-w-[100px] sm:text-right font-semibold text-gray-900">
        ${itemTotal}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition self-start sm:self-auto"
      >
        Remove
      </button>

    </div>
  )
}

export default CartItem
