from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from . import database
from .routers import todos
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, get_db
from . import models, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todos.router)


# @app.get("/db_test/{id}")
# async def getDBTodo(id: int, db: Session = Depends(get_db)):
#     return db.query(models.Todo).filter(models.Todo.id == id).first()


@app.get("/")
async def root():
    return """Hello, welcome to the timer API."""
