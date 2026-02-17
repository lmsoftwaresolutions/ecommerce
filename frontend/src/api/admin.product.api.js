import api from './axios'

export async function createProduct(data) {
  const res = await api.post('/products', data)
  return res.data
}

export async function updateProduct(id, data) {
  const res = await api.put(`/products/${id}`, data)
  return res.data
}

export async function deleteProduct(id) {
  const res = await api.delete(`/products/${id}`)
  return res.data
}
