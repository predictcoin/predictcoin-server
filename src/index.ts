//imports
import express from "express";
import dotenv from 'dotenv';
import keepAlive from "./utils/keepAlive";
import Web3 from "web3";
import EmailController from "./application/controllers/Email";
import EmailClient from "./application/insfrastructure/Email";
import BscPrediction from "./BscPrediction";

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.get('/', function (req, res) {
  res.send('hello world')
});

// setup server needs

// keeps server active
keepAlive();

const web3 = new Web3(process.env.PROVIDER_API!);
const wallet = web3.eth.accounts.wallet;
wallet.add(process.env.PRIVATE_KEY!);

console.log(process.env.SENDGRID, "SENDER");
const emailController = new EmailController(EmailClient);

app.listen(process.env.PORT || 3000);

// start predictions
// BscPrediction();

export { web3, emailController};
