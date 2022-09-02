import Web3 from "web3";
import logger from "../../utils/logger";

export const rpcUrls = [
  "https://bsc-dataseed.binance.org/",
  "https://bsc-dataseed3.defibit.io",
  "https://binance.nodereal.io",
  "https://bscrpc.com",
  "https://bsc-dataseed3.binance.org",
  "https://bsc-dataseed1.binance.org",
  "https://bsc-dataseed2.binance.org",
  "https://bsc-dataseed2.defibit.io",
  "https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
  "https://bsc-dataseed1.ninicoin.io",
  "https://bsc-dataseed3.ninicoin.io",
  "https://bsc-dataseed1.defibit.io",
  "https://bsc-dataseed2.ninicoin.io",
  "https://bsc-dataseed4.defibit.io",
  "https://rpc.ankr.com/bsc",
  "https://bsc-dataseed4.binance.org",
  "https://bsc.mytokenpocket.vip",
  "https://rpc-bsc.bnb48.club",
  "https://bsc-dataseed4.ninicoin.io"
];


const web3 = new Web3(rpcUrls[0]!);

export let counter = 1;

export const setBscProvider = async () => {
  for(;;){
    let connected = false;

    try{
      connected = await web3.eth.net.isListening();
    }catch(error:any){
      // @ts-ignore
      console.error("BscProvider Message", error.message);
      logger.error(`BscProvider: ${(error).message}`);
      connected = false;
    }

    if(!connected){
      console.log(`BscProvider: Changing Provider to ${rpcUrls[counter]}`);
      logger.error(`BscProvider: Changing Provider to ${rpcUrls[counter]}`)
      web3.setProvider(rpcUrls[counter]);
      counter = counter+1 === rpcUrls.length ? 0 : counter+1;
    }else{
      break
    }
  }
}

const wallet = web3.eth.accounts.wallet;
wallet.add(process.env.PRIVATE_KEY!);

export default web3;