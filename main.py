#!/usr/bin/env python3
import json
import os
from random import randrange
from flask import Flask, abort, request, jsonify
from flask_login import LoginManager, login_user, UserMixin, login_required, current_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context

# initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

login_manager = LoginManager()
login_manager.init_app(app)

# extensions
db = SQLAlchemy(app)


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(64))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def as_json(self):
        user = {
            "user": {
                "id": self.id,
                "name": self.username,
                "friends": [],
                "quests": [1],
                "posts": [],
                "points": randrange(2, 20)
            }
        }
        return user


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


###

@app.route('/api/access/register', methods=['POST'])
def rest_register():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)  # missing arguments
    if User.query.filter_by(username=username).first() is not None:
        abort(400)  # existing user
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return jsonify(user.as_json())


@app.route('/api/access/login', methods=['POST'])
def rest_login():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)  # missing arguments
    user = User.query.filter_by(username=username).first()
    if user is None:
        abort(404)
    if not user.verify_password(password):
        abort(401)
    login_user(user)
    return user.as_json()


@app.route('/api/access/logout', methods=['get'])
@login_required
def rest_logout():
    logout_user()


###

@app.route('/api/user/me')
@login_required
def get_resource():
    return jsonify(current_user.as_json())


@app.route('/api/user/<user_id>')
def get_user(user_id: int):
    user = User.query.get(user_id)
    if not user:
        abort(400)
    return jsonify(user.as_json())


###

@app.route('/api/quests')
def get_quests():
    with open("quests.json") as f:
        data = json.load(f)
        return jsonify(data)


@app.route('/api/quest/<quest_id>')
def get_quest(quest_id: int):
    quest = None
    quest_id = int(quest_id)
    with open("quests.json") as f:
        data = json.load(f)
        for q in data['quests']:
            if q['id'] == quest_id:
                quest = q
                break

    if quest is None:
        abort(404)
    else:
        return jsonify({"quest": quest})


###

@app.route('/api/posts')
def get_posts():
    with open("posts.json") as f:
        data = json.load(f)
        return jsonify(data)


@app.route('/api/post/<post_id>')
def get_post(post_id: int):
    post = None
    post_id = int(post_id)
    with open("posts.json") as f:
        data = json.load(f)
        for q in data['posts']:
            if q['id'] == post_id:
                post = q
                break

    if post is None:
        abort(404)
    else:
        return jsonify({"post": post})


if __name__ == '__main__':
    if not os.path.exists('db.sqlite'):
        db.create_all()
    app.run(debug=True)
