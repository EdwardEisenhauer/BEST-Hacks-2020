from flask import Flask
from flask_login import LoginManager

from app.settings import DATABASE_URL, SERVER_HOST, SERVER_PORT
from app.views import main_app
from app.views import auth


def create_app():
    app = Flask(__name__)

    app.secret_key = 'hello_world'
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'login'

    app.config.from_object(__name__)

    app.register_blueprint(main_app)
    app.register_blueprint(auth.blueprint)

    app.run(debug=True, host=SERVER_HOST, port=SERVER_PORT)
