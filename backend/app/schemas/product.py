from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal
    stock: int
    # image_url: Optional[str] = None
    images: Optional[list[str]] = []


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    stock: Optional[int] = None
    # image_url: Optional[str] = None
    images: Optional[list[str]] = None


class ProductResponse(BaseModel):
    id: UUID
    name: str
    description: Optional[str]
    price: Decimal
    stock: int
    # image_url: Optional[str]
    images: Optional[list[str]]
    created_at: datetime

    class Config:
        from_attributes = True
