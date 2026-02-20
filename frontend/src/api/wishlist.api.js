import api from "./axios"

export const getWishlist = () => api.get("/wishlist").then(r => r.data)
export const addWishlist = (id) => api.post(`/wishlist/${id}`)
export const removeWishlist = (id) => api.delete(`/wishlist/${id}`)
