import api from './axios'

export async function getCart() {
    const res = await api.get('/cart')

    return res.data.map(item => ({
        ...item,
        product: {
            ...item.product,
            price: Number(item.product.price)
        }
    }))
}

export async function addToCart(productId, quantity) {
    const res = await api.post('/cart', { product_id: productId, quantity })
    return res.data
}

export async function updateCartItem(cartItemId, quantity) {
    const res = await api.put(`/cart/${cartItemId}`, { quantity })
    return res.data
}

export async function removeCartItem(cartItemId) {
    const res = await api.delete(`/cart/${cartItemId}`)
    return res.data
}
