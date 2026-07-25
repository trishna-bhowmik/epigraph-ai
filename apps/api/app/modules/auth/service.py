from sqlalchemy.orm import Session

from app.modules.auth.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.modules.users.model import User
from app.modules.users.repository import UserRepository
from app.modules.users.schema import UserCreate, UserUpdate


class AuthService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repo = UserRepository(db)

    def register(self, user_data: UserCreate):
        existing_user = self.user_repo.get_by_email(user_data.email)

        if existing_user:
            raise ValueError("Email already registered")

        user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            password_hash=hash_password(user_data.password),
        )

        return self.user_repo.create(user)

    def login(self, email: str, password: str):
        user = self.user_repo.get_by_email(email)

        if not user:
            raise ValueError("Invalid email or password")

        if not verify_password(password, user.password_hash):
            raise ValueError("Invalid email or password")

        token = create_access_token(str(user.id))

        return {
            "access_token": token,
            "token_type": "bearer",
        }

    def update_profile(self, user: User, data: UserUpdate):
        if data.email and data.email != user.email:
            existing = self.user_repo.get_by_email(data.email)
            if existing:
                raise ValueError("Email already registered")
            user.email = data.email

        if data.full_name:
            user.full_name = data.full_name

        if data.password:
            user.password_hash = hash_password(data.password)

        self.db.commit()
        self.db.refresh(user)
        return user

    def delete_profile(self, user: User):
        self.db.delete(user)
        self.db.commit()
