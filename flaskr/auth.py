import functools
from bson import ObjectId
import sys
from flask import Response

#from pymongo import MongoClient


from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        # print(request.form['username'], file=sys.stderr)
        username = request.form['username']
        password = request.form['password']
        client = get_db()
        db = client['pymongo_test']
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif db.user.find_one( {'username': username}) is not None:
            error = 'User {} is already registered.'.format(username)

        if error is None:
            db.user.insert_one({'username': username, 'password': generate_password_hash(password)})
            # db.user.save()
            # return redirect(url_for('auth.login'))
            return Response(status=200)

        # flash(error)

    # return render_template('auth/register.html')
    return Response(status=404)

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        client = get_db()
        db = client['pymongo_test']
        error = None
        user = db.user.find_one({'username':request.form['username']})
        # print(user['username'], file=sys.stderr)
        # print(user['password'], file=sys.stderr)

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'


        if error is None:
            session.clear()
            session['user_id'] = str(user['_id'])
            return Response(status=200)
            # return redirect(url_for('index'))

        # flash(error)

    # return render_template('auth/login.html')
    return Response(status=404)

@bp.before_app_request
def load_logged_in_user():
    client = get_db()
    db = client['pymongo_test']
    user_id = session.get('user_id')
    # print(user_id, file=sys.stderr)
    if user_id is None:
        g.user = None
    else:
        g.user = db.user.find_one({'_id': ObjectId(user_id)})
        # print(g.user, file=sys.stderr)


@bp.route('/logout')
def logout():
    session.clear()
    return Response(status=200)
    # return redirect(url_for('index'))

# def login_required(view):
#     @functools.wraps(view)
#     def wrapped_view(**kwargs):
#         if g.user is None:
#             return redirect(url_for('auth.login'))

#         return view(**kwargs)

#     return wrapped_view
