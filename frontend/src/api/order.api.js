
import api from './axios'

function normalizeOrder(order) {
  return {
    ...order,

    // ensure number
    total_amount: Number(order.total_amount),

    // normalize items
    items: (order.order_items || []).map((i) => ({
      id: i.product_id,
      product_name: i.product_name || i.product_id, // fallback if backend doesn't send name
      quantity: i.quantity,
      price: Number(i.price_at_purchase),
    })),
  }
}

export async function placeOrder() {
  const res = await api.post('/orders')
  return normalizeOrder(res.data)
}

export async function getOrders() {
  const res = await api.get('/orders')
  return res.data.map(normalizeOrder)
}

export async function getOrderById(orderId) {
  const res = await api.get(`/orders/${orderId}`)
  return normalizeOrder(res.data)
}


// import api from './axios'

// export async function placeOrder() {
//   const res = await api.post('/orders')
//   return res.data
// }

// export async function getOrders() {
//   const res = await api.get('/orders')
//   return res.data
// }

// export async function getOrderById(orderId) {
//   const res = await api.get(`/orders/${orderId}`)
//   return res.data
// }
