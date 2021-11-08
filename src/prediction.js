
const cron = require('node-cron');
const cronTime = require('cron-time-generator');
const Web3 = require('web3');
const predictcoinABI = require("../abis/prediction-abi.json");
const {send: sendTx, call: callTx} = require("./transaction");
const sendEmail = require('./email');

//web3 initialization
const web3 = new Web3(process.env.PROVIDER_API);
const wallet = web3.eth.accounts.wallet;

wallet.add(process.env.PRIVATE_KEY);
const predictionContract = new web3.eth.Contract(predictcoinABI, process.env.PREDICTION_CONTRACT_ADDRESS, { from: wallet[0].address });
const startRound = predictionContract.methods.startRound();
const endRound = predictionContract.methods.endRound();
const getEpoch = predictionContract.methods.currentEpoch();

//Schedule tasks to be run on the server.
module.exports = () => {
  cron.schedule(cronTime.everyMondayAt(8, 30), async function() {
    const epoch = await callTx(getEpoch);

    const callback = (status, ...msg) => {
      const title = status ? 
        `Started Epoch ${+epoch+1} successfully` :
        `Failed to start Epoch ${+epoch+1}`;
      console.log(title, msg.join(" "));
      sendEmail( title, msg.join(" ") );
    }

    await sendTx(startRound, callback);
  });

  cron.schedule(cronTime.everyMondayAt(9, 32), async function() {
    const epoch = await callTx(getEpoch);

    const callback = (status, ...msg) => {
      if (epoch === 0) return;
      const title = status ? 
        `Ended Epoch ${epoch} successfully` :
        `Failed to end Epoch ${epoch}`;

      console.log(title, msg.join(" "));
      sendEmail( title, msg.join(" ") );
    }

    await sendTx(endRound, callback);
  });
}