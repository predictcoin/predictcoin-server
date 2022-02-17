import Web3 from "web3";

const web3 = new Web3(process.env.BSC_PROVIDER_API!);
const wallet = web3.eth.accounts.wallet;
wallet.add(process.env.PRIVATE_KEY!);

export default web3;