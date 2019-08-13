from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'

app.run(host='0.0.0.0', port=5000)