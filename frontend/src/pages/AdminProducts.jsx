import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../api/product.api'
import { createProduct, updateProduct, deleteProduct } from '../api/admin.product.api'
import ProductForm from '../components/ProductForm'

export function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await getAllProducts()
      setProducts(Array.isArray(data) ? data : [])
      setError(null)
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const handleCreate = () => {
    setEditing(null)
    setShowForm(true)
  }

  const handleEdit = (product) => {
    setEditing(product)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    setFormLoading(true)
    try {
      await deleteProduct(id)
      await fetchProducts()
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to delete product')
    } finally {
      setFormLoading(false)
    }
  }

  const handleFormSubmit = async (data) => {
    setFormLoading(true)
    try {
      if (editing) {
        await updateProduct(editing.id, data)
      } else {
        await createProduct(data)
      }
      setShowForm(false)
      await fetchProducts()
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to save product')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          Products Management
        </h2>

        <button
          onClick={handleCreate}
          className="px-5 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
        >
          + Create Product
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <ProductForm
            initial={editing}
            onSubmit={handleFormSubmit}
            loading={formLoading}
          />

          <button
            onClick={() => setShowForm(false)}
            className="mt-4 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-sm text-gray-500 animate-pulse">
          Loading products...
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-gray-600">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Price</th>
                <th className="px-5 py-3 font-semibold">Stock</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {p.name}
                  </td>

                  <td className="px-5 py-3 text-gray-700">
                    ${p.price?.toFixed ? p.price.toFixed(2) : p.price}
                  </td>

                  <td className="px-5 py-3 text-gray-700">
                    {p.stock}
                  </td>

                  <td className="px-5 py-3 text-right space-x-2">

                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-xs font-medium"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition text-xs font-medium"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  )
}

export default AdminProducts
