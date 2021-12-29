const { web3 } = require("../config");

const {
  abis: { winnerPoolABI },
  addresses,
} = require("../data");

const { WinnerPool: winnerPoolAddr } =
  addresses[
    process.env.NODE_ENV === "development" ? "BSC_TESTNET" : "BSC_MAINNET"
  ];

//init contracts
const wallet = web3.eth.accounts.wallet;

const winnerPool = new web3.eth.Contract(winnerPoolABI, winnerPoolAddr, {
  from: wallet[0].address,
});

const addWinnerPool = (epoch) => winnerPool.methods.add(epoch);

module.exports = { addWinnerPool };