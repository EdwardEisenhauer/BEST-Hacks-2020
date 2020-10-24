from flask_bcrypt import generate_password_hash, check_password_hash
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship

from app.models import Base
from flask_login import UserMixin


class User(UserMixin, Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(128), unique=True, nullable=False)
    password = Column(String(128), nullable=False)
    created_on = Column(DateTime, index=False, unique=False,
                        nullable=True, server_default=func.now())
    last_login = Column(DateTime, index=False, unique=False,
                        nullable=True)  # TODO: set on login? or remove?

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)
