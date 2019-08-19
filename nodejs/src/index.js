const express = require('express');
const cors = require('cors');

const PORT = 3001;
const HOST = "0.0.0.0";

const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

app.listen(PORT, HOST);