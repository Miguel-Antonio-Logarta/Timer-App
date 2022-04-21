from pydantic import BaseModel, EmailStr
from datetime import datetime, date
from typing import Optional


class EmailEmptyAllowedStr(EmailStr):
    @classmethod
    def validate(cls, value: str) -> str:
        if value == "":
            return value
        return super().validate(value)


class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    time_left: Optional[int] = None
    due_date: Optional[date] = None


class TodoCreate(TodoBase):
    # Type checking when creating a todo
    pass


class TodoSetCompleted(BaseModel):
    completed: bool


class Todo(TodoBase):
    id: int
    completed: bool
    created_on: datetime
    owner_id: int

    class Config:
        orm_mode = True


class CreateUser(BaseModel):
    username: str
    email: EmailEmptyAllowedStr
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailEmptyAllowedStr
    created_on: datetime

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[int] = None
    username: Optional[str] = None


class UpdateEmail(BaseModel):
    email: EmailStr


class UpdatePassword(BaseModel):
    old_password: str
    new_password: str

