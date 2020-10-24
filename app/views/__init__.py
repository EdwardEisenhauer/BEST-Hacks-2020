from flask import Blueprint, render_template, abort, jsonify
from jinja2 import TemplateNotFound

from app.database import scoped_session

main_app = Blueprint('main_app', __name__,
                     template_folder='templates')


@main_app.route('/')
def index():
    return "witam swiat :))"


@main_app.route('/<page>')
def show(page):
    try:
        return render_template('pages/%s.html' % page)
    except TemplateNotFound:
        abort(404)


from app.models.user import User


@main_app.route('/users')
def show_users():
    with scoped_session() as session:
        # session.add(admin)
        with scoped_session() as session:
            users = session.query(User).all()
            output_users = list()
            for user in users:
                output_users.append(user.email)
            return jsonify(output_users)