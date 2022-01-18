const axios = require('axios');
const Web3 = require("web3");
const { web3 } = require("./config");

async function getGasPrice() {

  try{
    if(process.env.NODE_ENV === "development") throw new Error("No be prod we de");
    let response = await axios.get("https://owlracle.info/gas?apikey=063f1d2dca3f471fb9bdaa1c4331f46e");
    return Web3.utils.toWei(response.data.fast.toString(), "gwei");
  }catch(err){
    console.log(err)
    const price = await web3.eth.getGasPrice();
    return price;
  }
}


async function send(tx, callback){
  //passing true to callback indicates a successfull tx and vice-versa
  try {
    const gas = await tx.estimateGas();
    const gasPrice = await getGasPrice();
    await tx.send({ gas: gas+100000, gasPrice  })
      .on('confirmation', function(confirmation, receipt){
        if(confirmation !== 0) return;
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

