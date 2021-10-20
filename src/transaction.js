const axios = require('axios');
const sendEmail = require('./email');

async function getGasPrice() {
    let response = await axios.get('https://bscgas.info/gas?apikey=063f1d2dca3f471fb9bdaa1c4331f46e')
    return response.data.instant;
}


async function send(tx, callback){
  //passing true to callback indicates a successfull tx and vice-versa

  try {
    const gas = await tx.estimateGas();
    const gasPrice = await getGasPrice();
    tx.send({ gas })
      .on('receipt', function(receipt){
        callback(true, receipt.transactionHash);
      })
      .on('error', function(error, receipt) { 
        callback(false, error.message);
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

