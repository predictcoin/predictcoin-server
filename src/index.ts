//imports
import express, { response } from "express";
import dotenv from 'dotenv';
var cors = require('cors')
dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import keepAlive from "./utils/keepAlive";
import EmailController from "./application/controllers/Email";
import EmailClient from "./application/insfrastructure/Email";
import BscPrediction from "./BscPrediction";
import CrpPrediction from "./CrpPrediction";
import CroSportOracle from "./CroSportOracle";
import {callFootballApi} from "./utils/footballApi"

// setup server needs

// keeps server active
keepAlive();

const emailController = new EmailController(EmailClient);

const app = express();
app.use(cors());

app.get('/', function (req, res) {
  res.send('hello world')
});

app.get('/football-api', async function(req, res){
  let response;
  try{
    response = await callFootballApi(req);
    if(response.status !== 200) throw new Error((response.data as {message: string}).message);
    res.status(response.status).send(response.data);
  }catch(error){
    // @ts-ignore
    console.error(error.message);
    // @ts-ignore
    res.status(response.status).send(error.message);
  }
});
app.listen(process.env.PORT || 3000);

// start predictions
// BscPrediction();
// CrpPrediction();
CroSportOracle();

export { emailController}; 
