import { _CroLoserPool, _CroWinnerPool } from "../domain/CroPredictionPools";
import {send as sendTx, call as callTx, call} from "../insfrastructure/transaction";
import { addPool, getEpochLength, getPool } from "../usecases/CroPredictionPools";
import { emailController } from "../..";
import { Pool } from "../domain/BscPredict";

class PredictionPoolController {
  contract: _CroLoserPool | _CroWinnerPool;

  private callback = (round: string | number) => 
    async (status:  boolean, ...msg: string[]) => {
      const title = status
        ? `CroPredict: Added pool ${round} to ${"rewardToken" in this.contract.methods ? "loser": "winner"} pool`
        : `CroPredict: Failed to add pool ${round} to ${"rewardToken" in this.contract.methods ? "loser": "winner"} pool`;
      console.log(title, msg.join(" "));
      emailController.send( title, msg.join(" ") );
    };
  
  constructor(contract : _CroLoserPool | _CroWinnerPool){
    this.contract = contract;
  }

  async addPool(round: string | number){
    await sendTx(addPool(this.contract, round), this.callback(round));
  }

  async currentEpoch (): Promise<Pool>{
    const index = BigInt(await callTx(getEpochLength(this.contract))) - BigInt(1);
    return callTx(getPool(this.contract, index.toString()));
  }
}

export default PredictionPoolController;