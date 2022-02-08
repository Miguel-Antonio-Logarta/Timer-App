from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

# class TodoItem(BaseModel):
#     id: Optional[int]
#     title: str
#     description: Optional[str] = ""
#     time_left: Optional[int] = 0
#     due_date: Optional[str] = None
#     completed: Optional[bool] = False


class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    time_left: Optional[int] = None
    due_date: Optional[date] = None


class TodoCreate(TodoBase):
    # Type checking when creating a todo
    pass


class Todo(TodoBase):
    id: int
    completed: bool
    created_on: datetime    
    
    class Config:
        orm_mode = True

# class Todo(TodoBase):
#     # Type checking when reading, updating, deleting
#     id: int
#     completed: bool
#     created_on: datetime

#     class Config:
#         orm_mode = True
