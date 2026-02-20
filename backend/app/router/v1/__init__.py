from fastapi import APIRouter

# Import individual routers for v1 API
from app.router.v1.health_router import router as health_router
from app.router.v1.auth import router as auth_router
from app.router.v1.products import router as products_router
from app.router.v1.cart import router as cart_router
from app.router.v1.orders import router as orders_router
from app.router.v1.admin_orders import router as admin_orders_router
from app.router.v1.wishlist import router as wishlist_router
# from backend.app.router.v1 import wishlist

# Main v1 router aggregator
router = APIRouter()

# Include all v1 routers with their prefixes
router.include_router(health_router)
router.include_router(auth_router, prefix="/auth")
router.include_router(products_router, prefix="/products")
router.include_router(cart_router, prefix="/cart")
router.include_router(orders_router, prefix="/orders")
router.include_router(admin_orders_router, prefix="/admin/orders")
router.include_router(wishlist_router, prefix="/wishlist")
# Future routers will be added here:
