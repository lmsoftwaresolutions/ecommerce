from uuid import UUID
from datetime import datetime
from pydantic import BaseModel
from app.schemas.product import ProductResponse

class CartItemCreate(BaseModel):
    product_id: UUID
    quantity: int


class CartItemResponse(BaseModel):
    id: UUID
    product_id: UUID
    quantity: int
    created_at: datetime
    product: ProductResponse

    class Config:
        from_attributes = True

class CartItemUpdate(BaseModel):
    quantity: int
