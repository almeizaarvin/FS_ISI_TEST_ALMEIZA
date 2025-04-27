from pydantic import BaseModel
from typing import Optional
from datetime import datetime  

# Schema untuk membuat task baru
class TaskCreateSchema(BaseModel):
    title: str

# Schema untuk mengupdate task
class TaskUpdateSchema(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None

# Schema untuk output task (ketika kita mengembalikan task)
class TaskOutSchema(BaseModel):
    id: int
    title: str
    status: str
    created_at: datetime  

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()  
        }

