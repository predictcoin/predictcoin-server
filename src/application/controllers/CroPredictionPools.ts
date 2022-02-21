import { _CroLoserPool, _CroWinnerPool } from "../domain/CroPredictionPools";
import {send as sendTx, call as callTx, call} from "../../utils/transaction";
import { addPool } from "../usecases/CroPredictionPools";
import { emailController } from "../..";

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
}

export default PredictionPoolController;