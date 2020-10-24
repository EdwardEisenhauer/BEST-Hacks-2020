from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from app.database import init_db
from app.settings import DATABASE_URL, SERVER_HOST, SERVER_PORT
from app.views import main_app


def create_app():
    app = Flask(__name__)

    app.secret_key = 'hello_world'
    app.config.from_object(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL

    init_db()

    app.register_blueprint(main_app)

    app.run(debug=True, host=SERVER_HOST, port=SERVER_PORT)
