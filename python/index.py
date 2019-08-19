from flask import Flask, request, jsonify
import json
#import convert

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
                #convert.tomp3(content.get("message"), 'New_audio')
                result = content
                return jsonify(result)

app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)