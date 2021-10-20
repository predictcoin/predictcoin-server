//imports
require('dotenv').config();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const operatePrediction = require("./prediction");


app = express();

operatePrediction();

app.listen(3000);