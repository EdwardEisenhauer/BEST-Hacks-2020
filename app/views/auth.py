from flask import Blueprint, render_template, redirect
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Email, EqualTo, Length, Optional
from flask_login import LoginManager, login_user, logout_user
import sqlalchemy.exc

import pytz

from app.database import scoped_session
from app.models import User

blueprint = Blueprint('auth', __name__)
login_manager = LoginManager()


def init_app(app):
    login_manager.init_app(app)


@login_manager.user_loader
def loader(id: int):
    with scoped_session() as session:
        return session.query(User).filter_by(id=id).first()
    return None


class SignupForm(FlaskForm):
    username = StringField(
        'Username',
        validators=[DataRequired(), Length(min=2), Length(max=64)]
    )

    password = PasswordField(
        'Password',
        validators=[
            Length(
                min=8, message='The password needs to be at least 8 characters long'),
            DataRequired()
        ]
    )

    confirm = PasswordField(
        'Confirm password',
        validators=[
            DataRequired(),
            EqualTo('password', message='Passwords do not match')
        ]
    )

    submit = SubmitField('Register')


class LoginForm(FlaskForm):
    username = StringField(
        'Username',
        validators=[DataRequired()]
    )
    password = PasswordField(
        'Password',
        validators=[DataRequired()]
    )
    submit = SubmitField('Log in')


class LogoutForm(FlaskForm):
    submit = SubmitField('Log out')


@blueprint.route('/register', methods=['GET', 'POST'])
def register():
    form = SignupForm()
    if form.validate_on_submit():
        user = User(username=form.username.data)
        user.set_password(form.password.data)
        with scoped_session() as session:
            try:
                session.add(user)
                session.commit()
                login_user(user, remember=True)
                print(user)
            except sqlalchemy.exc.IntegrityError as e:
                session.rollback()
                if "Duplicate" in str(e):
                    form.username.errors.append('Username already taken.')
                    return render_template('auth/register.html', form=form)
                else:
                    raise
            return redirect('/')
    return render_template('auth/register.html', form=form)


@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        with scoped_session() as session:
            user = session.query(User).filter_by(username=form.username.data).first()
            if user is not None and user.check_password(form.password.data):
                login_user(user, remember=True)
                return redirect('/')
            else:
                form.password.errors.append('Invalid username or password.')
                return render_template('auth/login.html', form=form)

            return redirect('/')
    return render_template('login.html', form=form)


@blueprint.route('/logout', methods=['GET', 'POST'])
def logout():
    form = LogoutForm()
    if form.validate_on_submit():
        logout_user()
        return redirect('/')
    return render_template('auth/logout.html', form=form)