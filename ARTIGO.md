# Trabalhando com microservices para comunicar javascript com python

Este projeto tratá-se uma experiência para poder realizar a comunicação entre duas linguagens, com a finalidade de estruturar dados e processá-los. Ele não segue especificamente os padrões deste tipo de arquitetura nem todas as boas práticas, se baseando em alguns tutorias da `Rocketseat` para a construção de uma API com nodejs e a documentação do `Flask`, para criação de rotas e fazer requisições. Para isso poder ocorrer iremos trabalhar com as seguintes tecnologias: 

   - [Express](https://expressjs.com/pt-br/) - um framework de nodejs para a criação de APIs; 
   - [Sequelize](https://sequelize.org/) - um ORM para poder facilitar a comunicação com o banco de dados;
   - [Flask](https://github.com/pallets/flask) - uma biblioteca de python também para criação de uma API;
   - [gTTS](https://gtts.readthedocs.io/en/latest/) - uma biblioteca para transformar texto em arquivos de audio;
   - [Docker](https://docs.docker.com/) - gerenciador de containers.

## Uma arquitetura de microsserviços

Ela é praticamente como se fosse uma API Rest, mas com os módulos divididos em diversas aplicações menores, que cumprem funções específicas.

(...)

## Desenvolvendo nosso gateway

### Lembrando que isso não é um CRUD completo e também não tem autenticação.

Primeiro iremos criar nossa pasta de microsserviços, depois a pasta do nosso gatweay e rodar o comando para criar nosso package.json:

```
mkdir microservices
cd microservices
mkdir nodejs
cd nodejs
npm init
```
Depois de criado iremos instalar o `express` com o comando `npm i --save express` e em seguida instalar o `axios` (`npm i --save axios`), `cors` (`npm i --save cors`) e o `nodemon` (`npm i --save nodemon`). Dentro do nosso gateway criamos uma pasta `/src` para organizar nossa aplicação e dentro dela iremos criar nosso `app.js` ou se preferirem `index.js` com o seguinte código:


```
const express = require('express');
const cors = require('cors');

class AppController {
  constructor() {
    this.express = express();

    this.cors();
    this.middlewares();
    this.routes();
  }

  cors() {
      this.express.use(cors());
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require('./routes'));
  }

}

module.exports = new AppController().express;
```
O que ele faz é importar o `express` e o `cors`, criar uma classe chamanda AppController e dentro dela um construtor para chamar as funções de cors(), middlewares() e routes(), que ainda iremos criar e exportar tudo isso.

Também é preciso criar um arquivo chamado `server.js` com o seguinte código:

```
const app = require('./index.js');

const PORT = 3001;
const HOST = "0.0.0.0";

app.listen(PORT, HOST);
```
Ele serve  para poder importar nossa aplicação e startar na porta `3001`.

Em seguida, precisamos do arquivo de rotas para tudo funcionar normalmente:
```
const express = require('express');

const PythonController = require('./app/controllers/PythonController');

const routes = new express.Router();

routes.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

routes.post('/input', PythonController.inputToPythom);

module.exports = routes;
```
Através do express, nós conseguimos criar rotas para nossa aplicação, temos  nesse código uma rota principal `/` do tipo `GET` que imprimi um "Hello World!" na tela do browser e uma rota do tipo `POST` para se comunicar com o nossa aplicação em python, apresentando o seguinte esquema `routes.tipo('/rota', funcaoController())`. O próximo passo é apresentar Controllers e Models, do padrão MVC.

(...)

## Desenvolvendo um microsserviço com Flask

Para utilizar esta biblioteca é preciso ter instalar o `python` e seu gerenciador de pacotes o [pip](https://pip.pypa.io/en/stable/), com os seguintes comandos:
```
sudo apt update
sudo apt python-pip
pip install flask
```

Em seguida, dentro do diretório principal `docker`, criar o seguinte diretório e o arquivo `index.py` para poder trabalhar com o `Flask`:
```
from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'

app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
```
Com isso, conseguimos criar uma rota principal `/` que vai retornar um "Hello World!" na porta 5000, com a seguinte sintaxe `@app.route(/rota) def funcao()`. Como nesse exemplo, estamos usando o python para transformar texto em um arquivo de áudio, precisamos instalar a biblioteca `gTTS`, para realizar essa converção:

```
pip install gTTS
```
E criar um arquivo chamdo convert.py para fazer isso:

```
from gtts import gTTS as gtts
import os

def tomp3(message, name, language="pt"):
    print(message)
    print(name)
    convert = gtts(text=message,lang=language)
    convert.save("%s.mp3" % os.path.join("./files", name))
```
Essa função irá recerber 3 parâmetros: `message`, `name` e uma variável `lenguage` com o valor "pt", que nas útimas linhas irá converter a mensagem para a linguagem que estabelecemos e colocar numa variável convert, para no final poder salvá-la como um arquivo .mp3 na pasta `./files`, para tentao será necessário criar essa pasta dentro da raíz do microserviço.

Eu acabei colocando o nome da variavel com o mesmo nome do arquivo, sorry ¬¬

Agora que temos uma função pra converter vamos importá-lo e criar nossa rota que irá receber o texto e utilizar essa função dentro de nossa Controller, além de ter que importar o `request` e o `jsonify`:

```
from flask import request, jsonify
import convert
```

```
@app.route('/output', methods=['POST', 'GET'])
def output():
    error = None
    if request.method == 'POST':
        print (request.is_json)
        content = request.get_json(force=True)
        convert.tomp3(content.get("message"), content.get("name"))
        result = content
        return jsonify(result)
```
Essa rota `/output`, com a possibilidade de trabalhar com os métodos `GET` ou `POST` apresenta uma função `output()`. Ela diz que se a requisição for do tipo `POST`, então cria uma variável content para guardar o `json` extraído de um `dictionary` e trabalha com o arquivo `convert` com a função `tomp3` (dentro dele) e coloca nela os parâmetros extraídos do `json`: `message` e `name`, além de guardar o content num result e retorna isso.

Para ter acesso ao arquivo que geramos, é necessário criar uma rota `/download` e importar o `send_from_directory` dentro do Flask:
```
from flask import send_from_directory
```

```
@app.route('/files/<path:file>', methods=['GET'])
def download(file):
    return send_from_directory(directory='files', filename=("%s.mp3" % (file)), as_attachment=True)
```

Ela tem o seguinte endereço `/files/<path:file>`, trabalhando com o método `GET` e tem uma função `download()`, que recebe o parâmetro `file` e retorna o método `send_from_directory` com os parâmetros, que são as variáveis `directory` e `filename`.

Pronto agora temos nossas 3 rotas e terminas nosso microsserviço com python. Lembrando que isso é apenas um exemplo de como trabalhar com a linguagem e suas tecnologias, a ideia é ser uma porta de entrada para começar a tratar dados que foram estruturados com javascript.

Para poder testar estes microsserviços na sua máquina localmente, sem precisar utilizar o auxílio do `Docker`, é so entrar no diretório de cada um e start o server, para trabalhar nas respectivas portas 3001 e 5000:

```
cd nodejs
npm start
```
```
cd python
python index.py
```
## Trabalhando com Docker

O Docker é um gerenciador de containers.