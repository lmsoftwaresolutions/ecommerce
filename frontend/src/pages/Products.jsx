import React, { useEffect, useState } from 'react'
// import { PublicLayout } from '../layouts/PublicLayout'
import { getAllProducts } from '../api/product.api'
import ProductCard from '../components/ProductCard'

export function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getAllProducts()
      .then((data) => {
        if (!mounted) return
        setProducts(data || [])
      })
      .catch((err) => {
        if (!mounted) return
        setError(err?.response?.data || err.message || 'Failed to load products')
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* <h2 className="text-2xl font-bold text-gray-800">
          
        </h2>

        <span className="text-sm text-gray-500">
          {products.length} items
        </span> */}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-sm text-gray-500 animate-pulse">
          Loading products...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {String(error)}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="p-10 text-center bg-white border border-gray-200 rounded-2xl shadow-sm">
              <p className="text-gray-600">
                No products available.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default Products
