import functools
from bson import ObjectId
import sys
from flask import Response
from bson.json_util import dumps
from flask import jsonify

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
        json_data = request.get_json()
        # print(json_data, file=sys.stderr)
        username = json_data.get('username')
        # print(username, file=sys.stderr)
        password = json_data.get('password')
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

    # if request.method == 'OPTIONS':
    #     return Response(status=200)

    if request.method == 'POST':
        json_data = request.get_json()
        # print(json_data, file=sys.stderr)
        username = json_data.get('username')
        password = json_data.get('password')

        client = get_db()
        db = client['pymongo_test']
        error = None
        user = db.user.find_one({'username':username})
        # print(user['username'], file=sys.stderr)
        # print(user['password'], file=sys.stderr)

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'


        if error is None:
            session.clear()
            session['user_id'] = str(user['_id'])
            session['username'] = username
            session.modified = True
            # session.permanent = True
            x = jsonify(session['user_id'])
            print(session['user_id'], file=sys.stderr)
            print(x, file=sys.stderr)
            return session['username']
            # return dumps(user)

    return Response(status=404)

# @bp.route('/der', methods=('GET',))
# def fku():
#     return session.get('user_id')

@bp.route('/session', methods=('GET',))
def load_logged_in_user():
    print(session, file=sys.stderr)
    if request.method == 'GET':
       
        client = get_db()
        db = client['pymongo_test']
        user_id = session.get('user_id')
        print(user_id, file=sys.stderr)
        if user_id is None:
            return Response(status=404)
        else:
            return jsonify(session.get('username'),session.get('user_id'))
            # db.user.find_one({'_id': ObjectId(user_id)})
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
