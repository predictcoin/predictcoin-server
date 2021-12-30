//imports
require('dotenv').config();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const operatePrediction = require("./prediction");
require("./keepAlive");


const app = express();

operatePrediction();

app.get('/', function (req, res) {
  res.send('hello world')
});

app.listen(process.env.PORT || 3000);