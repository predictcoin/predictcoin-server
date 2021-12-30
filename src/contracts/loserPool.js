const { web3 } = require("../config");

const {
  abis: { loserPoolABI },
  addresses,
} = require("../data");

const NODE_ENV = process.env.NODE_ENV;
const { LoserPool: loserPoolAddr } =
  addresses[NODE_ENV];

const wallet = web3.eth.accounts.wallet;

const loserPool = new web3.eth.Contract(loserPoolABI, loserPoolAddr, {
  from: wallet[0].address,
});

const addLoserPool = (epoch) => loserPool.methods.add(epoch);

module.exports = { addLoserPool };