import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { getProductById } from '../api/product.api'
import { addToCart } from '../api/cart.api'
import { useAuth } from '../hooks/useAuth'

export function ProductDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [cartError, setCartError] = useState(null)
  const [activeImage, setActiveImage] = useState(0)

  const { isAuthenticated } = useAuth()


  useEffect(() => {
    if (!id) {
      setError("Invalid product id")
      setLoading(false)
      return
    }

    let mounted = true

    getProductById(id)
      .then((data) => {
        if (!mounted) return
        setProduct(data)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err?.response?.data || err.message || "Failed to load product")
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }

  }, [id])



  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    setAddingToCart(true)
    setCartError(null)

    try {
      await addToCart(product.id, quantity)
      navigate("/cart")
    } catch (err) {
      setCartError(err?.response?.data?.detail || err.message || "Failed to add to cart")
    } finally {
      setAddingToCart(false)
    }
  }



  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

      {/* Loading */}
      {loading && (
        <div className="text-gray-500 animate-pulse">
          Loading product...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {String(error)}
        </div>
      )}

      {/* Product */}
      {product && (
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT — IMAGE SECTION */}
          <div className="space-y-4">

            {/* Main Image */}
            <div className="relative bg-white rounded-3xl border shadow-sm p-8 flex items-center justify-center">
              <img
                src={product.images?.[activeImage] || product.image}
                alt={product.name}
                className="max-h-[480px] object-contain transition"
              />

              {product.images?.length > 1 && (
                <span className="absolute bottom-3 right-3 text-xs bg-black text-white px-3 py-1 rounded-full">
                  {activeImage + 1}/{product.images.length}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`border rounded-xl overflow-hidden min-w-[70px] h-[70px]
                      ${activeImage === i ? "border-black" : "border-gray-200"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>



          {/* RIGHT — INFO SECTION */}
          <div className="space-y-6">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-gray-900">
              ${product.price?.toFixed ? product.price.toFixed(2) : product.price}
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="text-sm text-gray-500">
              Stock:
              <span className="ml-2 font-semibold text-gray-800">
                {product.stock ?? "N/A"}
              </span>
            </div>


            {/* Quantity */}
            <div>
              <p className="text-sm font-medium mb-2">Quantity</p>

              <div className="flex items-center border rounded-lg w-fit">

                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg hover:bg-gray-100"
                >
                  −
                </button>

                <span className="px-6 font-medium">{quantity}</span>

                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 text-lg hover:bg-gray-100"
                >
                  +
                </button>

              </div>
            </div>


            {/* Error */}
            {cartError && (
              <div className="text-sm text-red-600 font-medium">
                {cartError}
              </div>
            )}


            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full py-4 rounded-xl bg-black text-white font-semibold text-lg hover:bg-gray-800 transition disabled:opacity-60"
            >
              {addingToCart
                ? "Adding..."
                : isAuthenticated
                  ? "Add to Cart"
                  : "Login to Add to Cart"}
            </button>



            {/* Features */}
            <div className="grid grid-cols-3 text-sm text-gray-600 gap-4 pt-4 border-t">

              <div className="flex flex-col items-center text-center">
                🚚
                <span>Free Shipping</span>
              </div>

              <div className="flex flex-col items-center text-center">
                🔁
                <span>Easy Returns</span>
              </div>

              <div className="flex flex-col items-center text-center">
                🔒
                <span>Secure Payment</span>
              </div>

            </div>



            {/* Accordion */}
            <div className="space-y-3 pt-6">

              <details className="border rounded-xl p-4">
                <summary className="cursor-pointer font-semibold">
                  Product Details
                </summary>
                <p className="text-gray-600 mt-2 text-sm">
                  Premium quality product designed for performance,
                  durability, and everyday use.
                </p>
              </details>

              <details className="border rounded-xl p-4">
                <summary className="cursor-pointer font-semibold">
                  Shipping Info
                </summary>
                <p className="text-gray-600 mt-2 text-sm">
                  Free shipping on orders above $999. Delivered in 3–5 days.
                </p>
              </details>

              <details className="border rounded-xl p-4">
                <summary className="cursor-pointer font-semibold">
                  Returns Policy
                </summary>
                <p className="text-gray-600 mt-2 text-sm">
                  7 day replacement guarantee for defective products.
                </p>
              </details>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default ProductDetails
