from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

from app.database import Base

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


@main_app.route('/users')
def users():
    from app.models.user import User
    admin = User(username='admin', email='admin@example.com')
    guest = User(username='guest', email='guest@example.com')

    Base.session.add(admin)
    Base.session.add(guest)

    return "witam swiat :))"
