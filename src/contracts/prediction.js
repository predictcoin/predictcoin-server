const { web3 } = require("../config");
const {
  abis: { predictionABI},
  addresses,
} = require("../data");

const {
  Prediction: predictionAddr,
} = addresses[ process.env.NODE_ENV ];
const wallet = web3.eth.accounts.wallet;

const predictionContract = new web3.eth.Contract(
  predictionABI,
  predictionAddr,
  { from: wallet[0].address }
);

const startRound = predictionContract.methods.startRound();
const endRound = predictionContract.methods.endRound();
const getEpoch = predictionContract.methods.currentEpoch();
const getRound = (epoch) => predictionContract.methods.getRound(epoch);
const getBufferSeconds = predictionContract.methods.bufferSeconds();

module.exports = { startRound, endRound, getEpoch, getRound, getBufferSeconds };