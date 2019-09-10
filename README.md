# SYSTEM OF MICROSERVICES WITH NODEJS AND PYTHON
This is a construction of microservices using nodejs for a principal aplication and using python for work with our data.
This pattern for building microservices works as an example of an application that receives a text `message` and turns it into `audio`.

## HOW TO USE

### IN A LINUX DESKTOP WITHOUT DOCKER

Clone this repo and check if you have [npm](https://docs.npmjs.com/cli/install), [nodejs](https://nodejs.org/en/download/), [python](https://www.python.org/) and [pip](https://pypi.org/project/pip/), if you don't
```
sudo apt-get update

sudo apt-get install npm
sudo apt-get install nodejs
sudo apt-get install python3.6
sudo apt-get install python3-pip
```
#### Setup nodejs
- Navigate to the repository `cd docker-microservices/nodejs`;
- run `npm install` to install project dependencies;
- run `npm start` to serve the application.

Use `localhost:3001/input` to send a `message` with a file `name`;

#### Setup python
- Navigate to the repository `cd docker-microservices/python`;
- run `pip3 install flask` to install [Flask](https://palletsprojects.com/p/flask/);
- run `pip3 install gTTS` to install [gTTS](https://pypi.org/project/gTTS/);
- run `python index.py` to serve the application.

Use `localhost:5000/output` to create a `audio` of the `message`;

Use `localhost:5000/files/<name>` to donwload the `audio`; 

### IN DOCKER

Clone this repo and access the fouders `nodejs` and `python`, to build the containers.

```
cd nodejs
sudo docker image build -t nodejs .
sudo docker run -p 3001:3001 nodejs
```

```
cd python
sudo docker build -t python .
sudo docker run -p 5000:5000 python
```