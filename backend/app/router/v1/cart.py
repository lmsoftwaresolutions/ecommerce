from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import User
from app.schemas import CartItemCreate, CartItemResponse
from app.schemas.cart import CartItemUpdate
from app.services import cart_service
from app.utils.dependencies import get_current_user

router = APIRouter(tags=["Cart"])


@router.get("", response_model=list[CartItemResponse])
def get_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retrieve user's cart items (authenticated)."""
    items = cart_service.get_user_cart(db, current_user.id)
    return items


@router.post("", response_model=CartItemResponse, status_code=status.HTTP_201_CREATED)
def add_to_cart(
    item_in: CartItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Add an item to user's cart or increase quantity (authenticated)."""
    try:
        cart_item = cart_service.add_item_to_cart(db, current_user.id, item_in)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))
    return cart_item


@router.put("/{cart_item_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_cart_item(
    cart_item_id: UUID,
    data: CartItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        cart_service.update_cart_item(
            db,
            current_user.id,
            cart_item_id,
            data.quantity
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found"
        )
    except PermissionError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cart item does not belong to user"
        )


@router.delete("/{cart_item_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_from_cart(
    cart_item_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Remove an item from user's cart (authenticated)."""
    try:
        cart_service.remove_cart_item(db, current_user.id, cart_item_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    except PermissionError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cart item does not belong to user")
