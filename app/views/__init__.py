from flask import Blueprint, render_template, abort, jsonify, send_from_directory
from jinja2 import TemplateNotFound

from app.database import scoped_session

main_app = Blueprint('main_app', __name__,
                     template_folder='templates')


@main_app.route('/')
def index():
    return "witam swiat :))"


@main_app.route('/<path:path>')
def send_file(path):
    return send_from_directory('frontend', path)


from app.models.user import User


@main_app.route('/users')
def show_users():
    with scoped_session() as session:
        users = session.query(User).all()
        output_users = list()
        for user in users:
            output_users.append(user.username)
        return jsonify(output_users)
