from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import List
from pydantic import BaseModel

from app.models.order import OrderStatus


class OrderItemResponse(BaseModel):
    product_id: UUID
    quantity: int
    price_at_purchase: Decimal

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: UUID
    total_amount: float
    status: OrderStatus
    created_at: datetime
    order_items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True
