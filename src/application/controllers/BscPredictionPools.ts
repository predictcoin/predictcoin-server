import { _BscLoserPool, _BscWinnerPool } from "../domain/BscPredictionPools";
import {send as sendTx, call as callTx, call} from "../insfrastructure/transaction";
import { addPool } from "../usecases/BscPredictionPools";
import { emailController } from "../..";

class PredictionPoolController {
  contract: _BscLoserPool | _BscWinnerPool;

  private callback = (round: string | number) => 
    async (status:  boolean, ...msg: string[]) => {
      const title = status
        ? `Predictcoin: Added pool ${round} to ${"BID" in this.contract.methods ? "loser": "winner"} pool`
        : `Predictcoin: Failed to add pool ${round} to ${"BID" in this.contract.methods ? "loser": "winner"} pool`;
      console.log(title, msg.join(" "));
      emailController.send( title, msg.join(" ") );
    };
  
  constructor(contract : _BscLoserPool | _BscWinnerPool){
    this.contract = contract;
  }

  async addPool(round: string | number){
    await sendTx(addPool(this.contract, round), this.callback(round));
  }
}

export default PredictionPoolController;