from flask import Flask, request, jsonify

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
                print (content)
                #result = {'message':'give a message but doesnt get the object'}
                result = content
                return jsonify(result)

app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)