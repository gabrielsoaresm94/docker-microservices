FROM node:carbon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --progress=false

# Bundle app source
COPY . /usr/src/app

CMD [ "yarn sequelize db:migrate" ]