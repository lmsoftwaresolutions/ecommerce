import { useEffect, useState } from "react"
import { getWishlist } from "../api/wishlist.api"
import ProductCard from "../components/ProductCard"

export function Wishlist() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWishlist()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray-500">Loading wishlist...</p>

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-gray-800">
        My Wishlist
      </h2>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500">No saved items yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map(w => (
            <ProductCard key={w.id} product={w.product} />
          ))}
        </div>
      )}

    </div>
  )
}
