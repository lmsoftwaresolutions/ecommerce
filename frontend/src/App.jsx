import React from "react"
import { Routes, Route } from "react-router-dom"
import { RequireAuth } from "./auth/RequireAuth"

// Layouts
import { PublicLayout } from "./layouts/PublicLayout"
import { UserLayout } from "./layouts/UserLayout"
import { AdminLayout } from "./layouts/AdminLayout"

// Pages
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Products } from "./pages/Products"
import { ProductDetails } from "./pages/ProductDetails"
import { Cart } from "./pages/Cart"
import { Orders } from "./pages/Orders"
import { OrderDetails } from "./pages/OrderDetails"
import { AdminProducts } from "./pages/AdminProducts"
import { AdminOrders } from "./pages/AdminOrders"
import { Wishlist } from "./pages/Wishlist"
import { Home } from "./pages/Home"

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>


      {/* USER (Protected) */}
      <Route element={<RequireAuth><UserLayout /></RequireAuth>}>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Route>


      {/* ADMIN */}
      <Route element={<RequireAuth allowedRoles={["ADMIN"]}><AdminLayout /></RequireAuth>}>
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Route>

    </Routes>
  )
}











// import React from 'react'
// import { AuthProvider } from './context/AuthContext'
// import { useAuth } from './hooks/useAuth'
// import { RequireAuth } from './auth/RequireAuth'

// // Layouts
// import { PublicLayout } from './layouts/PublicLayout'
// import { UserLayout } from './layouts/UserLayout'
// import { AdminLayout } from './layouts/AdminLayout'

// // Pages
// import { Login } from './pages/Login'
// import { Register } from './pages/Register'
// import { Products } from './pages/Products'
// import { ProductDetails } from './pages/ProductDetails'
// import { Cart } from './pages/Cart'
// import { Orders } from './pages/Orders'
// import { OrderDetails } from './pages/OrderDetails'
// import { AdminProducts } from './pages/AdminProducts'
// import { AdminOrders } from './pages/AdminOrders'
// import { Wishlist } from './pages/Wishlist'
// import { Home } from "./pages/Home"
// import { Layout } from 'lucide-react'

// // Home page placeholder
// function HomePage() {
//   return (
//     <PublicLayout>
//       <div className="space-y-16">

//         {/* HERO */}
//         <section className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-10 text-center">
//           <h1 className="text-4xl font-bold mb-4">
//             Discover Amazing Products
//           </h1>
//           <p className="text-gray-300 mb-6">
//             Shop the best gadgets, accessories and tech deals.
//           </p>

//           <a
//             href="/products"
//             className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
//           >
//             Shop Now
//           </a>
//         </section>

//         {/* PRODUCTS PREVIEW */}
//         <section>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Popular Products</h2>
//             <a
//               href="/products"
//               className="text-sm text-gray-600 hover:text-black"
//             >
//               View All →
//             </a>
//           </div>

//           <Products />
//         </section>

//         {/* FEATURES */}
//         <section className="grid md:grid-cols-3 gap-6 text-center">
//           <div className="p-6 border rounded-2xl">
//             <h3 className="font-semibold mb-2">🚚 Fast Delivery</h3>
//             <p className="text-sm text-gray-600">
//               Get your products delivered quickly.
//             </p>
//           </div>

//           <div className="p-6 border rounded-2xl">
//             <h3 className="font-semibold mb-2">🔒 Secure Payment</h3>
//             <p className="text-sm text-gray-600">
//               Your transactions are safe and encrypted.
//             </p>
//           </div>

//           <div className="p-6 border rounded-2xl">
//             <h3 className="font-semibold mb-2">⭐ Top Quality</h3>
//             <p className="text-sm text-gray-600">
//               We sell only trusted products.
//             </p>
//           </div>
//         </section>
//       </div>
//     </PublicLayout>
//   )
// }


// // User dashboard placeholder (requires auth)
// function UserDashboard() {
//   const { user } = useAuth()
//   return (
//     <UserLayout>
//       <h2>User Dashboard</h2>
//       <p>Welcome, {user?.id}</p>
//       <p>Role: {user?.role}</p>
//     </UserLayout>
//   )
// }

// // Admin dashboard placeholder (requires admin role)
// function AdminDashboard() {
//   const { user } = useAuth()
//   return (
//     <AdminLayout>
//       <h2>Admin Dashboard</h2>
//       <p>Admin user: {user?.id}</p>
//     </AdminLayout>
//   )
// }

// // App router placeholder
// function AppRouter() {
//   const { isAuthenticated, loading } = useAuth()

//   if (loading) {
//     return <div style={{ padding: '20px' }}>Loading...</div>
//   }

//   const pathname = window.location.pathname

//   // ---------- AUTH PAGES ----------
//   if (pathname === '/login') return <Login />
//   if (pathname === '/register') return <Register />

//   // ---------- ADMIN ROUTES ----------
//   if (pathname === '/admin/products') {
//     return (
//       <RequireAuth allowedRoles={['ADMIN']}>
//         <AdminLayout>
//           <AdminProducts />
//         </AdminLayout>
//       </RequireAuth>
//     )
//   }

//   if (pathname === '/admin/orders') {
//     return (
//       <RequireAuth allowedRoles={['ADMIN']}>
//         <AdminLayout>
//           <AdminOrders />
//         </AdminLayout>
//       </RequireAuth>
//     )
//   }

//   // ---------- PRODUCT LIST ----------
//   if (pathname === '/products') {
//     if (isAuthenticated) {
//       return (
//         <UserLayout>
//           <Products />
//         </UserLayout>
//       )
//     }

//     return (
//       <PublicLayout>
//         <Products />
//       </PublicLayout>
//     )
//   }

//   // ---------- PRODUCT DETAILS ----------
//   if (pathname.startsWith('/products/')) {
//     if (isAuthenticated) {
//       return (
//         <UserLayout>
//           <ProductDetails />
//         </UserLayout>
//       )
//     }

//     return (
//       <PublicLayout>
//         <ProductDetails />
//       </PublicLayout>
//     )
//   }

//   // ---------- CART ----------
//   if (pathname === '/cart') {
//     return (
//       <RequireAuth>
//         <UserLayout>
//           <Cart />
//         </UserLayout>
//       </RequireAuth>
//     )
//   }

//   // ---------- ORDERS ----------
//   if (pathname === '/orders') {
//     return (
//       <RequireAuth>
//         <UserLayout>
//           <Orders />
//         </UserLayout>
//       </RequireAuth>
//     )
//   }

//   if (pathname.startsWith('/orders/')) {
//     return (
//       <RequireAuth>
//         <UserLayout>
//           <OrderDetails />
//         </UserLayout>
//       </RequireAuth>
//     )
//   }

//   // ---------- WISHLIST ----------
//   if (pathname === '/wishlist') {
//     return (
//       <RequireAuth>
//         <UserLayout>
//           <Wishlist />
//         </UserLayout>
//       </RequireAuth>
//     )
//   }

//   // ---------- HOME ----------
//   return <HomePage />
// }


// export default function App() {
//   return (
//     <AuthProvider>
//       <AppRouter />
//     </AuthProvider>
//   )
// }
