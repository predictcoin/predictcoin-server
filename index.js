//imports
require('dotenv').config();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const cron = require('node-cron');
const express = require('express');
const Web3 = require('web3');
const predictcoinABI = require("./abis/prediction-abi.json");

app = express();

const web3 = new Web3(process.env.PROVIDER_API);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
const predictionContract = new web3.eth.Contract(predictcoinABI, process.env.PREDICTION_CONTRACT_ADDRESS, { from: account.address });

async function startRound(){
  const res = await predictionContract.methods.startRound().send()
    .on('transactionHash', function(hash){
      console.log(hash);
    })
    .on('confirmation', function(confirmationNumber, receipt){
      if(confirmationNumber==10){
        console.log(receipt);
      }
    })
    .on('error', function(error, receipt) { 
      console.log(error);
    });
}

async function endRound(){
  const res = await predictionContract.methods.endRound().send()
    .on('transactionHash', function(hash){
      console.log(hash);
    })
    .on('confirmation', function(confirmationNumber, receipt){
      if(confirmationNumber==10){
        console.log(receipt);
      }
    })
    .on('error', function(error, receipt) { 
      console.log(error);
    });
}
startRound();

// Schedule tasks to be run on the server.
// cron.schedule('59 55 2 * * *', function() {
  
// });

app.listen(3000);