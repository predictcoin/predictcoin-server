import { _CrpLoserPool, _CrpWinnerPool } from "../domain/CrpPredictionPools";
import {send as sendTx, call as callTx, call} from "../../utils/transaction";
import { addPool } from "../usecases/CrpPredictionPools";
import { emailController } from "../..";

class PredictionPoolController {
  contract: _CrpLoserPool | _CrpWinnerPool;

  private callback = (round: string | number) => 
    async (status:  boolean, ...msg: string[]) => {
      const title = status
        ? `Added pool ${round} to ${"rewardToken" in this.contract.methods ? "loser": "winner"} pool`
        : `Failed to add pool ${round} to ${"rewardToken" in this.contract.methods ? "loser": "winner"} pool`;
      console.log(title, msg.join(" "));
      emailController.send( title, msg.join(" ") );
    };
  
  constructor(contract : _CrpLoserPool | _CrpWinnerPool){
    this.contract = contract;
  }

  async addPool(round: string | number){
    sendTx(addPool(this.contract, round), this.callback(round));
  }
}

export default PredictionPoolController;