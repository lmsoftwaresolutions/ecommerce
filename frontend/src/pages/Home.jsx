import React, { useEffect, useState } from "react"
import { getAllProducts } from "../api/product.api"
import ProductCard from "../components/ProductCard"

export function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProducts()
      .then(data => setProducts(data || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-12">

      {/* HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="p-12 md:p-20 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Next Favorite Product
          </h1>

          <p className="text-gray-300 mb-6">
            Shop premium quality products with fast delivery and best prices.
          </p>

          <a
            href="/products"
            className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Shop Now
          </a>
        </div>

        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
          className="absolute right-0 top-0 h-full w-1/2 object-cover hidden md:block opacity-80"
        />
      </section>

      {/* FEATURE BANNERS */}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {[
          { title: "Free Shipping", desc: "On orders above $50" },
          { title: "Secure Payment", desc: "100% protected checkout" },
          { title: "Easy Returns", desc: "7 day return policy" }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}

      </section>

      {/* PRODUCT PREVIEW */}
      <section className="space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Trending Products</h2>
          <a href="/products" className="text-sm font-medium hover:underline">
            View all
          </a>
        </div>

        {loading ? (
          <div className="text-gray-500 text-sm animate-pulse">
            Loading products...
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 8).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </section>
    </div>
  )
}

export default Home
