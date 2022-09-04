import getGasPrice from "../../utils/gasPrice";
import { setCroProvider } from "../insfrastructure/CroWeb3";
import { setBscProvider, rpcUrls as bscRpcUrls, counter as bscCounter } from "../insfrastructure/BscWeb3";
import createLock from "../../utils/SimpleLock";
import delay from "delay";
import logger from "../../utils/logger";
import Bugsnag from "../../utils/notification";
import bscWeb3 from "./BscWeb3";
import croWeb3 from "./CroWeb3";

const lock = createLock("sendTransaction");

async function send(tx: any, callback?: (...param:any) => any){
  await lock.acquire();
  // checks and resets provider if CRO
  if(tx._ethAccounts._provider.host !== process.env.BSC_PROVIDER_API){
    await setCroProvider();
  }else{
    await setBscProvider();
  }

  //passing true to callback indicates a successfull tx and vice-versa
  try {
    const gas = await tx.estimateGas() + 100000;
    const chain = 
      tx._ethAccounts._provider.host !== bscRpcUrls[bscCounter === 0 ? bscRpcUrls.length-1 : bscCounter-1] 
        ? "cro" : "bsc";
    const provider = chain === "cro" ? croWeb3 : bscWeb3;

    const balance = await provider.eth.getBalance(( provider.eth.accounts.wallet[0].address ));
    const gasPrice = await getGasPrice(chain);
    const fee = BigInt(gas) * BigInt(gasPrice);

    if(fee > BigInt(balance)){
      throw new Error("Insufficient balance for transaction on " + chain)
    }

    await tx.send({ gas: gas, gasPrice  })
      .on('receipt', function(receipt:any){
        callback && callback(true, receipt.transactionHash);
      })
      .on('error', function(error:any, receipt:any) { 
        throw new Error(`${error.message} ${receipt ? receipt.transactionHash: ""}`)
      });
  }
  catch(error:any) {
    callback && callback(false, error.message);
    const message = `SendTx: ${error.message}`;
    console.error(message);
    logger.error(message);
    Bugsnag.notify(new Error(message))
  }
  finally {
    await delay(2000);
    lock.release();
  }
}

async function call( tx:any ){
  // checks and resets provider if CRO
  if(tx._ethAccounts._provider.host !== process.env.BSC_PROVIDER_API){
    await setCroProvider();
  }else{
    await setBscProvider();
  }

  try{
    const res = await tx.call()
    return res;
  }
  catch(error:any){
    const message = `CallTx: ${error.message}`;
    console.error(message);
    logger.error(message);
    Bugsnag.notify(new Error(message));
  }
}

export {call, send};

