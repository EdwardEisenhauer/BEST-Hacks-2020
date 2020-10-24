from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

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
