from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from crud import get_tasks, create_task, update_task, delete_task  
from schemas import TaskCreateSchema, TaskUpdateSchema, TaskOutSchema 

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/tasks")
def read_tasks(db: Session = Depends(get_db)):
    return get_tasks(db)

@router.post("/tasks", response_model=TaskOutSchema)
def create_task_endpoint(task: TaskCreateSchema, db: Session = Depends(get_db)):
    return create_task(db, task)

@router.put("/tasks/{task_id}", response_model=TaskOutSchema)
def update_task_endpoint(task_id: int, task: TaskUpdateSchema, db: Session = Depends(get_db)):
    return update_task(db, task_id, task)

@router.delete("/tasks/{task_id}")
def delete_task_endpoint(task_id: int, db: Session = Depends(get_db)):
    return delete_task(db, task_id)
