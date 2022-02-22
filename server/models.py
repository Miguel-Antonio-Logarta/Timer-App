from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, TIMESTAMP
from sqlalchemy.sql.expression import text
from database import Base


class Todo(Base):
    __tablename__ = "Todo"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(String(1500))
    time_left = Column(Integer)
    due_date = Column(Date)
    completed = Column(Boolean, nullable=False, server_default='0')
    created_on = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text('now()')
    )
    owner_id = Column(
        Integer,
        ForeignKey("User.id", ondelete="CASCADE"),
        nullable=False
    )


class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(30), nullable=False, unique=True)
    email = Column(String(254), unique=True)
    password = Column(String(256), nullable=False)
    created_on = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text('now()')
    )
