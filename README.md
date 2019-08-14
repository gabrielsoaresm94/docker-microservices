# SYSTEM OF MICROSERVICES WITH NODEJS AND PYTHON
This is a construction of microservices using nodejs for a principal aplication and using python for work with our data.

## HOW TO USE

### IN A LINUX DESKTOP WITHOUT DOCKER

Clone this repo and check if you have [npm](https://docs.npmjs.com/cli/install), [nodejs](https://nodejs.org/en/download/), [python](https://www.python.org/) and [pip](https://pypi.org/project/pip/), if you don't
```
sudo apt-get update

sudo apt-get install npm
sudo apt-get install nodejs
sudo apt-get install python3.6
sudo apt-get install python-pip
```
#### Setup nodejs
- Navigate to the repository `cd docker-microservices/nodejs`;
- run `npm install` to install project dependencies;
- run `npm start` to serve the application.

Access `localhost:3001` on your browser

#### Setup python
- Navigate to the repository `cd docker-microservices/python`;
- run `pip3 install flask` to install [Flask](https://palletsprojects.com/p/flask/);
- run `python index.py` to serve the application.

Access `localhost:5000` on your browser

### IN LINUX DESKTOP WITH DOCKER