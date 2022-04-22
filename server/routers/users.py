from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi.security import OAuth2PasswordRequestForm
import schemas
import database
import models
import auth
import re
import json

router = APIRouter(tags=['users'])


def validate_new_password(password: str) -> bool:
    passwordRe = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,128}$"
    return re.search(passwordRe, password)


@router.post('/user/signup', response_model=schemas.Token)
async def create_user(user: schemas.CreateUser, db: Session = Depends(database.get_db)):
    # RegEx for username, email, and password
    # Usernames are alphanumeric, but can have hyphens (-) and underscores (_) in them
    # Usernames need to be between 6 to 30 characters long
    # Passwords must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character @$!%*?&
    # Password length must also be between 6 to 128 characters long
    emailRe = r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    usernameRe = r"^[A-Za-z0-9_-]{5,29}$"
    passwordRe = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,128}$"

    errors = []

    # Check if the email is not empty and valid
    # TODO: make emails optional
    if (user.email and not re.search(emailRe, user.email)):
        errors.append({
            "loc": ["body", "email"],
            "msg": "The email is not valid",
        })

    # Check if the username is valid
    if (not re.search(usernameRe, user.username)):
        errors.append({
            "loc": ["body", "username"],
            "msg": "The username is not valid",
        })
    
    # Check if password is valid
    if (not re.search(passwordRe, user.password)):
        errors.append({
            "loc": ["body", "email"],
            "msg": "The password is not valid",
        })

    
    # Check if username has already been taken
    username_exists = db.query(models.User).filter(models.User.username == user.username).first()
    if username_exists is not None:
        errors.append({
            "loc": ["body", "username"],
            "msg": "The username has already been taken",
        })
    
    # Check if email has already been taken
    email_exists = db.query(models.User).filter(models.User.email == user.email).first()
    if email_exists is not None:
        errors.append({
            "loc": ["body", "email"],
            "msg": "The email has already been taken",
        })
    
    if len(errors) > 0:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=errors
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

    user_info = {
        "user_id": user.id, 
        "username": user.username, 
        "email": user.email, 
        "created_on": user.created_on.isoformat()
    }

    access_token = auth.create_access_token(data=user_info)
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


@router.patch('/user/me/email', response_model=schemas.UpdateEmail)
async def change_email(update_email: schemas.UpdateEmail, db: Session = Depends(database.get_db), current_user: int = Depends(auth.get_current_user)):
    user = db.get(models.User, current_user.id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Server could not find a user with username: {current_user.username}"
        )

    # Check if the email is the same as the old one
    if (user.email == update_email.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"The email is the same as the old email"
        )

    setattr(user, 'email', update_email.email)

    db.add(user)
    db.commit()
    db.refresh(user)
    return {"email": user.email}
    

@router.patch('/user/me/password', response_model=schemas.UserOut)
async def change_password(update_password: schemas.UpdatePassword, db: Session = Depends(database.get_db), current_user: int = Depends(auth.get_current_user)):
    user = db.get(models.User, current_user.id)

    # Check if the old password is correct
    if not auth.verify_password(update_password.old_password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"The old password is incorrect"
        )

    # Check if the new password fulfills the password requirements
    if not validate_new_password(update_password.new_password):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"The new password is not a valid password"
        )
    
    # Check if the new password is the same as the old password
    if auth.verify_password(update_password.new_password, user.password):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"The new password cannot be the same as the old password"
        )
    
    new_password = auth.get_hashed_password(update_password.new_password)
    setattr(user, 'password', new_password)
    db.add(user)
    db.commit()
    return user