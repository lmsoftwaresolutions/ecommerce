from uuid import UUID
from decimal import Decimal
from typing import List

from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models import CartItem, Product, Order, OrderItem
from sqlalchemy.orm import joinedload
from app.models.order import OrderStatus


def place_order(db: Session, user_id: UUID) -> Order:
    try:
        cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()
        if not cart_items:
            raise ValueError("Cart is empty")

        total_amount = Decimal("0.00")
        products_to_update = []

        for item in cart_items:
            product = (
                db.query(Product)
                .filter(Product.id == item.product_id)
                .with_for_update()
                .first()
            )
            if not product:
                raise ValueError("Product not found")
            if product.stock < item.quantity:
                raise ValueError("Insufficient stock")

            products_to_update.append((product, item.quantity))
            total_amount += product.price * item.quantity

        order = Order(user_id=user_id, total_amount=total_amount)
        db.add(order)
        db.flush()

        for product, qty in products_to_update:
            db.add(OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=qty,
                price_at_purchase=product.price,
            ))
            product.stock -= qty

        db.query(CartItem).filter(
            CartItem.user_id == user_id
        ).delete(synchronize_session=False)

        db.commit()          # ✅ REQUIRED
        db.refresh(order)
        return order

    except Exception:
        db.rollback()        # ✅ REQUIRED
        raise


def get_user_orders(db: Session, user_id: UUID) -> List[Order]:
    return db.query(Order).filter(Order.user_id == user_id).all()


def get_order_by_id(db: Session, user_id: UUID, order_id: UUID) -> Order:
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise ValueError("Order not found")
    if order.user_id != user_id:
        raise PermissionError("Order does not belong to user")
    return order


def get_all_orders(db: Session) -> List[Order]:
    """Return all orders including their order items."""
    return db.query(Order).options(joinedload(Order.order_items)).all()


def update_order_status(db: Session, order_id: UUID, new_status: str) -> Order:
    """Update only the status of an order. Validate allowed statuses."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise ValueError("Order not found")

    # Validate status
    try:
        status_enum = OrderStatus(new_status)
    except Exception:
        raise ValueError("Invalid status value")

    # Only update status
    order.status = status_enum
    db.commit()
    db.refresh(order)
    return order
