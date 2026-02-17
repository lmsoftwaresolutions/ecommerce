from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas import OrderResponse
from app.services import order_service
from app.utils.dependencies import get_current_admin_user

router = APIRouter(prefix="", tags=["AdminOrders"])


@router.get("", response_model=list[OrderResponse])
def list_all_orders(db: Session = Depends(get_db), current_admin=Depends(get_current_admin_user)):
    orders = order_service.get_all_orders(db)
    return orders


@router.put("/{order_id}", response_model=OrderResponse)
def update_order_status(order_id: UUID, payload: dict, db: Session = Depends(get_db), current_admin=Depends(get_current_admin_user)):
    # Expecting payload: {"status": "CONFIRMED"}
    new_status = payload.get("status") if isinstance(payload, dict) else None
    if not new_status:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing status in request body")
    try:
        order = order_service.update_order_status(db, order_id, new_status)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND if str(exc) == "Order not found" or str(exc) == "Invalid status value" else status.HTTP_400_BAD_REQUEST, detail=str(exc))
    return order


print("ADMIN ROUTER LOADED")

@router.get("/test")
def test():
    return {"msg": "admin route works"}
