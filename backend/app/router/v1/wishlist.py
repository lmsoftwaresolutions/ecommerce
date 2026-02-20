from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID

from app.core.database import get_db
from app.models.wishlist import Wishlist
from app.utils.dependencies import get_current_user

# router = APIRouter(prefix="/wishlist", tags=["Wishlist"])
router = APIRouter(tags=["Wishlist"])


@router.get("/")
def get_wishlist(db: Session = Depends(get_db), user=Depends(get_current_user)):
    items = (
        db.query(Wishlist)
        .filter(Wishlist.user_id == user.id)
        .all()
    )

    return [
        {
            "id": w.id,
            "product": w.product
        }
        for w in items
    ]



@router.post("/{product_id}")
def add_to_wishlist(product_id: UUID, db: Session = Depends(get_db), user=Depends(get_current_user)):
    exists = db.query(Wishlist).filter(
        Wishlist.user_id == user.id,
        Wishlist.product_id == product_id
    ).first()

    if exists:
        return {"message": "Already added"}

    item = Wishlist(user_id=user.id, product_id=product_id)
    db.add(item)
    db.commit()
    return {"message": "Added to wishlist"}


@router.delete("/{product_id}")
def remove_from_wishlist(product_id: UUID, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db.query(Wishlist).filter(
        Wishlist.user_id == user.id,
        Wishlist.product_id == product_id
    ).delete()

    db.commit()
    return {"message": "Removed"}
