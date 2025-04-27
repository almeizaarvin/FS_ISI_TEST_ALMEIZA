from fastapi import FastAPI
from database import Base, engine
from models import Task

app = FastAPI()
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Hello World"}
