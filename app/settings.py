from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_SQLALCHEMY_DEBUG_ENABLE = os.getenv("DATABASE_SQLALCHEMY_DEBUG_ENABLE")

SERVER_HOST = os.getenv("SERVER_HOST")
SERVER_PORT = os.getenv("SERVER_PORT")
