const express = require('express');

const PORT = 3001;
const HOST = "0.0.0.0";

const app = express();

app.use(require('./routes'));

app.listen(PORT, HOST);