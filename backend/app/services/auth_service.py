from datetime import timedelta
from typing import Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.core import security
from app.core.config import settings
from app.models import User, UserRole
from app.schemas.auth import UserRegisterRequest


def register_user(db: Session, user_data: UserRegisterRequest) -> User:
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise ValueError("Email already registered")

    hashed = security.get_password_hash(user_data.password)
    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hashed,
        role=UserRole.BUYER,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not security.verify_password(password, user.password_hash):
        return None
    return user


def create_access_token_for_user(user: User) -> str:
    data = {"sub": str(user.id), "role": user.role.value}
    # Use settings to determine expiry via security.create_access_token
    access_token = security.create_access_token(data)
    return access_token




