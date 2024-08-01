from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime, timedelta, timezone
import pyrebase

app = Flask(__name__)

# Firebase configuration
firebaseConfig = {
    'apiKey': "AIzaSyD_Lu2kbECae5Mp8gFChU5Meh_GJiiSmcY",
    'authDomain': "nuru-66515.firebaseapp.com",
    'databaseURL': "https://nuru-66515-default-rtdb.firebaseio.com",
    'projectId': "nuru-66515",
    'storageBucket': "nuru-66515.appspot.com",
    'messagingSenderId': "950587126407",
    'appId': "1:950587126407:web:509862116958680ce17e22"
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

def ensure_utc(dt):

    if isinstance(dt, str):
        dt = datetime.fromisoformat(dt.replace('Z', '+00:00'))
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)

def datetimeformat(value):

    dt = ensure_utc(value)
    return dt.strftime('%H:%M')

app.jinja_env.filters['datetimeformat'] = datetimeformat

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        content = request.form['content']
        new_post = {
            'author': 'Thembi Makamu',
            'role': 'Writer and web designer',
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'content': content,
            'image_url': url_for('static', filename='images/pexels-photo-1820919.webp')
        }
        db.child("posts").push(new_post)
        return redirect(url_for('index'))
    
    posts_data = db.child("posts").get().val()
    posts = []

    if posts_data:
        for post_id, post_info in posts_data.items():
            post_info['timestamp'] = ensure_utc(post_info['timestamp'])
            post_info['id'] = post_id  # adding post ID to the post info
            posts.append(post_info)

    posts.sort(key=lambda x: x['timestamp'], reverse=True)
    return render_template('feed_home.html', posts=posts)

@app.route('/delete_post/<post_id>', methods=['POST'])
def delete_post(post_id):
    db.child("posts").child(post_id).remove()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)