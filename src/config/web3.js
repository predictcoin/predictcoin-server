const Web3 = require('web3');

const web3 = new Web3(process.env.PROVIDER_API);
const wallet = web3.eth.accounts.wallet;

wallet.add(process.env.PRIVATE_KEY);

module.exports = web3;