import React, { useState } from 'react'

export function ProductForm({ initial, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    description: initial?.description || '',
    price: initial?.price || '',
    stock: initial?.stock || '',
    images: initial?.images || '',
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (!form.name || !form.price || !form.stock) {
      setError('Name, price, and stock are required')
      return
    }
    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    })
  }

  const inputStyle =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4"
    >

      <h2 className="text-xl font-semibold text-gray-800">
        Product Details
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className={inputStyle}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className={inputStyle}
          rows={3}
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className={inputStyle}
          required
          min="0"
          step="0.01"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          className={inputStyle}
          required
          min="0"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          name="images"
          value={form.images}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-60"
      >
        {loading ? 'Saving...' : 'Save Product'}
      </button>

    </form>
  )
}

export default ProductForm
