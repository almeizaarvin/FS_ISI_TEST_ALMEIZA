from fastapi import FastAPI
from database import Base, engine
from models import TaskModel
from routers import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(router)


@app.get("/")
def read_root():
    return {"message": "Hello World"}
