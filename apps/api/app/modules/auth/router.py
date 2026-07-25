from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.modules.auth.service import AuthService
from app.modules.auth.schema import Token
from app.modules.users.schema import (
    UserCreate,
    UserLogin,
    UserResponse,
    UserUpdate,
)
from app.modules.auth.dependencies import get_current_user
from app.modules.users.model import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    try:
        return service.register(user)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.post("/login", response_model=Token)
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db),
):
    service = AuthService(db)

    try:
        return service.login(
            credentials.email,
            credentials.password,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )
    
    
@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.put("/me", response_model=UserResponse)
def update_me(
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return AuthService(db).update_profile(current_user, data)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.delete("/me", status_code=204)
def delete_me(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    AuthService(db).delete_profile(current_user)
