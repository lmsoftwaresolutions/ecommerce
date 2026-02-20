import api from './axios'

export async function getAllOrders() {
  const res = await api.get('/admin/orders')
  return res.data
}

export async function updateOrderStatus(orderId, status) {
  const res = await api.put(`/admin/orders/${orderId}`, { status })
  return res.data
}

