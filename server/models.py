from sqlalchemy import Boolean, Column, Integer, String, Date, TIMESTAMP
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
