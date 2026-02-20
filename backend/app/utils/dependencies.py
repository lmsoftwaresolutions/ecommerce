from uuid import UUID

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core import security
from app.models import User
from app.models.user import UserRole


def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(security.oauth2_scheme),
) -> User:
    try:
        payload = security.decode_access_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    sub = payload.get("sub")
    if not sub:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == UUID(sub)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


def get_current_admin_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return current_user
