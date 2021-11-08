const axios = require('axios');
const sendEmail = require('./email');
const Web3 = require('web3');

async function getGasPrice() {
    let response = await axios.get('https://bscgas.info/gas?apikey=063f1d2dca3f471fb9bdaa1c4331f46e')
    return response.data.instant.toString();
}


async function send(tx, callback){
  //passing true to callback indicates a successfull tx and vice-versa
  try {
    const gas = await tx.estimateGas();
    const gasPrice = Web3.utils.toWei(await getGasPrice(), "gwei");
    tx.send({ gas, gasPrice })
      .on('receipt', function(receipt){
        callback(true, receipt.transactionHash);
      })
      .on('error', function(error, receipt) { 
        callback(false, error.message, receipt ? receipt.transactionHash: "");
      });
  }
  catch(error) {
    callback(false, error.message);
  }
}

async function call(tx){
  try{
    const res = await tx.call()
    return res;
  }
  catch(error){
    return error;
  }
}

module.exports = {send, call};

