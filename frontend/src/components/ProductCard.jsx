import React, { useState } from 'react'
import { Heart } from "lucide-react"
import { addWishlist, removeWishlist } from "../api/wishlist.api"

export function ProductCard({ product }) {
  const { id, name, price, images, image } = product || {}
  const [liked, setLiked] = useState(false)

  const handleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      if (liked) {
        await removeWishlist(id)
        setLiked(false)
      } else {
        await addWishlist(id)
        setLiked(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <a href={`/products/${id}`} className="block group">

      <div className="relative border border-gray-200 rounded-3xl p-5 bg-white shadow-sm hover:shadow-xl transition duration-300 group">

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute z-10 top-4 right-4 bg-white rounded-full p-2 shadow-md hover:scale-110 active:scale-95 transition"
        >
          <Heart
            size={20}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-500"}
          />
        </button>

        {/* Image */}
        <div className="h-56 flex items-center justify-center mb-5 overflow-hidden relative rounded-xl bg-gray-50">
          {images?.length ? (
            <img
              src={images[0]}
              alt={name}
              className="max-h-full object-contain transition duration-500 group-hover:scale-110"
            />
          ) : image ? (
            <img
              src={image}
              alt={name}
              className="max-h-full object-contain"
            />
          ) : (
            <div className="text-gray-400 text-sm">No Image</div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900">
          ${price?.toFixed ? price.toFixed(2) : price}
        </p>

      </div>
    </a>
  )
}

export default ProductCard
