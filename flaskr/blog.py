from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.db import get_db

from pprint import pprint
import sys
from bson import ObjectId

bp = Blueprint('blog', __name__)

@bp.route('/')
def index():
    client = get_db()
    db = client['pymongo_test']
    # posts = db.execute(
    #     'SELECT p.id, title, body, created, author_id, username'
    #     ' FROM post p JOIN user u ON p.author_id = u.id'
    #     ' ORDER BY created DESC'
    # ).fetchall()
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

    return render_template('blog/index.html', posts=posts)

@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():
    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()['pymongo_test']
            #How is date created????
            # db.execute(
            #     'INSERT INTO post (title, body, author_id)'
            #     ' VALUES (?, ?, ?)',
            #     (title, body, g.user['id'])
            # )

            # db.post.insert_one({'title': title, 'body': body, 'author_id': g.user['_id']})
            db.post.save({'title': title, 'body': body, 'author_id': g.user['_id']})
            return redirect(url_for('blog.index'))

    return render_template('blog/create.html')

def get_post(id, check_author=True):
    x = ObjectId(id)
    client = get_db()
    db = client['pymongo_test']
    # post = get_db().execute(
    #     'SELECT p.id, title, body, created, author_id, username'
    #     ' FROM post p JOIN user u ON p.author_id = u.id'
    #     ' WHERE p.id = ?',
    #     (id,)
    # ).fetchone()
    post = db.post.find_one({'_id': x})
    print(post, file=sys.stderr)
    # posts = db.post.aggregate([
    #   { "$lookup": {
    #     "localField": "author_id",
    #     "from": "user",
    #     "foreignField": "_id",
    #     "as": "userinfo"
    #   }}, { "$unwind": "$userinfo" },
    #   { "$project": {
    #     "title": 1,
    #     "body": 1,
    #     "userinfo.username": 1,
    #     "author_id":1
    #   } }
    # ]);

    if post is None:
        abort(404, "Post id {0} doesn't exist.".format(id))

    if check_author and post['author_id'] != g.user['_id']:
        abort(403)

    return post

@bp.route('/<string:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
    #id here is a string
    post = get_post(id)

    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()['pymongo_test']
            # db.execute(
            #     'UPDATE post SET title = ?, body = ?'
            #     ' WHERE id = ?',
            #     (title, body, id)
            # )
            # db.commit()
            # myquery = { "address": "Valley 345" }
            # newvalues = { "$set": { "address": "Canyon 123" } }
            # mycol.update_one(myquery, newvalues)

            db.post.update_one( {'_id': post['_id']}, { "$set": {'title':title, 'body':body}})
            return redirect(url_for('blog.index'))

    return render_template('blog/update.html', post=post)
@bp.route('/<string:id>/delete', methods=('POST',))
@login_required
def delete(id):
    post = get_post(id)
    db = get_db()['pymongo_test']
    # db.execute('DELETE FROM post WHERE id = ?', (id,))
    db.post.delete_one({'_id': post['_id']})
    # db.post.save()
    return redirect(url_for('blog.index'))
