from flask import Flask, request, jsonify, send_from_directory
import json
import os

import convert

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/output', methods=['POST', 'GET'])
def output():
    error = None
    if request.method == 'POST':
        print (request.is_json)
        content = request.get_json(force=True)
        convert.tomp3(content.get("message"), content.get("name"))
        result = content
        return jsonify(result)


@app.route('/files/<path:file>', methods=['GET'])
def download(file):
    return send_from_directory(directory='files', filename=("%s.mp3" % (file)), as_attachment=True)

app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)