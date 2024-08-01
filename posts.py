from flask import Flask, render_template, request

app = Flask(__name__)

# hypothetical user data (replace with database or authentication)
users = {
    "Thembi Makamu": "user1@example.com"
}

# hypothetical posts data (replace with database)
posts = []

@app.route("/post")
def feed():
    return render_template("post.html")

# @app.route("/post")
# def post():
#     return render_template("post.html")

@app.route("/feed_home", methods=["POST"])
def create_post():
    username = "Thembi Makamu"  # replace with actual username retrieval
    text = request.form.get("text")

    if text:
        # create a new post dictionary
        new_post = {"username": username, "text": text}
        posts.append(new_post)

    return render_template("Feed-home.html", posts=posts)


if __name__ == "__main__":
    app.run(debug=True)
