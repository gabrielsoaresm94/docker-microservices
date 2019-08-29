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