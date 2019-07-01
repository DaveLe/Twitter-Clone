from pymongo import MongoClient
from werkzeug.security import generate_password_hash

import click
from flask import current_app, g
from flask.cli import with_appcontext


# This gets the connection rather than the db
def get_db():
    if 'db' not in g:
        #   g.db = sqlite3.connect(
        #     current_app.config['DATABASE'],
        #     detect_types=sqlite3.PARSE_DECLTYPES
        # )
        #   g.db.row_factory = sqlite3.Row
        # current_app.config['DATABASE']
        g.db = MongoClient('mongodb://localhost:27017')
        # g.db =  client['pymongo_test'] #The database name

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()['pymongo_test']

    users = db['user'] #user is the collection name

    user_1 = {
        'username': 'davidle',
        'password': generate_password_hash('123')
    }

    user_2 = {
        'username': 'normanle',
        'password': generate_password_hash('321')
    }
    result = users.insert_many([user_1,user_2])

    posts = db['post']

    post_1 = {
        'author_id': '1',
        'created': '12',
        'title': 'kappa',
        'body': 'i locsecse114 rdew'

    }

    result1 = posts.insert_one(post_1)



@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
