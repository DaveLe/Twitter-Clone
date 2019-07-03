from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for,jsonify,Response
)
import flask
from werkzeug.exceptions import abort

# from flaskr.auth import login_required
from flaskr.db import get_db

from pprint import pprint
import sys
from bson import ObjectId
from bson import Binary, Code
from bson.json_util import dumps

bp = Blueprint('blog', __name__)

@bp.route('/')
def index():
    client = get_db()
    db = client['pymongo_test']

    posts = db.post.aggregate([
      { "$lookup": {
        "localField": "author_id",
        "from": "user",
        "foreignField": "_id",
        "as": "userinfo"
      }}, { "$unwind": "$userinfo" },
      { "$project": {
        "title": 1,
        "body": 1,
        "userinfo.username": 1,
        "author_id":1,
        "_id":1
      } }
    ]);
     
    # for document in posts:
    #     print(document, file=sys.stderr)

    # return render_template('blog/index.html', posts=posts)
    return dumps(posts)

@bp.route('/create', methods=('GET', 'POST'))
# @login_required
def create():
    if request.method == 'POST':
        # title = request.form['title']
        # body = request.form['body']
        json_data = request.get_json()
        # print(json_data, file=sys.stderr)
        title = json_data.get('title')
        body = json_data.get('body')

        error = None
        db = get_db()['pymongo_test']
        #How is date created????
        try:
            db.post.insert_one({'title': title, 'body': body, 'author_id': g.user['_id']})
            return Response(status=200)
        except:
            return Response(status=404)
                
    # return Response("{'a':'b'}", status=404, mimetype='application/json')

def get_post(id, check_author=True):
    x = ObjectId(id)
    client = get_db()
    db = client['pymongo_test']

    post = db.post.find_one({'_id': x})
    print(post, file=sys.stderr)

    if post is None:
        abort(404, "Post id {0} doesn't exist.".format(id))

    if check_author and post['author_id'] != g.user['_id']:
        abort(403)

    return post

@bp.route('/<string:id>/update', methods=('POST',))
# @login_required
def update(id):
    #id here is a string
    post = get_post(id)

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            return Response(status=404)

        if error is not None:
            return Response(status=404)

        else:
            db = get_db()['pymongo_test']

            db.post.update_one( {'_id': post['_id']}, { "$set": {'title':title, 'body':body}})
            return Response(status=200)

    return Response(status=404)

@bp.route('/<string:id>/delete', methods=('POST',))
# @login_required
def delete(id):
    try:
        post = get_post(id)
        db = get_db()['pymongo_test']
        db.post.delete_one({'_id': post['_id']})
        return Response(status=200)
    except:
        return Response(status=404)
