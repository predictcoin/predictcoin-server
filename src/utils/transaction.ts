import getGasPrice from "./gasPrice";


async function send(tx: any, callback?: (...param:any) => any){
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
  }
}

async function call( tx:any ){
  try{
    const res = await tx.call()
    return res;
  }
  catch(error){
    return error;
  }
}

export {call, send};

