from pydantic import BaseModel
from typing import Optional


class TaskBase(BaseModel):
    description: str
    completed: bool = False


class Task(TaskBase):
    id: Optional[int] = None


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: int


class TaskUpdate(BaseModel):
    description: Optional[str] = None
    completed: Optional[bool] = None