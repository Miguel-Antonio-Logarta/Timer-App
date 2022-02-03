from uuid import uuid4
from fastapi import FastAPI, status, HTTPException
from pydantic import UUID4, BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

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

class TodoItem(BaseModel):
    id: Optional[UUID4]
    title: str
    description: Optional[str] = ""
    timeLeft: Optional[int] = 0
    dueDate: Optional[str] = None
    completed: Optional[bool] = False

todoItems = [
    {
        "id": uuid4(),
        "title": "Finish doing the backend",
        "description": "This will take a while to finish doing the backend",
        "timeLeft": 3600*1000,
        "dueDate": "2022-2-20",
        "completed": False
    },
    {
        "id": uuid4(),
        "title": "Fix some of the CSS",
        "description": "I will need to rename some of the variables and restyle some components so that the styles file will take up less space",
        "timeLeft": 4000*1000,
        "dueDate": "2021-12-20",
        "completed": True
    },
    {
        "id": uuid4(),
        "title": "Fix a bug regarding the DELETE path",
        "description": "It seems that the first element cannot be deleted.",
        "timeLeft": 4000*1000,
        "dueDate": "2021-12-20",
        "completed": True
    }
]

def findIndex(id: UUID4):
    indexFound = None
    for index, todo in enumerate(todoItems):
        print(
            f"ID to match: {id}", 
            f"Index:{index}", 
            f"Todo Item: {todo}",
            f"{id} == {todo['id']} is {str(id) == str(todo['id'])}\n"
            , sep="\n")
        if str(id) == str(todo["id"]):
            indexFound = index
            break
    return indexFound

@app.get("/")
async def root():
    return """Hello, welcome to my API!"""

@app.get("/todos")
async def getTodos():
    return {"todos": todoItems}

@app.get("/todos/{id}")
async def getTodoById(id: UUID4):
    for todo in todoItems:
        if str(id) == str(todo["id"]):
            return {"data": todo}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Server could not find a Todo item with matching id: {id}")

@app.delete("/todos/{id}")
async def deleteTodo(id: UUID4):
    print(id)
    index = findIndex(id)
    if index != None:
        todoItems.pop(index)
        return {"todos": todoItems}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Server could not find a Todo item with matching id: {id}")

@app.post("/todos")
async def createTodo(todoItem: TodoItem, status_code=status.HTTP_201_CREATED):
    print("Create todo has been called")
    todoItemDict = todoItem.dict()
    todoItemDict["id"] = uuid4()
    print(todoItemDict)
    todoItems.append(todoItemDict)
    return {"todos": todoItems}

@app.put("/todos/{id}")
async def updateTodo(id: UUID4, todoItem: TodoItem):
    # Careful here. ID in the path could be potentially different from the ID in todoItem 
    todoItemDict = todoItem.dict()
    index = findIndex(id)
    if index != None:
        todoItemDict["id"] = str(id)
        todoItems[index] = todoItemDict
        return {"todos": todoItems, "editedTodoId": id}
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Server could not find a Todo item with matching id: {id}")
