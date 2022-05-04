import getGasPrice from "../../utils/gasPrice";
import { setCroProvider } from "../insfrastructure/CroWeb3";
import createLock from "../../utils/SimpleLock";
import delay from "delay";
import logger from "../../utils/logger";
import Bugsnag from "../../utils/notification";

const lock = createLock("sendTransaction");

async function send(tx: any, callback?: (...param:any) => any){
  await lock.acquire();
  // checks and resets provider if CRO
  if(tx._ethAccounts._provider.host !== process.env.BSC_PROVIDER_API){
    await setCroProvider();
  }

  //passing true to callback indicates a successfull tx and vice-versa
  try {
    const gas = await tx.estimateGas();
    const chain = tx._ethAccounts._provider.host !== process.env.BSC_PROVIDER_API ? "cro" : "bsc";
    const gasPrice = await getGasPrice(chain);
    await tx.send({ gas: gas+100000, gasPrice  })
      .on('receipt', function(receipt:any){
        callback && callback(true, receipt.transactionHash);
      })
      .on('error', function(error:any, receipt:any) { 
        callback && callback(false, error.message, receipt ? receipt.transactionHash: "");
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
  }

  try{
    const res = await tx.call()
    return res;
  }
  catch(error:any){
    const message = `SendTx: ${error.message}`;
    console.error(message);
    logger.error(message);
    Bugsnag.notify(new Error(message));
  }
}

export {call, send};

