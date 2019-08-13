# SYSTEM OF MICROSERVICES WITH NODEJS AND PYTHON
This is a construction of microservices using nodejs for a principal aplication and using python for work with our data.

## HOW TO USE

### IN A LINUX DESKTOP WITHOUT DOCKER

Clone this repo and check if you have [npm](https://docs.npmjs.com/cli/install), [nodejs](https://nodejs.org/en/download/) and [python](https://www.python.org/), if you don't
```
sudo apt-get update

sudo apt-get install npm
sudo apt-get install nodejs
sudo apt-get install python3.6
```
with the manager of python packages [pip](https://pypi.org/project/pip/), install [flask](https://palletsprojects.com/p/flask/)
```
pip3 install flask
```

Inside in the main folder, open the nodejs folder and
```
npm i
```

For start the server:
```
npm start
```
Now in python folder, start the server with:
```
python index.py
```
### IN LINUX DESKTOP WITH DOCKER