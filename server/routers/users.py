from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi.security import OAuth2PasswordRequestForm
import schemas
import database
import models
import auth

router = APIRouter(tags=['users'])


@router.post('/user/signup', response_model=schemas.Token)
async def create_user(user: schemas.CreateUser, db: Session = Depends(database.get_db)):
    # Check if username or email has already been taken
    user_exists = db.query(models.User).filter(or_(models.User.username == user.username, models.User.email == user.email)).first()
    if user_exists is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="The username or email has already been taken"
        )

    # Hash the password and store in db
    user.password = auth.get_hashed_password(user.password)
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()

    # Return a token since the user will automatically log in after signing up
    access_token = auth.create_access_token(data={"user_id": new_user.id, "username": new_user.username})
    output = {"access_token": access_token, "token_type": "bearer"}
    return output


@router.post('/user/login')
async def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Username or password does not match",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Verify username and password
    if user is None:
        raise credentials_exception
    elif not auth.verify_password(form_data.password, user.password):
        raise credentials_exception

    access_token = auth.create_access_token(data={"user_id": user.id, "username": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get('/user/me', response_model=schemas.UserOut)
async def read_users_me(db: Session = Depends(database.get_db), current_user: int = Depends(auth.get_current_user)):
    # Query database for user info
    user = db.get(models.User, current_user.id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Server could not find a user with username: {current_user.username}"
        )
    return user
