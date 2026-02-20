from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

from app.models.user import UserRole


class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
