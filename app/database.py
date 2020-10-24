""" This module exports the database engine.

Notes:
     Using the scoped_session contextmanager is
     best practice to ensure the session gets closed
     and reduces noise in code by not having to manually
     commit or rollback the db if a exception occurs.
"""
import logging
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.settings import DATABASE_URL, DATABASE_SQLALCHEMY_DEBUG_ENABLE

engine = create_engine(DATABASE_URL + "?charset=utf8", pool_pre_ping=True)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(name)s - %(funcName)s - %(message)s')

if DATABASE_SQLALCHEMY_DEBUG_ENABLE:
    logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
else:
    logging.getLogger('sqlalchemy.engine').setLevel(logging.CRITICAL)

# Session to be used throughout app.
Session = sessionmaker(bind=engine)


@contextmanager
def scoped_session():
    session = Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
