from fastapi import Response, status, HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from pydantic import UUID4, BaseModel
from typing import Optional
from uuid import uuid4
from .. import database
# from ..main import get_db

router = APIRouter()

# cursor = database.cnx.cursor(dictionary=True)

# todoItems = [
#     {
#         "id": uuid4(),
#         "title": "Finish doing the backend",
#         "description": "This will take a while to finish doing the backend",
#         "timeLeft": 3600*1000,
#         "dueDate": "2022-2-20",
#         "completed": False
#     },
#     {
#         "id": uuid4(),
#         "title": "Fix some of the CSS",
#         "description": "I will need to rename some of the variables and restyle some components so that the styles file will take up less space",
#         "timeLeft": 4000*1000,
#         "dueDate": "2021-12-20",
#         "completed": True
#     },
#     {
#         "id": uuid4(),
#         "title": "Fix a bug regarding the DELETE path",
#         "description": "It seems that the first element cannot be deleted.",
#         "timeLeft": 4000*1000,
#         "dueDate": "2021-12-20",
#         "completed": True
#     }
# ]


# def findIndex(id: UUID4):
#     indexFound = None
#     for index, todo in enumerate(todoItems):
#         print(
#             f"ID to match: {id}",
#             f"Index:{index}",
#             f"Todo Item: {todo}",
#             f"{id} == {todo['id']} is {str(id) == str(todo['id'])}\n", 
#             sep="\n")
#         if str(id) == str(todo["id"]):
#             indexFound = index
#             break
#     return indexFound


@router.get("/todos")
async def get_todos(db: Session = Depends(database.get_db)):
    return db.query(models.Todo).all()


@router.get("/todos/{id}")
async def getTodoById(id: int, db: Session = Depends(database.get_db)):
    todo_item = db.query(models.Todo).filter(models.Todo.id == id).first()
    if todo_item is not None:
        return todo_item
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Server could not find a Todo item with matching id: {id}'
        )


@router.delete("/todos/{id}")
async def deleteTodo(id: int, db: Session = Depends(database.get_db)):
    todo_item = db.query(models.Todo).filter(models.Todo.id == id)
    if todo_item.first() is not None:
        todo_item.delete(synchronize_session=False)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Server could not find a Todo item with matching id: {id}"
        )


# @router.post("/todos")
# async def createTodo(todoItem: TodoItem, status_code=status.HTTP_201_CREATED):
#     # print("Create todo has been called")
#     # todoItemDict = todoItem.dict()
#     # todoItemDict["id"] = uuid4()
#     # print(todoItemDict)
#     # todoItems.append(todoItemDict)
#     # return {"todos": todoItems}
#     pass


# @router.put("/todos/{id}")
# async def updateTodo(id: UUID4, todoItem: TodoItem):
#     # Careful here. ID in the path could be potentially different from the ID in todoItem 
#     todoItemDict = todoItem.dict()
#     print(todoItemDict)
#     index = findIndex(id)
#     if index != None:
#         todoItemDict["id"] = str(id)
#         todoItems[index] = todoItemDict
#         return {"todos": todoItems, "editedTodoId": id}
#     else:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Server could not find a Todo item with matching id: {id}")
