from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from backend.app.database import engine, Base
from backend.app.models.user import User
from backend.app.models.task import Task
from backend.app.routes.tasks import router as task_router
from backend.app.routes.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(task_router)

@app.get("/")
def home():
    return {"message": "Task Manager API is running"}
