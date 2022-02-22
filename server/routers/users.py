from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
import schemas
import database
import models
import auth

router = APIRouter(tags=['users'])


@router.post('/user', response_model=schemas.UserOut)
async def create_user(user: schemas.CreateUser, db: Session = Depends(database.get_db)):
    # This will fail if we have a duplicate user
    # Hash the password first
    # print(user.password)
    user.password = auth.get_hashed_password(user.password)
    # print(user.password)
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# Change the route of this. What if the user created a username called login?
@router.get('/user/{id}')
async def get_user(user: schemas.UserOut, db: Session = Depends(database.get_db)):
    return user


@router.post('/user/login')
# async def login_user(credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
async def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    print(f"username: {form_data.username}")
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Username or password does not match",
        headers={"WWW-Authenticate": "Bearer"},
    )
    # Verify username and password
    if user is None:
        print("User is none")
        raise credentials_exception
    elif not auth.verify_password(form_data.password, user.password):
        print("Passwords do not match")
        raise credentials_exception

    # Generate Return a JWT token
    # access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    # print(user.id)
    access_token = auth.create_access_token(data={"user_id": user.id, "username": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
