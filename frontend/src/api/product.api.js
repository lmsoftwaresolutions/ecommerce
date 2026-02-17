import api from './axios'

export async function getAllProducts() {
    const res = await api.get('/products')

    return res.data.map(p => ({
        ...p,
        price: Number(p.price),
        image: p.images
    }))
}

export async function getProductById(id) {
    const res = await api.get(`/products/${id}`)
    const p = res.data

    return {
        ...p,
        price: Number(p.price),
        image: p.images
    }
}