from fastapi import status, HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session
import models
import schemas
import database
import auth
# from .. import models
# from .. import auth
# from .. import database
# from .. import schemas

router = APIRouter(tags=['todos'])

def validate_todo(todo_item):
    # We need to add validation for todo items. Check title length, description length, timeSet > 0
    errors = {}
    if len(todo_item.title) == 0:
        errors["title"] = "Title field is empty"
    if len(todo_item.title) > 150:
        errors["title"] = "Character limit of 150 reached. Please enter a shorter todo title"
    
    if todo_item.description is not None and len(todo_item.description) > 1500:
        errors["description"] = "Character limit of 1500 reached. Please enter a shorter description"
    
    if (todo_item.time_left is not None and todo_item.time_left < 0):
        errors["time_left"] = "Please enter a valid number over 0"    

    # Raise exception if validation has failed
    if len(errors) > 0:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=errors
        )


@router.get("/todos")
async def get_todos(
        db: Session = Depends(database.get_db),
        current_user: int = Depends(auth.get_current_user)):

    # SELECT * FROM todo ORDER BY completed ASC, created_on DESC;
    return (db
            .query(models.Todo)
            .filter(models.Todo.owner_id == current_user.id)
            .order_by(models.Todo.completed.asc(),
                      models.Todo.created_on.desc())
            .all())


@router.get("/todos/{id}", response_model=schemas.Todo)
async def get_todo_by_id(
        id: int,
        db: Session = Depends(database.get_db),
        current_user: int = Depends(auth.get_current_user)):

    todo_item = db.query(models.Todo).filter(models.Todo.id == id).first()

    if todo_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Server could not find a Todo item with matching id: {id}'
        )

    if todo_item.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to perform requested action"
        )

    return todo_item


@router.delete("/todos/{id}")
async def delete_todo(
        id: int,
        db: Session = Depends(database.get_db),
        current_user: int = Depends(auth.get_current_user)):

    todo_item_query = db.query(models.Todo).filter(models.Todo.id == id)
    todo_item = todo_item_query.first()

    if todo_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Server could not find a Todo item with matching id: {id}"
        )

    if todo_item.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to perform requested action"
        )

    todo_item_query.delete(synchronize_session=False)
    db.commit()
    return {
        "message": f"Successfully deleted todo with id: {id}",
        "id": id
        }


@router.post(
        "/todos",
        response_model=schemas.Todo,
        status_code=status.HTTP_201_CREATED)
async def create_todo(
        todo_item: schemas.TodoCreate,
        db: Session = Depends(database.get_db),
        current_user: int = Depends(auth.get_current_user)):
    # We need to add validation for todo items. Check title length, description length, timeSet > 0
    # errors = {}
    # if len(todo_item.title) == 0:
    #     errors["title"] = "Title field is empty"
    # if len(todo_item.title) > 150:
    #     errors["title"] = "Character limit of 150 reached. Please enter a shorter todo title"
    
    # if todo_item.description is not None and len(todo_item.description) > 1500:
    #     errors["description"] = "Character limit of 1500 reached. Please enter a shorter description"
    
    # if (todo_item.time_left is not None and todo_item.time_left < 0):
    #     errors["time_left"] = "Please enter a valid number over 0"    
    
    # Raise exception if validation has failed
    # if len(errors) > 0:
    #     raise HTTPException(
    #         status_code=status.HTTP_409_CONFLICT,
    #         detail=errors
    #     )
    validate_todo(todo_item)
    new_todo = models.Todo(owner_id=current_user.id, **todo_item.dict())
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo


@router.patch("/todos/{id}", response_model=schemas.Todo)
async def complete_todo(
        id: int,
        completed_todo: schemas.TodoSetCompleted,
        db: Session = Depends(database.get_db),
        current_user: int = Depends(auth.get_current_user)):
    todo_item = db.get(models.Todo, id)

    if todo_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Server could not find a Todo item with matching id: {id}"
        )

    if todo_item.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to perform requested action"
        )

    todo_item.completed = completed_todo.completed
    db.add(todo_item)
    db.commit()
    db.refresh(todo_item)
    return todo_item


# Add a response model. It should return an updated todo item
@router.put("/todos", response_model=schemas.Todo)
async def update_todo(
        updated_todo_item: schemas.Todo,
        db: Session = Depends(database.get_db),
        current_user: int = Depends(auth.get_current_user)):

    todo_item = db.get(models.Todo, updated_todo_item.id)

    if todo_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Server could not find a Todo item with matching id: {updated_todo_item.id}"
        )

    if todo_item.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to perform requested action"
        )

    validate_todo(updated_todo_item)

    for key, value in updated_todo_item.dict().items():
        setattr(todo_item, key, value)

    db.add(todo_item)
    db.commit()
    db.refresh(todo_item)
    return todo_item
