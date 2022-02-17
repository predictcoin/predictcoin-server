//imports
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import keepAlive from "./utils/keepAlive";
import EmailController from "./application/controllers/Email";
import EmailClient from "./application/insfrastructure/Email";
import BscPrediction from "./BscPrediction";

// setup server needs

// keeps server active
keepAlive();

const emailController = new EmailController(EmailClient);

const app = express();
app.get('/', function (req, res) {
  res.send('hello world')
});
app.listen(process.env.PORT || 3000);

// start predictions
BscPrediction();

export { emailController}; 
