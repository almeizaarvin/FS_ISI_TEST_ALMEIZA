from sqlalchemy.orm import Session
from models import TaskModel  
from schemas import TaskCreateSchema, TaskUpdateSchema, TaskOutSchema  

def get_tasks(db: Session):
    return db.query(TaskModel).order_by(TaskModel.created_at.desc()).all()

def create_task(db: Session, task: TaskCreateSchema):
    db_task = TaskModel(title=task.title)  
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, task: TaskUpdateSchema):
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if db_task:
        db_task.title = task.title  
        db_task.status = task.status
        db.commit()
        db.refresh(db_task)
        return db_task
    return None  

def delete_task(db: Session, task_id: int):
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if db_task:
        db.delete(db_task)
        db.commit()
        return {"message": f"Task with ID {task_id} deleted"}
    return {"message": f"Task with ID {task_id} not found"}
