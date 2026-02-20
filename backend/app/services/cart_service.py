from uuid import UUID
from typing import List

from sqlalchemy.orm import Session

from app.models import CartItem, Product
from app.schemas import CartItemCreate


def get_user_cart(db: Session, user_id: UUID):
    return (
        db.query(CartItem)
        .join(Product)
        .filter(CartItem.user_id == user_id)
        .all()
    )

def add_item_to_cart(db: Session, user_id: UUID, cart_data: CartItemCreate) -> CartItem:
    """Add an item to cart or increase quantity if already exists."""
    # Check if product exists
    product = db.query(Product).filter(Product.id == cart_data.product_id).first()
    if not product:
        raise ValueError("Product not found")
    
    # Check if item already in cart
    existing_item = db.query(CartItem).filter(
        CartItem.user_id == user_id,
        CartItem.product_id == cart_data.product_id
    ).first()
    
    if existing_item:
        # Increase quantity
        existing_item.quantity += cart_data.quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item
    else:
        # Create new cart item
        cart_item = CartItem(
            user_id=user_id,
            product_id=cart_data.product_id,
            quantity=cart_data.quantity
        )
        db.add(cart_item)
        db.commit()
        db.refresh(cart_item)
        return cart_item


def update_cart_item(db: Session, user_id: UUID, cart_item_id: UUID, quantity: int) -> CartItem:
    """Update cart item quantity or remove if quantity <= 0."""
    cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
    if not cart_item:
        raise ValueError("Cart item not found")
    
    # Verify ownership
    if cart_item.user_id != user_id:
        raise PermissionError("Cart item does not belong to user")
    
    if quantity <= 0:
        # Remove item
        db.delete(cart_item)
        db.commit()
        return None
    
    # Update quantity
    cart_item.quantity = quantity
    db.commit()
    db.refresh(cart_item)
    return cart_item


def remove_cart_item(db: Session, user_id: UUID, cart_item_id: UUID) -> None:
    """Remove a cart item from user's cart."""
    cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
    if not cart_item:
        raise ValueError("Cart item not found")
    
    # Verify ownership
    if cart_item.user_id != user_id:
        raise PermissionError("Cart item does not belong to user")
    
    db.delete(cart_item)
    db.commit()
